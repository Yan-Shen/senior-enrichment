// import router
// import db
// configure router
// export router

const router = require('express').Router();
const {db, Campus} = require('../db/models');

module.exports = router;

  // route for get all campuses *tested
  router.get('/', (req, res, next)=>{
    Campus.findAll({include:[{all: true}]})
      .then((campuses)=>res.json(campuses))
      .catch(next)
  })

  // route for get a campus *tested
  router.get('/:campusId', (req, res, next)=>{
    Campus.findById(req.params.campusId, {include:[{all: true}]})
    .then(campus=>res.json(campus))
    .catch(next)
  })

  // route for add a campus * tested
  router.post('/post', (req, res, next)=>{
    Campus.create(req.body)
      .then(campus=>res.json(campus))
      .catch(next)
  })

  // route for update a campus info *tested
  router.put('/:campusId/edit', (req, res, next)=> {
    Campus.update(req.body, {
      where: {
        id: req.params.campusId
      },
      returning: true
    })
    .spread((updatedRowCount, updatedCampus)=>res.json(updatedCampus))
    .catch(next)
  })

  // route for delete a campus *tested
  router.delete('/:campusId', (req, res, next)=>{
    console.log('req.params', req.params)
    Campus.destroy({
      where:{
        id: req.params.campusId
      }
    })
    .then(()=>Campus.findAll())
    .then(allCampuses=>res.json(allCampuses))
    .catch(next)
  })

  // {
  //   "name": "New Campus",
  //   "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJBwIxTfHEOaks5w-ikoaBarOaXazCNdykcooQuYopuHOQ-g8",
  //   "description": "New"
  // }
