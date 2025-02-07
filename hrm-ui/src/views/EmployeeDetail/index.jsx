import React, {useEffect, useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {Navigate, useParams} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import {getEmployeeById, updateEmployee} from "../../services/employee.js";

const EmployeeDetail = () => {
    const {user, isAuthenticated} = useAuth();
    const { id } = useParams();
    if(!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    // State thông tin cơ bản
    const [EmployeeInfo, setEmployeeInfo] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        phoneNumber: "",
        bankAccount: "",
        email: "",
        department: "",
        role: "",
        educationLevel: "",
    });

    // Lấy thông tin nhân viên từ API
    useEffect(() => {
        getEmployeeById(id).then((res) => {
            setEmployeeInfo(res.data);
        });
    }, [id]);


    // Lưu thông tin cơ bản
    const handleSaveInfo = () => {
        updateEmployee(id, EmployeeInfo).then(() => {
            toast.success("Lưu thông tin thành công!");
        }).catch((error) => {
            switch (error.response.status) {
                case 400:
                    toast.error("Dữ liệu không hợp lệ!");
                    break;
                case 404:
                    toast.error("Nhân viên không tồn tại!");
                    break;
                default:
                    toast.error("Lưu thông tin thất bại!");
            }
        });
    };


    // Xử lý thay đổi input cho thông tin cơ bản
    const handleChangeInfo = (e) => {
        setEmployeeInfo({ ...EmployeeInfo, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-10 p-6 flex">
                <ToastContainer />
                <div className="w-full flex space-x-6">
                    {/* Thông tin cơ bản */}
                    <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                        <h2 className="text-lg font-bold text-gray-700 mb-2">Thông tin cơ bản</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo?.fullName}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Ngày sinh</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo?.dateOfBirth}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Giới tính</label>
                                <select
                                    name="gender"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo?.gender}
                                    onChange={handleChangeInfo}
                                >
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo?.address}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo?.phoneNumber}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Thông tin nhân viên */}
                    <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                        <h2 className="text-lg font-bold text-gray-700 mb-2">Thông tin nhân viên</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Tài khoản ngân hàng</label>
                                <input
                                    type="text"
                                    name="bankAccount"
                                    className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo.bankAccount}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Email công việc</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo.email}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Phòng ban</label>
                                <input
                                    type="text"
                                    name="department"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo.department}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Vai trò</label>
                                <input
                                    type="text"
                                    name="role"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo.role}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Trình độ học vấn</label>
                                <input
                                    type="text"
                                    name="educationLevel"
                                    className="w-full p-2 border border-gray-300  rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={EmployeeInfo.educationLevel}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={handleSaveInfo}
                        >
                            Lưu thông tin
                        </button>
                    </div>
                </div>

            </div>

            <Footer/>
        </>
    )
};

export default EmployeeDetail;
