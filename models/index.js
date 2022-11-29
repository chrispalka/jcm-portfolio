'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  db,
  getIsAdmin: (email) => db.User.findOne({
    where: { email }
  }).then((response) => {
    if (response.admin) {
      return response
    }
  })
    .catch((err) => console.log(err)),
  getUserName: (email) => db.User.findOne({
    where: { email },
  }).then((response) => (response === null ? false : response))
    .catch((err) => console.log(err)),
  findRegistrationByToken: (registrationToken) => db.Registration.findOne({
    where: { registrationToken },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  addUser: (id, email, password) => db.User.create({
    id, email, password,
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateForgotPassword: (id, resetpasswordtoken, resetpasswordexpires) => db.User.update({
    resetpasswordtoken, resetpasswordexpires,
  },
    {
      where: {
        id,
      },
    }).then((response) => response)
    .catch((err) => console.log(err)),
  updateUserPassword: (email, password) => db.User.update({
    password,
  },
    {
      where: {
        email,
      },
    }).then((response) => response)
    .catch((err) => console.log(err))
};


// monitorCleanup: () => db.Monitor.findAll({ raw: true }, {
// }).then((response) => {
//   response.forEach((monitor) => {
//     if (Date.now() - monitor.createdAt > 2592000000) {
//       db.Monitor.destroy({
//         where: {
//           id: monitor.id
//         }
//       })
//     }
//   })
// })
//   .catch((err) => console.log(err)),