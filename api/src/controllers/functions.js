// Dependencies
require("dotenv").config();
const axios = require("axios");
const {Op} = require("sequelize");
// Files
const {Videogame, Genre, Platform} = require("../db");
const {API_KEY} = process.env;

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;


async function getVideogames()
{
    try
    {
        // Hacer una vez para cargar los datos y comentar porque se duplican
        // Primero tengo que agregar los generos a la base de datos
        
        // for(let i = 1; i <= 15; i++)
        // {
        //     (await axios(`${URL}&page=${i}`)).data.results.map(async e => {
        //         // Agrego las descripciones
                
        //         const descriptionSearch = await getById(e.id);
        //         const genres = e.genres.map(g => g.name);
        //         // Cargar a la base de datos
                
        //         const newVideogame = await Videogame.create({
        //             name: e.name,
        //             description: descriptionSearch ? descriptionSearch : null,
        //             releaseDate: e.released ? e.released : null,
        //             rating: e.rating ? e.rating : null,
        //             platforms: e.platforms ? e.platforms.map(p => p.platform.name) : null,
        //             image: e.background_image ? e.background_image : null,
        //             createdInDb: false,
        //         });
        //         // Vinculo los generos ingresados con los de la base de datos
                
        //         genres.forEach(async e => {
        //             const genresDb = await Genre.findAll({
        //                 where:
        //                 {
        //                     name: e,
        //                 },
        //             });
        //             newVideogame.addGenres(genresDb);
        //         });
        //     });
        // };
        
        // -------------------------------------------------------------------------------------------------
        
        const videogames = await Videogame.findAll({
            include:
            {
                model: Genre,
                attributes: ["name"],
                through:
                {
                    attributes: [],
                },
            },
        });
        const sortedVideogames = videogames.sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });
        
        return sortedVideogames;
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getVideogamesByName(name)
{
    try
    {
        const foundVideogame = await Videogame.findAll({
            where:
            {
                name:
                {
                    [Op.iLike] : `%${name}%`,
                },
            },
        });
        
        return foundVideogame;
    }
    catch(error)
    {
        console.log(error);
    };
};


// Para guardar las descripciones
async function getById(id)
{
    const idURL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    
    try
    {
        // Comento para no consumir la api
        
        // const data = (await axios(idURL)).data;
        // const apiSearch = data.description_raw;
        
        // return apiSearch;
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getGenres()
{
    const genreURL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
    
    try
    {
        // Comento para no consumir la api
        
        // const apiGenres = (await axios(genreURL)).data.results.map(e => e.name);
        
        // // Cargar a la base de datos
        // apiGenres.forEach(async e => {
        //     await Genre.findOrCreate({where: {name: e}});
        // });
        
        // -------------------------------------------------------------------------------------------------
        
        const genres = await Genre.findAll();
        const sortedGenres = genres.sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });
        
        return sortedGenres.map(e => e.name);
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getPlatforms()
{
    try
    {
        // Comento para no consumir la api
        
        // const apiAllPlatforms = (await axios(URL)).data.results.map(e => e.platforms.map(p => p.platform.name));
        // const allPlatforms = [];
        // const unsortedPlatforms = [];
        
        // // Unificar arrays
        // apiAllPlatforms.forEach(e => e.forEach(p => allPlatforms.push(p)));
        
        // // Eliminar repetidos
        // for (let i = 0; i < allPlatforms.length; i++)
        // {
        //     const platform = allPlatforms[i];
            
        //     if(!unsortedPlatforms.includes(platform))
        //     {
        //         unsortedPlatforms.push(platform);
        //     };
        // };
        
        // // Cargar a la base de datos
        // unsortedPlatforms.forEach(async e => {
        //     await Platform.findOrCreate({where: {name: e}});
        // });
        
        // -------------------------------------------------------------------------------------------------
        
        const platforms = await Platform.findAll();
        
        const sortedPlatforms = platforms.sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });
        
        return sortedPlatforms.map(e => e.name);
    }
    catch(error)
    {
        console.log(error);
    };
};


module.exports =
{
    getVideogames,
    getVideogamesByName,
    getGenres,
    getPlatforms,
};