import { Button, Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'

const DeleteProduct: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('inventoryPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('confirmDelete.title')} centered>
                <p>{t('confirmDelete.message', {name: 'Product Name'})}</p>
                <div className='flex gap-2 items-center justify-end mt-4'>
                    <Button style={{width: '100%', borderColor: '#F97316', color: '#F97316'}} variant='outline' onClick={close}>{t('confirmDelete.cancel')}</Button>
                    <Button style={{width: '100%', backgroundColor: '#F97316'}} variant='filled' onClick={close}>{t('confirmDelete.delete')}</Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteProduct