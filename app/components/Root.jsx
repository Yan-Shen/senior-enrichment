/*
when mount (base route or url `/campuses `,
  - dispatch Thunks to retriev all campuses and students from database
  - the reducer will update the app state for all campuses and all students

*/
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import store from '../store'
import Sidebar from './Sidebar';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import { getCampusesThunk, getStudentsThunk } from '../reducers'
import NewCampusEntry from './NewCampusEntry';
import NewStudentEntry from './NewStudentEntry';


export default class Root extends Component {

  componentDidMount() {
    const campusesThunk = getCampusesThunk();
    const studentThunk = getStudentsThunk();
    store.dispatch(campusesThunk);
    store.dispatch(studentThunk)
  }

  render() {
    const containerStyle = {
      display: "flex",
    }

    const sideSection = {
      flex: "0 0 10%",
      paddingTop: "90px"
    }

    const mainSection = {
      display: "flex",
      flexDirection: "column",
      alignItem: "center",
      flex: "0 0 90%",
      color: "grey",
      // backgroundColor: "rgb(29, 28, 28)"
      backgroundColor: "white"
    }

    return (
      <Router>
        <div style={containerStyle} id="main">

          <div style={sideSection}>
            <Sidebar />
          </div>

          <div style={mainSection}>
          <h1 id="title">Academy of Javascript Campuses</h1>
          {/* this is front end route, only need to match link, not backend */}
            <Switch>
              <div id="content">
                <Route exact path="/" component = {Campuses} />
                <Route exact path="/campuses" component = {Campuses} />
                <Route exact path="/campuses/post" component = {NewCampusEntry} />
                <Route exact path='/campuses/:campusId/edit' component= {NewCampusEntry}/>
                <Route exact path="/students" component = {Students} />
                <Route exact path="/students/post" component = {NewStudentEntry} />
                <Route exact path="/students/:studentId/edit" component = {NewStudentEntry} />
                <Route exact path='/campuses/academy/:campusId' component = {SingleCampus}/>
                <Route exact path='/students/academy/:studentId' component = {SingleStudent}/>

              </div>
            </Switch>
          </div>


        </div>

        </Router>
    );
  }
}

// imageURL:
// http://clipart.coolclips.com/480/vectors/tf05031/CoolClips_arch0200.png

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrGtM604VKe3RyIHgC2p2wTp1rCBAsw6B_l7HG4sLcjjLQr-T

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJBwIxTfHEOaks5w-ikoaBarOaXazCNdykcooQuYopuHOQ-g8




// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92cLcOA9sWUBD0cNC_kPJk6_3cPQLZB7iZNBmItS1xD7eKuamyw

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sibja61nqdPGmlNaQgbB9Fk3ZrI1YdV-zuhlQ5XWAzrrt1AT

