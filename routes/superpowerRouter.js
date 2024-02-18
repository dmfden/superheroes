const express = require('express');
const SuperpowerController = require('../controllers/Superpower.controller');
const superpowerRouter = express.Router();

superpowerRouter.post('/', SuperpowerController.createOne);     // CREATE POWER
superpowerRouter.put('/:abilityId/:heroId', SuperpowerController.addProwerToHero); // ADD POWER TO HERO
superpowerRouter.get('/:abilityId', SuperpowerController.getHeroesWithPowerById); // GET ALL HEROES WITH POWER (id)
superpowerRouter.delete('/:abilityId', SuperpowerController.deleteAbility);      // DELETE POWER by ID
superpowerRouter.delete('/:abilityId/:heroId', SuperpowerController.removePowerFromHeroById); // REMOVE POWER FROM HERO

module.exports = superpowerRouter;