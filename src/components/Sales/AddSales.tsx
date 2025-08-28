import React from 'react'
import { Button, Modal, NumberInput, Select } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { DatePickerInput } from '@mantine/dates'

const AddSales: React.FC<{ opened: boolean, close: () => void }> = ({ opened, close }) => {
    const t = useTranslations('salesPage')
    return (
        <>
            <Modal opened={opened} onClose={close} title={t('modal.title')} centered>
                <form className="space-y-2 pb-2">
                    <div className=''>
                        <div>
                            <Select
                                label={t('modal.product')}
                                placeholder={t('modal.selectVariant')}
                                data={[]}
                                searchable
                                clearable
                                name="product"
                                style={{ width: '100%' }}
                            />
                            <div className='flex gap-2 items-center justify-between mt-2'>
                                <NumberInput
                                    label={t('modal.quantity')}
                                    placeholder={t('modal.quantity')}
                                    hideControls
                                    name="quantity"
                                    style={{ width: '100%' }}
                                />
                                <NumberInput
                                    label={t('modal.finalPrice')}
                                    placeholder={t('modal.finalPrice')}
                                    hideControls
                                    name="price"
                                    style={{ width: '100%' }}
                                    prefix='₦'
                                />
                            </div>
                        </div>
                        <p className='text-sm text-[#F97316] text-right cursor-pointer mt-2'>{t('modal.addItem')}</p>
                    </div>
                    <div className='flex gap-2 items-center justify-between mt-2'>
                        <Select
                            label={t('modal.paymentMethod')}
                            placeholder={t('modal.paymentMethod')}
                            data={[]}
                            name="paymentMethod"
                            style={{ width: '100%' }}
                        />
                        <DatePickerInput
                            label={t('modal.saleDate')}
                            placeholder={t('modal.saleDate')}
                            name="saleDate"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                    >
                        {t('modal.recordButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddSales