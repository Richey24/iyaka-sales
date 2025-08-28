'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Layout/PageHeader'
import { useTranslations } from 'next-intl'
import { Table } from '@mantine/core'
import { FaSpinner, FaTrash } from 'react-icons/fa'
import Card from '../Dashboard/Card'
import AddTeam from './AddTeam'
import { User } from '@/utils/validation'
import { getUsers } from '@/api/users'
import DeleteUser from './DeleteUser'

const Team = () => {
    const t = useTranslations()
    const [addTeamModal, setAddTeamModal] = useState(false)
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)

    const fetchUsers = async () => {
        setLoading(true)
        const response = await getUsers()
        if (response.success) {
            setUsers(response.data?.users || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="space-y-6 p-6">
            <PageHeader title={t('sidebar.team')} onAdd={() => setAddTeamModal(true)} addText={t('teamPage.addMember')} />
            <Card>
                {
                    loading ? (
                        <div className='flex items-center justify-center h-full'>
                            <FaSpinner className='text-gray-700' size={20} />
                        </div>
                    ) : (
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>{t('teamPage.table.email')}</Table.Th>
                                    <Table.Th>{t('teamPage.table.role')}</Table.Th>
                                    <Table.Th>{t('teamPage.table.actions')}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    users.map((user) => (
                                        <Table.Tr key={user._id}>
                                            <Table.Td>{user.email}</Table.Td>
                                            <Table.Td><div className='px-[8px] py-[2px] rounded-[50px] bg-green-500 text-white flex items-center gap-2 justify-center w-fit text-[12px]'>{user.role}</div></Table.Td>
                                            <Table.Td>
                                                <FaTrash className="text-gray-700 cursor-pointer" size={20} onClick={() => {
                                                    setSelectedUser(user)
                                                    setDeleteUserModal(true)
                                                }} />
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                }
                            </Table.Tbody>
                        </Table>
                    )
                }
            </Card>
            <AddTeam opened={addTeamModal} close={() => setAddTeamModal(false)} fetchUsers={fetchUsers} />
            <DeleteUser opened={deleteUserModal} close={() => setDeleteUserModal(false)} user={selectedUser} fetchUsers={fetchUsers} />
        </div>
    )
}

export default Team