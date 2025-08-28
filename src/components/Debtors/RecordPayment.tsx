import React from 'react'
import { Button, Modal, NumberInput } from '@mantine/core'
import { useTranslations } from 'next-intl'

const RecordPayment: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('debtorsPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('paymentModal.title', { name: 'John Doe' })} centered>
                <div className='space-y-2 mb-4 mt-2 border-y border-gray-200 py-4'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{t('paymentModal.totalDebt')}</p>
                        <p className='text-sm font-bold'>₦100,000.00</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{t('paymentModal.amountPaid')}</p>
                        <p className='text-sm font-bold text-green-500'>₦0.00</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{t('paymentModal.amountOwed')}</p>
                        <p className='text-sm font-bold text-red-500'>₦100,000.00</p>
                    </div>
                </div>
                <form className="space-y-2 pb-2">
                    <NumberInput
                        label={t('paymentModal.amountPaid')}
                        placeholder={t('paymentModal.amountPaid')}
                        hideControls
                        prefix='₦'
                        name="amountOwed"
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                    >
                        {t('paymentModal.recordButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default RecordPayment