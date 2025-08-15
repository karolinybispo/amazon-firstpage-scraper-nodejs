// aqui eu escrevo o js puro para manipular o DOM

import './style.css'

const resultDiv = document.getElementById("resultRequisicao");
const button = document.getElementById("buttonSend");
const table = document.getElementById("resultRequisicao");

 button.addEventListener("click", function () {
    const input = document.getElementById("inputKeyword");
    const keyword = input.value.trim(); // pega o valor do input e remove espaços extras.
  
     if (!keyword) {
    alert("Por favor, digite uma palavra-chave");
    return;
  }
  const url = "http://localhost:3000/api/scrape?keyword=" + encodeURIComponent(keyword);


  //Criada requisicao ajax ao servidor:
  const ajax = new XMLHttpRequest(); // cria o objeto XMLHttpRequest

  ajax.open("GET", url, true); // metodo open informa o verbo, a url que sera feito a requisicao e se é assíncrona ou não.


  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        const dados = JSON.parse(ajax.responseText);

        //vejo no console o que veio da API
        console.log('Dados recebidos:', dados);

        //RECEBENDO OS DADOS E IMPRIMINDO NA TELA
        if (dados.length > 0) {
          const produto = dados[0]; // só pega o primeiro

        document.getElementById("title").textContent = produto.title || "—";
        document.getElementById("rating").textContent = produto.rating || "—";
        document.getElementById("reviews").textContent = produto.reviews || "—";
        document.getElementById("image").src = produto.image || "";

        // depois que chegou os dados, exibe a tabela com resultados
        table.style.display = "table";
        
        } else {
          resultDiv.textContent = "Nenhum produto encontrado.";
        }
        
      } else {
        alert("Erro ao buscar dados: " + ajax.statusText);      }
  
}
  }

  ajax.send(); // envia a requisição

  }
 )
