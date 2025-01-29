document.addEventListener("DOMContentLoaded", function() {
    const stickerContainer = document.getElementById("sticker-container");

    // Stickers disponibles (posa aquí els noms de les imatges dins /stickers/)
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

        shareButton.addEventListener("click", () => {
            // Comprova si el navegador suporta l'API de compartir fitxers
            if (navigator.share && navigator.canShare) {
                fetch(img.src)
                    .then(response => response.blob())
                    .then(blob => {
                        // Crea un File a partir del blob
                        // Ajusta el MIME type segons el tipus real (per ex. "image/webp")
                        const file = new File([blob], sticker, { type: "image/webp" });

                        // Comprova si realment es pot compartir aquest tipus de fitxers
                        if (navigator.canShare({ files: [file] })) {
                            navigator.share({
                                title: "Sticker",
                                text: "Mira aquest sticker!",
                                files: [file]
                            }).catch(err => console.error("Error en compartir:", err));
                        } else {
                            alert("El teu navegador no suporta compartir aquest tipus de fitxers.");
                        }
                    })
                    .catch(err => console.error("Error en obtenir el fitxer:", err));
            } else {
                alert("El teu navegador no suporta compartir.");
            }
        });

        stickerDiv.appendChild(img);
        stickerDiv.appendChild(shareButton);
        stickerContainer.appendChild(stickerDiv);
    });
});