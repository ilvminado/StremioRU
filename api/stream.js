export default async function handler(req, res) {
  const id = req.query.id || "";

  const query = encodeURIComponent("Naruto Episode");

  const response = await fetch("https://ok.ru/search/content/" + query);
  const html = await response.text();

  const matches = [...html.matchAll(/href="([^"]*video[^"]*)"/g)];

  const streams = matches.map(m => {
    let url = m[1];
    if (!url.startsWith("http")) url = "https://ok.ru" + url;
    return { title: "OK.ru Stream", url };
  });

  res.json({ streams });
}
