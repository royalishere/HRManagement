import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Input = ({ id, type, placeholder, onChange }) => {
    const [isFilled, setIsFilled] = useState(true);

    const handleInputChange = (event) => {
        setIsFilled(event.target.value !== '');
        onChange(event);
    };

    return (
        <div className="relative">
            <input
                id={id}
                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-400 hover:border-blue-300 shadow-sm focus:shadow focus:ring-1 focus:ring-blue-400/50"
                type={type}
                onChange={handleInputChange}
            />
            <label
                htmlFor={id}
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left ${
                    isFilled || "peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-blue-400 peer-focus:scale-100"
                } ${
                    isFilled ? '-top-2 left-2.5 text-xs text-blue-400 scale-100' : 'top-2.5 text-slate-400 text-sm'
                }`}>
                {placeholder}
            </label>
        </div>
    );
}

export default Input;
