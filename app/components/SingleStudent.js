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
import {deleteStudentThunk} from '../reducers';
import {NavLink, Route} from 'react-router-dom'
import NewCampusEntry from './NewCampusEntry';

class SingleCampus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const student = this.props.student;
    const campus = this.props.campuses.find(campus=>campus.id=== +student.campusId)
    const studentId = student.id;
    const student_campus = {
      color: "grey"
    }
    console.log('this.props', this.props)

    return (
      <div id="singleStudentWrapper">

        <div>
          <h3 className="marginTop">Name: {`${student.firstName} ${student.lastName}`}</h3>
          <h3 className="marginTop">Email: {student.email}</h3>
          <h3 className="marginTop">GPA: {student.gpa}</h3>
        </div>

        { campus &&
                  <div className="marginTop" id="studentCampusWrapper">
                  <NavLink id="campusLink" to={`/campuses/academy/${student.campusId}`} key={student.campusId}>
                  <h3 style={student_campus} className="studentItem" >
                  <i id="student_campus_icon" className="material-icons">account_balance</i>
                   {campus.name}</h3>
                  </NavLink>
                </div>
        }

        <div className="marginTop">
          <NavLink  to ={`/students/${student.id}/edit`} activeClassName="active">
          <button id="btnEdit" type="submit" className="btn btn-success">Edit</button>
          </NavLink>

          <button id="btnDelete" onClick={this.props.clickHandler} className="btn btn-danger">Delete</button>
        </div>
    </div>
     )
  }
}


// need access to retrieve info of the particular campus in url
const mapStateToProps= function (state, ownProps) {
  const studentId = +ownProps.match.params.studentId;
  return {
    student: state.students.find(student=>student.id ===studentId ) || {},
    campuses: state.campuses || []
  }
}

// need access to call updateCampus and deleteCampus thunks
// delete thunks will aslo change the url to the all campuses
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    clickHandler(evt){
      evt.preventDefault();
      const studentId = +ownProps.match.params.studentId;
      console.log('studentId ', studentId );
      dispatch(deleteStudentThunk(studentId, ownProps.history))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
