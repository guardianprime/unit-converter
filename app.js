const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: http://localhost:${PORT}`);
});
