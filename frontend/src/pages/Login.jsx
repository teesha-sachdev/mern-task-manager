document.title = "Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FaEnvelope, FaLock, FaTasks } from "react-icons/fa";
import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const login = async(e)=>{

        e.preventDefault();

        try{

            const res = await API.post("/auth/login",{
                email,
                password
            });

            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));

            navigate("/dashboard");

        }
        catch(error){
           console.log(error);
  console.log(error.response);
            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-logo">
                    <FaTasks />
                </div>

                <h1>TaskFlow</h1>

                <p className="subtitle">
                    Welcome back! Login to manage your tasks.
                </p>


                <form onSubmit={login}>


                    <div className="input-box">

                        <FaEnvelope />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />

                    </div>



                    <div className="input-box">

                        <FaLock />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />

                    </div>



                    <button className="auth-btn">
                        Login
                    </button>


                </form>


                <p className="switch">

                    Don't have an account?

                    <span onClick={()=>navigate("/register")}>
                        Register
                    </span>

                </p>


            </div>

        </div>

    );

}


export default Login;

