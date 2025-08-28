import React, { useState } from 'react'
import { Button, Modal, Select, TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { addUser } from '@/api/users'
import { enqueueSnackbar } from 'notistack'
import { User } from '@/utils/validation'

const AddTeam: React.FC<{ opened: boolean, close: () => void, fetchUsers: () => void }> = ({ opened, close, fetchUsers }) => {
    const t = useTranslations('teamPage')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const user = Object.fromEntries(formData) as User
        setLoading(true)
        const response = await addUser(user)
        if (response.success) {
            enqueueSnackbar(t('addModal.success'), { variant: 'success' })
            close()
            fetchUsers()
        } else {
            enqueueSnackbar(response.data?.message || t('addModal.error'), { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={t('addModal.title')} centered>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <TextInput
                        label={t('addModal.firstNameLabel')}
                        placeholder={t('addModal.firstNameLabel')}
                        name="firstName"
                        required
                    />
                    <TextInput
                        label={t('addModal.lastNameLabel')}
                        placeholder={t('addModal.lastNameLabel')}
                        name="lastName"
                        required
                    />
                    <TextInput
                        label={t('addModal.emailLabel')}
                        placeholder={t('addModal.emailLabel')}
                        name="email"
                        required
                    />
                    <TextInput
                        label={t('addModal.passwordLabel')}
                        placeholder={t('addModal.passwordLabel')}
                        name="password"
                        required
                    />
                    <Select
                        label={t('addModal.role')}
                        placeholder={t('addModal.role')}
                        name="role"
                        data={[
                            { label: t('roles.admin'), value: 'admin' },
                            { label: t('roles.member'), value: 'user' }
                        ]}
                        required
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                        loading={loading}
                        disabled={loading}
                    >
                        {t('addModal.addButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddTeam