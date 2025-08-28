import React from 'react'
import { Button, Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useTranslations } from 'next-intl'

const AddExpenses: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('expensesPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('modal.addTitle')} centered>
                <form className="space-y-2 pb-2">
                    <TextInput
                        label={t('modal.description')}
                        placeholder={t('modal.description')}
                        name="description"
                    />
                    <div className='flex gap-2 items-center justify-between mt-2'>
                        <Select
                            label={t('modal.category')}
                            placeholder={t('modal.category')}
                            name="category"
                            data={[]}
                            style={{ width: '100%' }}
                        />
                        <NumberInput
                            label={t('modal.amount')}
                            placeholder={t('modal.amount')}
                            hideControls
                            prefix='₦'
                            name="amount"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <DatePickerInput
                        label={t('modal.date')}
                        placeholder={t('modal.date')}
                        name="date"
                    />
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                    >
                        {t('modal.addButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddExpenses