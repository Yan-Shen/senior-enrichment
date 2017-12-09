
// Students

// have profile info including:
// firstName - not empty or null
// lastName - not empty or null
// email - not empty or null; valid email
// gpa - decimal between 0.0 and 4.0
// must have a virtual 'name' field which is the concatenation of firstName and lastName
// must be assigned to a campus

const db = require('../index');
const Sequlize = require('sequelize');

const Student = db.define('student', {
  firstName: {
    type: Sequlize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequlize.STRING,
    allowNull: false
  },
  email:{
    type: Sequlize.STRING,
    allowNull: false,
    validator:{
      isEmail: true
    }
  },
  gpa:{
    type: Sequlize.FLOAT,
    validate:{
      min: 0.0,
      max: 4.0
    }
  }
},{
  getterMethods: {
    name: function(){
      return `${this.firstName} ${this.lastName}`
    }
  }
})

module.exports = Student;
