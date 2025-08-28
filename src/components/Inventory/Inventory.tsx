'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Badge, Pagination, Table, TextInput } from '@mantine/core'
import { FaEdit, FaSearch, FaSpinner, FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddProduct from './AddProduct'
import DeleteProduct from './DeleteProduct'
import { getProducts } from '@/api/products'
import { Category, Product } from '@/utils/validation'
import { getProductPrice, getProductStatus, getProductStock } from '@/utils/helper'
import { debounce } from 'lodash'
import ProductDetails from './ProductDetails'

const Inventory = () => {
    const t = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTermDebounced, setSearchTermDebounced] = useState('')
    const [addProductModal, setAddProductModal] = useState(false)
    const [deleteProductModal, setDeleteProductModal] = useState(false)
    const [products, setProducts] = useState<Array<Product & { category: Category, _id: string }>>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)
    const [productDetailsModal, setProductDetailsModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product & { category: Category, _id: string } | null>(null)

    const fetchProducts = async (pageParams: number, searchTermParams: string) => {
        setLoading(true)
        const response = await getProducts({ page: pageParams, limit: 10, search: searchTermParams })
        if (response.success) {
            setProducts((response.data?.products as Array<Product & { category: Category, _id: string }>) || [])
            setTotalPages(response.data?.totalPages || 1)
            setTotalProducts(response.data?.total || 0)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts(page, searchTermDebounced)
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
        <div className="space-y-6 p-6">
            <PageHeader title={`${t('sidebar.inventory')} (${totalProducts})`} onAdd={() => { setSelectedProduct(null); setAddProductModal(true) }} addText={t('inventoryPage.addNewProduct')} canExport={true} onExport={() => { }} />
            <Card>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <TextInput
                        placeholder={t('inventoryPage.searchPlaceholder')}
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
                                    <Table.Th>{t('inventoryPage.table.productName')}</Table.Th>
                                    <Table.Th>{t('inventoryPage.table.category')}</Table.Th>
                                    <Table.Th>{t('inventoryPage.table.stock')}</Table.Th>
                                    <Table.Th>{t('inventoryPage.table.price')}</Table.Th>
                                    <Table.Th>{t('inventoryPage.table.status')}</Table.Th>
                                    <Table.Th>{t('inventoryPage.table.actions')}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    products.map((product) => (
                                        <Table.Tr key={product?._id} style={{cursor: 'pointer'}} onClick={() => { setSelectedProduct(product); setProductDetailsModal(true) }}>
                                            <Table.Td>{product?.name}</Table.Td>
                                            <Table.Td>{product?.category?.name}</Table.Td>
                                            <Table.Td>{getProductStock(product)}</Table.Td>
                                            <Table.Td>{getProductPrice(product)}</Table.Td>
                                            <Table.Td>
                                                <Badge color={getProductStatus(getProductStock(product), product.lowStockLimit) === 'Low Stock' ? 'red' : 'green'}>{getProductStatus(getProductStock(product), product.lowStockLimit)}</Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <div className="flex items-center space-x-2">
                                                    <FaEdit className="text-gray-700 cursor-pointer" size={20} onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); setAddProductModal(true) }} />
                                                    <FaTrash className="text-gray-700 cursor-pointer" size={20} onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); setDeleteProductModal(true) }} />
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                }
                            </Table.Tbody>
                        </Table>
                    )
                }
            </Card>
            <Pagination total={totalPages} value={page} onChange={setPage} style={{ display: 'flex', justifyContent: 'center' }} />
            <ProductDetails opened={productDetailsModal} close={() => setProductDetailsModal(false)} product={selectedProduct!} />
            <AddProduct opened={addProductModal} close={() => setAddProductModal(false)} selectedProduct={selectedProduct!} fetchProducts={fetchProducts} />
            <DeleteProduct opened={deleteProductModal} close={() => setDeleteProductModal(false)} selectedProduct={selectedProduct!} fetchProducts={fetchProducts} />
        </div>
    )
}

export default Inventory