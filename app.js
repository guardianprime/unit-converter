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

const weightUnits = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  t: 1000,
  oz: 0.0283495,
  lb: 0.453592,
};

function convertLength(value, from, to) {
  let result = (value * lengthUnits[from]) / lengthUnits[to];
  console.log(result);
  return result.toFixed(2) + to;
}

function convertWeight(value, from, to) {
  let result = (value * weightUnits[from]) / weightUnits[to];
  return result.toFixed(2) + to;
}

function convertTemperature(value, from, to) {
  let answer;

  //converting from another unit to celsius
  if (from === "C") {
    answer = value;
  } else if (from === "F") {
    answer = (value - 32) * (5 / 9);
  } else if (from === "K") {
    answer = value - 273.15;
  }

  //converting from celsius to another unit
  if (to === "C") {
    return answer.toFixed(2);
  } else if (to === "F") {
    return ((answer * 9) / 5 + 32).toFixed(2);
  } else if (to === "K") {
    return (answer + 273.15).toFixed(2);
  }
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("homepage", { result: "", type: "length" });
});

app.get("/length", (req, res) => {
  res.render("homepage", { result: "", type: "length" });
});

app.get("/weight", (req, res) => {
  res.render("homepage", { result: "", type: "weight" });
});

app.get("/temperature", (req, res) => {
  res.render("homepage", { result: "", type: "temperature" });
});

app.post("/convert", (req, res) => {
  let answer;
  if (req.body.fromLength && req.body.toLength) {
    answer = convertLength(
      req.body.value,
      req.body.fromLength,
      req.body.toLength
    );
    res.render("homepage", { result: answer, type: "length" });
  } else if (req.body.fromWeight && req.body.toWeight) {
    answer = convertWeight(
      req.body.value,
      req.body.fromWeight,
      req.body.toWeight
    );
    res.render("homepage", { result: answer, type: "weight" });
  } else if (req.body.fromTemperature && req.body.toTemperature) {
    answer = convertTemperature(
      req.body.value,
      req.body.fromTemperature,
      req.body.toTemperature
    );
    res.render("homepage", { result: answer, type: "temperature" });
  } else {
    res.send("please fill all forms");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: http://localhost:${PORT}`);
});
