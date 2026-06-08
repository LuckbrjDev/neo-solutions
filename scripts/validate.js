const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const requiredContent = [
  "Neo Solutions",
  "5511946677094",
  "luckrj.dev@gmail.com",
  "id=\"contact-form\"",
  "id=\"projetos\"",
];

const missingContent = requiredContent.filter((item) => !html.includes(item));
if (missingContent.length) {
  throw new Error(`Conteúdo obrigatório ausente: ${missingContent.join(", ")}`);
}

const assetMatches = [...html.matchAll(/(?:src|data-image)="(assets\/[^"]+)"/g)];
const missingAssets = assetMatches
  .map((match) => match[1])
  .filter((asset) => !fs.existsSync(path.join(root, asset)));

if (missingAssets.length) {
  throw new Error(`Arquivos de imagem ausentes: ${missingAssets.join(", ")}`);
}

console.log(`Validação concluída: ${assetMatches.length} referências de imagem verificadas.`);
