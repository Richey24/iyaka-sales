import React, { useEffect, useState } from 'react'
import { Button, Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaTrash } from 'react-icons/fa'
import { Category } from '@/utils/validation'
import { getCategories } from '@/api/category'
import { addProduct } from '@/api/products'
import { enqueueSnackbar } from 'notistack'
import { formatPrice } from '@/utils/helper'

const AddProduct: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('inventoryPage')
    const [variantCount, setVariantCount] = useState(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchCategories = async () => {
        const response = await getCategories()
        if (response.success) {
            setCategories(response.data?.categories || [])
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const category = formData.get('category') as string
        const productName = formData.get('productName') as string
        const brandName = formData.get('brandName') as string
        const lowStockThreshold = Number(formData.get('lowStockThreshold'))
        const variants = Array.from({ length: variantCount }).map((_, index) => ({
            variantName: formData.get(`variantName-${index}`) as string,
            stock: Number(formData.get(`stock-${index}`)),
            price: formatPrice(formData.get(`price-${index}`) as string)   
        }))
        const body = {
            name: productName,
            brand: brandName,
            category,
            lowStockLimit: lowStockThreshold,
            variants
        }
        setLoading(true)
        const response = await addProduct(body)
        if (response.success) {
            close()
            enqueueSnackbar(t('modal.addSuccess'), { variant: 'success' })
        } else {
            enqueueSnackbar(t('modal.addError'), { variant: 'error' })
        }
        setLoading(false)
    }
    
    
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('modal.addTitle')} centered>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <Select
                        label={t('modal.category')}
                        placeholder={t('modal.selectCategory')}
                        data={categories.map((category) => ({ label: category.name, value: category._id || '' }))}
                        name="category"
                        required
                        searchable
                    />
                    <TextInput
                        label={t('modal.productName')}
                        placeholder={t('modal.productName')}
                        required
                        name="productName"
                    />
                    <TextInput
                        label={t('modal.brandName')}
                        placeholder={t('modal.brandName')}
                        required
                        name="brandName"
                    />
                    <NumberInput
                        label={t('modal.lowStockThreshold')}
                        placeholder={t('modal.lowStockThreshold')}
                        hideControls
                        required
                        name="lowStockThreshold"
                    />
                    <div className='border-t border-gray-200 pt-2 mt-4'>
                        <p className='text-[18px] font-medium'>{t('modal.variants')}</p>
                        {
                            Array.from({ length: variantCount }).map((_, index) => (
                                <div key={index} className='flex gap-2 items-center justify-between mt-3 relative'>
                                    <TextInput
                                        label={t('modal.variantName')}
                                        placeholder={t('modal.variantName')}
                                        name={`variantName-${index}`}
                                        required
                                    />
                                    <NumberInput
                                        label={t('modal.stock')}
                                        placeholder={t('modal.stock')}
                                        hideControls
                                        name={`stock-${index}`}
                                        required
                                    />
                                    <NumberInput
                                        label={t('modal.price')}
                                        placeholder={t('modal.price')}
                                        hideControls
                                        prefix='₦'
                                        name={`price-${index}`}
                                        required
                                        thousandSeparator=','
                                    />
                                    {index > 0 && (
                                        <FaTrash
                                            className='absolute right-0 top-0 text-red-500 cursor-pointer'
                                            onClick={() => setVariantCount(variantCount - 1)}
                                        />
                                    )}
                                </div>
                            ))
                        }
                        <p className='text-sm text-[#F97316] text-right cursor-pointer mt-2' onClick={() => setVariantCount(variantCount + 1)}>+ {t('modal.addVariant')}</p>
                        <Button
                            type="submit"
                            style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? t('modal.adding') : t('modal.addButton')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddProduct