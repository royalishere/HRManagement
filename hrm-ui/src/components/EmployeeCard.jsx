import React from "react";

const EmployeeCard = ({ employee, onClick }) => {

    return (
        <div
            className="p-4 bg-white border border-gray-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mb-4"
            onClick={() => onClick(employee.id)}
        >
            <div className="flex items-center gap-4">
                {/* Avatar Placeholder */}
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {employee.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{employee.fullName}</h3>
                    <p className="text-sm text-gray-600">Ngày sinh: <strong>{employee.dateOfBirth}</strong> </p>
                    <p className="text-sm text-gray-600">Phòng ban: <strong className="text-green-400">{employee.department}</strong> </p>
                    <p className="text-sm text-gray-600">Chức vụ: <strong className="text-red-400">{employee.role}</strong> </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
