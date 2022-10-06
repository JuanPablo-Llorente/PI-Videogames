/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "Mario and Luigi star in their first ever Mushroom Kingdom adventure! Find out why Super Mario Bros. Is instantly recognizable to millions of people across the globe, and what made it the best-selling game in the world for three decades straight. Jump over obstacles, grab coins, kick shells, and throw fireballs through eight action-packed worlds in this iconic NES classic. Only you and the Mario Bros. can rescue Princess Toadstool from the clutches of the evil Bowser. For more than 25 years, the Super Mario series has conquered the charts and won the hearts of fans the world over. Now you can discover - or rediscover - the original game that made Mario a household name. Run and jump with Mario or Luigi through caves and castles, down pipes and across platforms, and face off against Bowser to rescue your beloved Princess Peach. It may be more than a quarter of a century old, but Super Mario Bros. is still as enchanting as ever!",
  genres: ["Action", "Adventure", "Platformer"],
  releaseDate: "09-13-1985",
  rating: 4.6,
  platforms: ["Game Boy Advance", "Game Boy Color", "NES", "Wii U", "Wii", "Nintendo Switch", "SNES", "Nintendo", "3DS"],
  image: "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros_image1600w.jpg",
};

xdescribe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: false })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});

describe("GET videogames/:id", () => {
  it('should reply the GET method /videogames/:id with status code 404 if params is not a valid id', async () => {
    const response = await agent.get('/videogames/GTA ');
    expect(response.statusCode).to.equal(404);
  });
});