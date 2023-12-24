const { exec } = require('@port-labs/jq-node-bindings');
const express = require("express")
const path = require("path")

const app = express(); // create express app
app.use(express.json());
app.use(express.static("build"));

app.get("*", (req, res) => {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});

app.post("/jq", (req, res) => {
  console.log(req.body)
  res.json(exec(req.body.data, req.body.filter)) 
})
// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});