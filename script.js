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
            if (navigator.share) {
                navigator.share({
                    title: "Sticker",
                    text: "Mira aquest sticker!",
                    files: [new File([img.src], sticker, { type: "image/png" })]
                }).catch(err => console.error("Error en compartir:", err));
            } else {
                alert("El teu navegador no suporta compartir.");
            }
        });
        stickerDiv.appendChild(img);
        stickerDiv.appendChild(shareButton);
        stickerContainer.appendChild(stickerDiv);
    });
});