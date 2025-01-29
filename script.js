document.addEventListener("DOMContentLoaded", function() {
    const stickerContainer = document.getElementById("sticker-container");

    // Llista dels stickers
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

        // Botó per compartir per enllaç
        const shareButton = document.createElement("button");
        shareButton.classList.add("share-button");
        shareButton.innerText = "Compartir";

        shareButton.addEventListener("click", () => {
            if (navigator.share) {
                navigator.share({
                    title: "Sticker",
                    text: "Mira aquest sticker!",
                    url: img.src // Compartim l'URL en comptes del fitxer
                }).catch(err => console.error("Error en compartir:", err));
            } else {
                alert("El teu navegador no suporta compartir.");
            }
        });

        // Botó per descarregar el sticker
        const downloadButton = document.createElement("button");
        downloadButton.classList.add("download-button");
        downloadButton.innerText = "Descarregar";

        downloadButton.addEventListener("click", () => {
            const link = document.createElement("a");
            link.href = img.src;
            link.download = sticker; // Assignem el nom del fitxer per descarregar
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Afegim elements al div del sticker
        stickerDiv.appendChild(img);
        stickerDiv.appendChild(shareButton);
        stickerDiv.appendChild(downloadButton);
        stickerContainer.appendChild(stickerDiv);
    });
});
