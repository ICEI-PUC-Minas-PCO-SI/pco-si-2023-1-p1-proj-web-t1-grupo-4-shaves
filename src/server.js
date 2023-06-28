const http = require('http');
const fs = require('fs');
const port = 3000; // Porta na qual o servidor será executado

// Criação do servidor HTTP
const server = http.createServer((req, res) => {
  // Configuração do cabeçalho para permitir solicitações de origens diferentes
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Verifica se a requisição é para o arquivo JSON
  if (req.url === '/db.json') {
    // Lê o arquivo JSON e envia a resposta
    fs.readFile('./db.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else {
    // Caso a requisição não seja para o arquivo JSON, retorna 404 - Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Inicia o servidor na porta especificada
server.listen(port, () => {
  console.log("Servidor HTTP rodando em http://localhost:${port}");
});