import React, {forwardRef, useId} from 'react'

function Select({
    options,
    label,
    className="",
    setCategory,
    ...props
},ref) {
    // console.log(options);
    const id = useId();
    return (
        <div className='mt-5'>
            {label && 
            <label htmlFor={id}>
                {label}
            </label>}
            <select
            {...props}
            id={id}
            onChange={e => setCategory(e.target.value)}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)
