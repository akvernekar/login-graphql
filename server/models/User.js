'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }
  },
  mobile:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false,
    validate:{
      is:{
        args:"[9]{1}[0-9]{9}",
        msg:"number must start with 9"
      },
      // max:{
      //   args:[10],
      //   msg:"length must have 10 digits"
      // },
      // min:{
      //   args:[10],
      //   msg:"length must have 10 digits"
      // },
      len:{
        args:[10,10],
        msg:"length must have 10 digits"
      },
      isNumeric:true
      },
   },
  password:{
    type:DataTypes.STRING,
    allowNull: false
  },
  role:{
    type:DataTypes.ENUM('admin','user'),
    allowNull:false,
    validation:{
      isIn:{
      args:[['admin','user']],
      msg:"role must be admin or user"
      }
   },
   defaultValue:'user'
  }
}, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};