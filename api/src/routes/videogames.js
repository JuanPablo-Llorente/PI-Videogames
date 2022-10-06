// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getVideogames, getVideogamesByName} = require("../controllers/functions");


router.get("/videogames", async (req, res) => {
    const {name} = req.query;
    const videogames = await getVideogames();
    
    try
    {
        if(name)
        {
            const foundVideogame = await getVideogamesByName(name);
            
            if(foundVideogame !== undefined && foundVideogame.length > 0)
            {
                res.send(foundVideogame);
            }
            else
            {
                res.status(404).send("Sorry! We could not find the videogame. Check if it is well written.");
            };
        }
        else
        {
            if(videogames.length)
            {
                res.send(videogames);
            }
            else
            {
                res.status(404).send("Sorry! We can not load videogames. Try again later.");
            };
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;