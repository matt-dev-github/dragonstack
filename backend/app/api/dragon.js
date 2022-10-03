const { Router } = require('express');
const DragonTable = require('../dragon/table');

const router = new Router();

// when this url is hit, the new dragon function is ran and the generated dragon is returned
router.get('/new', (req, res, next) => {
    const dragon = req.app.locals.engine.generation.newDragon();
    console.dir(dragon);
    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            console.log('dragonId', dragonId);

            dragon.dragonId = dragonId;

            res.json({ dragon });
        })
        .catch(error => next(error));
});

module.exports = router