import React from "react";
import {  Outlet, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const LayOut = () => {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
      <nav className="navbar navbar-dark bg-dark">
        <div className=" d-flex">
          <a className="navbar-brand" href="/">
            <img
              src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
              alt=""
              width="40"
              height="30"
              className="d-inline-block mt-2"
            />
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

export const Home = (props) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  //const onSubmit = data => console.log(data);
  //console.log(errors);
  //console.log(watch());

  const onSubmit = async (data) => {
    //const formData = new FormData();
    //formData.append("file", data.file[0]);
    console.log(data);
    const res = await fetch("http://127.0.0.1:5000/admin", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
};

  return (
    <div className="form-signin w-100 m-auto text-center">
      <form id="signin" action={props.action} method={props.method} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Sign In</h1>
        <div className="form-floating m-2">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com" {...register("email", {required: true, maxLength: 80})}
          />
           {errors.email && <span>This field is required</span>}
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating m-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            {...register("password", {required: true, maxLength: 8})}
          />
           {errors.password && <span>This field is required</span>}
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="m-2">
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
Home.defaultProps = {
  action: 'http://127.0.0.1:5000/admin',
  method: 'post'
};
export const Registration = () => {
  return (
    <div className="form-register w-100 m-auto">
      <h1 className="h3 mb-3 fw-normal">Registration Form</h1>
      <form>
        <div className="row mb-3">
          <label for="inputName" className="col-sm-2 col-form-label">
            Name *
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputName" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputMobile" className="col-sm-2 col-form-label">
            Mobile *
          </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="inputMobile" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputEmail" className="col-sm-2 col-form-label">
            Email *
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password *
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputState" className="col-sm-2 col-form-label">
            State *
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="inputState">
              <option value="">Choose the State</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputCity" className="col-sm-2 col-form-label">
            City *
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="inputCity">
              <option value="">Choose the City</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputDesc" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <textarea
              type="text"
              className="form-control"
              id="inputDesc"
              row="5"
              col="6"
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputFile" className="col-sm-2 col-form-label">
            Image *
          </label>
          <div className="col-sm-10">
            <input type="file" className="form-control" id="inputFile" />
          </div>
        </div>

        <div className="row mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

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
