/*
when mounted through `/campuses`
 - have access to all campuses on the state through mapStateToProps
 - loop over the array of campuses to render list of single campus items
 - also set links to SingleCampus
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'

class Campuses extends Component {

  render() {

    const campuses = this.props.campuses;
    // console.log('campuses', campuses);

    const container = {
      width: "100%",
    }

    const campusesContainer = {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      flexDirection: "flex-wrap",
      paddingTop: "125px"
    }

    const campusContainer = {
      display: "flex",
      flex: "0 0 33.3%",
      alignItems: "center",
      paddingLeft: "45px"
    }

    const imageContainer = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textDecoration: "none"
    }

    const img = {
      width: "250px",
      height: "250px",
      borderRadius: "50%",
    }

    const captionContainer = {
      paddingTop: "30px",
      width: "300px",
      textAlign: "center",
    }

    // campus=> return {} or ()
    return (
      <div style={container}>
        <div style={campusesContainer}>
        {
          campuses.map(campus=>(
            <div style={campusContainer} key={ campus.id }>
              <NavLink style={imageContainer} to={`/campuses/academy/${campus.id}`} className="thumbnail" >
                <img style={img} src={ campus.imageUrl } />
                <div style={captionContainer} className="caption">
                  <h3>
                    <span>{ campus.name }</span>
                  </h3>
                </div>
              </NavLink>
            </div>
          ))
        }
        </div>
      </div>
     )

  }

}

const mapStateToProps = function(state){
  return {
    campuses: state.campuses
  }

}

export default connect(mapStateToProps, null)(Campuses);
