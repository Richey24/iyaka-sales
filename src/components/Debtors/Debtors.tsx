'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Badge, Pagination, Table, TextInput } from '@mantine/core'
import { FaDollarSign, FaSearch, FaSpinner } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddDebtor from './AddDebtor'
import RecordPayment from './RecordPayment'
import { getDebtors } from '@/api/debtor'
import { Debtor } from '@/utils/validation'
import { useDebouncedValue } from '@mantine/hooks'
import { formatPriceString, getDebtorStatus, getDebtorStatusColor } from '@/utils/helper'
import DebtDetails from './DebtDetails'

const Debtors = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500)
    const [addDebtorModal, setAddDebtorModal] = useState(false)
    const [recordPaymentModal, setRecordPaymentModal] = useState(false)
    const [debtDetailsModal, setDebtDetailsModal] = useState(false)
    const [debtors, setDebtors] = useState<Debtor[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalDebtors, setTotalDebtors] = useState(0)

    const fetchDebtors = async (debouncedSearchTerm: string, page: number) => {
        setLoading(true)
        const response = await getDebtors({ search: debouncedSearchTerm, page: page })
        if (response.success) {
            setDebtors(response.data?.debtors || [])
            setTotalPages(response.data?.totalPages || 0)
            setTotalDebtors(response.data?.total || 0)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchDebtors(debouncedSearchTerm, page)
    }, [debouncedSearchTerm, page])

    return (
        <div className="space-y-6 p-3 md:p-6">
            <PageHeader title={`${t('sidebar.debtors')} (${totalDebtors})`} onAdd={() => setAddDebtorModal(true)} addText={t('debtorsPage.addManualDebtor')} canExport={true} onExport={() => { }} />
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
                {
                    loading ? (
                        <div className="flex items-center justify-center h-full">
                            <FaSpinner className="animate-spin" />
                        </div>
                    ) : (
                        debtors.length > 0 ? (
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>{t('debtorsPage.table.customerName')}</Table.Th>
                                        <Table.Th className='hidden md:table-cell'>{t('debtorsPage.table.totalOwed')}</Table.Th>
                                        <Table.Th className='hidden md:table-cell'>{t('debtorsPage.table.amountPaid')}</Table.Th>
                                        <Table.Th>{t('debtorsPage.table.balance')}</Table.Th>
                                        <Table.Th>{t('debtorsPage.table.status')}</Table.Th>
                                        <Table.Th>{t('debtorsPage.table.actions')}</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {
                                        debtors?.map((debtor) => (
                                            <Table.Tr style={{ cursor: 'pointer' }} key={debtor?._id} onClick={() => {
                                                setSelectedDebtor(debtor)
                                                setDebtDetailsModal(true)
                                            }}>
                                                <Table.Td>{debtor?.name}</Table.Td>
                                                <Table.Td className='hidden md:table-cell'>{formatPriceString(debtor?.totalDebt || 0)}</Table.Td>
                                                <Table.Td className='hidden md:table-cell'>{formatPriceString(debtor?.totalPaid || 0)}</Table.Td>
                                                <Table.Td>{formatPriceString(debtor?.totalDebt - (debtor?.totalPaid || 0))}</Table.Td>
                                                <Table.Td><Badge color={getDebtorStatusColor(debtor?.totalDebt || 0, debtor?.totalPaid || 0)}>{getDebtorStatus(debtor?.totalDebt || 0, debtor?.totalPaid || 0)}</Badge></Table.Td>
                                                <Table.Td>
                                                    <div className="flex items-center gap-2 justify-center bg-green-500 text-white px-2 py-2 rounded-md cursor-pointer max-w-[160px]" onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedDebtor(debtor)
                                                        setRecordPaymentModal(true)
                                                    }}>
                                                        <FaDollarSign className="text-white cursor-pointer w-[16px] h-[16px] md:w-[20px] md:h-[20px]" size={20} />
                                                        <p className='text-white cursor-pointer text-[12px] md:text-sm hidden md:block'>Record Payment</p>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))
                                    }
                                </Table.Tbody>
                            </Table>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p>No debtors found</p>
                            </div>
                        )
                    )
                }
            </Card>
            <Pagination total={totalPages} value={page} onChange={setPage} style={{ display: 'flex', justifyContent: 'center' }} />
            <AddDebtor opened={addDebtorModal} close={() => setAddDebtorModal(false)} fetchDebtors={() => fetchDebtors(debouncedSearchTerm, page)} />
            <RecordPayment opened={recordPaymentModal} close={() => setRecordPaymentModal(false)} debtor={selectedDebtor} fetchDebtors={() => fetchDebtors(debouncedSearchTerm, page)} />
            <DebtDetails opened={debtDetailsModal} close={() => setDebtDetailsModal(false)} debtor={selectedDebtor!} />
        </div>
    )
}

export default Debtors