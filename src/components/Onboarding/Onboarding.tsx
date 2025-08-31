'use client';
import { registerCompany } from '@/api/company';
import { getBusinessTypeOptions, kanoLGAs, kanoMarkets, kanoMarketsWithLga } from '@/utils/onboarding';
import { Button, Select, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react'
import { enqueueSnackbar } from 'notistack';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

const Register = () => {
    const t = useTranslations('onboardingPage');
    const [formData, setFormData] = useState({
        businessType: '',
        locationLGA: '',
        locationMarket: '',
        businessName: '',
    });
    const availableMarkets = useMemo(() => {
        if (!formData.locationLGA) return [];
        const markets = kanoMarkets[formData.locationLGA] || [`${formData.locationLGA} Town`];
        return [...markets, 'Other/Not in a major market'];
    }, [formData.locationLGA]);
    const businessTypeOptions = getBusinessTypeOptions(t);
    const { user } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState('');
    const [selectedLGA, setSelectedLGA] = useState('');
    const router = useRouter();

    const handleMarketChange = (value: string) => {
        setSelectedMarket(value);
        if (value === 'My market is not listed') {
            setSelectedLGA('');
        } else {
            setSelectedLGA(kanoMarketsWithLga.find((market) => market.market === value)?.lga || '');
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = await registerCompany({
            name: formData.businessName,
            businessType: formData.businessType,
            address: selectedMarket === 'My market is not listed' ? formData.locationMarket : selectedMarket,
            businessArea: selectedMarket === 'My market is not listed' ? formData.locationLGA : selectedLGA,
        });
        if (response.success) {
            enqueueSnackbar('Company registered successfully', { variant: 'success' });
            router.push('/dashboard');
        } else {
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('completeProfile')}</h2>
                    <p className="text-gray-600 mb-6">{t('welcome', { email: user?.email || '' })}</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <TextInput
                            label={t('businessNameLabel')}
                            placeholder={t('businessNamePlaceholder')}
                            required
                            className='text-left'
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        />
                        <Select
                            label={t('businessTypeLabel')}
                            placeholder={t('businessTypePlaceholder')}
                            required
                            className='text-left'
                            data={Object.values(businessTypeOptions)}
                            searchable
                            nothingFoundMessage={t('businessTypeNotFound')}
                            value={formData.businessType}
                            onChange={(value) => setFormData({ ...formData, businessType: value || '' })}
                        />
                        <Select
                            label={t('businessArea')}
                            placeholder={t('businessAreaPlaceholder')}
                            required
                            className='text-left'
                            data={kanoMarketsWithLga.map((market) => market.market)}
                            searchable
                            nothingFoundMessage={t('businessMarketNotFound')}
                            value={selectedMarket}
                            onChange={(value) => handleMarketChange(value || '')}
                        />
                        {selectedMarket !== 'My market is not listed' && selectedLGA && <TextInput
                            value={selectedLGA}
                            label={t('automatedLGA')}
                            readOnly
                            className='text-left'
                            styles={{
                                input: {
                                    backgroundColor: '#fff',
                                    opacity: 1,
                                }
                            }}
                        />}
                        {
                            selectedMarket === 'My market is not listed' && (
                                <>
                                    <Select
                                        label={t('businessAddressLabel')}
                                        placeholder={t('businessAddressPlaceholder')}
                                        required
                                        className='text-left'
                                        data={kanoLGAs}
                                        searchable
                                        nothingFoundMessage={t('businessLocationNotFound')}
                                        value={formData.locationLGA}
                                        onChange={(value) => setFormData({ ...formData, locationLGA: value || '' })}
                                    />
                                    <Select
                                        label={t('businessArea')}
                                        placeholder={t('businessAreaPlaceholder')}
                                        required
                                        className='text-left'
                                        data={availableMarkets}
                                        searchable
                                        nothingFoundMessage={t('businessMarketNotFound')}
                                        value={formData.locationMarket}
                                        onChange={(value) => setFormData({ ...formData, locationMarket: value || '' })}
                                        disabled={!formData.locationLGA}
                                    />
                                </>
                            )
                        }
                        <Button
                            type="submit"
                            style={{ width: '100%', backgroundColor: '#1E293B', marginTop: '10px' }}
                            loading={loading}
                            disabled={loading}
                        >
                            {t('completeSetup')}
                        </Button>
                    </form>
                </div>
                <p className="text-sm text-gray-500 mt-8">{t('poweredBy')}</p>
            </div>
        </div>
    )
}

export default Register