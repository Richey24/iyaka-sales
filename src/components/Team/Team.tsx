'use client'
import React, { useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Table } from '@mantine/core'
import { FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddTeam from './AddTeam'

const Team = () => {
    const t = useTranslations()
    const [addTeamModal, setAddTeamModal] = useState(false)
    return (
        <div className="space-y-6 p-6">
            <PageHeader title={t('sidebar.team')} onAdd={() => setAddTeamModal(true)} addText={t('teamPage.addMember')} />
            <Card>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('teamPage.table.email')}</Table.Th>
                            <Table.Th>{t('teamPage.table.role')}</Table.Th>
                            <Table.Th>{t('teamPage.table.actions')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>John Doe</Table.Td>
                            <Table.Td><div className='px-[8px] py-[2px] rounded-[50px] bg-green-500 text-white flex items-center gap-2 justify-center w-fit text-[12px]'>Admin</div></Table.Td>
                            <Table.Td>
                                <FaTrash className="text-gray-700 cursor-pointer" size={20} />
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card>
            <AddTeam opened={addTeamModal} close={() => setAddTeamModal(false)} />
        </div>
    )
}

export default Team