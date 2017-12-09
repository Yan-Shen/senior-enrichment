

// Campuses

// have profile info including:
// name - not empty or null
// imageUrl - default value
// description - extremely large text
// can have many students assigned (may have none)

const db = require('../index');
const Sequlize = require('sequelize');

const Campus = db.define('campus',{
  name:{
    type: Sequlize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequlize.STRING,
    defaultValue:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZrAcFfPajVMwob60xIAzTF323Yap55xHtAtl-llVaqKsZfiJL2Q'
  },
  description: {
    type: Sequlize.TEXT
  }
},{
  defaultScope: {
    include: [{all: true}]
  }
})

module.exports = Campus;
