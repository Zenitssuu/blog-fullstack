import React from 'react'

function Button({
    children="Submit",
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
        type={type}
        className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
        {...props}
        >
            {children}
        </button>
        
    )
}

export default Button
