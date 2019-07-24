'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessages'
    }),
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receivedMessages'
    })
  };
  return Contact;
};
