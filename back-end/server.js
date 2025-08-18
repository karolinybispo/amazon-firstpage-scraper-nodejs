import express from "express"; // biblioteca para criar o servidor express
import axios from "axios"; // biblioteca para fazer requisições HTTP a amazon
import { JSDOM } from "jsdom"; // biblioteca para manipular o HTML como se fosse um navegador


const app = express(); // criando servidor express
const PORT = 3000; // definindo porta do servidor


const cors = require("cors"); // importando biblioteca cors
app.use(cors({ origin: "*" })); // permitindo requisições de qualquer origem



app.get("/api/scrape", async (req, res) => { //servidor escutando requisições na rota /api/scrape
  const keyword = req.query.keyword;  // obtem a keyword da url e passa para a variável keyword

  try {
    
    const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`; // Monta a URL da Amazon com a keyword

  
    const response = await axios.get(url, { // 
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/114.0.0.0 Safari/537.36",
      },
    });

    // Usa JSDOM para manipular o HTML
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Seleciona os produtos na página
    const productElements = document.querySelectorAll(
      'div.s-main-slot div[data-component-type="s-search-result"]'
    );

    const products = [];

    productElements.forEach((product) => {
      const title =
        product.querySelector("h2 > span")?.textContent?.trim() || null;
      const rating =
        product.querySelector("span.a-icon-alt")?.textContent?.trim() || null;
      const reviews =
        product
          .querySelector('span[aria-label$=" ratings"]')
          ?.textContent?.trim() ||
        product
          .querySelector('span[aria-label$=" rating"]')
          ?.textContent?.trim() ||
        null;
      const image = product.querySelector("img.s-image")?.src || null;

      if (title) {
        // adiciona o produto ao array se o título existir
        products.push({
          title,
          rating,
          reviews,
          image,
        });
      }
    });

    return res.json(products);

  } catch (err) {
    const statusCode = err.response?.status || 500; // usa o da Amazon ou 500
    res.status(statusCode).json({
      error: err.message,
      details: err.response?.data || null
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});