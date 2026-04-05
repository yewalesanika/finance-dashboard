import React from 'react'
import SummaryCards from '../components/dashboard/SummaryCards'
import Charts from '../components/dashboard/Charts'
import RoleGate from '../components/role/RoleGate'

function Dashboard() {
    return (
        <RoleGate allowedRoles={['admin', 'viewer']}>
            <h1 className="text-[28px] font-bold text-[#0F1117] my-5">Dashboard</h1>
            <SummaryCards />
            <Charts />
        </RoleGate>
    )
}

export default Dashboard