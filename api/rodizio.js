
const Redis = require('ioredis');

module.exports = async function handler(req, res) {
  const corretores = [
    { nome: "Will", whatsapp: "https://wa.me/5583996503969?text=Ol%C3%A1,%20tenho%20interesse%20no%20Inspire%20Itarar%C3%A9" },
    { nome: "Nicole", whatsapp: "https://wa.me/5583987213552?text=Ol%C3%A1,%20tenho%20interesse%20no%20Inspire%20Itarar%C3%A9" },
    { nome: "Italo", whatsapp: "https://wa.me/5583986597884?text=Ol%C3%A1,%20tenho%20interesse%20no%20Inspire%20Itarar%C3%A9" },
  ];

  const redis = new Redis(process.env.REDIS_URL);
  let idx = await redis.get("lastIdx");
  idx = idx === null ? 0 : (parseInt(idx) + 1) % corretores.length;
  await redis.set("lastIdx", idx);
  await redis.quit();

  const corretor = corretores[idx];

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inspire Itararé</title>
  <style>
    body { font-family: Arial, sans-serif; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0f172a; padding: 24px; }
    .brand-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #475569; margin-bottom: 6px; }
    .brand-name { font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 4px; text-align: center; }
    .brand-slogan { font-size: 13px; font-style: italic; color: #fbbf24; margin-bottom: 36px; }
    .loader { width: 46px; height: 46px; border: 4px solid rgba(255,255,255,0.08); border-top-color: #25D366; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 22px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .msg { color: #cbd5e1; font-size: 15px; text-align: center; margin-bottom: 4px; }
    .msg strong { color: #fff; }
    .msg-sub { color: #475569; font-size: 12px; text-align: center; margin-bottom: 30px; }
    .btn-wa { display: inline-flex; align-items: center; gap: 11px; background: #25D366; color: #fff; text-decoration: none; font-size: 17px; font-weight: 700; padding: 16px 34px; border-radius: 50px; }
    .footer { margin-top: 34px; color: #475569; font-size: 11px; text-align: center; line-height: 1.7; }
  </style>
</head>
<body>
  <p class="brand-label">Privilege Imóveis</p>
  <h1 class="brand-name">Inspire Itararé</h1>
  <p class="brand-slogan">O que nos inspira nos eleva.</p>
  <div class="loader"></div>
  <p class="msg">Conectando com <strong>${corretor.nome}</strong>...</p>
  <p class="msg-sub">Você será atendido em instantes</p>
  <a href="${corretor.whatsapp}" class="btn-wa">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    IR PARA O WHATSAPP
  </a>
  <p class="footer">Inspire Itararé &middot; MCMV / CEHAP &middot; Campina Grande – PB<br>A partir de R$ 205 mil &middot; Subsídio até R$ 85 mil &middot; Entrega out/2027</p>
  <script>
    setTimeout(function() {
      window.location.href = "${corretor.whatsapp}";
    }, 800);
  </script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
