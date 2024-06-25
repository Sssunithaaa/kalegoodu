import { useState } from "react";
import { Sidebar } from "./Sidebar";

export const Navigation = () => {

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const toggleSideBarOpen = () => {
        setSideBarOpen(!sideBarOpen);
    }

    return (
        <div className='flex items-center gap-5 md:gap-0'>
            {/* Hamburger Menu */}
            <button onClick={ toggleSideBarOpen }>
                <img className="pt-1 md:hidden" src="./images/icon-menu.svg" alt="" />
            </button>
            {
                sideBarOpen && (
                    <Sidebar toggleSideBarOpen={toggleSideBarOpen}/>
                )
            }
            {/* Logo */}
            <img src="./images/logo.svg" alt="" />
            {/* Sections */}
            <div id="sections" className='hidden md:flex items-center pt-1 gap-6 text-dark-grayish-blue'>
                <a href="#">Collections</a>
                <a href="#">Men</a>
                <a href="#">Women</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>
        </div>
    )
}
