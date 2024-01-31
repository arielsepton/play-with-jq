const { exec } = require('@port-labs/jq-node-bindings');
const express = require('express');
var cors = require('cors');

// const path = require("path")

const app = express(); // create express app
app.use(cors());

app.use(express.json());
// app.use(express.static("build"));

// app.get("*", (req, res) => {
//   const index = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(index);
// });

app.post('/jq', cors(), (req, res) => {
  console.log(req.body);
  const result = exec(req.body.data, req.body.filter, { throwOnError: true });
  console.log(result);
  res.json(result);
});
// start express server on port 5000
app.listen(5001, () => {
  console.log('server started on port 5001');
});
