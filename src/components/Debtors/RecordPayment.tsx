import React, { useState } from 'react'
import { Button, Modal, NumberInput } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { DatePickerInput } from '@mantine/dates'
import { Debtor } from '@/utils/validation'
import { formatPrice, formatPriceString } from '@/utils/helper'
import { updateDebtor } from '@/api/debtor'
import { enqueueSnackbar } from 'notistack'

const RecordPayment: React.FC<{ opened: boolean, close: () => void, debtor: Debtor | null, fetchDebtors: () => void }> = ({ opened, close, debtor, fetchDebtors }) => {
    const t = useTranslations('debtorsPage')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const payment = Object.fromEntries(formData)
        if (!payment.paymentDate) {
            enqueueSnackbar(t('alerts.noDate'), { variant: 'warning' })
            return
        }
        const body = {
            totalPaid: formatPrice(payment.amountOwed as string) + (debtor?.totalPaid || 0),
            paymentHistory: [
                ...(debtor?.paymentHistory || []),
                {
                    amount: formatPrice(payment.amountOwed as string),
                    date: new Date(payment.paymentDate as string),
                }
            ]
        }
        setLoading(true)
        const response = await updateDebtor(debtor?._id as string, body)
        if (response.success) {
            enqueueSnackbar(t('paymentModal.success'), { variant: 'success' })
            close()
            fetchDebtors()
        } else {
            enqueueSnackbar(t('paymentModal.error'), { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={t('paymentModal.title', { name: debtor?.name || '' })} centered>
                <div className='space-y-2 mb-4 mt-2 border-y border-gray-200 py-4'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{t('paymentModal.totalDebt')}</p>
                        <p className='text-sm font-bold'>{formatPriceString(debtor?.totalDebt || 0)}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{t('paymentModal.amountPaid')}</p>
                        <p className='text-sm font-bold text-green-500'>{formatPriceString(debtor?.totalPaid || 0)}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{t('paymentModal.amountOwed')}</p>
                        <p className='text-sm font-bold text-red-500'>{formatPriceString((debtor?.totalDebt || 0) - (debtor?.totalPaid || 0) || 0)}</p>
                    </div>
                </div>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <NumberInput
                        label={t('paymentModal.amountPaid')}
                        placeholder={t('paymentModal.amountPaid')}
                        hideControls
                        prefix='₦'
                        required
                        name="amountOwed"
                    />
                    <DatePickerInput
                        label={t('paymentModal.paymentDate')}
                        placeholder={t('paymentModal.paymentDate')}
                        required
                        name="paymentDate"
                        defaultValue={new Date()}
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                        disabled={loading}
                        loading={loading}
                    >
                        {t('paymentModal.recordButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default RecordPayment