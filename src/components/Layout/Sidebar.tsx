'use client';
import { Link } from '@/i18n/navigation';
import { logout } from '@/api/auth';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { FaBox, FaBoxOpen, FaCog, FaDollarSign, FaHome, FaMoneyBill, FaShoppingCart, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const t = useTranslations('sidebar');
    const pathname = usePathname();
    const router = useRouter();
    const navItems = [
        { page: '/dashboard', label: t('dashboard'), icon: FaHome, role: ['admin', 'member'] },
        { page: '/dashboard/inventory', label: t('inventory'), icon: FaBox, role: ['admin', 'member'] },
        { page: '/dashboard/categories', label: t('categories'), icon: FaBoxOpen, role: ['admin', 'member'] },
        { page: '/dashboard/sales', label: t('sales'), icon: FaShoppingCart, role: ['admin', 'member'] },
        { page: '/dashboard/debtors', label: t('debtors'), icon: FaUser, role: ['admin', 'member'] },
        { page: '/dashboard/expenses', label: t('expenses'), icon: FaMoneyBill, role: ['admin', 'member'] },
        { page: '/dashboard/team', label: t('team'), icon: FaUsers, role: ['admin'] },
        { page: '/dashboard/billing', label: t('billing'), icon: FaDollarSign, role: ['admin'] },
        { page: '/dashboard/settings', label: t('settings'), icon: FaCog, role: ['admin', 'member'] },
    ];

    const onLogout = async () => {
        const response = await logout();
        if (response.success) {
            router.push('/');
        }
    }

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>
            <div className={`w-64 bg-brand-primary text-brand-text flex-col flex fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-20 flex items-center justify-center px-4 text-center">
                    <h1 className="text-2xl font-bold text-white truncate">{t('appTitle')}</h1>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.filter(item => item.role.includes('admin')).map(item => (
                        <Link
                            key={item.page}
                            href={item.page}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-white transition-colors duration-200 ${pathname.endsWith(item.page) ? 'bg-brand-secondary text-white' : 'hover:bg-brand-secondary/50 hover:text-white'}`}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="px-4 py-4">
                    <p
                        onClick={onLogout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-brand-secondary/50 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                        <FaSignOutAlt className="h-6 w-6" />
                        <span className="font-medium">{t('logout')}</span>
                    </p>
                </div>
                <div className="px-6 py-4 mt-auto">
                    <p className="text-xs text-center text-gray-400">Powered by Beyond Iyaka</p>
                </div>
            </div>
        </>
    )
}

export default Sidebar