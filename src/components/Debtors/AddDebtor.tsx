import React from 'react'
import { Button, Modal, NumberInput, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useTranslations } from 'next-intl'

const AddDebtor: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('debtorsPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('addModal.title')} centered>
                <form className="space-y-2 pb-2">
                    <TextInput
                        label={t('addModal.customerName')}
                        placeholder={t('addModal.customerName')}
                        name="customerName"
                    />
                    <NumberInput
                        label={t('addModal.amountOwed')}
                        placeholder={t('addModal.amountOwed')}
                        hideControls
                        prefix='₦'
                        name="amountOwed"
                    />
                    <DatePickerInput
                        label={t('addModal.debtDate')}
                        placeholder={t('addModal.debtDate')}
                        name="debtDate"
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

export default AddDebtor