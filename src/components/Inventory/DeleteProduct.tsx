import { Button, Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Category, Product } from '@/utils/validation'
import { deleteProduct } from '@/api/products'
import { enqueueSnackbar } from 'notistack'

const DeleteProduct: React.FC<{ opened: boolean, close: () => void, selectedProduct: Product & { _id: string, category: Category }, fetchProducts: (page: number, search: string) => void }> = ({ opened, close, selectedProduct, fetchProducts }) => {
    const t = useTranslations('inventoryPage')
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        const response = await deleteProduct(selectedProduct._id!)
        if (response.success) {
            close()
            enqueueSnackbar(t('modal.deleteSuccess'), { variant: 'success' })
            fetchProducts(1, '')
        } else {
            enqueueSnackbar(response.data?.message, { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={t('confirmDelete.title')} centered>
                <p>{t('confirmDelete.message', {name: selectedProduct?.name})}</p>
                <div className='flex gap-2 items-center justify-end mt-4'>
                    <Button style={{width: '100%', borderColor: '#F97316', color: '#F97316'}} variant='outline' onClick={close} disabled={loading}>{t('confirmDelete.cancel')}</Button>
                    <Button style={{width: '100%', backgroundColor: '#F97316'}} variant='filled' onClick={handleDelete} loading={loading} disabled={loading}>{t('confirmDelete.delete')}</Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteProduct