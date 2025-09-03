'use client'
import { Pagination, Table, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaSearch, FaSpinner, FaTrash } from 'react-icons/fa'
import AddCategory from './AddCategory'
import DeleteCategory from './DeleteCategory'
import PageHeader from '../Layout/PageHeader'
import Card from '../Dashboard/Card'
import { useTranslations } from 'next-intl'
import type { Category } from '@/utils/validation'
import { getCategories } from '@/api/category'
import { debounce } from 'lodash'

const Category = () => {
    const t = useTranslations('categoryPage')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTermDebounced, setSearchTermDebounced] = useState('')
    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
    const [categories, setCategories] = useState<Array<Category & { productCount?: number }>>([])
    const [loading, setLoading] = useState(false)
    const [totalCategories, setTotalCategories] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)

    const fetchCategories = async (pageParams: number, searchTermParams: string) => {
        setLoading(true)
        const response = await getCategories({ page: pageParams, limit: 10, search: searchTermParams })
        if (response.success) {
            setCategories(response.data?.categories || [])
            setTotalCategories(response.data?.total || 0)
            setTotalPages(response.data?.totalPages || 0)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCategories(page, searchTermDebounced)
    }, [page, searchTermDebounced])


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        const debouncedSearch = debounce(() => {
            setSearchTermDebounced(e.target.value)
            setPage(1)
        }, 1000)
        debouncedSearch()
    }

    return (
        <div className="space-y-6 p-3 md:p-6">
            <PageHeader title={`${t('title')} (${totalCategories})`} onAdd={() => { setSelectedCategory(undefined); setAddCategoryModal(true) }} addText={t('addNewCategory')} />
            <Card>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <TextInput
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={handleSearch}
                        className={`pl-10`}
                    />
                </div>
            </Card>
            <Card>
                {
                    loading ? (
                        <div className="flex justify-center items-center h-full">
                            <FaSpinner className="animate-spin" />
                        </div>
                    ) : (
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>{t('categoryName')}</Table.Th>
                                    <Table.Th style={{ textAlign: 'center' }}>{t('productCount')}</Table.Th>
                                    <Table.Th>{t('actions')}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {categories.map((category) => (
                                    <Table.Tr key={category._id}>
                                        <Table.Td>{category.name}</Table.Td>
                                        <Table.Td style={{ textAlign: 'center' }}>{category.productCount}</Table.Td>
                                        <Table.Td>
                                            <div className="flex items-center space-x-2">
                                                <FaEdit className="text-gray-700 cursor-pointer" size={20} onClick={() => { setSelectedCategory(category); setAddCategoryModal(true) }} />
                                                <FaTrash className="text-gray-700 cursor-pointer" size={20} onClick={() => { setSelectedCategory(category); setDeleteCategoryModal(true) }} />
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )
                }
            </Card>
            <Pagination total={totalPages} value={page} onChange={setPage} style={{ display: 'flex', justifyContent: 'center' }} />
            <AddCategory opened={addCategoryModal} close={() => setAddCategoryModal(false)} fetchCategories={fetchCategories} selectedCategory={selectedCategory} />
            <DeleteCategory opened={deleteCategoryModal} close={() => setDeleteCategoryModal(false)} selectedCategory={selectedCategory!} fetchCategories={fetchCategories} />
        </div>
    )
}

export default Category