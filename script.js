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
            if (navigator.share) {
                try {
                    // Convertir la imatge en un fitxer abans de compartir-la
                    const response = await fetch(img.src);
                    const blob = await response.blob();
                    const file = new File([blob], sticker, { type: blob.type });

                    await navigator.share({
                        title: "Sticker",
                        text: "Mira aquest sticker!",
                        files: [file]
                    });

                } catch (error) {
                    console.error("Error en compartir:", error);
                    alert("No s'ha pogut compartir el sticker.");
                }
            } else {
                alert("El teu navegador no suporta compartir.");
            }
        });

        stickerDiv.appendChild(img);
        stickerDiv.appendChild(shareButton);
        stickerContainer.appendChild(stickerDiv);
    });
});
