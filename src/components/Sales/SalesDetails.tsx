import { Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'
import type { Sales } from '@/utils/validation'
import { formatPriceString } from '@/utils/helper'

const SalesDetails = ({ opened, close, sale }: { opened: boolean, close: () => void, sale: Sales }) => {
    const t = useTranslations('salesPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('modal.saleDetails')} centered size='lg'>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('modal.saleDate')}</p>
                        <p className='text-[14px]'>{new Date(sale?.saleDate)?.toLocaleDateString()}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('modal.customer')}</p>
                        <p className='text-[14px]'>{sale?.customer}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('modal.paymentMethod')}</p>
                        <p className='text-[14px]'>{t(`filters.${sale?.paymentMethod}`)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold text-[14px]'>{t('modal.totalAmount')}</p>
                        <p className='text-[14px]'>{formatPriceString(sale?.totalAmount || 0)}</p>
                    </div>
                    <div className='flex flex-col gap-2 justify-between border-t border-gray-200 pt-2'>
                        <div className='flex justify-between w-full'>
                            <p className='w-1/3 font-bold text-[14px]'>{t('modal.productName')}</p>
                            <p className='w-1/3 font-bold text-[14px] text-center'>{t('modal.quantity')}</p>
                            <p className='w-1/3 font-bold text-[14px] text-center'>{t('modal.price')}</p>
                            <p className='w-1/3 font-bold text-[14px] text-center'>{t('modal.discount')}</p>
                        </div>
                        {
                            sale?.items.map((item) => (
                                <div key={item._id} className='flex justify-between w-full'>
                                    <p className='w-1/3 text-[14px]'>{item.productName}</p>
                                    <p className='w-1/3 text-[14px] text-center'>{item.quantity}</p>
                                    <p className='w-1/3 text-[14px] text-center'>{formatPriceString(item.price || 0)}</p>
                                    <p className='w-1/3 text-[14px] text-center'>{formatPriceString(item.discount || 0)}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SalesDetails