// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getGenres} = require("../controllers/functions");


router.get("/genres", async (req, res) => {
    const genres = await getGenres();
    
    try
    {
        if(genres.length)
        {
            res.send(genres);
        }
        else
        {
            res.status(404).send("Sorry! We can not load the genres. Try again later.");
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;