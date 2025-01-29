document.addEventListener("DOMContentLoaded", function () {
    const stickerContainer = document.getElementById("sticker-container");

    // Carregar stickers des del fitxer sicker.json
    fetch("sicker.json")
        .then(response => response.json())
        .then(data => {
            // Comprovar si hi ha stickers disponibles
            if (!data.stickers || data.stickers.length === 0) {
                console.warn("⚠️ No s'han trobat stickers a sicker.json");
                return;
            }

            // Crear la galeria de stickers
            data.stickers.forEach(sticker => {
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
                                // Crea un fitxer a partir del blob
                                const file = new File([blob], sticker, { type: "image/webp" });

                                // Comprova si es pot compartir aquest tipus de fitxers
                                if (navigator.canShare({ files: [file] })) {
                                    navigator.share({
                                        title: "Sticker",
                                        text: "Mira aquest sticker!",
                                        files: [file]
                                    }).catch(err => console.error("❌ Error en compartir:", err));
                                } else {
                                    alert("⚠️ El teu navegador no suporta compartir aquest tipus de fitxers.");
                                }
                            })
                            .catch(err => console.error("❌ Error en obtenir el fitxer:", err));
                    } else {
                        alert("⚠️ El teu navegador no suporta compartir.");
                    }
                });

                stickerDiv.appendChild(img);
                stickerDiv.appendChild(shareButton);
                stickerContainer.appendChild(stickerDiv);
            });
        })
        .catch(error => console.error("❌ Error carregant sicker.json:", error));
});
