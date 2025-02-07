import React, {useEffect, useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import {getEmployeeById, updateEmployeeBasicInfo} from "../../services/employee.js";
import {changePassword} from "../../services/auth.js";

const Profile = () => {
    const {user, isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    // State thông tin cơ bản
    const [basicInfo, setBasicInfo] = useState({
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
        getEmployeeById(user.id).then((res) => {
            setBasicInfo(res.data);
        });
    }, [user.id]);

    // State thông tin mật khẩu
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Lưu thông tin cơ bản
    const handleSaveBasicInfo = () => {
        try {
            updateEmployeeBasicInfo(user.id, basicInfo);
            toast.success("Thông tin đã được cập nhật!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
        }
    };

    const handleSendRequest = () => {
        //tash
    }

    // Đổi mật khẩu
    const handlePasswordChange = () => {
        if(newPassword !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }
        changePassword(user.id, currentPassword, newPassword).then(() => {
            toast.success("Mật khẩu đã được thay đổi!");
        }).catch(error => {
            switch (error.response.status) {
                case 400:
                    toast.error("Mật khẩu hiện tại không đúng!");
                    break;
                default:
                    toast.error("Có lỗi xảy ra khi thay đổi mật khẩu!");
                    break;
            }
        });
    };

    // Xử lý thay đổi input cho thông tin cơ bản
    const handleChangeInfo = (e) => {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-10 p-6 flex">
                <ToastContainer />
                <div className="w-1/2 pr-8 flex flex-col space-y-6">
                    {/* Thông tin cơ bản */}
                    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                        <h2 className="text-lg font-bold text-gray-700 mb-2">Thông tin cơ bản</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={basicInfo?.fullName}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Ngày sinh</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={basicInfo?.dateOfBirth}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Giới tính</label>
                                <select
                                    name="gender"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={basicInfo?.gender}
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
                                    value={basicInfo?.address}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 py-2">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    value={basicInfo?.phoneNumber}
                                    onChange={handleChangeInfo}
                                />
                            </div>
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={handleSaveBasicInfo}
                        >
                            Lưu thông tin
                        </button>
                    </div>
                    {/* Thay đổi mật khẩu */}
                    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Thay đổi mật khẩu</h2>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu mới</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={handlePasswordChange}
                        >Đổi mật khẩu
                        </button>
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
                                value={basicInfo.bankAccount}
                                onChange={handleChangeInfo}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 py-2">Email công việc</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={basicInfo.email}
                                onChange={handleChangeInfo}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 py-2">Phòng ban</label>
                            <input
                                type="text"
                                name="department"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={basicInfo.department}
                                onChange={handleChangeInfo}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 py-2">Vai trò</label>
                            <input
                                type="text"
                                name="role"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={basicInfo.role}
                                onChange={handleChangeInfo}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 py-2">Trình độ học vấn</label>
                            <input
                                type="text"
                                name="educationLevel"
                                className="w-full p-2 border border-gray-300  rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                value={basicInfo.educationLevel}
                                onChange={handleChangeInfo}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 py-2">File đính kèm (minh chứng)</label>
                            <input
                                type="file"
                                multiple={true}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 py-2">
                            <input type="checkbox" className="mr-2"/>
                            <span className="text-red-400 text-sm">
                                Tôi xác nhận những thông tin trên là chính xác và yêu cầu chỉnh sửa thông tin
                            </span>
                        </label>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={handleSendRequest}
                    >
                        Xác nhận & Gửi
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default Profile;
