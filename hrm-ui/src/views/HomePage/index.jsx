import {useAuth} from "../../contexts/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import 'swiper/swiper-bundle.css';

const HomePage = () => {
    const { isAuthenticated} = useAuth()
    return isAuthenticated ? (
        <>
            <Navbar/>
            <div className="bg-gray-50 min-h-screen p-4">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Tasks Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">Công việc sắp tới</h2>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-semibold text-lg">Hoàn thiện báo cáo tháng</h3>
                                    <p className="text-gray-600">Hạn: 15/01/2025</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-semibold text-lg">Duyệt kế hoạch sự kiện nội bộ</h3>
                                    <p className="text-gray-600">Hạn: 18/01/2025</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-semibold text-lg">Lên lịch họp nhóm quý</h3>
                                    <p className="text-gray-600">Hạn: 22/01/2025</p>
                                </div>
                            </div>
                        </section>

                        {/* Placeholder for Images */}
                        <section>
                            <h2 className="text-2xl font-bold text-blue-500 mb-4">Báo cáo hàng tuần</h2>
                            <Swiper
                                spaceBetween={30} // Khoảng cách giữa các slide
                                slidesPerView={2} // Số slide hiển thị cùng lúc
                                loop={true} // Lặp lại slideshow khi đến slide cuối
                                autoplay= {{delay: 3000, disableOnInteraction:false}} // Tự động chuyển slide sau 3 giây
                                effect="slide" // Hiệu ứng chuyển slide
                                modules={[Autoplay]}
                                className="w-full h-64"
                            >
                                <SwiperSlide>
                                    <div className="bg-gray-200 h-full flex items-center justify-center rounded-lg">
                                        <img src="https://1office.vn/wp-content/uploads/2021/12/ky-nang-quan-ly-nhan-su-2-1-scaled-e1640318919738.jpg" alt="Activity 1"
                                             className="object-cover w-full h-full"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-gray-200 h-full flex items-center justify-center rounded-lg">
                                        <img src="https://hrchannels.com/uptalent/attachments/images/20200914/1600078655878-co-cau-to-chuc-phong-tai-chinh-ke-toan-1.jpg" alt="Activity 2"
                                             className="object-cover w-full h-full"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-gray-200 h-full flex items-center justify-center rounded-lg">
                                        <img src="https://www.pace.edu.vn/uploads/news/2023/12/1-phong-marketing-la-gi.jpg" alt="Activity 3"
                                             className="object-cover w-full h-full"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-gray-200 h-full flex items-center justify-center rounded-lg">
                                        <img src="https://hrchannels.com/uptalent/attachments/images/20200907/1599445019308-truong-phong-it-lam-tuong-va-su-that-1.jpg" alt="Activity 4"
                                             className="object-cover w-full h-full"/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </section>
                    </div>

                    {/* Sidebar - Activities Section */}
                    <aside className="bg-white p-4 rounded-lg shadow-xl border border-gray-300 lg:col-span-1">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Hoạt động đang diễn ra</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-200 rounded-full flex-shrink-0"></div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-lg">Chạy bộ mỗi ngày</h3>
                                    <p className="text-gray-600 text-sm">01/01/2025 - 31/01/2025</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-green-200 rounded-full flex-shrink-0"></div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-lg">Bơi lội hàng tuần</h3>
                                    <p className="text-gray-600 text-sm">01/01/2025 - 30/06/2025</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-yellow-200 rounded-full flex-shrink-0"></div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-lg">Giải đấu cầu lông</h3>
                                    <p className="text-gray-600 text-sm">10/01/2025 - 12/01/2025</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer/>
        </>
    ) : <Navigate to={'/login'}/>
}

export default HomePage;