import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import axios from "axios";

const ReqApproval = () => {
    const { user, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState("pending"); // "pending" | "approved" | "rejected"
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [employeeNames, setEmployeeNames] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [currentRejectId, setCurrentRejectId] = useState(null);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Fetch requests and employee details
    useEffect(() => {
        const fetchRequestsAndEmployees = async () => {
            try {
                // Fetch requests
                const requestsResponse = await axios.get(`http://localhost:8080/api/leave-requests/manager/${user.id}`);
                const pending = requestsResponse.data.filter((req) => req.status === "pending");
                const approved = requestsResponse.data.filter((req) => req.status === "approved");
                const rejected = requestsResponse.data.filter((req) => req.status === "rejected");

                setPendingRequests(pending);
                setApprovedRequests(approved);
                setRejectedRequests(rejected);

                // Fetch employee names
                const employeeIds = [
                    ...new Set(requestsResponse.data.map((req) => req.employeeId))
                ];
                const employeePromises = employeeIds.map((id) =>
                    axios.get(`http://localhost:8080/api/employees/${id}`)
                );
                const employeeResponses = await Promise.all(employeePromises);
                const namesMap = employeeResponses.reduce((map, response) => {
                    map[response.data.id] = response.data.fullName;
                    return map;
                }, {});
                setEmployeeNames(namesMap);
            } catch (error) {
                setErrorMessage("Không thể tải danh sách yêu cầu hoặc thông tin nhân viên.");
            }
        };

        fetchRequestsAndEmployees();
    }, [user.id]);

    // Approve a single request
    const approveRequest = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/leave-requests/${id}`, null, {
                params: {
                    managerId: user.id,
                    status: "approved",
                },
            });
            const approvedRequest = response.data;
            setPendingRequests((prev) => prev.filter((req) => req.id !== id));
            setApprovedRequests((prev) => [...prev, approvedRequest]);
        } catch (error) {
            setErrorMessage("Không thể duyệt yêu cầu. Vui lòng thử lại sau.");
        }
    };

    // Reject a single request
    const rejectRequest = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/leave-requests/${currentRejectId}`, null, {
                params: {
                    managerId: user.id,
                    status: "rejected",
                    rejectionReason,
                },
            });
            const rejectedRequest = response.data;
            setPendingRequests((prev) => prev.filter((req) => req.id !== currentRejectId));
            setRejectedRequests((prev) => [...prev, rejectedRequest]);
            setShowRejectModal(false);
            setRejectionReason("");
            setCurrentRejectId(null);
        } catch (error) {
            setErrorMessage("Không thể từ chối yêu cầu. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-[95%] mx-auto p-6 h-1/2">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">Duyệt yêu cầu</h1>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                {/* Tabs */}
                <div className="flex border-b mb-4">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-4 py-2 ${activeTab === "pending" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    >
                        Chưa duyệt
                    </button>
                    <button
                        onClick={() => setActiveTab("approved")}
                        className={`px-4 py-2 ${activeTab === "approved" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    >
                        Đã duyệt
                    </button>
                    <button
                        onClick={() => setActiveTab("rejected")}
                        className={`px-4 py-2 ${activeTab === "rejected" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    >
                        Đã từ chối
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "pending" && (
                    <div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Lý do</th>
                                    <th className="border p-2">Người gửi</th>
                                    <th className="border p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map((req, index) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="border p-2">{index + 1}</td>
                                        <td className="border p-2">{req.reason}</td>
                                        <td className="border p-2">{employeeNames[req.employeeId] || req.employeeId}</td>
                                        <td className="border p-2 flex space-x-2">
                                            <button
                                                onClick={() => approveRequest(req.id)}
                                                className="text-green-500"
                                            >
                                                ✔
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCurrentRejectId(req.id);
                                                    setShowRejectModal(true);
                                                }}
                                                className="text-red-500"
                                            >
                                                ✖
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "approved" && (
                    <div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Lý do</th>
                                    <th className="border p-2">Người gửi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedRequests.map((req, index) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="border p-2">{index + 1}</td>
                                        <td className="border p-2">{req.reason}</td>
                                        <td className="border p-2">{employeeNames[req.employeeId] || req.employeeId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "rejected" && (
                    <div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Lý do</th>
                                    <th className="border p-2">Người gửi</th>
                                    <th className="border p-2">Lý do từ chối</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rejectedRequests.map((req, index) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="border p-2">{index + 1}</td>
                                        <td className="border p-2">{req.reason}</td>
                                        <td className="border p-2">{employeeNames[req.employeeId] || req.employeeId}</td>
                                        <td className="border p-2">{req.rejectionReason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Nhập lý do từ chối</h2>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows="4"
                            className="w-full p-2 border rounded"
                            placeholder="Nhập lý do..."
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setRejectionReason("");
                                    setCurrentRejectId(null);
                                }}
                                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={rejectRequest}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                disabled={!rejectionReason}
                            >
                                Từ chối
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default ReqApproval;
