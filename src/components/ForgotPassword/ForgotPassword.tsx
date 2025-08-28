import { Button, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'

const ForgotPassword = () => {
    const t = useTranslations('loginPage');
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-primary p-4">
            <div className="w-full max-w-lg text-center">
                <h1 className="text-5xl font-bold text-white mb-2">{t('title')}</h1>
                <p className="text-white mb-8">{t('subtitle')}</p>
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('formTitleForgotPassword')}</h2>
                    <form className="space-y-4">
                        <TextInput
                            label={t('emailLabel')}
                            placeholder={t('emailLabel')}
                            required
                            className='text-left'
                        />
                        <Button
                            type="submit"
                            style={{ width: '100%', backgroundColor: '#1E293B', marginTop: '10px' }}
                        >
                            {t('resetPasswordButton')}
                        </Button>
                    </form>
                    <p className="text-[12px] text-gray-600 text-right mt-1">
                        {t('backToLogin')}
                        <Link href="/" className="font-medium text-brand-accent hover:underline ml-1 cursor-pointer">
                            {t('loginLink')}
                        </Link>
                    </p>
                </div>
                <p className="text-sm text-gray-500 mt-8">{t('poweredBy')}</p>
            </div>
        </div>
    )
}

export default ForgotPassword