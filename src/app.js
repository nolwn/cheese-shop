const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cheeseRoutes = require("./routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/cheese", cheeseRoutes);

app.use((req, res, next) => {
  next({ status : 404, error : "Path not found." });
});

app.use((err, req, res, next) => {
  const error = {};

  error.status = err.status || 500;
  error.error = err.error || "Internal server error.";
  error.stack = err.stack || undefined;

  res.status(error.status).send(error);
});

function listener() {
  console.log(`Listening on port ${port}.`);
}
app.listen(port, listener);
