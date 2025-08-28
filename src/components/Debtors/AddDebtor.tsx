import React, { useState } from 'react'
import { Button, Modal, NumberInput, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useTranslations } from 'next-intl'
import { formatPrice } from '@/utils/helper'
import { addDebtor } from '@/api/debtor'
import { enqueueSnackbar } from 'notistack'

const AddDebtor: React.FC<{ opened: boolean, close: () => void, fetchDebtors: () => void }> = ({ opened, close, fetchDebtors }) => {
    const t = useTranslations('debtorsPage')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const debtor = Object.fromEntries(formData)
        const body = {
            name: debtor.name as string,
            totalDebt: formatPrice(debtor.totalDebt as string),
            debtDate: new Date(debtor.debtDate as string),
        }
        setLoading(true)
        const response = await addDebtor(body)
        if (response.success) {
            enqueueSnackbar(t('addModal.success'), { variant: 'success' })
            close()
            fetchDebtors()
        } else {
            enqueueSnackbar(t('addModal.error'), { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={t('addModal.title')} centered>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <TextInput
                        label={t('addModal.customerName')}
                        placeholder={t('addModal.customerName')}
                        name="name"
                    />
                    <NumberInput
                        label={t('addModal.amountOwed')}
                        placeholder={t('addModal.amountOwed')}
                        hideControls
                        prefix='₦'
                        name="totalDebt"
                    />
                    <DatePickerInput
                        label={t('addModal.debtDate')}
                        placeholder={t('addModal.debtDate')}
                        name="debtDate"
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                        disabled={loading}
                        loading={loading}
                    >
                        {t('addModal.addButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddDebtor