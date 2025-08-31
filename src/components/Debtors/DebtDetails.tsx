import { Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'
import type { Debtor } from '@/utils/validation'
import { formatPriceString } from '@/utils/helper'

const DebtDetails = ({ opened, close, debtor }: { opened: boolean, close: () => void, debtor: Debtor }) => {
    const t = useTranslations('debtorsPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('debtDetails.title')} centered size='lg'>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('debtDetails.debtDate')}</p>
                        <p className='text-[14px]'>{new Date(debtor?.debtDate)?.toLocaleDateString()}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('debtDetails.customerName')}</p>
                        <p className='text-[14px]'>{debtor?.name}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('debtDetails.totalDebt')}</p>
                        <p className='text-[14px]'>{formatPriceString(debtor?.totalDebt || 0)}</p>
                    </div>
                    <div className='flex flex-col gap-2 justify-between border-t border-gray-200 pt-2'>
                        <div className='flex justify-between w-full'>
                            <p className='w-1/3 font-bold text-[14px]'>{t('debtDetails.paymentDate')}</p>
                            <p className='w-1/3 font-bold text-[14px] text-center'>{t('debtDetails.amount')}</p>
                        </div>
                        {
                            debtor?.paymentHistory?.length === 0 ? (
                                <div className='flex justify-center w-full'>
                                    <p className='text-[14px] text-center'>{t('debtDetails.noPayments')}</p>
                                </div>
                            ) : (
                                <>
                                    {
                                        debtor?.paymentHistory?.map((item) => (
                                            <div key={item.date?.toString()} className='flex justify-between w-full'>
                                                <p className='w-1/3 text-[14px]'>{new Date(item.date)?.toLocaleDateString()}</p>
                                                <p className='w-1/3 text-[14px] text-center'>{formatPriceString(item.amount || 0)}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DebtDetails