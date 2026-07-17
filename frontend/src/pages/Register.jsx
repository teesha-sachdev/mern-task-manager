document.title = "Register";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/axios";
import {FaUser,FaEnvelope,FaLock,FaTasks} from "react-icons/fa";
import "./Auth.css";


function Register(){

const navigate=useNavigate();


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const register=async(e)=>{

e.preventDefault();


try{

await API.post("/auth/register",{

name,
email,
password

});


navigate("/login");


}

catch(error){

alert(
error.response?.data?.message ||
"Registration failed"
);

}


};



return(

<div className="auth-container">


<div className="auth-card">


<div className="auth-logo">
<FaTasks/>
</div>


<h1>Create Account</h1>


<p className="subtitle">
Join TaskFlow and organize your work.
</p>



<form onSubmit={register}>


<div className="input-box">

<FaUser/>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

</div>



<div className="input-box">

<FaEnvelope/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>



<div className="input-box">

<FaLock/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

</div>



<button className="auth-btn">
Create Account
</button>


</form>



<p className="switch">

Already have an account?

<span onClick={()=>navigate("/login")}>
Login
</span>

</p>


</div>


</div>


);

}


export default Register;
  