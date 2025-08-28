import Card from './Card'
import React from 'react'

const StatCard = ({ title, value, color, icon: Icon }: { title: string, value: string, color: string, icon: React.ElementType }) => {
    return (
        <Card>
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </Card>
    )
}

export default StatCard