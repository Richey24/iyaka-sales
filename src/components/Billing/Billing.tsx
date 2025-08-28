'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'

const Billing = () => {
    const t = useTranslations('')
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
    const [isProcessingPayment, setIsProcessingPayment] = useState<string | null>(null);

    const handlePayment = (plan: string) => {
        setIsProcessingPayment(plan)
    }

    const plans = {
        free: {
            name: t('pricingPage.plans.free.name'),
            price: t('pricingPage.plans.free.price'),
            priceDetails: t('pricingPage.plans.free.priceDetails'),
            target: t('pricingPage.plans.free.target'),
            features: [
                t('pricingPage.features.inventoryLimit'),
                t('pricingPage.features.salesExpenseLimit'),
                t('pricingPage.features.debtTracking'),
                t('pricingPage.features.basicDashboard'),
            ],
            buttonText: t('pricingPage.currentPlan'),
            buttonAction: () => { },
            isCurrent: true,
            planEnum: 'free'
        },
        growth: {
            name: t('pricingPage.plans.growth.name'),
            price: billingCycle === 'monthly' ? t('pricingPage.plans.growth.price') : t('pricingPage.plans.growth.annualPrice'),
            priceDetails: billingCycle === 'monthly' ? t('pricingPage.plans.growth.priceDetails') : ` / ${t('pricingPage.annually').toLowerCase()}`,
            target: t('pricingPage.plans.growth.target'),
            features: [
                t('pricingPage.features.unlimitedInventory'),
                t('pricingPage.features.unlimitedSalesExpense'),
                t('pricingPage.features.debtTracking'),
                t('pricingPage.features.fullDashboard'),
                t('pricingPage.features.exportData'),
            ],
            buttonText: t('pricingPage.upgrade'),
            buttonAction: () => handlePayment('growth'),
            isCurrent: false,
            planEnum: 'growth'
        },
        premium: {
            name: t('pricingPage.plans.premium.name'),
            price: billingCycle === 'monthly' ? t('pricingPage.plans.premium.price') : t('pricingPage.plans.premium.annualPrice'),
            priceDetails: billingCycle === 'monthly' ? t('pricingPage.plans.premium.priceDetails') : ` / ${t('pricingPage.annually').toLowerCase()}`,
            target: t('pricingPage.plans.premium.target'),
            features: [
                t('pricingPage.features.unlimitedInventory'),
                t('pricingPage.features.unlimitedSalesExpense'),
                t('pricingPage.features.fullDashboard'),
                t('pricingPage.features.exportData'),
                t('pricingPage.features.multiUser'),
                t('pricingPage.features.advancedReporting'),
                t('pricingPage.features.prioritySupport'),
            ],
            buttonText: t('pricingPage.upgrade'),
            buttonAction: () => handlePayment('premium'),
            isCurrent: false,
            planEnum: 'premium'
        },
    };

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{t('pricingPage.title')}</h1>
                    <p className="mt-4 text-xl text-gray-600">{t('pricingPage.subtitle')}</p>
                </div>

                <div className="mt-10 flex justify-center items-center">
                    <span className="text-gray-700 font-medium">{t('pricingPage.monthly')}</span>
                    <button
                        type="button"
                        className={`${billingCycle === 'annually' ? 'bg-brand-accent' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent mx-4`}
                        role="switch"
                        aria-checked={billingCycle === 'annually'}
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annually' : 'monthly')}
                    >
                        <span aria-hidden="true" className={`${billingCycle === 'annually' ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                    <span className="text-gray-700 font-medium">{t('pricingPage.annually')}</span>
                    <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {t('pricingPage.saveTwoMonths')}
                    </span>
                </div>

                <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    {Object.values(plans).map(plan => (
                        <div key={plan.name} className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${plan.isCurrent ? 'border-brand-accent border-2' : 'border-gray-200'}`}>
                            {plan.isCurrent && <span className="bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full absolute top-0 -translate-y-1/2">{t('pricingPage.currentPlan')}</span>}
                            <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                            <p className="mt-4 text-gray-500">{plan.target}</p>
                            <div className="mt-6">
                                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                <span className="text-base font-medium text-gray-500">{plan.priceDetails}</span>
                            </div>

                            <ul className="mt-6 space-y-4 flex-1">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex space-x-3">
                                        <FaCheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={plan.buttonAction}
                                disabled={plan.isCurrent || isProcessingPayment !== null}
                                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${plan.isCurrent ? 'bg-gray-300 text-gray-500 cursor-default' : 'text-white bg-brand-accent hover:bg-brand-accent-hover'} disabled:bg-gray-400 disabled:cursor-wait flex items-center justify-center cursor-pointer`}
                            >
                                {isProcessingPayment === plan.planEnum ? (
                                    <>
                                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                                        {t('pricingPage.initiatingPayment')}
                                    </>
                                ) : plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Billing