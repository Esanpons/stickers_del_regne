const fs = require('fs');
const path = require('path');

const stickersPath = path.join(__dirname, 'stickers');

fs.readdir(stickersPath, (err, files) => {
    if (err) {
        console.error("❌ Error llegint la carpeta dels stickers:", err);
        process.exit(1); // Atura l'execució si hi ha un error
    }

    const stickers = files.filter(file => file.endsWith('.webp'));
    if (stickers.length === 0) {
        console.warn("⚠️ AVÍS: No s'han trobat stickers a la carpeta!");
    }

    const jsonContent = JSON.stringify({ stickers }, null, 2);
    fs.writeFileSync(path.join(__dirname, 'sicker.json'), jsonContent, 'utf8');
    console.log("✅ sicker.json generat correctament!");
});
