// ********** outstanding *****************
// need also the students belong to this campus (skip, wait till after stuents is hooked up)
// when submit edit, the edited campus info on SingleCampus component does not update will refresh

/*
when mount through `/campus/${campusId}`
  - have access the the information of the particilar campus in url
  - render the view of the campus

  - have access to deleteCampusThunk
  - when click on delete, will dispatch delete action

  - have access to updateCampusThunk
  - when click on edit, will send async call to update the campus and change the url to /campus/:campusId/edit
  - the url will render the NewCampusEntry component in the root view and pass the campus (on the url)info to the component's inital local state
*/


import React, { Component } from 'react';
import {connect} from 'react-redux'
import {deleteCampusThunk} from '../reducers/campuses';
import {NavLink, Route} from 'react-router-dom'
import NewCampusEntry from './NewCampusEntry';

class SingleCampus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  // delete the campus
  // redirect to the Campuses List

  render() {
    const campus = this.props.campus;
    const campusId = campus.id;
    console.log('this.props', this.props)


    return (
      <div id="singleCampusContainer">

          <h1>{campus.name}</h1>
          <img id="campusImg" className="center" src={ campus.imageUrl } />
          <h4 className="center description" ><span>{campus.description}</span></h4>

        <div>
          {
            campus.students &&
             ( <ul className="center">
              {
                campus.students.map(student=>{
                  return (
                    <NavLink to={`/students/academy/${student.id}`} key={student.id}>
                    <li >{student.name}</li>
                    </NavLink>
                  )
                })
              }
            </ul>)
            }

        </div >
        <div className="center">
          <NavLink to ={`/campuses/${campusId}/edit`} activeClassName="active">
          <button id="editCampus" type="submit" className="btn btn-success">Edit</button>
          </NavLink>
         <button id="deleteCampus" onClick={this.props.clickHandler} className="btn btn-danger">Delete</button>
        </div>
    </div>
     )
  }
}


// need access to retrieve info of the particular campus in url
const mapStateToProps= function (state, ownProps) {
  const campusId = +ownProps.match.params.campusId;
  return {
    campus: state.campuses.filter(campus=>campus.id ===campusId )[0] || {},
  }
}

// need access to call updateCampus and deleteCampus thunks
// delete thunks will aslo change the url to the all campuses
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    clickHandler(evt){
      evt.preventDefault();
      const campusId = +ownProps.match.params.campusId
      console.log('campusId ', campusId )
      dispatch(deleteCampusThunk(campusId, ownProps.history))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
