'use client';
import React, { useState } from 'react';
import { FaUser, FaBuilding, FaLock, FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import Card from '../Dashboard/Card';
import { useTranslations } from 'next-intl';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('personal');
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const t = useTranslations('settingsPage');
    const [personalData, setPersonalData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+234 801 234 5678'
    });

    const [businessData, setBusinessData] = useState({
        businessName: 'Iyaka Sales Ltd',
        businessAddress: '123 Business Street, Lagos, Nigeria',
        businessPhone: '+234 801 234 5678',
        businessEmail: 'info@iyakasales.com',
        taxId: 'NG123456789'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePersonalChange = (field: string, value: string) => {
        setPersonalData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBusinessChange = (field: string, value: string) => {
        setBusinessData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = (section: string) => {
        // Here you would typically make an API call to save the data
        if (section === 'personal') {
            console.log('Saving personal data:', personalData);
        } else if (section === 'business') {
            console.log('Saving business data:', businessData);
        } else if (section === 'password') {
            console.log('Saving password data:', passwordData);
        }
        setIsEditing(null);
    };

    const handleCancel = () => {
        setIsEditing(null);
    };

    const renderPersonalSection = () => (
        <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <FaUser className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{t('personalInfo')}</h3>
                        <p className="text-gray-600">{t('personalInfoSubtitle')}</p>
                    </div>
                </div>
                {isEditing !== 'personal' && (
                    <button
                        onClick={() => setIsEditing('personal')}
                        className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors cursor-pointer"
                    >
                        <FaEdit className="h-4 w-4 mr-2" />
                        {t('edit')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('firstName')}</label>
                    {isEditing === 'personal' ? (
                        <input
                            type="text"
                            value={personalData.firstName}
                            onChange={(e) => handlePersonalChange('firstName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{personalData.firstName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('lastName')}</label>
                    {isEditing === 'personal' ? (
                        <input
                            type="text"
                            value={personalData.lastName}
                            onChange={(e) => handlePersonalChange('lastName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{personalData.lastName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')}</label>
                    {isEditing === 'personal' ? (
                        <input
                            type="email"
                            value={personalData.email}
                            onChange={(e) => handlePersonalChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{personalData.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')}</label>
                    {isEditing === 'personal' ? (
                        <input
                            type="tel"
                            value={personalData.phone}
                            onChange={(e) => handlePersonalChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{personalData.phone}</p>
                    )}
                </div>
            </div>

            {isEditing === 'personal' && (
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                    >
                        <FaTimes className="h-4 w-4 mr-2" />
                        {t('cancel')}
                    </button>
                    <button
                        onClick={() => handleSave('personal')}
                        className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors cursor-pointer"
                    >
                        <FaSave className="h-4 w-4 mr-2" />
                        {t('saveChanges')}
                    </button>
                </div>
            )}
        </Card>
    );

    const renderBusinessSection = () => (
        <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <FaBuilding className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{t('businessInfo')}</h3>
                        <p className="text-gray-600">{t('businessInfoSubtitle')}</p>
                    </div>
                </div>
                {isEditing !== 'business' && (
                    <button
                        onClick={() => setIsEditing('business')}
                        className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors cursor-pointer"
                    >
                        <FaEdit className="h-4 w-4 mr-2" />
                        {t('edit')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('businessName')}</label>
                    {isEditing === 'business' ? (
                        <input
                            type="text"
                            value={businessData.businessName}
                            onChange={(e) => handleBusinessChange('businessName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{businessData.businessName}</p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('businessAddress')}</label>
                    {isEditing === 'business' ? (
                        <textarea
                            value={businessData.businessAddress}
                            onChange={(e) => handleBusinessChange('businessAddress', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{businessData.businessAddress}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('businessPhone')}</label>
                    {isEditing === 'business' ? (
                        <input
                            type="tel"
                            value={businessData.businessPhone}
                            onChange={(e) => handleBusinessChange('businessPhone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{businessData.businessPhone}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('businessEmail')}</label>
                    {isEditing === 'business' ? (
                        <input
                            type="email"
                            value={businessData.businessEmail}
                            onChange={(e) => handleBusinessChange('businessEmail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{businessData.businessEmail}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('taxId')}</label>
                    {isEditing === 'business' ? (
                        <input
                            type="text"
                            value={businessData.taxId}
                            onChange={(e) => handleBusinessChange('taxId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        />
                    ) : (
                        <p className="text-gray-900">{businessData.taxId}</p>
                    )}
                </div>
            </div>

            {isEditing === 'business' && (
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                    >
                        <FaTimes className="h-4 w-4 mr-2" />
                        {t('cancel')}
                    </button>
                    <button
                        onClick={() => handleSave('business')}
                        className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors cursor-pointer"
                    >
                        <FaSave className="h-4 w-4 mr-2" />
                        {t('saveChanges')}
                    </button>
                </div>
            )}
        </Card>
    );

    const renderPasswordSection = () => (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-100 rounded-lg">
                        <FaLock className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{t('password')}</h3>
                        <p className="text-gray-600">{t('passwordSubtitle')}</p>
                    </div>
                </div>
                {isEditing !== 'password' && (
                    <button
                        onClick={() => setIsEditing('password')}
                        className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors cursor-pointer"
                    >
                        <FaEdit className="h-4 w-4 mr-2" />
                        {t('changePassword')}
                    </button>
                )}
            </div>

            {isEditing === 'password' ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <FaEyeSlash className="h-4 w-4 text-gray-400" /> : <FaEye className="h-4 w-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showNewPassword ? <FaEyeSlash className="h-4 w-4 text-gray-400" /> : <FaEye className="h-4 w-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showConfirmPassword ? <FaEyeSlash className="h-4 w-4 text-gray-400" /> : <FaEye className="h-4 w-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={handleCancel}
                            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                        >
                            <FaTimes className="h-4 w-4 mr-2" />
                            {t('cancel')}
                        </button>
                        <button
                            onClick={() => handleSave('password')}
                            className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors cursor-pointer"
                        >
                            <FaSave className="h-4 w-4 mr-2" />
                            {t('updatePassword')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FaLock className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">{t('passwordLastChanged')}</p>
                    <p className="text-sm text-gray-500 mt-2">{t('passwordRecommendation')}</p>
                </div>
            )}
        </Card>
    );

    return (
        <div className="w-full mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveSection('personal')}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                        activeSection === 'personal'
                            ? 'bg-white text-brand-accent shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    {t('personal')}
                </button>
                <button
                    onClick={() => setActiveSection('business')}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                        activeSection === 'business'
                            ? 'bg-white text-brand-accent shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    {t('business')}
                </button>
                <button
                    onClick={() => setActiveSection('password')}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                        activeSection === 'password'
                            ? 'bg-white text-brand-accent shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    {t('password')}
                </button>
            </div>

            {activeSection === 'personal' && renderPersonalSection()}
            {activeSection === 'business' && renderBusinessSection()}
            {activeSection === 'password' && renderPasswordSection()}
        </div>
    );
};

export default Settings;