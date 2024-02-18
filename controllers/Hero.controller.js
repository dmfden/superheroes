const { SuperHero, Superpower, HeroImage } = require('../models');
const NotFoundError = require('../errors/NotFoundError');
const e = require('express');

//CREATE HERO
module.exports.createOne = async (req, res, next) => {
    try {
        const { body, files} = req;
        const hero = await SuperHero.create(body);

        if(body?.Superpowers?.length) {
            const powersSet = [...new Set(body.Superpowers)];

            powersSet.forEach(async currentPower=>{
                const power = await Superpower.findByPk(currentPower);
                if (power) {
                    await power.addSuperHero(hero);
                } 
            });
        }

        if(files) {
          
            for(let imgPath of files) {
                await hero.createHeroImage({path: imgPath.filename});
            }
        }
 
        const heroWithData = await SuperHero.findAll({
            where: {
                id: hero.id,
            },
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'ability'],
                    through: {
                        attributes: []
                      }
                },
                {
                    model: HeroImage,
                    attributes: ['path'],
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return res.status(201).send({ data: heroWithData });
    } catch (error) {
       
        next(error);
    }
}

//GET HERO WITH POWERS
module.exports.getHeroPowers = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;
        const heroSuperpowers = await SuperHero.findAll({
            where: {
                id: Number(heroId)
            },
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'ability'],
                    through: {
                        attributes: []
                      }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }

        });

         if(heroSuperpowers?.length){
            res.status(200).send({ data: heroSuperpowers })
         }else{
            throw new NotFoundError(`No hero with id ${heroId}`);
         }

    } catch (error) {
        next(error);
    }
}

//UPDATE HERO
module.exports.updateOne = async (req, res, next) => {
    try {
        const { body, params: { heroId }, files } = req;
        const [count, [updatedHero]] = await SuperHero.update(body, {
            where: {
                id: heroId,
            },
            returning: true,
        });
      

        if(!updatedHero) {
            throw new NotFoundError(`No hero with id ${heroId}`);
        } 

            // TODO check why POSTMAN recive full response, Oherwise local updateHero.http receive empty Superpowers in Response
            if(body?.Superpowers?.length) {
                const powersSet = new Set(body.Superpowers);
                const allPowers = await Superpower.findAll();
                const heroCurrentPowers = await updatedHero.getSuperpowers();
                await heroCurrentPowers.forEach(async(power)=>await updatedHero.removeSuperpower(power.id));


                await allPowers.forEach( async el=>{              
                    if(powersSet.has(String(el.id)) || powersSet.has(el.id)){
                        await updatedHero.addSuperpower(Number(el.id));
                    }
                });
                await updatedHero.save();
            }
            

            if(files) {     
                const images = await updatedHero.getHeroImages();
                images.forEach(async(img)=>await img.destroy());
                files.forEach(async file=> await updatedHero.createHeroImage({path: file.filename})); 
                await updatedHero.save();
            }

            const heroWithData = await SuperHero.findAll({
                where: {
                    id: updatedHero.id,
                },
                include: [
                    {
                        model: Superpower,
                        attributes: ['id', 'ability'],
                        through: {
                            attributes: []
                          }
                    },
                    {
                        model: HeroImage,
                        attributes: ['path'],
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
    
            return res.status(200).send({ data: heroWithData });
    
    } catch (error) {
        next(error);
    }
}


//GET HEROES WITH PAGINATION
module.exports.getAll = async (req, res, next) => {
    try {
        const { pagination } = req;
       
        const heroes = await SuperHero.findAll({
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'ability'],
                    through: {
                        attributes: []
                      }
                },
                {
                    model: HeroImage,
                    attributes: ['id','path'],
                }
            ],
            ...pagination
        });

        if (!heroes.length) {
            throw new NotFoundError("No Heroes were founded");
        }

        res.status(200).send({ data: heroes });
    } catch (error) {
        next(error);
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;
        const hero = await SuperHero.findByPk(heroId);
        if (hero) {
            res.status(200).send({ data: hero });
        } else {
            throw new NotFoundError('Hero not found');
        }

    } catch (error) {
        next(error);
    }
}



module.exports.deleteOne = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;
        
            const deleted = await SuperHero.destroy({
                where: {
                    id: Number(heroId)
                },
                returning: true
            });

            if(!deleted.length) {
                throw new NotFoundError('Hero not found');
            }


            res.status(200).send({ data: deleted });
        }
     catch (error) {
        next(error);
    }
}


module.exports.addImage = async (req, res, next) => {
    try {
        const {file: {filename}, params: {heroId}} = req;
        const created = await HeroImage.create({
            'hero_id': Number(heroId),
            path: filename,
        });
        res.status(200).send(created)
    } catch(error) {
        next(error)
    }
}