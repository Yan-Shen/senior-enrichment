// this wont work yet, student store/reducer is not yet set up

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'

const studentList = {
  font: "Oleo Script",
  textDecoration: "none"
}

class Students extends Component {

   render() {

    const students = this.props.students;
    console.log('students', students);


    // campus=> return {} or ()
    return (
      <div>
        <div id="listContainer" className="list-group">
        <ul>
        {
          students.map(student => {
            return (
                <NavLink key={student.id} style={studentList} to={`/students/academy/${student.id}`}>
                 <li id="studentList" className="list-group-item">
                 <i id="studentIcon" className="material-icons">person</i>
                  { student.name }
                  </li>
                </NavLink>
            );
          })
        }
         </ul>
      </div>
    </div>
  );

  }

}

const mapStateToProps = function(state){
  return {
    students: state.students
  }

}

export default connect(mapStateToProps, null)(Students);
