import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const iconeStyle = {
    fontSize: 60,
    color: "white",
  }

  const container = {
    textAlign: "center",
    margin: "25px auto",

  }
  // use exact with NavLink to avoid duplication of activeclass
  return (
    <sidebar>

      <section>
        <div style={container} className="menu-item active">
          <NavLink exact to="/campuses" activeClassName="active">
          <i style={iconeStyle} className="material-icons">account_balance</i>
          </NavLink>
        </div>
      </section>

      <section>
        <div style={container} className="menu-item active">
          <NavLink exact to="/students" activeClassName="active">
          <i  style={iconeStyle} className="material-icons">person</i>
          </NavLink>
        </div>
    </section>

      <section>
      <div style={container} className="menu-item active">
          <NavLink exact to="/campuses/post" activeClassName="active">
          <i style={iconeStyle} className="material-icons">add_box</i>
          </NavLink>
        </div>
      </section>

    <section>
        <div style={container} className="menu-item active">
          <NavLink exact to="/students/post" activeClassName="active">
          <i  style={iconeStyle} className="material-icons">person_add</i>
          </NavLink>
        </div>
    </section>

    </sidebar>
  );
}

export default Sidebar;
