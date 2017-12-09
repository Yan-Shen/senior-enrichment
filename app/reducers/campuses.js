import axios from 'axios';
import store from '../store'

// * action type
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_CAMPUS = "GET_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS"

// * action creators (to be exported)
export function getCampuses(campuses){
  return {type: GET_CAMPUSES, campuses}
}
export function getCampus(newCampus){
  return {type: GET_CAMPUS, newCampus}
}
export function updateCampus(updatedCampus){
  return {type: UPDATE_CAMPUS, updatedCampus}
}
export function deleteCampus(campus){
  return {type: DELETE_CAMPUS, campus}
}

// * thunk creators (to be exported)
// axios route starts with `/`
export function getCampusesThunk(){
  return function thunk(){
    axios.get('/api/campuses')
      .then(res=>res.data)
      .then(campuses=>{
        store.dispatch(getCampuses(campuses))
      })
  }
}
export function addCampusThunk(newCampus, history){
  return function thunk(dispatch){
    axios.post('/api/campuses/post', newCampus)
    .then(res=>res.data)
    .then(newCampus=>{
      dispatch(getCampus(newCampus))
      history.push('/campuses');
    })
  }
  }

export function updateCampusThunk(campusId, updatedCampus, history){
  return function thunk(){
    axios.put(`/api/campuses/${campusId}/edit`, updatedCampus)
      .then(res=>res.data)
      .then(updatedCampus=>{
        console.log('updatedcampus', updatedCampus)
        store.dispatch(updateCampus(updatedCampus))
        history.push('/campuses');
        window.location.reload();
      })
  }
}

// the server router will send back all campuses after the delete
export function deleteCampusThunk (campusId, history){
  return function thunk(){
    axios.delete(`/api/campuses/${campusId}`)
      .then(res=>res.data)
      .then(allCampuses=>{
        store.dispatch(getCampuses(allCampuses))
        history.push('/campuses')
      })
  }
}

// * Reducer function: default export
// return state.campuses
export default function reducer(state=[], action){
  switch (action.type){

    // get all the campuses from database and update the state
    case GET_CAMPUSES:
      return action.campuses;

    // add the new campus to the existing campuses on the state
    case GET_CAMPUS:
      return [...state, action.newCampus]

    case UPDATE_CAMPUS:
      return state.filter(campus=>{
        return campus.name!==action.updatedCampus.name
      }).concat(action.updatedCampus)

    default:
      return state;
  }
}
