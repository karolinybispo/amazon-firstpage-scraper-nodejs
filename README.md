# 🚀 Amazon First Page Scraper

Busque rapidamente os principais produtos da Amazon usando uma palavra-chave!  
Este projeto fullstack utiliza Bun no back-end e JavaScript puro no front-end para entregar resultados de forma simples e eficiente.

---

## 📦 Estrutura do Projeto

- **back-end/**: API que faz o scraping da Amazon e retorna os dados dos produtos.
- **front-end/**: Interface web para buscar produtos e exibir resultados.

---

## ⚡ Como usar

### 1. Instale as dependências

```bash
cd back-end
bun install
```

### 2. Inicie o servidor

```bash
bun run server.js
```

O servidor estará disponível em `http://localhost:3000`.

### 3. Execute o front-end

Abra o arquivo [front-end/index.html](front-end/index.html) em seu navegador.

---

## 🖥️ Funcionalidades

- **Busca de produtos**: Digite uma palavra-chave e veja os principais produtos da Amazon.
- **Exibição instantânea**: Resultados aparecem sem recarregar a página.
- **Dados exibidos**: Título, avaliação, número de avaliações e imagem do produto.

---

## 🛠️ Tecnologias

- **Bun**: Runtime moderno e rápido para JavaScript/TypeScript.
- **Express**: API HTTP para o back-end.
- **JSDOM**: Manipulação do HTML da Amazon.
- **JavaScript puro**: Interface leve e responsiva.

---

## 📚 Exemplos de uso

1. Digite "notebook" e clique em "Buscar".
2. Veja os detalhes do primeiro produto listado na Amazon.

---

## 👨‍💻 Para desenvolvedores

- O back-end está em [back-end/server.js](back-end/server.js).
- O front-end está em [front-end/src/main.js](front-end/src/main.js).
- Personalize o scraping conforme sua necessidade!

---

## 📝 Licença

Projeto para fins educacionais.

---

**Divirta-se!**
