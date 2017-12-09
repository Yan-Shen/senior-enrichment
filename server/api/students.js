
const router = require('express').Router();
const {db, Student} = require('../db/models');

module.exports = router;

// route for get all students * tested
router.get('/', (req, res, next)=>{
  Student.findAll()
    .then((students)=>res.json(students))
    .catch(next)
})

// route for get a student  *tested
router.get('/:studentId', (req, res, next)=>{
  Student.findById(req.params.studentId, {include:[{all: true}]})
  .then(student=>res.json(student))
  .catch(next)
})

// route for adding a student
router.post('/post', (req, res, next)=>{
  Student.create(req.body)
    .then(student=>res.json(student))
    .catch(next)
})

// route for update a student info *tested
router.put('/:studentId/edit', (req, res, next)=> {
  Student.update(req.body, {
    where: {
      id: req.params.studentId
    },
    returning: true
  })
  .spread((updatedRowCount, updatedStudent)=>res.json(updatedStudent))
  .catch(next)
})

// route for delete a student *tested
router.delete('/:studentId', (req, res, next)=>{
  Student.destroy({
    where:{
      id: req.params.studentId
    }
  })
  .then(()=>Student.findAll())
  .then(allStudents=>res.json(allStudents))
  .catch(next)
})

/*
{
  "firstName": "New",
  "lastName": "New",
  "email": "New@gmail.com",
  "gpa": 3.0,
  "campusId": 1
 }
 */
