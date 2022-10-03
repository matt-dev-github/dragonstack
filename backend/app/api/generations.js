const { Router } = require("express");

const router = new Router();

// when this url is hit,
router.get("/", (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
});

module.exports = router;
