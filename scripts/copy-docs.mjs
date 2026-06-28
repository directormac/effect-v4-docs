import * as Fs from "node:fs";
import * as Path from "node:path";

const packagesDir = Path.join("effect", "packages");
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

function findPackages(dir = packagesDir) {
  const results = [];
  if (!Fs.existsSync(dir)) {
    return results;
  }
  const list = Fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    if (entry.isDirectory()) {
      const fullPath = Path.join(dir, entry.name);
      if (Fs.existsSync(Path.join(fullPath, "docs/modules"))) {
        results.push(Path.relative(packagesDir, fullPath));
      } else {
        results.push(...findPackages(fullPath));
      }
    }
  }
  return results;
}

function pkgName(pkg) {
  const packageJsonPath = Path.join(packagesDir, pkg, "package.json");
  if (!Fs.existsSync(packageJsonPath)) {
    return pkg;
  }
  const packageJson = Fs.readFileSync(packageJsonPath, "utf8");
  return JSON.parse(packageJson).name;
}

function copyPackageDocs(pkg, name) {
  const src = Path.join(packagesDir, pkg, "docs/modules");
  const dest = Path.join(targetDir, pkg);
  if (!Fs.existsSync(src)) {
    return;
  }
  const files = Fs.readdirSync(src, { withFileTypes: true });

  function handleFiles(root, files) {
    for (const file of files) {
      const path = Path.join(src, root, file.name);
      const destPath = Path.join(dest, root, file.name);

      if (file.isDirectory()) {
        Fs.mkdirSync(destPath, { recursive: true });
        handleFiles(Path.join(root, file.name), Fs.readdirSync(path, { withFileTypes: true }));
        continue;
      }

      if (file.name.endsWith(".md") || file.name.endsWith(".mdx")) {
        const content = Fs.readFileSync(path, "utf8").replace(
          /^parent: Modules$/m,
          `parent: "${name}"`
        );
        Fs.writeFileSync(destPath, content, "utf8");
      } else {
        Fs.copyFileSync(path, destPath);
      }
    }
  }

  Fs.rmSync(dest, { recursive: true, force: true });
  Fs.mkdirSync(dest, { recursive: true });
  handleFiles("", files);
}

function generateIndex(pkg, name, order) {
  const content = `---
title: "${name}"
has_children: true
permalink: /docs/${pkg}
nav_order: ${order}
---
`;

  Fs.writeFileSync(Path.join(targetDir, pkg, "index.md"), content, "utf8");
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
  if (!Fs.existsSync(packagesDir)) {
    console.error(
      `Submodule packages directory ${packagesDir} does not exist. Please make sure the submodule is checked out.`,
    );
    process.exit(1);
  }

  const packages = findPackages().sort();

  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    const name = pkgName(pkg);
    console.log(`Copying ${pkg} docs...`);
    copyPackageDocs(pkg, name);
    generateIndex(pkg, name, i + 2);
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
