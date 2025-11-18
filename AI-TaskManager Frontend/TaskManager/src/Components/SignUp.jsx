import { useState,useEffect,useRef } from 'react';
import '../CSS/LoginSignup.css';
import { signup,login } from './Controller/UserController';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../ContextAPI/AuthContext';

const SignUp=()=>{

const [email,setEmail]=useState(null);

const [password,setPassword]=useState(null);

  const [error, setError] = useState(""); // store error message
  const [showError, setShowError] = useState(false);
  const { isLogin,setIsLogin,logoutUser }=useAuth();

  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

   const inputRef = useRef(null);

  const handleBlur = () => {
    if (!inputRef.current.value.trim()) {
      setShowError(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        nameRef.current &&
        emailRef.current &&
        passwordRef.current &&
        confirmRef.current &&
        inputRef.current &&
        !nameRef.current.contains(e.target) &&
        !emailRef.current.contains(e.target) &&
        !passwordRef.current.contains(e.target) &&
        !confirmRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowError(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


const handleSignup=(e)=>{

    e.preventDefault();
       const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPass = confirmRef.current.value.trim();

    if (!name) {
      setError("* Name is required.");
      setShowError(true);
      return;
    }
    if (!email) {
      setError("* Email is required.");
      setShowError(true);
      return;
    }
    if (!password || !confirmPass) {
      setError("* Password is required.");
      setShowError(true);
      return;
    }
    if (password !== confirmPass) {
      setError("* Password and Confirm Password do not match!");
      setShowError(true);
      return;
    }

    setShowError(false);


    const payload={
        name,
        email,
        password
    }
    
    signup(payload).then((response)=>{
   console.log("Signup Success");

       // ✅ Immediately login to get the full saved user
    login({ email: response.data.email, password: payload.password })
      .then((res) => {
        SignUpSuccess(res.data); // Navigate to home with correct user data
      });
 
    }
        ).catch((err) => {
      console.log("Signup Error:", err);

      // ✅ Backend should send the message as plain text or JSON (e.g., "User already exists")
      if (err.response && err.response.data) {
        setError(err.response.data.message || err.response.data || "Signup failed");
      } else {
        setError("Something went wrong. Please try again.");
      }

      setShowError(true);
    });
    
    const SignUpSuccess=(user)=>{
         localStorage.setItem("user",JSON.stringify(user)); 
         setIsLogin(true); 
         console.log(user); 
         navigate("/home")}
};



    return(
<>


            {/* <!-- Signup Form --> */}
        <section className="container forms">

            <div className="form ">
                <div className="form-content">
                    <header className='Header'>Signup</header>
                    <form  className="form_form"action="#">
                        <div className="field input-field">
                            <input type="text"ref={nameRef} id="name" placeholder="Full Name" className="input" required/>
                        </div>
                        <div className="field input-field">
                            <input type="email" ref={emailRef} id="email" placeholder="Email" className="input" required/>
                        </div>

                        <div className="field input-field">
                            <input type="password" ref={passwordRef} id="password" placeholder="Create password" className="password" required/>
                        </div>

                        <div className="field input-field">
                            <input type="password" ref={confirmRef} id="confirmpass" placeholder="Confirm password" className="password" required/>
                            <i className='bx bx-hide eye-icon'></i>
                        </div>
                         <div style={{ margin:"20px" }}>
           {/* ✅ Error span */}
            {showError && (
              <span id="error" className="text-red-600 text-sm mt-2 block">
                {error}
              </span>
            )}
    </div>

                        <div className="field button-field">
                            <button onClick={handleSignup} ref={inputRef} >Signup</button>
                        </div>
                    </form>

                    <div className="form-link">
                        <span>Already have an account? <Link to='/login' className="link login-link">Login</Link></span>
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

export default SignUp;