const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize =>
{
  // defino el modelo
  sequelize.define("Videogame",
  {
    name:
    {
      type: DataTypes.STRING,
    },
    description:
    {
      type: DataTypes.TEXT,
    },
    releaseDate:
    {
      type: DataTypes.STRING,
    },
    rating:
    {
      type: DataTypes.STRING,
    },
    platforms:
    {
      type: DataTypes.STRING,
      set(value)
      {
        this.setDataValue("platforms", value.join(", "));
      }
    },
    image:
    {
      type: DataTypes.TEXT,
    },
    createdInDb:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  });
};