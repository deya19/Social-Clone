import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Helmet } from "react-helmet-async";

const Login = () => {

  const [inputs,setInputs] = useState({
    username:"",
    password:"",
  })


  const [error,setError] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  };


  const { login,currentUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
     e.preventDefault();
    try {
    await login(inputs);
    currentUser && navigate("/")
    } catch (error) {
      setError(error.response.data)
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="Login" content="Login"/>
      </Helmet>
      <div className="login">
        <div className="card">
          <div className="left">
            <h1>Hello World.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
              alias totam numquam ipsa exercitationem dignissimos, error nam,
              consequatur.
            </p>
            <span>Don't you have an account?</span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form>
              <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
              <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
              {error && 
               <Stack sx={{ width: '100%' }} spacing={2}>
               <Alert severity="error">{error} — check it out!</Alert>
               </Stack>
              }
              <button onClick={handleLogin}>Login</button>
            </form>
            <span className="small">Don't you have an account?</span>
            <Link to="/register">
              <button className="smallBtn">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
