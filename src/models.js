const uuid = require("uuid/v4");
const cheeses = require("../db");

function getAll() {
  return cheeses;
}

function getOne(id) {
  const cheese = cheeses.find((element) => element.id === id);

  if (!cheese)
    return { error : `A cheese with the id ${id} could not be found.` };
  else
    return cheese;
}

function create(cheese) {
  const requiredProperties = ["name", "price", "weight", "rating"];
  const missing = requiredProperties.filter((property) => !cheese[property]);

  if (missing.length > 0) // not gonna lie, I'm pretty pleased with myself.
    return { error : `The cheese you entered is missing: ${missing.join(", ")}` };
  else {
    cheese.id = uuid();
    cheeses.push(cheese);
    return cheese;
  }
}

function update(id, newCheese) {
  const cheese = cheeses.find((element) => element.id === id);

  if (!cheese)
    return { error : `A cheese with the id ${id} could not be found.` };
  else {
    Object.keys(newCheese).forEach((property) =>
      cheese[property] = newCheese[property]);

    return cheese;
  }
}

function destroy(id) {
  const cheeseIndex = cheeses.find((element) => element.id === id);

  if (cheeseIndex < 0)
    return { error : `A cheese with id ${id} could not be found.` };
  else {
    return cheeses.splice(cheeseIndex, 1);
  }
}

module.exports = { getAll, getOne, create, update, destroy };
