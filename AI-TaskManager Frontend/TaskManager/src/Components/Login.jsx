import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../CSS/LoginSignup.css';
import { login } from './Controller/UserController';
import { useAuth } from '../ContextAPI/AuthContext';

const Login=()=>{

    const navigate=useNavigate();
    const [ShowError,setShowError]=useState(false);
    const [Error,setError]=useState("");

      const { isLogin,setIsLogin,logoutUser,setUser }=useAuth();

      const emailRef=useRef(null);
      const passRef=useRef(null);
      const loginRef=useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      emailRef.current &&
      passRef.current &&
      loginRef.current &&
      !emailRef.current.contains(e.target) &&
      !passRef.current.contains(e.target) &&
      !loginRef.current.contains(e.target)
    ) {
      setShowError(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


    const handleLogin=(e)=>{
        e.preventDefault();

     const email=emailRef.current.value.trim();
     const password=passRef.current.value.trim();

        if(!email || !password){
           setError("* All fields are required !")
           setShowError(true);
            return false;
        }
        setShowError(false);

        const payload={
            email,
            password
        }

        login(payload).then((response)=>{
                    setIsLogin(true);
                    setShowError(false);
            alert("login Success");
             setUser(response.data);
            loginSuccess(response.data);
        }).catch((err)=>{

            setError("Invalid Username or Password.");
            setShowError(true);
        }
        
        );

    }
    const loginSuccess=(user)=>{
       
        localStorage.setItem("user",JSON.stringify(user));
        console.log(user);
       navigate("/home",{state:user});
    }

    return (
<>
  <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <header className="Header">Login</header>
                    <form  className="form_form">
                        <div className="field input-field">
                            <input ref={emailRef} type="email" id='email' placeholder="Email" className="input" required/>
                        </div>

                        <div className="field input-field">
                            <input ref={passRef} type="password" id='password' placeholder="Password" className="password" required/>
                            <i className='bx bx-hide eye-icon'></i>
                        </div>
                                 {/* ✅ Error span */}
            {ShowError && (
              <span id="error" className="text-red-600 text-sm mt-2 block">
                {Error}
              </span>
            )}

                        <div className="form-link">
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <div className="field button-field">
                            <button ref={loginRef} onClick={handleLogin}>Login</button>
                        </div>
                    </form>

                    <div className="form-link">
                        <span>Don't have an account? <Link to='/signup' className="link signup-link">Signup</Link></span>
                    </div>
                </div>

                <div className="line"></div>

                <div className="media-options">
                    <a href="#" className="field facebook">
                        <i className='bx bxl-facebook facebook-icon'></i>
                        <span>Login with Facebook</span>
                    </a>
                </div>

                <div className="media-options">
                    <a href="#" className="field google">
                        <img src="images/google.png" alt="" className="google-img"/>
                        <span>Login with Google</span>
                    </a>
                </div>

            </div>
  </section>




</>
    )
}
export default Login;