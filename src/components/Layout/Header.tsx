'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useUserStore } from '@/store/userStore';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react'
import { FaBars, FaGlobe, FaStar } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa6';

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
    const t = useTranslations('header');
    const pathname = usePathname();
    const router = useRouter();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { user } = useUserStore();

    const onUpgradeClick = () => {
        console.log('upgrade');
    }

    const onLangChange = (locale: string) => {
        router.replace(pathname, {locale: locale});
    }

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden mr-4 p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    aria-label={t('toggleSidebar')}
                >
                    <FaBars className="h-6 w-6" />
                </button>
                <div className="font-semibold text-gray-500 text-sm hidden sm:block">{t('welcome', { displayName: user?.firstName || '' })}</div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button onClick={onUpgradeClick} className="flex items-center px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors text-sm">
                    <FaStar className="h-4 w-4 mr-2" />
                    {t('upgrade')}
                </button>

                <button className="p-2 rounded-full hover:bg-gray-100">
                    <FaBell className="h-6 w-6 text-gray-600" />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsLangDropdownOpen(prev => !prev)}
                        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                        aria-label={t('changeLanguage')}
                        onBlur={() => setTimeout(() => setIsLangDropdownOpen(false), 200)}
                    >
                        <FaGlobe className="h-6 w-6 text-gray-600" />
                    </button>
                    {isLangDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10"
                        >
                            <p onClick={() => onLangChange('en')} className={`block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer`}>English</p>
                            <p onClick={() => onLangChange('hs')} className={`block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer`}>Hausa</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Image src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}?format=png`} alt="User" className="h-10 w-10 rounded-full" width={40} height={40} />
                </div>
            </div>
        </header>
    )
}

export default Header