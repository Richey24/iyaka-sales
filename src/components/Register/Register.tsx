"use client"
import { register } from '@/api/auth';
import { Button, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react'
import { enqueueSnackbar } from 'notistack';
import { useUserStore } from '@/store/userStore';
import { User } from '@/utils/validation';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const { setUser } = useUserStore();
    const t = useTranslations('loginPage');
    const [loading, setLoading] = useState(false);
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const password = (e.target as HTMLFormElement).password.value;
        const confirmPassword = (e.target as HTMLFormElement).confirmPassword.value;
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords do not match", { variant: "warning" });
            return;
        }
        setLoading(true);
        const body = {
            firstName: (e.target as HTMLFormElement).firstName.value,
            lastName: (e.target as HTMLFormElement).lastName.value,
            email: (e.target as HTMLFormElement).email.value,
            password: password,
        }
        const response = await register(body);
        if (response.success) {
            console.log(response.data);
            setUser(response.data?.user as User);
            enqueueSnackbar('Register successful', { variant: 'success' });
            router.push('/onboarding');
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('formTitleCreate')}</h2>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <TextInput
                            label={t('firstNameLabel')}
                            placeholder={t('firstNameLabel')}
                            required
                            className='text-left'
                            name='firstName'
                        />
                        <TextInput
                            label={t('lastNameLabel')}
                            placeholder={t('lastNameLabel')}
                            required
                            className='text-left'
                            name='lastName'
                        />
                        <TextInput
                            label={t('emailLabel')}
                            placeholder={t('emailLabel')}
                            required
                            className='text-left'
                            name='email'
                        />
                        <TextInput
                            label={t('passwordLabel')}
                            placeholder={t('passwordLabel')}
                            required
                            className='text-left'
                            name='password'
                        />
                        <TextInput
                            label={t('confirmPasswordLabel')}
                            placeholder={t('confirmPasswordLabel')}
                            required
                            className='text-left'
                            name='confirmPassword'
                        />
                        <Button
                            type="submit"
                            style={{ width: '100%', backgroundColor: '#1E293B', marginTop: '10px' }}
                            disabled={loading}
                            loading={loading}
                        >
                            {t('signUpButton')}
                        </Button>
                    </form>
                    <p className="text-sm text-gray-600 mt-6">
                        {t('alreadyHaveAccount')}
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

export default Register