const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const GenerationEngine = require("./generation/engine");
const dragonRouter = require("./api/dragon");
const generationRouter = require("./api/generations");
const accountRouter = require("./api/account");

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors({ origin: "http://localhost:5100", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// routes traffic to /account urls to use the accountRouter
app.use("/account", accountRouter);
// routes traffic to /dragon urls to use the dragonRouter
app.use("/dragon", dragonRouter);
// routes traffic to /generation urls to use the generationRouter
app.use("/generation", generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

engine.start();

module.exports = app;

// setTimeout(() => {
//     engine.stop();
// }, 20000);

// const Generation = require('./generation.js');

// const generation = new Generation();

// console.log('generation', generation);

// const gooby = generation.newDragon();

// console.log('gooby', gooby);

// setTimeout(() => {
//     const mimar = generation.newDragon();
//     console.log('mimar', mimar);
// }, 15000);

// const Dragon = require('./dragon.js');

// const fooey = new Dragon({
//     birthdate: new Date(),
//     nickname: "fooey"
// });

// const baloo = new Dragon({
//     nickname: "baloo",
//     birthdate: new Date(),
//     traits: [{
//         traitType: 'backgroundColor',
//         traitValue: 'green'
//     }]
// });

// const mimar = new Dragon();

// setTimeout(() => {
//     const gooby = new Dragon();
//     console.log('gooby', gooby);
// }, 3000);

// console.log('fooey', fooey);
// console.log('baloo', baloo);
// console.log('mimar', mimar);
