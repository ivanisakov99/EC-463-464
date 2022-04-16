import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/generate">Generate Settings</Link>
                    </li>
                    <li>
                        <Link to="/import">Import CSV</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}


export default Layout;