import React from 'react'

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>{children}</div>
    )
}

export default Card