import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Navigate, useNavigate } from "react-router-dom";
import EmployeeCard from "../../components/EmployeeCard.jsx";
import EmployeeFilter from "../../components/EmployeeFilter.jsx";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getAllDepartments, getDepartmentByName } from "../../services/department.js";
import { getAllEmployees, getEmployeeById } from "../../services/employee.js";

const HumanResources = () => {
    const { isAuthenticated, user} = useAuth();
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();

    // Phân trang
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Số lượng nhân viên hiển thị trên mỗi trang

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // Lấy thông tin user và role
                const userResponse = await getEmployeeById(user.id);
                const role = userResponse.data.role;

                if (role === "HR") {
                    // Nếu là HR, lấy toàn bộ danh sách nhân viên
                    const employeeResponse = await getAllEmployees();
                    setEmployees(employeeResponse.data);
                } else {
                    // Nếu không phải HR, lấy danh sách nhân viên cùng phòng ban
                    const departmentName = userResponse.data.department;
                    const departmentResponse = await getDepartmentByName(departmentName);

                    const employeeIds = departmentResponse.data?.memberIds || [];
                    const employeePromises = employeeIds.map((id) => getEmployeeById(id));

                    // Đợi tất cả các API call hoàn thành
                    const employeeResponses = await Promise.all(employeePromises);

                    // Set vào danh sách nhân viên
                    setEmployees(employeeResponses.map((res) => res.data));
                }
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            }
        };
        fetchEmployees();
    }, []);


    useEffect(() => {
        getAllDepartments()
            .then((res) => {
                const departmentNames = res.data.map((dept) => dept.name);
                setDepartments(departmentNames);
            })
            .catch((error) => {
                console.error("Failed to fetch departments:", error);
            });
    }, []);

    useEffect(() => {
        const filtered = employees.filter(
            (emp) =>
                emp.fullName.toLowerCase().includes(search.toLowerCase()) &&
                (department === "" || emp.department === department)
        );
        setFilteredEmployees(filtered);
        setCurrentPage(0); // Reset về trang đầu tiên khi lọc dữ liệu
    }, [search, department, employees]);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    // Xác định dữ liệu hiển thị cho trang hiện tại
    const pageStart = currentPage * itemsPerPage;
    const pageEnd = pageStart + itemsPerPage;
    const currentItems = filteredEmployees.slice(pageStart, pageEnd);

    // Hàm xử lý khi người dùng chuyển trang
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto mt-10">
                <h1 className="text-2xl text-blue-600 font-bold mb-14 text-center">
                    Quản lý nhân viên
                </h1>
                <EmployeeFilter
                    search={search}
                    setSearch={setSearch}
                    department={department}
                    setDepartment={setDepartment}
                    departments={departments}
                />
                <div>
                    {currentItems.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onClick={(id) => navigate(`/human-resources/${id}`)}
                        />
                    ))}
                </div>
                {/* Phân trang */}
                <div className="flex justify-center my-6">
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)} // Số lượng trang
                        marginPagesDisplayed={2} // Số trang hiện ở đầu/cuối
                        pageRangeDisplayed={3} // Số trang hiện ở giữa
                        onPageChange={handlePageClick} // Hàm xử lý chuyển trang
                        containerClassName={"pagination flex gap-2"}
                        pageClassName="px-3 py-1 bg-blue-300 rounded hover:bg-blue-500"
                        activeClassName={"bg-blue-300 px-4 text-white hover:bg-blue-500"}
                        previousClassName={"px-3 py-1 bg-blue-300 rounded hover:bg-blue-500"}
                        nextClassName={"px-3 py-1 bg-blue-300 rounded hover:bg-blue-500"}
                        disabledClassName={"opacity-50 cursor-not-allowed"}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HumanResources;
