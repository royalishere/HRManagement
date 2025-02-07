import React from "react";

const EmployeeFilter = ({ search, setSearch, department, setDepartment, departments }) => {
    return (
        <div className="mb-6 justify-between flex gap-4">
            <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="p-2 border border-gray-300    rounded-md w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                className="p-2 border rounded-md w-1/4 focus:outline-none focus:ring focus:ring-blue-300"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >
                <option value="">Tất cả phòng ban</option>
                {departments.map((dept) => (
                    <option key={dept} value={dept}>
                        {dept}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EmployeeFilter;
