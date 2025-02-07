// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext.jsx";
import React, {useEffect} from "react";
import {logo, noti, user_icon} from "../constants/index.js";
import {getPointById} from "../services/point.js";

const NavBar = () => {
    const {logout, user} = useAuth();
    const role = user.role;
    const [point, setPoint] = React.useState(0);

    useEffect(() => {
        getPointById(user.id).then((res) => {
            setPoint(res.data.point);
        });
    }, []);

    return (
        <nav className="bg-blue-900 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Navigation */}
                <div className="flex items-center space-x-10">
                    <Link to="/" className="text-xl font-bold">
                        <img src={logo} alt="HCMUS Logo" className="h-10 w-10 rounded-sm"/>
                    </Link>
                    {role === 'HR' && (
                        <Link
                            to="/human-resources"
                            className="relative group hover:text-white transition"
                        >
                            Nhân sự
                            <span
                                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                            <span
                                className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 bg-blue-500 transition-opacity duration-300"></span>
                        </Link>)}
                    {(role === 'HR' || role === 'SUPERVISOR') && (
                        <Link
                            to="/req-approval"
                            className="relative group hover:text-white transition"
                        >
                            Duyệt yêu cầu
                            <span
                                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                            <span
                                className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 bg-blue-500 transition-opacity duration-300"></span>
                        </Link>
                    )}
                    <Link
                        to="/req-submission"
                        className="relative group hover:text-white transition"
                    >
                        Gửi yêu cầu
                        <span
                            className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        <span
                            className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 bg-blue-500 transition-opacity duration-300"></span>
                    </Link>
                    <Link
                        to="/activities"
                        className="relative group hover:text-white transition"
                    >
                        Hoạt động
                        <span
                            className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        <span
                            className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 bg-blue-500 transition-opacity duration-300"></span>
                    </Link>
                    <Link
                        to="/rewards"
                        className="relative group hover:text-white transition"
                    >
                        Đổi thưởng
                        <span
                            className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        <span
                            className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 bg-blue-500 transition-opacity duration-300"></span>
                    </Link>
                    {(role === 'HR' || role === 'SUPERVISOR') && (<Link
                        to="/point"
                        className="relative group hover:text-white transition"
                    >
                        Điểm thưởng
                        <span
                            className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        <span
                            className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 bg-blue-500 transition-opacity duration-300"></span>
                    </Link>)}
                </div>


                {/* User Dropdown */}
                <div className="relative group flex items-center space-x-2">
                    {/* Notification Bell */}
                    <div className="relative cursor-pointer">
                        <img
                            src={noti}
                            alt="Notification Bell"
                            className="h-8 w-8"
                        />
                        {/* Notification Badge */}
                        <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                            5
                        </div>
                    </div>
                    {/* User Icon */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer rounded-full bg-white group-hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={user_icon}
                            alt="User Icon"
                            className="h-10 w-10 rounded-full"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    <div
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-48 bg-white text-gray-800 text-sm shadow-lg drop-shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                        <div className="block px-4 py-2 rounded-t-md">Điểm thưởng: <span
                            className="text-green-500">{point}</span></div>
                        <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-blue-500 hover:text-white "
                        >
                            Xem thông tin
                        </Link>
                        <button onClick={logout}
                                className="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white rounded-b-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;