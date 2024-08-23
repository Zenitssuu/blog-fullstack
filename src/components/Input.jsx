import React,{forwardRef, useId} from 'react'

const Input = forwardRef(function Input({
    label,
    type="text",
    className='',
    ...props
},ref) {
    const id = useId();
    return (
        <div className={`w-full mt-4 ${className}`}>
            {label && 
            <label 
            className="pl-1 mb-1 inline-block" 
            htmlFor={id}>
                {label}
            </label>}

            <input 
            className={`px-3 py-2 rounded-lg bg-white text-black otline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            type={type}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
