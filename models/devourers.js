module.exports = function(sequelize, DataTypes) {
  var devourers = sequelize.define("devourers", {
    // Giving the model a name of type STRING
    devourer_name: DataTypes.STRING,
    burgerID: DataTypes.INTEGER
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      classMethods: {
        associate: function(models) {
          devourers.belongsTo(models.burgers, {
          });
        }
      }
    }
  );
  return devourers;
};
