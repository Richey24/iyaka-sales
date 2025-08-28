import { Button, Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Category } from '@/utils/validation'
import { deleteCategory } from '@/api/category'
import { enqueueSnackbar } from 'notistack'

const DeleteCategory: React.FC<{ opened: boolean, close: () => void, selectedCategory: Category, fetchCategories: (page: number, search: string) => void }> = ({ opened, close, selectedCategory, fetchCategories }) => {
    const t = useTranslations('categoryPage')
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        const response = await deleteCategory(selectedCategory._id!);
        if (response.success) {
            close();
            enqueueSnackbar(t('categoryDeleted'), { variant: 'success' });
            fetchCategories(1, '');
        } else {
            enqueueSnackbar(response.data?.message, { variant: 'error' });
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={t('confirmDelete.title')} centered>
                <p>{t('confirmDelete.message', { name: selectedCategory?.name })}</p>
                <div className='flex gap-2 items-center justify-end mt-4'>
                    <Button style={{width: '100%', borderColor: '#F97316', color: '#F97316'}} variant='outline' onClick={close} disabled={loading}>{t('confirmDelete.cancel')}</Button>
                    <Button style={{width: '100%', backgroundColor: '#F97316'}} variant='filled' onClick={handleDelete} loading={loading} disabled={loading}>{t('confirmDelete.delete')}</Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteCategory