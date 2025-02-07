import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import axios from "axios";

const ReqSubmission = () => {
    const { user, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            setErrorMessage("Ngày bắt đầu phải nhỏ hơn ngày kết thúc.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/leave-requests", {
                ...formData,
                employeeId: user.id,
            });
            setSuccessMessage("Yêu cầu nghỉ phép đã được gửi thành công!");
            setErrorMessage("");
            setFormData({
                startDate: "",
                endDate: "",
                reason: "",
            });
        } catch (error) {
            setErrorMessage("Gửi yêu cầu thất bại. Vui lòng thử lại sau.");
            setSuccessMessage("");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Gửi yêu cầu nghỉ phép</h1>
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="startDate" className="block text-gray-700">
                            Ngày bắt đầu
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-gray-700">
                            Ngày kết thúc
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-gray-700">
                            Lý do nghỉ phép
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border rounded"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Gửi yêu cầu
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ReqSubmission;
