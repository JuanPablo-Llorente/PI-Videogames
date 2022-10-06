// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getVideogames} = require("../controllers/functions");
const {Videogame, Genre} = require("../db");


router.get("/videogame/:id", async (req, res) => {
    const {id} = req.params;
    const videogames = await getVideogames();

    try
    {
        if(id)
        {
            const foundVideogame = videogames.filter(e => e.id == id);
            
            if(foundVideogame.length)
            {
                res.send(foundVideogame[0]);
            }
            else
            {
                res.status(404).send("Sorry! We could not find the videogame.");
            };
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


router.post("/videogame", async (req, res) => {
    const {name, description, releaseDate, rating, platforms, image, genres} = req.body;
    const foundVideogame = await Videogame.findOne({where: {name}});
    
    try
    {
        if(foundVideogame !== null)
        {
            res.send("Sorry! The videogame name already exists.");
        }
        else
        {
            if(name, description, releaseDate, rating, platforms, image, genres)
            {
                const newVideogame = await Videogame.create({
                    name,
                    description,
                    releaseDate,
                    rating,
                    platforms,
                    image,
                });
                
                genres.forEach(async e => {
                    const genresDb = await Genre.findAll({
                        where:
                        {
                            name: e,
                        },
                    });
                    newVideogame.addGenres(genresDb);
                });
                
                res.send("The videogame was successfully created!");
            }
            else
            {
                res.status(404).send("All fields are required.");
            };
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;