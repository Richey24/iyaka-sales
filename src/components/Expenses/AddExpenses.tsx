import React, { useState } from 'react'
import { Button, Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useTranslations } from 'next-intl'
import { enqueueSnackbar } from 'notistack'
import { formatPrice } from '@/utils/helper'
import { addExpense, updateExpense } from '@/api/expenses'
import { Expense } from '@/utils/validation'

const AddExpenses: React.FC<{ opened: boolean, close: () => void, expense: Expense | null, fetchExpenses: () => void }> = ({ opened, close, expense, fetchExpenses }) => {
    const t = useTranslations('expensesPage')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const expenseData = Object.fromEntries(formData)
        if (!expenseData.category || !expenseData.date) {
            enqueueSnackbar(t('alerts.fillAllFields'), { variant: 'warning' })
            return
        }
        const body = {
            description: expenseData.description as string,
            category: expenseData.category as string,
            amount: formatPrice(expenseData.amount as string),
            expenseDate: new Date(expenseData.date as string),
        }
        setLoading(true)
        let response
        if (expense) {
            response = await updateExpense(expense._id!, body)
        } else {
            response = await addExpense(body)
        }
        if (response.success) {
            enqueueSnackbar(t('modal.success'), { variant: 'success' })
            close()
            fetchExpenses()
        } else {
            enqueueSnackbar(t('modal.error'), { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={expense ? t('modal.editTitle') : t('modal.addTitle')} centered>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <TextInput
                        label={t('modal.description')}
                        placeholder={t('modal.description')}
                        name="description"
                        required
                        defaultValue={expense?.description}
                    />
                    <div className='flex gap-2 items-center justify-between mt-2'>
                        <Select
                            label={t('modal.category')}
                            placeholder={t('modal.category')}
                            required
                            name="category"
                            data={[
                                { label: t('categories.maintenanceRepairs'), value: 'Maintenance/Repairs' },
                                { label: t('categories.salariesWages'), value: 'Salaries/Wages' },
                                { label: t('categories.utilities'), value: 'Utilities' },
                                { label: t('categories.supplies'), value: 'Supplies' },
                                { label: t('categories.rent'), value: 'Rent' },
                                { label: t('categories.other'), value: 'Other' },
                            ]}
                            defaultValue={expense?.category}
                            style={{ width: '100%' }}
                        />
                        <NumberInput
                            label={t('modal.amount')}
                            placeholder={t('modal.amount')}
                            hideControls
                            required
                            prefix='₦'
                            name="amount"
                            defaultValue={expense?.amount}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <DatePickerInput
                        label={t('modal.date')}
                        placeholder={t('modal.date')}
                        required
                        name="date"
                        defaultValue={expense?.expenseDate}
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                        disabled={loading}
                        loading={loading}
                    >
                        {expense ? t('modal.updateButton') : t('modal.addButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddExpenses