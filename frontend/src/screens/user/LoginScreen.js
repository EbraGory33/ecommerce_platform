import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../assets/logo.png'
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { UserLogin } from "../../store/slice/user/UserFunction";
import { useNavigate } from 'react-router-dom';
import './Login.css'

function LoginScreen() {  

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [SignUp, setSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_pw, setconfirm_pw] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const userLogin = useSelector((state) => state.user);
    const { userInfo, error } = userLogin;

    useEffect(() => {
        if (userInfo) {
          navigate(-1);
        }
      }, [userInfo, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const isLogin= await UserLogin(dispatch, username, password);
        if (isLogin) {
            navigate(-1)
        }
        
    };

    const handleSignup = async (event) => {
    }
    

    const toggleSignUp = (event) => {
        event.stopPropagation();
        setSignUp(!SignUp);
    };

    return(
        <div class= 'n-padding'>
            <div class='content-center'>
                <a href='/'>
                    <img class='n-nav-icon' src={Logo} alt='home_Logo'/>
                    <span class='login-logo-text'>E-Commerce Shop</span>
                </a>
            </div>
            <div id='main-section'>
                <div id ='section-inner'>
                    <div id= 'header'>
                        {!SignUp ? (
                            <div class='header-text'>
                                Login
                            </div>
                            ):(
                            <div class='header-text'>
                                SignUp
                            </div>
                            )}
                    </div>
                    <div id='padding'>

                    </div>
                    <div id='inputs'>
                        {!SignUp ?(
                        <form onSubmit={handleLogin} name='login' action='submit-login' method='POST'>
                            {/* Username */}
                            <div >
                                <label for="username">Username:</label>
                                <input class='loginscreen-input-feild'
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label for="password">Password:</label>
                                <input class='loginscreen-input-feild'
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            
                            {/* Error Message */}
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            {error && <Alert variant="error">{error}</Alert>}

                            {/* Submit Button */}
                            <button class='login-buttonsstyle'
                                type="submit">Login
                            </button>
                            <button class='login-buttonsstyle' style={{'background-color': 'red'}}
                                onClick={toggleSignUp}>Register
                            </button>
                            
                        </form>                
                        ):(
                        <form onSubmit={handleSignup} name='signup' action='submit-signup' method='POST'>
                            {/* First Name */}
                            <div>
                                <label for="firstname">First Name:</label>
                                <input class='loginscreen-input-feild'
                                    type="text" 
                                    id="firstname" 
                                    name="firstname" 
                                    placeholder="Enter your first name"
                                    value={firstname}
                                    onChange={(e) => setfirstname(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label for="lastname">Last Name:</label>
                                <input class='loginscreen-input-feild'
                                    type="text" 
                                    id="lastname" 
                                    name="lastname" 
                                    placeholder="Enter your last name"
                                    value={lastname}
                                    onChange={(e) => setlastname(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label for="email">Email:</label>
                                <input class='loginscreen-input-feild'
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label for="phone_number">Phone Number:</label>
                                <input class='loginscreen-input-feild'
                                    type="tel" 
                                    id="phone_number" 
                                    name="phone_number" 
                                    placeholder="Enter your Phone Number"
                                    value={phone}
                                    onChange={(e) => setphone(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label for="username">Username:</label>
                                <input class='loginscreen-input-feild'
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label for="password">Password:</label>
                                <input class='loginscreen-input-feild'
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
    
                            {/* Confirm Password */}
                            <div>
                                <label for="confirm-password">Confirm Password:</label>
                                <input class='loginscreen-input-feild'
                                    type="password" 
                                    id="confirm-password" 
                                    name="confirm_password" 
                                    placeholder="Re-enter your password" 
                                    value={confirm_pw}
                                    onChange={(e) => setconfirm_pw(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Submit Button */}
                            <button class='login-buttonsstyle'
                                type="submit">Sign Up
                            </button>                            
                            <span class="link-text" onClick={toggleSignUp}>
                                Back to Login Page
                            </span>
                        </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen