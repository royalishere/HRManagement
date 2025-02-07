import {banner, logo} from "../../constants/index.js";
import Input from "../../components/Input.jsx";
import Checkbox from "../../components/Checkbox.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";
import { useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate} from "react-router-dom";

const Login = () => {

    const {login, isAuthenticated} = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    if (isAuthenticated) {
        return <Navigate to={'/'}/>
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(form);
        } catch (e) {
            switch (e.response.status) {
                case 404:
                    toast.error("Không tìm thấy tài khoản");
                    break;
                case 400:
                    toast.error("Sai mật khẩu");
                    break;
                default:
                    toast.error("Đã có lỗi xảy ra");
            }
        }
    }

    return (
        <div className="w-[60%] mx-auto mt-10 flex shadow-2xl">

            <div className="flex flex-col justify-center w-1/2 bg-white rounded-l-lg">
                <img src={logo} alt="HCMUS Logo" className="mx-auto p-2 w-1/2"/>
                <p className="text-2xl font-bold text-indigo-800 p-2 mx-auto">HCMUS Company</p>
                <p className="text-lg text-black p-2 mx-auto">Please login to continue</p>
                <form className="flex flex-col p-10" onSubmit={onSubmit}>
                    <Input id={"email"} type="email" placeholder="Email" onChange={onChange}/>
                    <br></br>
                    <Input id={"password"} type="password" placeholder="Password" onChange={onChange}/>
                    <Checkbox label="Remember me"/>

                    <div className="flex justify-end p-4">
                        <a href="#" className="text-blue-400 hover:text-blue-500 text-sm">Forgot password?</a>
                    </div>

                    <button
                        className="w-full rounded-md bg-blue-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-600 focus:shadow-none active:bg-blue-600 hover:bg-blue-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                    type={"submit"}>
                        Login
                    </button>
                </form>

            </div>
            <div className="flex flex-col justify-center w-1/2 rounded-r-md">
                <img src={banner} alt="Banner" className="object-cover w-full h-full rounded-r-lg"/>
            </div>
            <ToastContainer position={"top-right"} autoClose={5000}/>
        </div>
    )
};

export default Login;