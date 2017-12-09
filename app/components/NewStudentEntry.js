/*
- a stateful component to hold local state for input
  - whne type in the value will reset local state which in term set the value of the input
  - when submit will call the thunk to update the state
- access to state addStudentThunk

*/

import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addStudentThunk, updateStudentThunk } from '../reducers';

class NewStudentEntry  extends Component {

  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        gpa:'',
        campus: '',
        warning: false
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleGpa = this.handleGpa.bind(this);
    this.handleCampus = this.handleCampus.bind(this);
  }

  componentDidMount(){
    console.log('props', this.props)
    if(this.props.campuses.length) {
      const campus = this.props.campuses.find(campus=>{
        return campus.id === +this.props.student.campusId;
      })
      console.log('campus', campus)
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
        gpa:this.props.student.gpa,
        campus: campus.name || '',
      })
    }
  }

  handleFirstName(evt){
    this.setState({
      firstName: evt.target.value,
    })
  }

  handleLastName(evt){
    this.setState({
      lastName: evt.target.value,
    })
  }

  handleEmail(evt){
    this.setState({
      email: evt.target.value,
    })
  }

  handleGpa(evt){
    this.setState({
      gpa: evt.target.value,
    })
  }

  handleCampus(evt){
    this.setState({
      campus: evt.target.value,
    })
  }

  ///////////////////////////////////////////////////////////
  handleSubmit(evt){
    evt.preventDefault();
    const addSubmit = this.props.addSubmit;
    const updateSubmit = this.props.updateSubmit;

    console.log('this.props', this.props)
    console.log('this.state', this.state)

    const campus = this.props.campuses.find(campus => campus.name === this.state.campus)
    console.log('campus', campus)
    if (campus) {

      const newStudent = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        gpa: this.state.gpa,
        campusId: campus.id
      }
      this.state.firstName ? updateSubmit(newStudent) : addSubmit(newStudent);
    } else {
      this.setState({warning: true})
      return
    }
  }

  render() {
    return (
      this.state.warning? <h1>Campus Does Not Exist</h1> :
        (
          <div>
            <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>First Name </label>
              <input type="text"
              id="studentName"
              className="form-control"
              value = {this.state.firstName}
              onChange={this.handleFirstName}/>
            </div>

            <div className="form-group">
              <label>Last Name </label>
              <input type="text"
              className="form-control"
              value = {this.state.lastName}
              onChange={this.handleLastName}/>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="text"
              className="form-control"
              value = {this.state.email}
              onChange={this.handleEmail}/>
            </div>

            <div className="form-group">
              <label>gpa</label>
              <input type="text"
              className="form-control"
              value = {this.state.gpa}
              onChange={this.handleGpa}/>
            </div>

            <div className="form-group">
              <label>campus</label>
              <input type="text"
              className="form-control"
              value = {this.state.campus}
              onChange={this.handleCampus}/>
            </div>

            <div className="btnContainer">
              <button type="submit" className="btn btn-success">
              Submit
              </button>
            </div>

       </form>
       </div>

        )

     )
  }
}

// need access to campus info to find out campusId based on campus name

const mapStateToProps = (state, ownProps)=>{
  const studentId = +ownProps.match.params.studentId;
  console.log('studentID', studentId)
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    gpa:'',
    campus: '',
  }

  return {
    campuses: state.campuses,
    student: state.students.find(student=>student.id === studentId)|| initialState
  }
}

const mapDispathToProps = (dispatch, ownProps) => {
  return {
    addSubmit(newStudent){
      dispatch(addStudentThunk(newStudent, ownProps.history))
    },
    updateSubmit(updatedStudent){
      dispatch(updateStudentThunk(ownProps.match.params.studentId, ownProps.history,updatedStudent))
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(NewStudentEntry);
