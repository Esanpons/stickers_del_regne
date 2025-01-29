document.addEventListener("DOMContentLoaded", function() {
    const stickerContainer = document.getElementById("sticker-container");

    const stickers = [
        "sticker1.png",
        "sticker2.png",
        "sticker3.png"
    ];

    stickers.forEach(sticker => {
        const stickerDiv = document.createElement("div");
        stickerDiv.classList.add("sticker");

        const img = document.createElement("img");
        img.src = `stickers/${sticker}`;
        img.alt = sticker;

        const shareButton = document.createElement("button");
        shareButton.classList.add("share-button");
        shareButton.innerText = "Compartir";

        shareButton.addEventListener("click", async () => {
            try {
                const file = await getImageFile(img.src, sticker);
                
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: "Sticker",
                        text: "Mira aquest sticker!",
                        files: [file]
                    });
                } else {
                    alert("El teu dispositiu no suporta compartir fitxers.");
                }
            } catch (error) {
                console.error("Error en compartir:", error);
                alert("No s'ha pogut compartir el sticker.");
            }
        });

        stickerDiv.appendChild(img);
        stickerDiv.appendChild(shareButton);
        stickerContainer.appendChild(stickerDiv);
    });
});

// Funció per convertir una imatge en un fitxer abans de compartir-la
async function getImageFile(url, filename) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                resolve(new File([blob], filename, { type: blob.type }));
            })
            .catch(error => reject(error));
    });
}
