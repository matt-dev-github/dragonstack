const { response } = require('express');
const pool = require('../../databasePool');
const DragonTable = require('./table');
const Dragon = require('./index');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        // gets dragon
        DragonTable.getDragon({ dragonId }),
        // gets traits
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType", "traitValue"
                FROM trait
                INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve(response.rows);
                }
            )
        })
    ])
        .then(([dragon, dragonTraits]) => {
            // makes object from json information pulled from DB
            return new Dragon({ ...dragon, dragonId, traits: dragonTraits })
        })
        .catch(error => console.error(error));
};


// getDragonWithTraits({ dragonId: 1 })
//     .then(dragon => console.log('dragon', dragon))
//     .catch(error => console.error('error', error));

module.exports = { getDragonWithTraits };
