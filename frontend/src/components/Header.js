import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import login_Icon from "../assets/login_Icon.png";
import Cart_Icon from "../assets/Cart_Icon.png";
import SearchIcon from "../assets/Search_Icon.png"
import './Header.css' 
import { UserLogout } from "../store/slice/user/UserFunction";

function Header(){

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const [searchVisible, setSearchVisible] = useState(false); 
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogout = () =>{
        UserLogout(dispatch);
    }


    // Toggle the dropdown visibility when "Welcome, {firstname}" is clicked
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleSearchBar = (event) => {
        event.stopPropagation();
        setSearchVisible(!searchVisible);
    };

    const handleClickOutside = (event) => {
        const searchContainer = document.getElementById('search-container');
        
        if (searchContainer && !searchContainer.contains(event.target)) {
            setSearchVisible(false); // Close the search bar
        }
    }

    useEffect(() => {
        if (searchVisible) {
            document.addEventListener('click', handleClickOutside);
        }else{
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchVisible]);

    return(
        <header id='header'>
            <div id ='navbar'>
                <div id='nav-left' class="logo-container">
                    <Link to="/" class="logo-link">
                        <div className='homelogo'>
                            <img class='logo-image' src={logo} alt="logo" />
                            <h1 class="header-logo-text">E-Commerce Shop</h1>
                        </div>
                    </Link>
                </div>
 
                {/* Center Section: Navbar Links */}
                <div id='nav-center'>
                    <div id='nav-section'>
                        {!searchVisible ? (
                            <>
                                <Link to="/shop" class="nav-link">Shop</Link>
                                <Link to="/about" class="nav-link">About Us</Link>
                                <Link to="/bestsellers" class="nav-link">Bestsellers</Link>
                                <Link to="/contact" class="nav-link">Contact Us</Link>
                                {/* Search Icon and Search Bar */}
                                <div>
                                    <img class='Search-image' src={SearchIcon} alt="Search_Icon" onClick={toggleSearchBar} />            
                                </div>
                            </>
                            ):(
                                <div id="search-container" style={{ display: 'flex', flexDirection: 'row' }}>
                                    <form>
                                        <input type="text" className="search-bar" placeholder="Search Shop" />
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            )}
                    </div> 
                </div>

                {/* Right Section: Login, Cart */}
                <div id='nav-right'>
                    <div id ='nav-tools'>
                        <div id='login-div' class='nav-tools'>
                            {/* profile_user */}
                            {!userInfo ? ( 
                                <>
                                    <div class='welcome' onClick={toggleDropdown}>
                                        <span>Welcome, Sign in</span>
                                    </div>
                                    
                                    
                                    {dropdownVisible && (
                                        <div className="dropdown-menu">
                                            <Link to="/account" className="dropdown-item">My Account</Link>
                                            <Link to="/login"  className="dropdown-item logout-button">Login</Link>
                                        </div>
                                    )}


                                    <Link to="/account" className="login-btn">
                                        <img className='login-image' src={login_Icon} alt="Login_Icon" />
                                    </Link>
                                </>
                            ):(
                                <>  
                                    <div class='welcome' onClick={toggleDropdown}>
                                        <span>Welcome, {userInfo.first_name}</span>
                                    </div>
                                    {dropdownVisible && (
                                        <div class="dropdown-menu">
                                            <Link to="/account" className="dropdown-item">My Account</Link>
                                            <Link to="/" onClick={handleLogout} className="dropdown-item logout-button">Logout</Link>
                                        </div>
                                    )}

                                    <Link to="/account" className="login-btn">
                                        <img className='login-image' src={login_Icon} alt="Account_Icon" />
                                    </Link>
                                </>
                            )}

                        </div>
                        <div id='order-div' class='nav-tools'>
                            {/* Return and Order Page*/}
                            <a href='/order_history' class='nav-link' style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>Order</span> 
                                <span>History</span>
                            </a>
                        </div>
                        <div id='cart-div' class='nav-tools'>
                            {/* Cart Icon */}
                            <Link to="/cart" class="cart-btn nav-link">
                                <img class='Cart-image' src={Cart_Icon} alt="Login_Icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header 