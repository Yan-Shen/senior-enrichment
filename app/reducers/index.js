// import children reducers
// combine reducers
// export combined reducer to the store

import { combineReducers } from 'redux'
import campuses from './campuses';
import students from './students'

const rootReducer = combineReducers({
  campuses,
  students
})

export default rootReducer;

export * from './campuses';
export * from './students';
