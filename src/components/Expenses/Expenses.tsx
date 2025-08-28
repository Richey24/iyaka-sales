'use client'
import React, { useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Table, TextInput } from '@mantine/core'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddExpenses from './AddExpenses'
import DeleteExpenses from './DeleteExpenses'

const Expenses = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [addExpenseModal, setAddExpenseModal] = useState(false)
    const [deleteExpenseModal, setDeleteExpenseModal] = useState(false)
    return (
        <div className="space-y-6 p-6">
            <PageHeader title={t('sidebar.expenses')} onAdd={() => setAddExpenseModal(true)} addText={t('expensesPage.addNewExpense')} canExport={true} onExport={() => { }} />
            <Card>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <TextInput
                        placeholder={t('expensesPage.searchPlaceholder')}
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
                            <Table.Th>{t('expensesPage.table.date')}</Table.Th>
                            <Table.Th>{t('expensesPage.table.description')}</Table.Th>
                            <Table.Th>{t('expensesPage.table.category')}</Table.Th>
                            <Table.Th>{t('expensesPage.table.amount')}</Table.Th>
                            <Table.Th>{t('expensesPage.table.actions')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>2025-01-01</Table.Td>
                            <Table.Td>Payment for Rent</Table.Td>
                            <Table.Td>Rent</Table.Td>
                            <Table.Td>₦100</Table.Td>
                            <Table.Td>
                                <div className="flex items-center space-x-2">
                                    <FaEdit className="text-gray-700 cursor-pointer" size={20} />
                                    <FaTrash className="text-gray-700 cursor-pointer" size={20} onClick={() => setDeleteExpenseModal(true)} />
                                </div>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card>
            <AddExpenses opened={addExpenseModal} close={() => setAddExpenseModal(false)} />
            <DeleteExpenses opened={deleteExpenseModal} close={() => setDeleteExpenseModal(false)} />
        </div>
    )
}

export default Expenses