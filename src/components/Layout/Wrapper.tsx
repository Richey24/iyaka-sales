'use client';
import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-row min-h-screen bg-brand-primary relative">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col min-h-screen bg-brand-light">
                <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                {children}
            </div>
        </div>
    )
}

export default Wrapper