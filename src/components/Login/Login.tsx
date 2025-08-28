"use client"
import { login } from '@/api/auth';
import { Button, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react'
import { enqueueSnackbar } from 'notistack';
import { User } from '@/utils/validation';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

const Login = () => {
    const t = useTranslations('loginPage');
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserStore();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const body = {
            email: (e.target as HTMLFormElement).email.value,
            password: (e.target as HTMLFormElement).password.value
        }
        const response = await login(body);
        if (response.success) {
            setUser(response.data?.user as User);
            enqueueSnackbar('Login successful', { variant: 'success' });
            if (!response.data?.user?.companyId) {
                router.push('/onboarding');
            } else {
                router.push('/dashboard');
            }
        } else {
            console.log(response.data);
            enqueueSnackbar(response.data?.message, { variant: 'error' });
        }
        setLoading(false);
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-primary p-4">
            <div className="w-full max-w-lg text-center">
                <h1 className="text-5xl font-bold text-white mb-2">{t('title')}</h1>
                <p className="text-white mb-8">{t('subtitle')}</p>
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('formTitleLogin')}</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <TextInput
                            label={t('emailLabel')}
                            placeholder={t('emailLabel')}
                            required
                            name='email'
                            className='text-left'
                        />
                        <TextInput
                            label={t('passwordLabel')}
                            placeholder={t('passwordLabel')}
                            required
                            name='password'
                            className='text-left'
                        />
                        <Button
                            type="submit"
                            style={{ width: '100%', backgroundColor: '#1E293B', marginTop: '10px' }}
                            disabled={loading}
                            loading={loading}
                        >
                            {t('loginButton')}
                        </Button>
                    </form>
                    <p className="text-[12px] text-gray-600 text-right mt-1">
                        {t('forgotPassword')}
                        <Link href="/forgot-password" className="font-medium text-brand-accent hover:underline ml-1 cursor-pointer">
                            {t('forgotPasswordLink')}
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600 mt-6">
                        {t('dontHaveAccount')}
                        <Link href="/register" className="font-medium text-brand-accent hover:underline ml-1 cursor-pointer">
                            {t('signUpLink')}
                        </Link>
                    </p>
                </div>
                <p className="text-sm text-gray-500 mt-8">{t('poweredBy')}</p>
            </div>
        </div>
    )
}

export default Login