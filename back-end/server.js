import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";

const app = express(); // criando servidor express
const PORT = 3000; // porta do servidor


const cors = require("cors");
app.use(cors({ origin: "*" }));



app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword; 

  try {
    // Monta a URL da Amazon com a keyword
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Faz requisição do HTML da página
    const response = await axios.get(url, {
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
        // só adiciona se tiver título
        products.push({
          title,
          rating,
          reviews,
          image,
        });
      }
    });

    return res.json(products);

  } catch (error) {
    console.error('Erro ao buscar os dados da Amazon:', error);

    // Enviar resposta com mais detalhes
    res.status(500).json({
      message: 'Erro ao buscar os dados da Amazon',
      error: error.message, // mensagem do erro original
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack, // stack trace em dev
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
