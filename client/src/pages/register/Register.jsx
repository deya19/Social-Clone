import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Helmet } from "react-helmet-async";


const Register = () => {


  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:"",
  })
 
  const navigate = useNavigate();

  const [error,setError] = useState(null);


  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  };

  const handleClick = async (e) =>{
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register",inputs)
      navigate("/login")
    } catch (error) {
      setError(error.response.data)
    }
  }



  return (
   <>
     <Helmet>
        <title>Register</title>
        <meta name="Register" content="Register"/>
      </Helmet>
     <div className="register">
       <div className="card">
         <div className="left">
           <h1>Social Clone.</h1>
           <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
             alias totam numquam ipsa exercitationem dignissimos, error nam,
             consequatur.
           </p>
           <span>Do you have an account?</span>
           <Link to="/login">
           <button>Login</button>
           </Link>
         </div>
         <div className="right">
           <h1>Register</h1>
           <form>
             <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
             <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
             <input type="password" placeholder="Password" name="password" onChange={handleChange} />
             <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
             {error && 
             <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert severity="error">{error} — check it out!</Alert>
             </Stack>
             }
             <button onClick={handleClick}>Register</button>
           </form>
           <span className="small">Do you have an account?</span>
           <Link to="/login">
             <button className="smallBtn">Login</button>
           </Link>
         </div>
       </div>
     </div>
   </>
  );
};

export default Register;
