import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export const LayOut = () => {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
      <nav className="navbar navbar-dark bg-dark">
      
        <div className=" d-flex">
        <a className="navbar-brand" href="#">
      <img src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg" 
      alt="" width="40" height="30" className="d-inline-block mt-2" />
      
    </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
            <li className="p-2 nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="p-2 nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="p-2 nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="p-2 nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <span className="navbar-text">Login User</span>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

export const Home = () => {
  return (
    <div className="form-signin w-100 m-auto text-center">
      <form>
    
    <h1 className="h3 mb-3 fw-normal">Sign In</h1>
    <div className="form-floating m-2">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating m-2">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
      <label for="floatingPassword">Password</label>
    </div>
    <div className="m-2">
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </div>
    
    
  </form>
    </div>
  );
};

export const Registration = () =>{
    return (
        <div className="form-register w-100 m-auto">
            <h1 className="h3 mb-3 fw-normal">Registration Form</h1>
        <form>
        <div className="row mb-3">
    <label for="inputName" className="col-sm-2 col-form-label">Name *</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputName" />
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputMobile" className="col-sm-2 col-form-label">Mobile *</label>
    <div className="col-sm-10">
      <input type="number" className="form-control" id="inputMobile" />
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputEmail" className="col-sm-2 col-form-label">Email *</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" id="inputEmail" />
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputPassword" className="col-sm-2 col-form-label">Password *</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" />
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputState" className="col-sm-2 col-form-label">State *</label>
    <div className="col-sm-10">
      <select className="form-control" id="inputState" >
        <option value=""></option>
        </select>
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputCity" className="col-sm-2 col-form-label">City *</label>
    <div className="col-sm-10">
      <select className="form-control" id="inputCity" >
        <option value=""></option>
        </select>
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputDesc" className="col-sm-2 col-form-label">Description</label>
    <div className="col-sm-10">
    <textarea type="text" className="form-control" id="inputDesc" row="5" col="6" >
        </textarea>
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputFile" className="col-sm-2 col-form-label">Image *</label>
    <div className="col-sm-10">
    <input type="file" className="form-control" id="inputFile" />
    </div>
  </div>

  <div className="row mb-3">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
  
</form>
</div>
    );
}

export const About = () => {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export const NotFound = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};
