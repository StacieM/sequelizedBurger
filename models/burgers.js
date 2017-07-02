module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define("burgers", {
    // Giving the Burger model a name of type STRING
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN,
    devourerID:DataTypes.INTEGER
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          burgers.hasOne(models.devourers, {
          });
        }
      }
    }
  );
  return burgers;
};