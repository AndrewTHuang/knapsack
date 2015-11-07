//build tables

var db = require("./database.js");
var Sequelize = require("sequelize");

var ddl = {};

ddl.users = db.define("users", {

  user_name: {
    type: Sequelize.STRING
  },

  password: {
    type: Sequelize.STRING
  },

  about_me: {
    type: Sequelize.STRING
  },

  user_facts: {
    type: Sequelize.STRING
  },

  photo_url: {
    type: Sequelize.STRING
  },

  freezeTableName: true
  //prevents sequelize from adding (s) to end of table
});

// ddl.friendLists = db.define("friendLists", {

//   list: {
//     type: Sequelize.STRING
//   },

//   freezeTableName: true

// });


ddl.collections = db.define("collections", {

  collection: {
    type: Sequelize.STRING
  },

  freezeTableName: true

});

ddl.books = db.define("books", {

  title: {
    type: Sequelize.STRING
  },

  author: {
    type: Sequelize.STRING
  },

  photo_url: {
    type: Sequelize.STRING
  },

  summary: {
    type: Sequelize.TEXT
   },

  freezeTableName: true

});

ddl.ratings = db.define("ratings", {

  stars: {
    type: Sequelize.INTEGER
  },

  review: {
    type: Sequelize.TEXT
  },

  freezeTableName: true

});



///Set Up Relationships
ddl.users.hasMany(ddl.collections, {as: 'collection'});
ddl.users.hasMany(ddl.users, {as: 'user_name'});
ddl.users.hasMany(ddl.ratings, {as: 'stars'});
ddl.books.hasMany(ddl.ratings, {as: 'stars'});
ddl.collections.belongsToMany(ddl.books, {through : 'collections_to_books'});
ddl.books.belongsToMany(ddl.collections, {through : 'collections_to_books'});
ddl.users.belongsToMany(ddl.users, { as: 'friends', through : 'users_to_friends'});


module.exports = ddl;

