import { Button, Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import type { Sales } from '@/utils/validation'
import { enqueueSnackbar } from 'notistack'
import { deleteSales } from '@/api/sales'

const DeleteSale: React.FC<{ opened: boolean, close: () => void, sale: Sales }> = ({ opened, close, sale }) => {
    const t = useTranslations('salesPage')
    const [loading, setLoading] = useState(false)
    
    const handleDelete = async () => {
        setLoading(true)
        const response = await deleteSales(sale._id!)
        if (response.success) {
            enqueueSnackbar(t('confirmDelete.success'), { variant: 'success' })
            close()
        } else {
            enqueueSnackbar(t('confirmDelete.error'), { variant: 'error' })
        }
        setLoading(false)
    }
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('confirmDelete.title')} centered>
                <p>{t('confirmDelete.message')}</p>
                <div className='flex gap-2 items-center justify-end mt-4'>
                    <Button style={{width: '100%', borderColor: '#F97316', color: '#F97316'}} variant='outline' onClick={close} disabled={loading}>{t('confirmDelete.cancel')}</Button>
                    <Button style={{width: '100%', backgroundColor: '#F97316'}} variant='filled' onClick={handleDelete} loading={loading} disabled={loading}>{t('confirmDelete.delete')}</Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteSale