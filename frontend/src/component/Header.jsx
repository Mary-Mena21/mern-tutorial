import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
    return <header className="header">
        <div className="logo">
            <Link to="/">GoalSetter</Link>
        </div>
        <ul>
            <li>
                <Link to="/login">
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to="/register">
                    <FaUser /> Register
                </Link>
            </li>
        </ul>
    </header>;
}

export default Header;
