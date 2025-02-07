import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getPointById, redeemReward} from "../../services/point.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import {getAllRewards} from "../../services/reward.js";
import {item1, item2, item3, item4, item5} from "../../constants/index.js";

const RewardPage = () => {
    const [userPoints, setUserPoints] = useState();
    const {isAuthenticated, user} = useAuth()
    const [items, setItems] = useState([]);
    const itemImages = [item1, item2, item3, item4, item5];

    if(!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    useEffect(() => {
        getPointById(user.id).then((res) => {
            setUserPoints(res.data.point);
        });

        getAllRewards().then((res) => {
            setItems(res.data);
        });
    }, []);

    // Xử lý đổi thưởng
    const handleRedeem = (item) => {
        if (userPoints >= item.price) {
            redeemReward(user.id, item.price).then(() => {
                setUserPoints((prevPoints) => prevPoints - item.price);
                toast.success(
                    <>
                        Bạn đã đổi thành công: <br />
                        <strong>{item.name}</strong>
                    </>
                );
            });
        } else {
            toast.error("Điểm của bạn không đủ để đổi thưởng.");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="max-w-6xl mx-auto mt-10">
                <h1 className="text-2xl text-blue-600 font-bold mb-6 text-center">
                    Đổi Thưởng
                </h1>
                <div className="mb-4 text-center">
                    <span className="text-lg font-semibold text-green-600">
                        Điểm hiện tại: {userPoints} điểm
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="border border-gray-400    rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                        >
                            <img
                                src={itemImages[index]}
                                alt={item.name}
                                className="w-40 h-40 object-cover mb-4"
                            />
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-green-500 font-bold">{item.price} điểm</p>
                            <button
                                className={`mt-4 px-8 py-2 rounded ${
                                    userPoints >= item.price
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                                onClick={() => handleRedeem(item)}
                                disabled={userPoints < item.price}
                            >
                                Đổi
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RewardPage;
