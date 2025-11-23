const fs = require("fs");
const path = require("path");

function renameFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (
      stat.isDirectory() &&
      !["node_modules", ".git", ".vscode", "prisma", "public"].includes(file)
    ) {
      renameFiles(fullPath);
    } else if (
      (file.endsWith(".tsx") || file.endsWith(".ts")) &&
      path.basename(file, path.extname(file)).length > 0
    ) {
      const base = path.basename(file, path.extname(file));
      if (
        base[0] === base[0].toUpperCase() &&
        base[0] !== base[0].toLowerCase()
      ) {
        const newBase = base[0].toLowerCase() + base.slice(1);
        const newFile = newBase + path.extname(file);
        const newPath = path.join(dir, newFile);
        fs.renameSync(fullPath, newPath);
        updateReferences(".", base, newBase);
      }
    }
  }
}

function updateReferences(dir, oldName, newName) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (
      stat.isDirectory() &&
      !["node_modules", ".git", ".vscode", "prisma", "public"].includes(file)
    ) {
      updateReferences(fullPath, oldName, newName);
    } else if (
      file.endsWith(".tsx") ||
      file.endsWith(".ts") ||
      file.endsWith(".js") ||
      file.endsWith(".jsx")
    ) {
      let content = fs.readFileSync(fullPath, "utf8");
      const regex = new RegExp("\\b" + oldName + "\\b", "g");
      if (regex.test(content)) {
        content = content.replace(regex, newName);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

renameFiles(".");
