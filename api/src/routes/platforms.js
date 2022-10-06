// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getPlatforms} = require("../controllers/functions");


router.get("/platforms", async (req, res) => {
    const platforms = await getPlatforms();
    
    try
    {
        if(platforms.length)
        {
            res.send(platforms);
        }
        else
        {
            res.status(404).send("Sorry! We can not load the platforms. Try again later.");
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;