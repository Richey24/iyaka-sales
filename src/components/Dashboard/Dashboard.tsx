'use client'
import React, { useState } from 'react'
import StatCard from './StatCard'
import Card from './Card'
import { Select } from '@mantine/core'
import { COLORS, timeFrameOptions } from '@/utils/dashboard'
import { useTranslations } from 'next-intl'
import { FaBox, FaMoneyBill, FaUser } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { ResponsiveContainer } from 'recharts'

const Dashboard = () => {
    const t = useTranslations()
    const [timeFrame, setTimeFrame] = useState('today')
    const [showCharts, setShowCharts] = useState(false)
    const [salesChartTitle, setSalesChartTitle] = useState('')
    const [salesChartData, setSalesChartData] = useState<any[]>([])
    const [hasSalesData, setHasSalesData] = useState(false)
    const [expenseCategoryData, setExpenseCategoryData] = useState<any[]>([])
    const [lowStockItems, setLowStockItems] = useState<any[]>([])
    const [recentSales, setRecentSales] = useState<any[]>([])

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">{t('sidebar.dashboard')}</h1>
                <Select
                    data={timeFrameOptions}
                    value={timeFrame}
                    onChange={(value) => setTimeFrame(value || 'today')}
                    label={t('dashboard.selectTimeframe')}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title={t('dashboard.statCards.totalSales')} value={`₦100,000`} icon={FaMoneyBill} color="bg-orange-500" />
                <StatCard title={t('dashboard.statCards.totalExpenses')} value={`₦100,000`} icon={FaMoneyBill} color="bg-red-500" />
                <StatCard title={t('dashboard.statCards.itemsInStock')} value={`100`} icon={FaBox} color="bg-blue-500" />
                <StatCard title={t('dashboard.statCards.outstandingDebt')} value={`₦100,000`} icon={FaUser} color="bg-yellow-500" />
            </div>

            {showCharts && <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                    <h2 className="text-lg font-semibold mb-4">{salesChartTitle}</h2>
                    <div className="h-[300px]">
                        {hasSalesData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={salesChartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" fontSize={12} stroke="#4b5563" />
                                    <YAxis fontSize={12} stroke="#4b5563" tickFormatter={(value) => `₦${Number(value) / 1000}k`} />
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
                                        formatter={(value) => <span style={{ color: '#F97316' }}>{t('dashboard.statCards.totalSales')}</span>}
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
                    <h2 className="text-lg font-semibold mb-4">{t('dashboard.expenseBreakdown')}</h2>
                    <div className="h-[300px]">
                        {expenseCategoryData.length > 0 ? (
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={expenseCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5}>
                                        {expenseCategoryData.map((entry, index) => (
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
                    {lowStockItems.length > 0 ? (
                        <ul className="space-y-3">
                            {lowStockItems.map(item => (
                                <li key={item.id} className="flex justify-between items-center text-sm">
                                    <span>{item.name}</span>
                                    <span className="font-bold text-red-500">{t('dashboard.lowStockItem', { count: item.stock })}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">{t('dashboard.noLowStockItems')}</p>
                    )}
                </Card>
                <Card className="lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">{t('dashboard.recentSales', { timeframe: timeFrame })}</h2>
                    {recentSales.length > 0 ? (
                        <ul className="space-y-3">
                            {recentSales?.map((sale: any) => (
                                <li key={sale?.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-800">{sale.items.map((i: any) => `${i.productName} (x${i.quantity})`).join(', ')}</p>
                                        <p className="text-gray-500">{sale.date.toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-600 text-right">+₦{sale.totalAmount.toLocaleString()}</p>
                                        {sale.totalDiscount > 0 && <p className="text-xs text-yellow-600 text-right">(-₦{sale.totalDiscount.toLocaleString()} discount)</p>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">{t('dashboard.noRecentSales')}</p>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Dashboard