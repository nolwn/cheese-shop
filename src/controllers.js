const models = require("./models");

function getAll(req, res, next) {
  const data = models.getAll();
  res.status(200).send({ data : data });
}

function getOne(req, res, next) {
  const data = models.getOne(req.params.id);

  if (data.error) {
    data.status = 404;
    next(data);
  }
  else
    res.status(200).send({ data : data });
}

function create(req, res, next) {
  const data = models.create(req.body);

  if (data.error) {
    console.log("Found the error");
    console.log(data);
    data.status = 400;
    next(data);
  }
  else
    res.status(201).send({ data : data });
}

function update(req, res, next) {
  const data = models.update(req.params.id, req.body);

  if (data.error) {
    data.status = 400;
    next(data);
  }
  else
    res.status(200).send({ data : data });
}

function destroy(req, res, next) {
  const data = models.destroy(req.params.id);

  if (data.error)
    next({ status : 400, message : "The cheese could not be deleted." });
  else res.status(200).send({ data : data });
}

module.exports = { getAll, getOne, create, update, destroy };
