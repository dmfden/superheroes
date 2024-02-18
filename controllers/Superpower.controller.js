const {SuperHero, Superpower} = require('../models');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createOne = async (req, res, next) => {
    try {
        const {body} = req;
        const superPower = await Superpower.create(body);
        res.status(201).send({data: superPower})
    } catch(error) {
        next(error);
    }
}


module.exports.addProwerToHero = async (req, res, next) => {
    try {
        const {params: {abilityId, heroId}} = req;
        const superPower = await Superpower.findByPk(Number(abilityId));
        const superHero = await SuperHero.findByPk(Number(heroId));
        if(superPower && superHero) {
            await superPower.addSuperHero(superHero);
            res.status(200).send({
                meta: {
                    abilityAdded: abilityId
                }
            })
        } else {
            throw new NotFoundError();
        }
        
    } catch(error) {
        next(error);
    }
}


module.exports.removePowerFromHeroById = async (req, res, next) => {
    try {
        const {params: {abilityId, heroId}} = req;
        const superPower= await Superpower.findByPk(Number(abilityId));
        const superHero = await SuperHero.findByPk(Number(heroId));
        if(superPower && superHero) {
            await superPower.removeSuperHero(superHero);
            res.status(200).send({
                meta: {
                    "removedFormHero": heroId
                }
            })
        }
        else {
            throw new NotFoundError('Not found Hero id or Power id');
        }
    } catch(error) {
        next(error);
    }
}

module.exports.deleteAbility = async (req, res, next) => {
    try {
        const {params: {abilityId}} = req;
        const superPower = await Superpower.findByPk(Number(abilityId));
        if(superPower) {
            superPower.destroy();
            res.status(204).send({});
        }
        else {
            throw new NotFoundError(`No superpower with id ${abilityId}`);
        }

    } catch(error) {
        next(error);
    }
}


module.exports.getHeroesWithPowerById= async (req, res, next) => {
    try {
        const {params: {abilityId}} = req;
        const heroesWithPower = await Superpower.findAll({
            where: {
                id: Number(abilityId),
            },
            include: [{
                model: SuperHero,
            }]
        });
        res.status(200).send({
            data: heroesWithPower
        })
    } catch(error) {
        next(error)
    }
}
