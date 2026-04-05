import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editOperation } from '../../store/slice/operationSlice'
import { updateTransaction } from '../../store/slice/dataSlice'
import { X } from 'lucide-react'
import transactionHandler from '../../handlers/transactionHandler'

function EditModal() {
    const editId = useSelector((state) => state.operation.editId)
    const { data } = transactionHandler()
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        description: '', amount: '', category: '', type: '', date: ''
    })

    useEffect(() => {
        if (editId) {
            const transaction = data.find((t) => t.id === editId)
            if (transaction) setForm({ ...transaction })
        }
    }, [editId])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        dispatch(updateTransaction({ ...form, amount: Number(form.amount) }))
        dispatch(editOperation(''))
    }

    const handleClose = () => {
        dispatch(editOperation(''))
    }

    if (!editId) return null

    const inputStyle = "w-full outline-none border border-gray-300 px-3 py-2 rounded-xl text-[14px] focus:ring-2 focus:ring-[#4F6EF7] hover:border-[#4F6EF7] transition-all"
    const labelStyle = "text-[13px] font-semibold text-[#64748B]"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-[18px] font-bold text-[#0F1117]">Edit Transaction</h2>
                    <X className="cursor-pointer text-[#64748B] hover:text-[#EF4444]" onClick={handleClose} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className={labelStyle}>Description</label>
                        <input name="description" value={form.description} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={labelStyle}>Amount</label>
                        <input name="amount" type="number" value={form.amount} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={labelStyle}>Category</label>
                        <select name="category" value={form.category} onChange={handleChange} className={inputStyle}>
                            <option value="Food">Food</option>
                            <option value="Rent">Rent</option>
                            <option value="Salary">Salary</option>
                            <option value="Transport">Transport</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Investment">Investment</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={labelStyle}>Type</label>
                        <select name="type" value={form.type} onChange={handleChange} className={inputStyle}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={labelStyle}>Date</label>
                        <input name="date" type="date" value={form.date} onChange={handleChange} className={inputStyle} />
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-[#4F6EF7] hover:bg-[#3B57D6] text-white font-semibold py-2 rounded-xl transition-all mt-2">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditModal