'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    }),
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    })
  };
  return Message;
};
