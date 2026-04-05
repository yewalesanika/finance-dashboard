import React, { useRef } from 'react'
import transactionHandler from '../../handlers/transactionHandler'
import { useDispatch, useSelector } from 'react-redux'
import { Pencil, Trash } from 'lucide-react'
import { editOperation } from '../../store/slice/operationSlice'
import { deleteTransaction } from '../../store/slice/dataSlice'
function TransactionTable() {
    const { data } = transactionHandler()
    const search   = useSelector((state) => state.filter.search)
    const type     = useSelector((state) => state.filter.type)
    const category = useSelector((state) => state.filter.category)
    const role     = useSelector((state) => state.role.role)
    const dispatch = useDispatch()
    const tableRef = useRef(null)

    const filtered = data.filter((t) => {
        const matchSearch   = t.description.toLowerCase().includes(search.toLowerCase())
        const matchType     = type === "all" || t.type === type
        const matchCategory = category === "all" || t.category === category
        return matchSearch && matchType && matchCategory
    })

    return (
        <>
            <div className="w-full font-bold text-[25px] my-5">Transaction Table</div>
            <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-lg my-5">
                <table className="w-full text-sm text-left" ref={tableRef}>
                    <thead className="bg-[#F4F6FA] text-[#64748B] uppercase text-xs">
                        <tr>
                            <th className="px-5 py-3">Date</th>
                            <th className="px-5 py-3">Description</th>
                            <th className="px-5 py-3">Category</th>
                            <th className="px-5 py-3">Type</th>
                            <th className="px-5 py-3">Amount</th>
                            {role === 'admin' && <th className="px-5 py-3">Action</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={role === 'admin' ? 6 : 5} className="text-center py-10 text-[#94A3B8]">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((t) => (
                                <tr key={t.id} className="hover:bg-[#F4F6FA] transition-all">
                                    <td className="px-5 py-3 text-[#64748B]">
                                        {new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-5 py-3 font-medium text-[#0F1117]">{t.description}</td>
                                    <td className="px-5 py-3 text-[#64748B]">{t.category}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                                            {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                                        </span>
                                    </td>
                                    <td className={`px-5 py-3 font-semibold ${t.type === "income" ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                                        {t.type === "income" ? "+ " : "- "}₹{t.amount.toLocaleString("en-IN")}
                                    </td>
                                    {role === 'admin' && (
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <span onClick={() => dispatch(editOperation(t.id))} className="text-blue-500 cursor-pointer hover:scale-110 transition-all">
                                                    <Pencil size={16} />
                                                </span>
                                                <span onClick={() => dispatch(deleteTransaction(t.id))} className="text-red-500 cursor-pointer hover:scale-110 transition-all">
                                                    <Trash size={16} />
                                                </span>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionTable