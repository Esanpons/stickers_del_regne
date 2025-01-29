const fs = require('fs');
const path = require('path');

const stickersPath = path.join(__dirname, 'stickers');

fs.readdir(stickersPath, (err, files) => {
    if (err) {
        console.error("Error llegint la carpeta dels stickers:", err);
        process.exit(1);
    }

    const stickers = files.filter(file => file.endsWith('.webp'));
    const jsonContent = JSON.stringify({ stickers }, null, 2);

    fs.writeFileSync(path.join(__dirname, 'stickers.json'), jsonContent, 'utf8');
    console.log("✅ stickers.json generat correctament!");
});
