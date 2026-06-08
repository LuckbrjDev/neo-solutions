const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
const files = ["index.html", "styles.css", "script.js"];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

files.forEach((file) => {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
});

fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
console.log("Build concluído em dist/.");
