document.addEventListener("DOMContentLoaded", function() {
    const stickerContainer = document.getElementById("sticker-container");

    const stickers = [
        "sticker1.webp",
        "sticker2.webp",
        "sticker3.webp"
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
                // Convertir a PNG si és webp
                if (blob.type === "image/webp") {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(blob);
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob((pngBlob) => {
                            resolve(new File([pngBlob], filename.replace(".webp", ".png"), { type: "image/png" }));
                        }, "image/png");
                    };
                } else {
                    resolve(new File([blob], filename, { type: blob.type }));
                }
            })
            .catch(error => reject(error));
    });
}

