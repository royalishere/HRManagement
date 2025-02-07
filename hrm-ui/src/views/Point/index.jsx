import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getAllPoints } from "../../services/point.js";
import { addPoint } from "../../services/point.js";
import { getEmployeeById } from "../../services/employee.js";

const Point = () => {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    const [basicInfo, setBasicInfo] = useState([]);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [pointsToAward, setPointsToAward] = useState(0);

    // Fetch all points and merge with employee data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPoints = await getAllPoints();
                const pointsWithEmployeeData = await Promise.all(
                    allPoints.data.map(async (point) => {
                        const employee = await getEmployeeById(point.id);
                        return {
                            id: point.id,
                            fullName: employee.data.fullName,
                            email: point.email,
                            role: employee.data.role,
                            department: employee.data.department,
                            point: point.point,
                        };
                    })
                );
                setBasicInfo(pointsWithEmployeeData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRequests(basicInfo.map((point) => point.id));
        } else {
            setSelectedRequests([]);
        }
    };

    const handleSelectRequest = (id) => {
        setSelectedRequests((prev) =>
            prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
        );
    };

    const openModal = (point) => {
        setSelectedPoint(point);
        console.log(point);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPointsToAward(0);
    };

    const handleAwardPoints = async () => {
        if (pointsToAward <= 0) {
            alert("Số điểm phải lớn hơn 0");
            return;
        }
        try {
            // Assuming the employee email is available as part of selectedPoint
            const email = selectedPoint?.email;  // Ensure email exists on the selectedPoint object
            if (!email) {
                alert("Không có thông tin email của nhân viên");
                return;
            }

            // Call the API to award points
            await addPoint(email, pointsToAward);

            setBasicInfo((prevInfo) =>
                prevInfo.map((point) =>
                    point.id === selectedPoint.id
                        ? { ...point, point: Number(point.point) + Number(pointsToAward) }
                        : point
                )
            );

            // Close the modal after awarding points
            closeModal();

            // You can also show a success message or refresh the data if needed
            alert("Tặng điểm thành công!");
        } catch (error) {
            console.error("Error awarding points:", error);
            alert("Đã xảy ra lỗi khi tặng điểm.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-[95%] mx-auto p-6 h-1/2">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
                    Danh sách điểm thưởng
                </h1>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label>
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={handleSelectAll}
                                checked={selectedRequests.length === basicInfo.length && basicInfo.length > 0}
                            />
                            Chọn tất cả
                        </label>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Tên nhân viên</th>
                            <th className="border p-2">Chức vụ</th>
                            <th className="border p-2">Phòng ban</th>
                            <th className="border p-2">Điểm thưởng</th>
                            <th className="border p-2">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {basicInfo.map((point) => (
                            <tr key={point.id} className="hover:bg-gray-50">
                                <td className="border p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedRequests.includes(point.id)}
                                        onChange={() => handleSelectRequest(point.id)}
                                    />
                                </td>
                                <td className="border p-2 text-center">{point.fullName}</td>
                                <td className="border p-2 text-center">{point.role}</td>
                                <td className="border p-2 text-center">{point.department}</td>
                                <td className="border p-2 text-center">{point.point}</td>
                                <td className="border p-2 text-center">
                                    <Link
                                        to="#"
                                        onClick={() => openModal(point)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Tặng điểm
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-xl font-semibold mb-4">Tặng điểm cho {selectedPoint?.fullName}</h2>
                        <div>
                            <label htmlFor="points" className="block mb-2">Số điểm:</label>
                            <input
                                id="points"
                                type="number"
                                value={pointsToAward}
                                onChange={(e) => setPointsToAward(e.target.value)}
                                className="border p-2 w-full mb-4"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAwardPoints}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Tặng điểm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Point;
