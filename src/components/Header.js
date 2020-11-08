import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between mb-5">
      <div className="container">
        <h1>
          <Link className="nav-link text-light" to={'/'}>
            CRUD - React, Redux, Rest API & Axios
          </Link>
        </h1>
      </div>

      <Link
        to="/productos/nuevo"
        className="btn btn-danger nuevo-post d-block d-md-inline-block"
      >
        Agregar Producto &#43;
      </Link>
    </nav>
  );
};

export default Header;
