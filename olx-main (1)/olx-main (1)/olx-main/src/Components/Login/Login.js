import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Firebase } from "../../firebase/config";
import Logo from "../../olx-logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  const history = useHistory()
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push("/")
    }).catch((error)=>{
      // alert(error.message)
      setLoading(false);
        if (error.code === "auth/user-not-found") {
          alert("User does not exist. Please sign up.");
        } else if (error.code === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
        } else if (error.code === "auth/email-already-in-use") {
          alert("User already exists. Please login or reset password.");
        } else {
          alert(error.message);
        }
    })

  };
  return (<>
    {loading && <RoundLoading/> }
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo} alt=""></img> */}
        <img src="../../../Images/DealDEX.png" alt="Website Logo" className="two"></img>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            placeholder="gaurav@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div> 
    </div>
    </>
  );
}

export default Login;
