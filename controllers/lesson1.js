const johnnyRoute = (req, res) => {
    res.send("Johnny Walker");
};
  
const creepyRoute = (req, res) => {
    res.send("Creepy Crawler");
};

const speedyRoute = (req, res) => {
    res.send("Speedy Gonzales");
};

const slowRoute = (req, res) => {
    res.send("Slow Poke Ramirez");
};

module.exports = {
    johnnyRoute,
    creepyRoute,
    speedyRoute,
    slowRoute
};