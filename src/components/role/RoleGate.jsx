import { useSelector } from 'react-redux'

function RoleGate({ children, allowedRoles }) {
    const role = useSelector((state) => state.role.role)

    if (!role) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="text-[60px]">🔒</div>
                <h2 className="text-[22px] font-bold text-[#0F1117]">Access Restricted</h2>
                <p className="text-[#64748B] text-[15px]">Please select a role from the navbar to view this page.</p>
            </div>
        )
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="text-[60px]">⛔</div>
                <h2 className="text-[22px] font-bold text-[#0F1117]">Permission Denied</h2>
                <p className="text-[#64748B] text-[15px]">Your current role <span className="font-semibold text-[#4F6EF7]">({role})</span> does not have access to this page.</p>
            </div>
        )
    }

    return children
}

export default RoleGate