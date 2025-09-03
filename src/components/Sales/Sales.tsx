'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Pagination, Select, Table, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { FaEdit, FaSearch, FaSpinner, FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddSales from './AddSales'
import DeleteSale from './DeleteSale'
import type { Sales } from '@/utils/validation'
import { getSales } from '@/api/sales'
import { nairaCompactFomatter } from '@/utils/helper'
import SalesDetails from './SalesDetails'
import { useDebouncedValue } from '@mantine/hooks'
const Sales = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500)
    const [addSalesModal, setAddSalesModal] = useState(false)
    const [deleteSaleModal, setDeleteSaleModal] = useState(false)
    const [salesDetailsModal, setSalesDetailsModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<[string | null, string | null]>([null, null])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
    const [sales, setSales] = useState<Sales[]>([])
    const [selectedSale, setSelectedSale] = useState<Sales | null>(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalSales, setTotalSales] = useState(0)

    const fetchSales = async (paymentMethod: string | null, startDate: string | null, endDate: string | null, search: string, page: number) => {
        setLoading(true)
        const response = await getSales({
            page: page,
            paymentMethod: paymentMethod,
            startDate: startDate,
            endDate: endDate,
            search: search
        })
        if (response.success) {
            setSales(response.data?.sales || [])
            setTotalPages(response.data?.totalPages || 0)
            setTotalSales(response.data?.total || 0)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSales(selectedPaymentMethod, selectedDate[0], selectedDate[1], debouncedSearchTerm, page)
    }, [selectedPaymentMethod, selectedDate, debouncedSearchTerm, page])

    return (
        <div className="space-y-6 p-3 md:p-6">
            <PageHeader title={`${t('sidebar.sales')} (${totalSales})`} onAdd={() => {
                setSelectedSale(null)
                setAddSalesModal(true)
            }} addText={t('salesPage.recordNewSale')} canExport={true} onExport={() => { }} />
            <Card>
                <div className="relative flex flex-col md:flex-row gap-2">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hidden md:block" />
                    <TextInput
                        placeholder={t('salesPage.searchPlaceholder')}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={`pl-0 md:pl-10`}
                        style={{ width: '100%' }}
                    />
                    <Select
                        placeholder={t('salesPage.filters.allMethods')}
                        data={[
                            { label: t('salesPage.filters.allMethods'), value: '' },
                            { label: t('salesPage.filters.cash'), value: 'cash' },
                            { label: t('salesPage.filters.bank'), value: 'bank' },
                            { label: t('salesPage.filters.pos'), value: 'pos' },
                            { label: t('salesPage.filters.credit'), value: 'credit' }
                        ]}
                        style={{ width: '100%' }}
                        value={selectedPaymentMethod}
                        onChange={setSelectedPaymentMethod}
                    />
                    <DatePickerInput
                        placeholder={`${t('salesPage.filters.startDate')} - ${t('salesPage.filters.endDate')}`}
                        type='range'
                        value={selectedDate}
                        onChange={setSelectedDate}
                        style={{ width: '100%' }}
                    />
                </div>
            </Card>
            <Card>
                {
                    loading ? <div className="flex justify-center items-center h-full">
                        <FaSpinner className="animate-spin" />
                    </div> : sales.length === 0 ? <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">{t('salesPage.noSales')}</p>
                    </div> :
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>{t('salesPage.table.date')}</Table.Th>
                                    <Table.Th>{t('salesPage.table.itemsSold')}</Table.Th>
                                    <Table.Th>{t('salesPage.table.totalAmount')}</Table.Th>
                                    <Table.Th className='hidden md:table-cell'>{t('salesPage.table.discount')}</Table.Th>
                                    <Table.Th className='hidden md:table-cell'>{t('salesPage.table.paymentMethod')}</Table.Th>
                                    <Table.Th className='hidden md:table-cell'>{t('salesPage.table.customer')}</Table.Th>
                                    <Table.Th>{t('salesPage.table.actions')}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    sales.map((sale) => (
                                        <Table.Tr key={sale?._id} style={{ cursor: 'pointer' }} onClick={() => {
                                            setSelectedSale(sale)
                                            setSalesDetailsModal(true)
                                        }}>
                                            <Table.Td>{new Date(sale?.saleDate)?.toLocaleDateString()}</Table.Td>
                                            <Table.Td>
                                                {
                                                    sale?.items.map((item) => (
                                                        <div key={item?._id}>
                                                            {item?.productName}
                                                        </div>
                                                    ))
                                                }
                                            </Table.Td>
                                            <Table.Td>{nairaCompactFomatter(sale?.totalAmount || 0)}</Table.Td>
                                            <Table.Td className='hidden md:table-cell'>{nairaCompactFomatter(sale?.totalDiscount || 0)}</Table.Td>
                                            <Table.Td className='hidden md:table-cell'>{t(`salesPage.filters.${sale?.paymentMethod}`)}</Table.Td>
                                            <Table.Td className='hidden md:table-cell'>{sale?.customer}</Table.Td>
                                            <Table.Td>
                                                <div className="flex items-center space-x-2">
                                                    <FaEdit className="text-gray-700 cursor-pointer w-[16px] h-[16px] md:w-[20px] md:h-[20px]" size={20} onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedSale(sale)
                                                        setAddSalesModal(true)
                                                    }} />
                                                    <FaTrash className="text-gray-700 cursor-pointer w-[16px] h-[16px] md:w-[20px] md:h-[20px]" size={20} onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedSale(sale)
                                                        setDeleteSaleModal(true)
                                                    }} />
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                            </Table.Tbody>
                        </Table>
                }
            </Card>
            <Pagination total={totalPages} value={page} onChange={setPage} style={{ display: 'flex', justifyContent: 'center' }} />
            <SalesDetails opened={salesDetailsModal} close={() => setSalesDetailsModal(false)} sale={selectedSale!} />
            <AddSales opened={addSalesModal} close={() => setAddSalesModal(false)} sale={selectedSale || undefined} fetchSales={() => fetchSales(selectedPaymentMethod, selectedDate[0], selectedDate[1], debouncedSearchTerm, page)} />
            <DeleteSale opened={deleteSaleModal} close={() => setDeleteSaleModal(false)} sale={selectedSale!} />
        </div>
    )
}

export default Sales