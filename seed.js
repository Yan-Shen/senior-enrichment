// import db so that we can use db method sync
// import models so that we can use model method: create
// create student and campus arrays
// sysc database to remove old data
// use array method to loop through the array the create records for each array element

const {db, Student, Campus} = require('./server/db/models')

const studentArray = [
  {
    firstName: 'Asakura',
    lastName: 'Yoshikage',
    email: 'Asakura_Yoshikage@gmail.com',
    gpa: 3.0,
    campusId: 1
  },
  {
    firstName: 'Ayame',
    lastName: 'Kagekatsu',
    email: 'Ayame_Kagekatsu@gmail.com',
    gpa: 3.2,
    campusId: 1
  },
  {
    firstName: 'Baba',
    lastName: 'Nobufusa',
    email: 'Baba_Nobufusa@gmail.com',
    gpa: 3.2,
    campusId: 2
  },
  {
    firstName: 'Bessho',
    lastName: 'Nagaharu',
    email: 'Bessho_Nagaharu@gmail.com',
    gpa: 3.2,
    campusId: 2
  },
  {
    firstName: 'Chosokabe',
    lastName: 'Nobuchika',
    email: 'Chosokabe_Nobuchika@gmail.com',
    gpa: 2.2,
    campusId: 3
  },
  {
    firstName: 'Eugene',
    lastName: 'Collache',
    email: 'Eugene_Collache@gmail.com',
    gpa: 4.0,
    campusId: 3
  },
  {
    firstName: 'Date',
    lastName: 'Masamune',
    email: 'Date_Masamune@gmail.com',
    gpa: 1.0,
    campusId: 1
  },
  {
    firstName: 'Date',
    lastName: 'Shigezane',
    email: 'Date_Shigezane@gmail.com',
    gpa: 2.0,
    campusId: 2
  },
  {
    firstName: 'Eto',
    lastName: 'Shinpei',
    email: 'Eto_Shinpei@gmail.com',
    gpa: 3.0,
    campusId: 3
  }
];

const campusArray = [
  {
    name: 'React Campus',
    imageUrl: 'http://clipart.coolclips.com/480/vectors/tf05031/CoolClips_arch0200.png',
    description: 'President Amy Gutmann’s far-reaching vision for the University builds on the success of the original React Campus, which she launched at her inauguration in 2004. React Campus 2020 outlines President Gutmann’s manifold strategy for making React the most inclusive, innovative, and impactful university in the nation.'
  },
  {
    name: 'Sequelize Campus',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrGtM604VKe3RyIHgC2p2wTp1rCBAsw6B_l7HG4sLcjjLQr-T',
    description: 'The Sequelize Campus was founded to break academic boundaries, unite leading experts in a variety of disciplines and foster their collaboration with students. Today you can live this mission at the College and Graduate School of Arts & Sciences, the largest of the University’s schools. At the College you will learn to be mentally nimble, committed to critical thinking, and observant of the vital connections across disciplines. In short, you will be ready to play your part in furthering the illimitable freedom of the human mind.'
  },
  {
    name: 'Socket.io Campus',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJBwIxTfHEOaks5w-ikoaBarOaXazCNdykcooQuYopuHOQ-g8',
    description: 'The Socket.io Campus is the flagship campus of the state’s higher educational system and a top-ranked public research institution. We are a diverse community of 38,000 students, 9,000 faculty and staff, and 352,000 alumni, all dedicated to the pursuit of Fearless Ideas. Located just outside Washington, D.C., we discover and share new knowledge every day through our renowned research enterprise and programs in academics, the arts and athletics. And we are committed to social entrepreneurship as the nation’s first “Do Good” campus. '
  }
];

db.sync({force:true})
  .then(()=>{
    campusArray.forEach(campus=>Campus.create(campus))
  })
  .then(()=>{
    studentArray.forEach(student=>Student.create(student))
  })
  .catch((err)=>console.log(err))
  // .then(()=>db.close())
