// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const videogames = require("./videogames");
const videogame = require("./videogame");
const genres = require("./genres");
const platforms = require("./platforms");

// Configurar los routers
router.use(videogames);
router.use(videogame);
router.use(genres);
router.use(platforms);


module.exports = router;