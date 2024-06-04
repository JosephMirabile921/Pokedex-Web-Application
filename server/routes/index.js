const poke = require("./pokemon");

const constructorMethod = (app) => {
  app.use("/pokemon", poke);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;