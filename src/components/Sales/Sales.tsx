'use client'
import React, { useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Select, Table, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddSales from './AddSales'
import DeleteSale from './DeleteSale'
const Sales = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [addSalesModal, setAddSalesModal] = useState(false)
    const [deleteSaleModal, setDeleteSaleModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<[string | null, string | null]>([null, null])

    return (
        <div className="space-y-6 p-6">
            <PageHeader title={t('sidebar.sales')} onAdd={() => setAddSalesModal(true)} addText={t('salesPage.recordNewSale')} canExport={true} onExport={() => { }} />
            <Card>
                <div className="relative flex gap-2">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <TextInput
                        placeholder={t('salesPage.searchPlaceholder')}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={`pl-10`}
                        style={{ width: '100%' }}
                    />
                    <Select 
                        placeholder={t('salesPage.filters.allMethods')}
                        data={[
                            { label: t('salesPage.filters.allMethods'), value: 'all' },
                            { label: t('salesPage.filters.cash'), value: 'cash' },
                            { label: t('salesPage.filters.bankTransfer'), value: 'bankTransfer' },
                            { label: t('salesPage.filters.pos'), value: 'pos' },
                            { label: t('salesPage.filters.credit'), value: 'credit' }
                        ]}
                        style={{ width: '100%' }}
                    />
                    <DatePickerInput
                        placeholder={t('salesPage.filters.startDate')}
                        type='range'
                        value={selectedDate}
                        onChange={setSelectedDate}
                        style={{ width: '100%' }}
                    />
                </div>
            </Card>
            <Card>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('salesPage.table.date')}</Table.Th>
                            <Table.Th>{t('salesPage.table.itemsSold')}</Table.Th>
                            <Table.Th>{t('salesPage.table.totalAmount')}</Table.Th>
                            <Table.Th>{t('salesPage.table.discount')}</Table.Th>
                            <Table.Th>{t('salesPage.table.paymentMethod')}</Table.Th>
                            <Table.Th>{t('salesPage.table.customer')}</Table.Th>
                            <Table.Th>{t('salesPage.table.actions')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>2025-01-01</Table.Td>
                            <Table.Td>100</Table.Td>
                            <Table.Td>₦100</Table.Td>
                            <Table.Td>₦100</Table.Td>
                            <Table.Td>Kudi a Hannu</Table.Td>
                            <Table.Td>John Doe</Table.Td>
                            <Table.Td>
                                <div className="flex items-center space-x-2">
                                    <FaEdit className="text-gray-700 cursor-pointer" size={20} />
                                    <FaTrash className="text-gray-700 cursor-pointer" size={20} onClick={() => setDeleteSaleModal(true)} />
                                </div>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card>
            <AddSales opened={addSalesModal} close={() => setAddSalesModal(false)} />
            <DeleteSale opened={deleteSaleModal} close={() => setDeleteSaleModal(false)} />
        </div>
    )
}

export default Sales