'use client'
import React, { useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Table, TextInput } from '@mantine/core'
import { FaDollarSign, FaSearch } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddDebtor from './AddDebtor'
import RecordPayment from './RecordPayment'

const Debtors = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [addDebtorModal, setAddDebtorModal] = useState(false)
    const [recordPaymentModal, setRecordPaymentModal] = useState(false)
    return (
        <div className="space-y-6 p-6">
            <PageHeader title={t('sidebar.debtors')} onAdd={() => setAddDebtorModal(true)} addText={t('debtorsPage.addManualDebtor')} canExport={true} onExport={() => { }} />
            <Card>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <TextInput
                        placeholder={t('debtorsPage.searchPlaceholder')}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={`pl-10`}
                    />
                </div>
            </Card>
            <Card>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('debtorsPage.table.customerName')}</Table.Th>
                            <Table.Th>{t('debtorsPage.table.totalOwed')}</Table.Th>
                            <Table.Th>{t('debtorsPage.table.amountPaid')}</Table.Th>
                            <Table.Th>{t('debtorsPage.table.balance')}</Table.Th>
                            <Table.Th>{t('debtorsPage.table.status')}</Table.Th>
                            <Table.Th>{t('debtorsPage.table.actions')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>John Doe</Table.Td>
                            <Table.Td>₦100</Table.Td>
                            <Table.Td>₦50</Table.Td>
                            <Table.Td>₦50</Table.Td>
                            <Table.Td><div className='px-[8px] py-[2px] rounded-[50px] bg-[#F97316] text-white flex items-center gap-2 justify-center w-fit text-[12px]'>Active</div></Table.Td>
                            <Table.Td>
                                <div className="flex items-center gap-2 justify-center bg-green-500 text-white px-2 py-2 rounded-md cursor-pointer max-w-[160px]" onClick={() => setRecordPaymentModal(true)}>
                                    <FaDollarSign className="text-white cursor-pointer" size={20} />
                                    <p className='text-white cursor-pointer text-sm'>Record Payment</p>
                                </div>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card>
            <AddDebtor opened={addDebtorModal} close={() => setAddDebtorModal(false)} />
            <RecordPayment opened={recordPaymentModal} close={() => setRecordPaymentModal(false)} />
        </div>
    )
}

export default Debtors