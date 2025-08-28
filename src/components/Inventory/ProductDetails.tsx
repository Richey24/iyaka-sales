import { Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Category, Product } from '@/utils/validation'
import { formatPriceString } from '@/utils/helper'

const ProductDetails = ({opened, close, product}: {opened: boolean, close: () => void, product: Product & {category: Category}}) => {
    const t = useTranslations('inventoryPage')
  return (
    <>
        <Modal opened={opened} onClose={close} title={t('modal.productDetails')} centered>
            <div className='space-y-2'>
                <div className='flex justify-between'>
                    <p className='font-bold text-[14px]'>{t('modal.productName')}</p>
                    <p className='text-[14px]'>{product?.name}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-bold text-[14px]'>{t('modal.category')}</p>
                    <p className='text-[14px]'>{product?.category?.name}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-bold text-[14px]'>{t('modal.detailsBrandName')}</p>
                    <p className='text-[14px]'>{product?.brand}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-bold text-[14px]'>{t('modal.lowStockThreshold')}</p>
                    <p className='text-[14px]'>{product?.lowStockLimit}</p>
                </div>
                <div className='flex flex-col gap-2 justify-between border-t border-gray-200 pt-2'>
                    <div className='flex justify-between w-full'>
                        <p className='w-1/3 font-bold text-[14px]'>{t('modal.variants')}</p>
                        <p className='w-1/3 font-bold text-[14px]'>{t('modal.stock')}</p>
                        <p className='w-1/3 font-bold text-[14px]'>{t('modal.price')}</p>
                    </div>
                    {
                        product?.variants?.map((variant) => (
                            <div key={variant._id} className='flex justify-between w-full'>
                                <p className='w-1/3 text-[14px]'>{variant.variantName}</p>
                                <p className='w-1/3 text-[14px]'>{variant.stock}</p>
                                <p className='w-1/3 text-[14px]'>{formatPriceString(variant.price)}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal>
    </>
  )
}

export default ProductDetails