const express = require("express");

const app = express();
const port = 3000;

console.log("hello", process.env.TEST);

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/query", (req, res) => {
  console.log(req.query);
  res.json(req.query);
});
app.get("/path/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`the path param you entered was: ${req.params.id}`);
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
