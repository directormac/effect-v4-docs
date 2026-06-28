import * as fs from "node:fs";
import * as path from "node:path";

const srcDir = path.join(process.cwd(), "effect", "ai-docs", "src");
const targetLlmsFile = path.join(process.cwd(), "src", "content", "docs", "llms.md");
const targetAiDocsDir = path.join(process.cwd(), "src", "content", "docs", "ai-docs");

function tsFileMetadata(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  
  let title = base.replace(/^\d+/, "").replace(/[-_]/g, " ").trim();
  title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const firstDocString = content.indexOf("/**");
  if (firstDocString === -1) {
    return {
      title,
      description: undefined,
      content: content.trim()
    };
  }

  const linesWithComment = content.slice(firstDocString).split("\n");
  let description = "";
  let foundEnd = false;
  
  for (let i = 1; i < linesWithComment.length; i++) {
    const line = linesWithComment[i];
    if (line.includes("*/")) {
      content = linesWithComment.slice(i + 1).join("\n").trim();
      foundEnd = true;
      break;
    }
    if (!line.trim().startsWith("*")) {
      break;
    }
    const lineContent = line.replace(/^\s*\*\s?/, "");
    if (lineContent.startsWith("@title")) {
      title = lineContent.replace("@title", "").trim();
      continue;
    }
    description += lineContent + "\n";
  }

  if (!foundEnd) {
    content = fs.readFileSync(filePath, "utf8");
  }

  return {
    title,
    description: description.trim() || undefined,
    content: content.trim()
  };
}

function directoryToMarkdown(dir) {
  let indexMd = null;
  const indexMdPath = path.join(dir, "index.md");
  if (fs.existsSync(indexMdPath)) {
    indexMd = fs.readFileSync(indexMdPath, "utf8").trim();
  }

  const rawFiles = fs.readdirSync(dir);
  const allFiles = rawFiles.sort();

  const parts = [];

  for (const file of allFiles) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const basename = path.basename(filePath);

    if (stat.isDirectory()) {
      if (basename === "fixtures") continue;
      const subMarkdown = directoryToMarkdown(filePath);
      if (subMarkdown) {
        parts.push(subMarkdown);
      }
    } else if (/\.tsx?$/.test(file)) {
      const metadata = tsFileMetadata(filePath);
      const fileMarkdown = `### ${metadata.title}

${metadata.description ?? ""}

\`\`\`ts
${metadata.content}
\`\`\`
`;
      parts.push(fileMarkdown);
    }
  }

  const combinedContent = parts.filter(Boolean).join("\n\n").trim();
  if (indexMd) {
    return `${indexMd}\n\n${combinedContent}`;
  }
  return combinedContent;
}

function getTitle(name) {
  let title = name.replace(/^\d+/, "").replace(/[-_]/g, " ").trim();
  if (title.length > 0) {
    title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  return title;
}

function run() {
  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  console.log("Generating complete LLMS.md...");
  const completeMarkdown = directoryToMarkdown(srcDir);
  const llmsContent = `---\ntitle: "LLMs"\n---\n\n${completeMarkdown}\n`;
  fs.mkdirSync(path.dirname(targetLlmsFile), { recursive: true });
  fs.writeFileSync(targetLlmsFile, llmsContent, "utf8");
  console.log(`Saved unified LLMs to: ${targetLlmsFile}`);

  console.log("Generating split ai-docs/ directory...");
  if (fs.existsSync(targetAiDocsDir)) {
    fs.rmSync(targetAiDocsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetAiDocsDir, { recursive: true });

  const rawItems = fs.readdirSync(srcDir);
  const items = rawItems.sort();

  for (const item of items) {
    const itemPath = path.join(srcDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      if (item === "fixtures") continue;
      console.log(`Processing directory: ${item}...`);
      const subMarkdown = directoryToMarkdown(itemPath);
      const title = getTitle(item);
      const fileName = item.replace(/^\d+_/, "") + ".md";
      const destPath = path.join(targetAiDocsDir, fileName);

      const fileContent = `---\ntitle: ${JSON.stringify(title)}\n---\n\n${subMarkdown}\n`;
      fs.writeFileSync(destPath, fileContent, "utf8");
      console.log(`Saved: ${destPath}`);
    } else if (item === "index.md") {
      const indexContent = fs.readFileSync(itemPath, "utf8").trim();
      const fileContent = `---\ntitle: "AI Docs"\n---\n\n${indexContent}\n`;
      const destPath = path.join(targetAiDocsDir, "index.md");
      fs.writeFileSync(destPath, fileContent, "utf8");
      console.log(`Saved: ${destPath}`);
    }
  }

  console.log("AI documentation generation completed successfully!");
}

run();
