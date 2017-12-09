// ********** Outstanding ************
// onSubmit to take the view to the SingleCampus component of the newly created campus

/*
when mount, throgh `campuses/post` or `campuses/:campusId/edit`
  - it has access to app state through mapStateToProps
  - depends on whether it is for submitting new campus or for editing existing campus (ownProps.match.params.campusId?)
  - the props.campus will be set as empty campus or populated with existing campus info

  - it has access to addNewCampus and updateCampus Thunks
  - when click on submit, depends on whether it is new or edit, it will call the Thunks accordingly

*/
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addCampusThunk, updateCampusThunk} from '../reducers/campuses';

class NewCampusEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      description: ''
     }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    console.log('state', this.state)
    if(this.props.campus) {
      this.setState({
        name: this.props.campus.name,
        imageUrl: this.props.campus.imageUrl,
        description: this.props.campus.description
      })
    }

  }

  handleNameChange (evt) {
    this.setState({name: evt.target.value })
  }

  handleImageChange(evt){
    this.setState({imageUrl: evt.target.value})
  }

  handleDescriptionChange(evt){
    this.setState({description: evt.target.value})
  }

  handleSubmit(evt){
    evt.preventDefault();
    const addSubmit = this.props.addSubmit;
    const updateSubmit = this.props.updateSubmit;
    const updateState = this.state;
    updateState.id = this.props.match.params.campusId;
    this.props.match.params.campusId ? updateSubmit(updateState) : addSubmit(this.state);
    this.setState({
      name: '',
      imageUrl: '',
      description: ''
     })
  }

  // if this.props.match.params.campusId exist (edit mode), we need access to the campus info
  // mapStateToProps will set local state to the campus existing info

  // componentDidMount {
  //   // console.log('this.props is', this.props)
  //   // this.setState({
  //   //   name: this.props.campus.name,
  //   //   imageUrl: this.props.campus.imageUrl,
  //   //   description: this.props.campus.description
  //   // })
  // }

  render() {

    const campusId = this.props.match.params.campusId

    return (
      <form onSubmit={this.handleSubmit}>

          <div className="form-group">
          <label>Campus Name</label>
            <input
              id = "nameInput"
              className="form-control CampusInput"
              onChange={this.handleNameChange}
              value={this.state.name}
            />
          </div>


          <div className="form-group">
          <label>Campus ImageUrl</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleImageChange}
              value={this.state.imageUrl}
            />
          </div>


          <div className="form-group">
          <label>Description</label>
            <textarea
              id="descInput"
              className="form-control"
              onChange={this.handleDescriptionChange}
              value={this.state.description}
            />
          </div>


        <div className="form-group">
          <div className="btnContainer">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
        </div>
      </div>

      </form>
    )
  }

}

  // if this.props.match.params.campusId exist (edit mode), we need access to the campus info
  // mapStateToProps will set local state to the campus existing info

const mapStateToProps = function(state, ownProps){
  const initialState = {
    name: '',
    imageUrl: '',
    description: ''
   }
  const campusId = +ownProps.match.params.campusId
  console.log('campusid', campusId)
  return {
    campus: state.campuses.filter(campus => campus.id === campusId)[0] ||initialState
  }
}

// need be able to dispatch action to create the new campus
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    addSubmit(newCampus){
      dispatch(addCampusThunk(newCampus, ownProps.history))
    },
    updateSubmit(updatedCampus){
      dispatch(updateCampusThunk(ownProps.match.params.campusId, updatedCampus,ownProps.history))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry);
