const express = require('express');
const multer = require('multer');
const HeroController = require('../controllers/Hero.controller');
const pagination = require('../middleware/pagination');



const heroRouter = express.Router();

const path = require('path');
const STATIC_PATH = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
  });

const upload = multer({ storage });


heroRouter.post('/', upload.array('image'), HeroController.createOne); // CREATE HERO
heroRouter.get('/:heroId/superpowers', HeroController.getHeroPowers);  // READ HERO WITH POWERS
heroRouter.put('/:heroId', upload.array('image'), HeroController.updateOne); // UPDATE HERO
heroRouter.get('/',pagination, HeroController.getAll);        // GET ALL HEROES WITH PAGINATION
heroRouter.get('/:heroId', HeroController.getOne); //GET ONE HERO
heroRouter.delete('/:heroId', HeroController.deleteOne);  //DELETE HERO


module.exports = heroRouter;