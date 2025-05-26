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
                {/*<div id='nav-center'>
                    <form class="p-0.5 w-full max-w-2xl mx-auto">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>*/}
                
                {/* Search with Categories*/}
                {/*<div id="nav-center">
                    <form method="GET" action="" class="p-0.5 w-full max-w-2xl mx-auto">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" name="k" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>*/}

                <div id="nav-center">
                    <form method="GET" action="/search" className="p-0.5 w-full max-w-2xl mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            name="k"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                        </div>
                    </form>
                </div>

                {/*<div>
                    <form class="max-w-lg mx-auto">
                        <div class="flex">
                            <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                            <button id="dropdown-button" data-dropdown-toggle="dropdown" class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg></button>
                            <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                </li>
                                </ul>
                            </div>
                            <div class="relative w-full">
                                <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span class="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>*/}



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