import { Button, Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { User } from '@/utils/validation'
import { deleteUser } from '@/api/users'
import { enqueueSnackbar } from 'notistack'

const DeleteUser: React.FC<{ opened: boolean, close: () => void, user: User | null, fetchUsers: () => void }> = ({ opened, close, user, fetchUsers }) => {
    const t = useTranslations('teamPage')
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        const response = await deleteUser(user?._id as string)
        if (response.success) {
            enqueueSnackbar(t('confirmDelete.success'), { variant: 'success' })
            close()
            fetchUsers()
        } else {
            enqueueSnackbar(t('confirmDelete.error'), { variant: 'error' })
        }
        setLoading(false)
    }
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('confirmDelete.title')} centered>
                <p>{t('confirmDelete.message', { email: user?.email || '' })}</p>
                <div className='flex gap-2 items-center justify-end mt-4'>
                    <Button style={{ width: '100%', borderColor: '#F97316', color: '#F97316' }} variant='outline' onClick={close} disabled={loading}>{t('confirmDelete.cancel')}</Button>
                    <Button style={{ width: '100%', backgroundColor: '#F97316' }} variant='filled' onClick={handleDelete} loading={loading} disabled={loading}>{t('confirmDelete.delete')}</Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteUser