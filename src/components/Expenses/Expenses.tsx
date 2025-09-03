'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Pagination, Table, TextInput } from '@mantine/core'
import { FaEdit, FaSearch, FaSpinner, FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddExpenses from './AddExpenses'
import DeleteExpenses from './DeleteExpenses'
import { getExpenses } from '@/api/expenses'
import { useDebouncedValue } from '@mantine/hooks'
import { Expense } from '@/utils/validation'
import { formatPriceString } from '@/utils/helper'

const Expenses = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500)
    const [addExpenseModal, setAddExpenseModal] = useState(false)
    const [deleteExpenseModal, setDeleteExpenseModal] = useState(false)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const fetchExpenses = async (debouncedSearchTerm: string, page: number) => {
        setLoading(true)
        const response = await getExpenses({ search: debouncedSearchTerm, page: page })
        if (response.success) {
            setExpenses(response.data?.expenses || [])
            setTotalPages(response.data?.totalPages || 0)
            setTotalExpenses(response.data?.total || 0)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchExpenses(debouncedSearchTerm, page)
    }, [debouncedSearchTerm, page])

    return (
        <div className="space-y-6 p-3 md:p-6">
            <PageHeader title={`${t('sidebar.expenses')} (${totalExpenses})`} onAdd={() => {
                setSelectedExpense(null)
                setAddExpenseModal(true)
            }} addText={t('expensesPage.addNewExpense')} canExport={true} onExport={() => { }} />
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
                {
                    loading ? (
                        <div className="flex items-center justify-center h-full">
                            <FaSpinner className="animate-spin" />
                        </div>
                    ) : (
                        expenses.length > 0 ? (
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>{t('expensesPage.table.date')}</Table.Th>
                                        <Table.Th>{t('expensesPage.table.description')}</Table.Th>
                                        <Table.Th className='hidden md:table-cell'>{t('expensesPage.table.category')}</Table.Th>
                                        <Table.Th>{t('expensesPage.table.amount')}</Table.Th>
                                        <Table.Th>{t('expensesPage.table.actions')}</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {expenses?.map((expense) => (
                                        <Table.Tr key={expense?._id}>
                                            <Table.Td>{new Date(expense?.expenseDate)?.toLocaleDateString()}</Table.Td>
                                            <Table.Td>{expense.description}</Table.Td>
                                            <Table.Td className='hidden md:table-cell'>{expense.category}</Table.Td>
                                            <Table.Td>{formatPriceString(expense?.amount)}</Table.Td>
                                            <Table.Td>
                                                <div className="flex items-center space-x-2">
                                                    <FaEdit className="text-gray-700 cursor-pointer w-[16px] h-[16px] md:w-[20px] md:h-[20px]" size={20} onClick={() => {
                                                        setSelectedExpense(expense)
                                                        setAddExpenseModal(true)
                                                    }} />
                                                    <FaTrash className="text-gray-700 cursor-pointer w-[16px] h-[16px] md:w-[20px] md:h-[20px]" size={20} onClick={() => {
                                                        setSelectedExpense(expense)
                                                        setDeleteExpenseModal(true)
                                                    }} />
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">{t('expensesPage.noExpenses')}</p>
                            </div>
                        )
                    )
                }
            </Card>
            <Pagination total={totalPages} value={page} onChange={setPage} style={{ display: 'flex', justifyContent: 'center' }} />
            <AddExpenses opened={addExpenseModal} close={() => setAddExpenseModal(false)} expense={selectedExpense} fetchExpenses={() => fetchExpenses(debouncedSearchTerm, page)} />
            <DeleteExpenses opened={deleteExpenseModal} close={() => setDeleteExpenseModal(false)} expense={selectedExpense} fetchExpenses={() => fetchExpenses(debouncedSearchTerm, page)} />
        </div>
    )
}

export default Expenses