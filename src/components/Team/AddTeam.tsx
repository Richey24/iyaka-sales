import React from 'react'
import { Button, Modal, Select, TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'

const AddTeam: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('teamPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('addModal.title')} centered>
                <form className="space-y-2 pb-2">
                    <TextInput
                        label={t('addModal.emailLabel')}
                        placeholder={t('addModal.emailLabel')}
                        name="email"
                    />
                    <Select
                        label={t('addModal.role')}
                        placeholder={t('addModal.role')}
                        name="role"
                        data={[
                            { label: t('roles.admin'), value: 'admin' },
                            { label: t('roles.member'), value: 'member' }
                        ]}
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                    >
                        {t('addModal.addButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddTeam