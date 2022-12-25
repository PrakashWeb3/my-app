import React,{useState,useEffect} from "react";
import {  Outlet, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import States from '../Data/states.json';
export const LayOut = () => {
  let isAdmin,LoginUser,LoggedIn;
if(localStorage.getItem('token')){
  LoggedIn=true;
  let localToken = localStorage.getItem('token'); 
   // check Admin or Not
   isAdmin = JSON.parse(atob(localToken.split('.')[1])).role === 'admin';
  if(!isAdmin){
   LoginUser = JSON.parse(atob(localToken.split('.')[1])).username;
  }
}
const renderAuthButton = () => {
  if (LoggedIn) {
    if(isAdmin)  return <span>User: Admin <a href="/logout">Logout</a></span>;
    return <span>User:  {LoginUser} <a href="/logout">Logout</a></span>;
  } else {
    return <span><a href="/register">Register</a> &nbsp; <a href="/">Login</a></span>;
  }
}


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
           {/* <li className="p-2 nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="p-2 nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li> */}
            { LoggedIn && 
            <>
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
            </>  
          }
          </ul>
        </div>        
        <span className="navbar-text">
          {
          renderAuthButton()
          }       
        </span>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

export const Home = (props) => {
  const [errorMsg,SeterrorMsg] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  //const onSubmit = data => console.log(data);
  //console.log(errors);
  //console.log(watch());
  if(localStorage.getItem("token")){
    window.location.href='/dashboard';
  }
  const onSubmit = async (data) => {
    //const formData = new FormData();
    //formData.append("file", data.file[0]);
    console.log(data);
    let res ;
    try{
      res = await fetch("http://127.0.0.1:5000/admin", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      }).then((res) => res.json());

      if(res.SuccessCode == 1000) {
        //set JWT token to local
        localStorage.setItem("token", res.webtoken);
        //redirect user to home page
        window.location.href = '/dashboard'
        SeterrorMsg('Redirecting...');
      }
      
            
    }catch(e){
      SeterrorMsg('Error in Connectivity');
      return
    }finally{

    }

    //alert(JSON.stringify(`${res.message}, status: ${res.status}`));
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
          <span className="form-text text-danger">{errorMsg}</span>
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
  

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  //console.log(errors);
  const [data, setData] = useState("");
  const [city,setcityList] = useState([]);

  const loadOptions = () => {
    let StateList = [...new Set(States.map(state => state.state))];
    //console.log(StateList);
    const options = StateList.map((state,i)=>{
       return <option   key={i} value={state}>{state}</option>
      })
    
    return options;
  }
  useEffect(() => {   
    //console.log(city);
}, [city]);
  const loadOptionsCity = (Sltstate) => {
    
      let CityList = [...new Set(States.filter(state => state.state == Sltstate))];
        let CityRow = CityList.map(state => state.name)
      //  console.log(CityRow);
      setcityList(CityRow);

  }
  const loadCity = (e)=>{
    //console.log(e.target.value);
    loadOptionsCity(e.target.value)

  }
  return (
    <div className="form-register w-100 m-auto">
      <h1 className="h3 mb-3 fw-normal">Registration Form</h1>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Name *
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputName" {...register("Name", {required: true, maxLength: 30})} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputMobile" className="col-sm-2 col-form-label">
            Mobile *
          </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="inputMobile" {...register("Mobile", {required: true, maxLength: 10})}/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email *
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail" {...register("Email", {required: true,pattern: /^\S+@\S+$/i})} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password *
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              {...register("Password", {required: true})}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputState" className="col-sm-2 col-form-label">
            State *
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="inputState" {...register("State", {required: true})} onChange={(loadCity)} >
              <option value="">Choose the State</option>
              {
                loadOptions()
              }
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputCity" className="col-sm-2 col-form-label">
            City *
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="inputCity" {...register("City", {required: true})} >
              <option value="">Choose the City</option>
              { 
                city.map((city,i)=>{
                  return <option   key={i} value={city}>{city}</option>
                 })
                
              }              
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputDesc" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <textarea
              type="text"
              className="form-control"
              id="inputDesc"
              row="5"
              col="6"
              {...register("Description", {required: true, maxLength: 50})}
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputFile" className="col-sm-2 col-form-label" >
            Image *
          </label>
          <div className="col-sm-10">
            <input type="file" className="form-control" id="inputFile" {...register("Profile", {required: true})} />
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
export const Logout = () => {
  localStorage.clear();
  window.location.href = '/';
  return
};
export const Dashboard = () => {
  const [loadUsers, setUsers] = useState([]);
  useEffect(()=>{
    async function LoadData () {
          const datas = await fetch("http://127.0.0.1:5000/admin/dashboard", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token':localStorage.getItem('token')
          },
      }).then((res) => res.json());

      if(datas.errorCode === 4004 || datas.errorCode===4003){
        localStorage.setItem('token','');
        alert('Authentication Error! Login Again')
        window.location.href='/';
        return
      }      
      else{
        setUsers(datas.data)
      }
  console.log(datas);
    }
  LoadData();
 

  },[])

  const getHeadings = () => {
        return ["Profile","Name", "Email", "Mobile","State","City","Description"]
    }
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="container">
      <Table theadData={getHeadings()} tbodyData={loadUsers}/>
    </div>
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

const Table = ({ theadData, tbodyData }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {theadData.map(heading => {
            return <th key={heading}>{heading}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row, index) => {
          return <tr key={index}>
            {theadData.map((key, index) => {
              return <td key={row[key]}>{row[key]}</td>
            })}
          </tr>;
        })}
      </tbody>
    </table>
  );
}
