import React, { useEffect, useState } from 'react'
import { Button, Combobox, Modal, NumberInput, Select, TextInput, useCombobox } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { DatePickerInput } from '@mantine/dates'
import { Product } from '@/utils/validation'
import { getProducts } from '@/api/products'
import { debounce } from 'lodash'
import { FaSpinner, FaTrash } from 'react-icons/fa'
import { formatPrice } from '@/utils/helper'
import { enqueueSnackbar } from 'notistack'
import { addSales, updateSales } from '@/api/sales'
import type { Sales } from '@/utils/validation'

const AddSales: React.FC<{ opened: boolean, close: () => void, sale?: Sales, fetchSales: () => void }> = ({ opened, close, sale, fetchSales }) => {
    const t = useTranslations('salesPage')
    const [salesProducts, setSalesProducts] = useState<Array<{ name: string, price: number, quantity: number, productId: string, variantId: string }>>([])
    const [salesCount, setSalesCount] = useState(1)
    const [searchTerm, setSearchTerm] = useState<{ [key: string]: string }>({})
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDropdown, setSelectedDropdown] = useState<null | number>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (sale) {
            setSalesCount(sale.items.length)
        }
    }, [sale])

    const combobox = useCombobox({
        onDropdownClose: () => {
            setSelectedDropdown(null)
        },
    });

    const fetchProducts = async (searchTerm: string) => {
        setIsLoading(true)
        const response = await getProducts({ search: searchTerm, limit: 100 })
        if (response.success) {
            const allVariants = response.data?.products.flatMap((product: Product) => {
                return product.variants.map((variant: any) => ({
                    name: `${product.name} ${variant.variantName}`,
                    price: variant.price,
                    quantity: 0,
                    productId: product._id || '',
                    variantId: variant._id || '',
                }))
            })
            setSalesProducts(allVariants || [])
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProducts(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    const handleSearch = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm({ ...searchTerm, [key]: event.target.value })
        const debouncedSearch = debounce(() => {
            setDebouncedSearchTerm(event.target.value)
        }, 500)
        debouncedSearch()
    }

    const options = salesProducts
        .map((item) => (
            <Combobox.Option value={item.name} key={item.variantId}>
                {item.name}
            </Combobox.Option>
        ));

    const paymentMethods = [
        { value: 'cash', label: t('filters.cash') },
        { value: 'bank', label: t('filters.bank') },
        { value: 'pos', label: t('filters.pos') },
        { value: 'credit', label: t('filters.credit') },
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const sales = Object.fromEntries(formData)
        const salesItems = Array.from({ length: salesCount }).map((_, index) => ({
            productName: sales[`product-${index}`] as string,
            quantity: Number(sales[`quantity-${index}`]),
            price: formatPrice(sales[`price-${index}`] as string),
            discount: formatPrice(sales[`discount-${index}`] as string),
        }))
        const body = {
            items: salesItems,
            paymentMethod: sales.paymentMethod as "cash" | "bank" | "pos" | "credit",
            totalAmount: salesItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            totalDiscount: salesItems.reduce((acc, item) => acc + item.discount, 0),
            saleDate: new Date(sales.saleDate as string),
            customer: sales.customer as string,
        }
        setLoading(true)
        let response
        if (sale) {
            response = await updateSales(sale._id!, body)
        } else {
            response = await addSales(body)
        }
        if (response.success) {
            enqueueSnackbar(sale ? t('modal.updateSuccess') : t('modal.createSuccess'), { variant: 'success' })
            fetchSales()
            close()
        } else {
            enqueueSnackbar(sale ? t('modal.updateError') : t('modal.createError'), { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={sale ? t('modal.editTitle') : t('modal.title')} centered>
                <form className="space-y-2 pb-2" onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        {
                            Array.from({ length: salesCount }).map((_, index) => (
                                <div key={index} className={`${index > 0 ? 'pt-4' : ''} relative`}>
                                    <Combobox
                                        store={{
                                            ...combobox,
                                            dropdownOpened: selectedDropdown === index,
                                        }}
                                        width={250}
                                        position="bottom-start"
                                        withArrow
                                        onOptionSubmit={(val) => {
                                            setSearchTerm({ ...searchTerm, [`product-${index}`]: val })
                                            setSelectedDropdown(null)
                                        }}
                                    >
                                        <Combobox.Target>
                                            <TextInput
                                                onClick={() => setSelectedDropdown(index)}
                                                onFocus={() => setSelectedDropdown(index)}
                                                onBlur={() => {
                                                    setSelectedDropdown(null)
                                                }}
                                                placeholder={t('modal.selectVariant')}
                                                value={searchTerm[`product-${index}`]}
                                                onChange={(event) => handleSearch(`product-${index}`, event)}
                                                rightSection={isLoading ? <FaSpinner className='animate-spin' /> : null}
                                                name={`product-${index}`}
                                                required
                                                defaultValue={sale?.items[index]?.productName || ''}
                                            />
                                        </Combobox.Target>
                                        <Combobox.Dropdown style={{ width: '405px' }}>
                                            <Combobox.Options>
                                                {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                                            </Combobox.Options>
                                        </Combobox.Dropdown>
                                    </Combobox>
                                    <NumberInput
                                        label={t('modal.quantity')}
                                        placeholder={t('modal.quantity')}
                                        hideControls
                                        name={`quantity-${index}`}
                                        style={{ width: '100%', marginTop: '10px' }}
                                        defaultValue={sale?.items[index]?.quantity || 1}
                                        required
                                    />
                                    <div className='flex gap-2 items-center justify-between mt-2'>
                                        <NumberInput
                                            label={t('modal.finalPrice')}
                                            placeholder={t('modal.finalPrice')}
                                            hideControls
                                            required
                                            name={`price-${index}`}
                                            style={{ width: '100%' }}
                                            prefix='₦'
                                            thousandSeparator=','
                                            value={sale?.items[index]?.price || salesProducts.find(product => product.name === searchTerm[`product-${index}`])?.price || 0}
                                            defaultValue={sale?.items[index]?.price || 0}
                                            styles={{
                                                input: {
                                                    backgroundColor: '#fff',
                                                    opacity: 1,
                                                    color: '#000',
                                                    pointerEvents: 'none'
                                                }
                                            }}
                                        />
                                        <NumberInput
                                            label={t('modal.discount')}
                                            placeholder={t('modal.discount')}
                                            hideControls
                                            defaultValue={sale?.items[index]?.discount || 0}
                                            name={`discount-${index}`}
                                            style={{ width: '100%' }}
                                            prefix='₦'
                                            thousandSeparator=','
                                        />
                                    </div>
                                    {index > 0 && (
                                        <FaTrash
                                            className='absolute right-0 -top-1 text-red-500 cursor-pointer'
                                            onClick={() => setSalesCount(salesCount - 1)}
                                        />
                                    )}
                                </div>
                            ))
                        }
                        <p className='text-sm text-[#F97316] text-right cursor-pointer mt-2' onClick={() => setSalesCount(salesCount + 1)}>{t('modal.addItem')}</p>
                    </div>
                    <TextInput
                        label={t('modal.customer')}
                        placeholder={t('modal.customer')}
                        name="customer"
                        style={{ width: '100%' }}
                        required
                        defaultValue={sale?.customer || ''}
                    />
                    <div className='flex gap-2 items-center justify-between mt-2'>
                        <Select
                            label={t('modal.paymentMethod')}
                            placeholder={t('modal.paymentMethod')}
                            data={paymentMethods}
                            name="paymentMethod"
                            style={{ width: '100%' }}
                            required
                            defaultValue={sale?.paymentMethod || ''}
                        />
                        <DatePickerInput
                            label={t('modal.saleDate')}
                            placeholder={t('modal.saleDate')}
                            name="saleDate"
                            style={{ width: '100%' }}
                            required
                            defaultValue={new Date()}
                            value={sale?.saleDate || new Date()}
                        />
                    </div>
                    <Button
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#F97316', marginTop: '10px' }}
                        loading={loading}
                        disabled={loading}
                    >
                        {sale ? t('modal.updateButton') : t('modal.recordButton')}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default AddSales