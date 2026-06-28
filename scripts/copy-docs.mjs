import * as Fs from "node:fs";
import * as Path from "node:path";

const sourceDir = Path.join("effect", "docs");
const targetDir = Path.join("src", "content", "docs");

function copyDirRecursive(src, dest, transformFile) {
  Fs.mkdirSync(dest, { recursive: true });
  const entries = Fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = Path.join(src, entry.name);
    const destPath = Path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, transformFile);
    } else {
      Fs.copyFileSync(srcPath, destPath);
      if (transformFile) {
        transformFile(destPath, entry.name);
      }
    }
  }
}

function transformMarkdownFile(filePath, fileName) {
  if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) {
    return;
  }

  let content = Fs.readFileSync(filePath, "utf8");
  if (content.startsWith("---")) {
    return;
  }

  let title = Path.basename(fileName, Path.extname(fileName));
  const titleMatch = content.match(/^\s*#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
    content = content.replace(/^\s*#\s+.+$/m, "").trimStart();
  }

  const frontmatter = `---\ntitle: ${JSON.stringify(title)}\n---\n\n`;
  Fs.writeFileSync(filePath, frontmatter + content, "utf8");
}

function copyDocs() {
  if (!Fs.existsSync(sourceDir)) {
    console.error(
      `Source directory ${sourceDir} does not exist. Please run docgen in the submodule first.`,
    );
    process.exit(1);
  }

  const packages = Fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const pkg of packages) {
    const srcPath = Path.join(sourceDir, pkg);
    const destPath = Path.join(targetDir, pkg);

    console.log(`Copying ${pkg} docs to ${destPath}...`);
    Fs.rmSync(destPath, { recursive: true, force: true });
    copyDirRecursive(srcPath, destPath);
  }

  // Copy migration docs
  const migrationSrc = Path.join("effect", "migration");
  const migrationDest = Path.join(targetDir, "migration");
  if (Fs.existsSync(migrationSrc)) {
    console.log(`Copying migrations from ${migrationSrc} to ${migrationDest}...`);
    Fs.rmSync(migrationDest, { recursive: true, force: true });
    copyDirRecursive(migrationSrc, migrationDest, transformMarkdownFile);
  }

  // Copy cookbooks docs
  const cookbooksSrc = Path.join("effect", "cookbooks");
  const cookbooksDest = Path.join(targetDir, "cookbooks");
  if (Fs.existsSync(cookbooksSrc)) {
    console.log(`Copying cookbooks from ${cookbooksSrc} to ${cookbooksDest}...`);
    Fs.rmSync(cookbooksDest, { recursive: true, force: true });
    copyDirRecursive(cookbooksSrc, cookbooksDest, transformMarkdownFile);
  }

  // Copy LLMS.md
  const llmsSrc = Path.join("effect", "LLMS.md");
  const llmsDest = Path.join(targetDir, "LLMS.md");
  if (Fs.existsSync(llmsSrc)) {
    console.log(`Copying LLMS.md from ${llmsSrc} to ${llmsDest}...`);
    Fs.rmSync(llmsDest, { force: true });
    Fs.copyFileSync(llmsSrc, llmsDest);
    transformMarkdownFile(llmsDest, "LLMS.md");
  }

  console.log("Docs copied successfully!");
}

copyDocs();
