import axios from 'axios';
import store from '../store';


// action type
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'

// action creator
export const getStudents = students=>{
  return {type: GET_STUDENTS, students}
}

export const addStudent = student=>{
  return {type: ADD_STUDENT, student}
}

export const deleteStudent = allStudents=>{
  return {type: DELETE_STUDENT, allStudents}
}

export const updateStudent = updatedStudent=>{
  return {type: UPDATE_STUDENT, updatedStudent}
}

/* ----------------- dispatcher --------------------- */
// axios need the full url path to match backend
export const getStudentsThunk = ()=>{
  return (dispatch)=>{
    axios.get('/api/students')
      .then(res=>res.data)
      .then(students=>{
        dispatch(getStudents(students))
      })
  }
}

export const addStudentThunk = (student, history)=>{
  return (dispatch)=>{
    axios.post('/api/students/post', student)
      .then(res=>res.data)
      .then(student=>{
        dispatch(addStudent(student));
        history.push('/students');
      })
  }
}

export function updateStudentThunk(studentId, history, updatedStudent){
  return function thunk(dispatch){
    axios.put(`/api/students/${studentId}/edit`, updatedStudent)
      .then(res=>res.data)
      .then(updatedStudent=>{
        console.log('updatedStudent', updatedStudent)
        dispatch(updateStudent(updatedStudent))
        history.push('/students');
        // window.location.reload();
      })
  }
}

export const deleteStudentThunk = (studentId, history) => {
  return dispatch =>{
    axios.delete(`/api/students/${studentId}`)
      .then(res=>res.data)
      .then(allStudents=>{
        dispatch(deleteStudent(allStudents))
        history.push('/students')
      })
  }
}
/* ----------------- reducer --------------------- */

// tricky updatedStudent is an array
const reducer = (students=[], action)=>{
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...students, action.student];
    case DELETE_STUDENT:
      return action.allStudents;
    case UPDATE_STUDENT:
      return students.filter(student=>{
        return student.id!==action.updatedStudent[0].id
      }).concat(action.updatedStudent)
    default:
      return students;
  }
}

export default reducer;
