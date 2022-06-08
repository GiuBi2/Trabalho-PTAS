var express = require("express");
var app = express();
var { autor } = require("./models")
var { livro } = require("./models")

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// ROTAS PARA AUTOR
app.get("/autores", async function(req, res) {
  var resultado = await autor.findAll(req.body);
  res.json(resultado);
});

app.get("/autores/:id", async function(req, res) {
  var resultado = await autor.findOne({where:{ id:req.params.id }});
  res.json(resultado);
});

// NOVA ROTA QUE MOSTRA O LIVRO DO AUTOR
app.get("/autores/:id/livros", async function(req, res){
  let resultado = await autor.findByPk(req.params.id, { 
      include: 'livros' 
  });
  res.json(resultado.livros);
});

app.post("/autores", async function(req, res) {
  var resultado = await autor.create(req.body);
  res.json(resultado);
});

app.put("/autores/:id", async function(req, res) {
  var resultado = await autor.update(req.body, {where:{ id:req.params.id }});
  res.json(resultado);
});

app.delete("/autores/:id", async function(req, res) {
  var resultado = await autor.destroy({where:{ id:req.params.id }});
  res.json(resultado);
});

// ROTAS PARA LIVROS
app.get("/livros", async function(req, res) {
  var resultado = await livro.findAll(req.body);
  res.json(resultado);
});

app.get("/livros/:id", async function(req, res) {
  var resultado = await livro.findOne({where:{ id:req.params.id }});
  res.json(resultado);
});

// NOVA ROTA QUE MOSTRA TODOS OS LIVROS DE UM AUTOR
app.get("/livros/:id/autor", async function(req, res){
  let resultado = await livro.findByPk(req.params.id, { 
      include: 'autor' 
  });
  res.json(resultado.autor);
});

app.post("/livros", async function(req, res) {
  var resultado = await livro.create(req.body);
  res.json(resultado);
});

app.put("/livros/:id", async function(req, res) {
  var resultado = await livro.update(req.body, {where:{ id:req.params.id }});
  res.json(resultado);
});

app.delete("/livros/:id", async function(req, res) {
  var resultado = await livro.destroy({where:{ id:req.params.id }});
  res.json(resultado);
});


app.listen(3000, function() {
  console.log("O servidor está legalzão, está bruto demais e fumegando");
});