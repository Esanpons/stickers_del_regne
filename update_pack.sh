#!/bin/bash
set -e

# Activa entorno
source venv/bin/activate

# Ajusta con tu homeserver (ej. matrix.org si usas cuentas de allí)
HOMESERVER="https://synapse.bcnet.io"
ACCESS_TOKEN="syt_ZXNhbnBvbnM_xmRGmpPlTfsgIdfRJkfk_1BBEVh"

# Genera el pack con subida automática
python3 -m sticker.pack web/packs/regne --add-to-index web/packs/ <<EOF
$HOMESERVER
$ACCESS_TOKEN
EOF

# Commit y push automático
git add web
git commit -m "Actualizar stickers automáticamente"
git push
