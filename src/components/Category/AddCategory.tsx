import React, { useState } from 'react'
import { Button, Modal, TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { addCategory, updateCategory } from '@/api/category'
import { enqueueSnackbar } from 'notistack'
import { Category } from '@/utils/validation'

const AddCategory: React.FC<{ opened: boolean, close: () => void, fetchCategories: (page: number, search: string) => void, selectedCategory?: Category }> = ({ opened, close, fetchCategories, selectedCategory }) => {
    const t = useTranslations('categoryPage')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const category = {
            name: formData.get('categoryName') as string,
        }
        let response;
        if (selectedCategory?._id) {
            response = await updateCategory(selectedCategory._id, category);
        } else {
            response = await addCategory(category);
        }
        if (response.success) {
            close();
            enqueueSnackbar(selectedCategory ? t('categoryUpdated') : t('categoryAdded'), { variant: 'success' });
            fetchCategories(1, '');
        } else {
            enqueueSnackbar(response.data?.message, { variant: 'error' });
        }
        setLoading(false);
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={selectedCategory?._id ? t('editTitle') : t('addTitle')} centered>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <TextInput
                        label={t('categoryName')}
                        placeholder={t('categoryName')}
                        name="categoryName"
                        required
                        defaultValue={selectedCategory?.name}
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                        loading={loading}
                        disabled={loading}
                    >
                        {selectedCategory?._id ? t('updateButton') : t('addButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddCategory