const express = require("express");
const app = express();

const lengthUnits = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

function convert(value, from, to) {
  let result = (value * lengthUnits[from]) / lengthUnits[to];
  console.log(result);
  return result.toFixed(2) + to;
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("homepage", { result: "", type: "length" });
});

app.get("/weight", (req, res) => {
  res.render("homepage", { result: "", type: "weight" });
});

app.get("/temperature", (req, res) => {
  res.render("homepage", { result: "", type: "temperature" });
});

app.post("/convert", (req, res) => {
  const { value, fromLength, toLength } = req.body;
  console.log(value, fromLength, toLength);
  const answer = convert(value, fromLength, toLength);
  res.render("homepage", { result: answer, type: "length" });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: http://localhost:${PORT}`);
});
