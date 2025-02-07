import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth';

// create context
const AuthContext = createContext();

// AuthProvider to manage user's state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Trạng thái người dùng
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực
    const [loading, setLoading] = useState(true); // Trạng thái đang tải

    // Khi component được mount, kiểm tra thông tin người dùng từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false); // Đặt loading thành false sau khi kiểm tra xong
    }, []);

    // login handling
    const login = async (userData) => {
        const response = await loginService(userData); // Gọi hàm từ service
        const user = response.data;
        if (user.accessToken) {
            localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage
            setUser(user); // Cập nhật trạng thái người dùng
            setIsAuthenticated(true); // Cập nhật trạng thái xác thực
        }
    };

    // logout handling
    const logout = () => {
        logoutService();
        localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
        setUser(null); // Xóa trạng thái người dùng
        setIsAuthenticated(false); // Xóa trạng thái xác thực
    };

    if (loading) {
        return <div>Loading...</div>; // Hoặc có thể trả về một spinner loading
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
