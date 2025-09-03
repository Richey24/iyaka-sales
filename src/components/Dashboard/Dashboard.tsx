'use client'
import React, { useEffect, useState } from 'react'
import StatCard from './StatCard'
import Card from './Card'
import { Select } from '@mantine/core'
import { COLORS, timeFrameOptions } from '@/utils/dashboard'
import { useTranslations } from 'next-intl'
import { FaBox, FaMoneyBill, FaSpinner, FaUser } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { getDashboardData } from '@/api/dashboard'
import { Product, Sales } from '@/utils/validation'
import { formatPriceString, nairaCompactFomatter } from '@/utils/helper'

const Dashboard = () => {
    const t = useTranslations()
    const [timeFrame, setTimeFrame] = useState('today')
    const [dashboardData, setDashboardData] = useState<{ totalSales: number, totalExpenses: number, productsInStockCount: number, totalOutstanding: number, lowStockProducts: Product[], todaySales: Sales[], lineChartData: any[], pieChartData: any[] } | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)
            const response = await getDashboardData(timeFrame)
            if (response.success) {
                setDashboardData(response.data)
            }
            setLoading(false)
        }
        fetchDashboardData()
    }, [timeFrame])

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">{t('sidebar.dashboard')}</h1>
                <Select
                    data={timeFrameOptions}
                    value={timeFrame}
                    onChange={(value) => setTimeFrame(value || 'today')}
                    label={t('dashboard.selectTimeframe')}
                />
            </div>

            {
                loading ? <div className="flex justify-center items-center h-full">
                    <FaSpinner className="animate-spin" size={30} />
                </div> :
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title={t('dashboard.statCards.totalSales')} value={nairaCompactFomatter(dashboardData?.totalSales || 0)} icon={FaMoneyBill} color="bg-orange-500" />
                            <StatCard title={t('dashboard.statCards.totalExpenses')} value={nairaCompactFomatter(dashboardData?.totalExpenses || 0)} icon={FaMoneyBill} color="bg-red-500" />
                            <StatCard title={t('dashboard.statCards.itemsInStock')} value={`${dashboardData?.productsInStockCount || 0}`} icon={FaBox} color="bg-blue-500" />
                            <StatCard title={t('dashboard.statCards.outstandingDebt')} value={nairaCompactFomatter(dashboardData?.totalOutstanding || 0)} icon={FaUser} color="bg-yellow-500" />
                        </div>

                        {dashboardData?.lineChartData && <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <Card className="lg:col-span-3">
                                <h2 className="text-lg font-semibold mb-4">{t('dashboard.salesTrend', { timeframe: timeFrame })}</h2>
                                <div className="h-[300px]">
                                    {dashboardData?.lineChartData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={dashboardData?.lineChartData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis dataKey="date" fontSize={12} stroke="#4b5563" />
                                                <YAxis fontSize={12} stroke="#4b5563" tickFormatter={(value) => nairaCompactFomatter(value)} />
                                                <Tooltip
                                                    formatter={(value: number) => [`₦${value.toLocaleString()}`, t('dashboard.statCards.totalSales')]}
                                                    contentStyle={{
                                                        backgroundColor: 'white',
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '0.5rem',
                                                    }}
                                                />
                                                <Legend
                                                    verticalAlign="bottom"
                                                    iconType="line"
                                                    formatter={() => <span style={{ color: '#F97316' }}>{t('dashboard.statCards.totalSales')}</span>}
                                                />
                                                <Line
                                                    type="linear"
                                                    dataKey="sales"
                                                    name={t('dashboard.statCards.totalSales')}
                                                    stroke="#F97316"
                                                    strokeWidth={2}
                                                    activeDot={{ r: 8 }}
                                                    dot={{ stroke: '#F97316', strokeWidth: 2, r: 4, fill: 'white' }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500">{t('dashboard.noSalesData')}</div>
                                    )}
                                </div>
                            </Card>
                            <Card className="lg:col-span-2">
                                <h2 className="text-lg font-semibold mb-4">{t('dashboard.expenseBreakdown', { timeframe: timeFrame })}</h2>
                                <div className="h-[300px]">
                                    {dashboardData?.pieChartData.length > 0 ? (
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie data={dashboardData?.pieChartData} dataKey="value" nameKey="category" cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5}>
                                                    {dashboardData?.pieChartData.map((entry: any, index: number) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
                                                <Legend iconSize={10} verticalAlign="bottom" />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500">{t('dashboard.noExpenseData')}</div>
                                    )}
                                </div>
                            </Card>
                        </div>}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1">
                                <h2 className="text-lg font-semibold mb-4">{t('dashboard.lowStockAlerts')}</h2>
                                {dashboardData?.lowStockProducts && dashboardData?.lowStockProducts.length > 0 ? (
                                    <ul className="space-y-3">
                                        {dashboardData?.lowStockProducts.map(item => (
                                            <li key={item._id} className="flex justify-between items-center text-sm">
                                                <span>{item.name}</span>
                                                <span className="font-bold text-red-500">{t('dashboard.lowStockItem', { count: item.variants[0].stock })}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">{t('dashboard.noLowStockItems')}</p>
                                )}
                            </Card>
                            <Card className="lg:col-span-2">
                                <h2 className="text-lg font-semibold mb-4">{t('dashboard.recentSales', { timeframe: timeFrame })}</h2>
                                {dashboardData?.todaySales && dashboardData?.todaySales.length > 0 ? (
                                    <ul className="space-y-3">
                                        {dashboardData?.todaySales?.map((sale: Sales) => (
                                            <li key={sale?._id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                                <div>
                                                    <p className="font-medium text-gray-800">{sale.items.map((i: any) => `${i.productName} (x${i.quantity})`).join(', ')}</p>
                                                    <p className="text-gray-500">{new Date(sale.saleDate).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-green-600 text-right">+₦{sale.totalAmount.toLocaleString()}</p>
                                                    {(sale.totalDiscount || 0) > 0 && <p className="text-xs text-yellow-600 text-right">(-₦{formatPriceString(sale.totalDiscount || 0)} discount)</p>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">{t('dashboard.noRecentSales')}</p>
                                )}
                            </Card>
                        </div>
                    </>
            }
        </div>
    )
}

export default Dashboard