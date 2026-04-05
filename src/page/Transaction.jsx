import React, { useState } from 'react'
import TransactionTable from '../components/transaction/TransactionTable'
import TransactionFilters from '../components/transaction/TransactionFilters'
import EditModal from '../components/transaction/EditModal'
import AddModal from '../components/transaction/AddModal'
import RoleGate from '../components/role/RoleGate'
import { useSelector } from 'react-redux'

function Transaction() {
    const role = useSelector((state) => state.role.role)
    const [showAddModal, setShowAddModal] = useState(false)

    return (
        <RoleGate allowedRoles={['admin', 'viewer']}>
            <div className="">
                <div className="flex justify-between items-center">
                    <h1 className="text-[28px] font-bold text-[#0F1117]">Transactions</h1>
                    {role === 'admin' && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-[#4F6EF7] px-2 py-2 hover:bg-[#3B57D6] text-white font-semibold md:px-5 md:py-2 rounded-xl transition-all"
                        >
                            + Add Transaction
                        </button>
                    )}
                </div>
                <TransactionFilters />
                <TransactionTable />
                <EditModal />
                {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}
            </div>
        </RoleGate>
    )
}

export default Transaction