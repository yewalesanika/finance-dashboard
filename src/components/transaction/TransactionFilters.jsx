import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { categoryFilter, searchFilter, typeFilter } from '../../store/slice/filterSlice'

function TransactionFilters() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("all")
    const [category, setCategory] = useState("all")

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        dispatch(searchFilter(value))
    }

    const handleType = (e) => {
        const value = e.target.value
        setType(value)
        dispatch(typeFilter(value))
    }

    const handleCategory = (e) => {
        const value = e.target.value
        setCategory(value)
        dispatch(categoryFilter(value))
    }

    const selectStyle = "outline-none border border-gray-300 px-3 py-2 rounded-2xl text-[14px] cursor-pointer focus:ring-2 focus:ring-[#4F6EF7] hover:border-[#4F6EF7] transition-all bg-white"

    return (
        <>
            <div className="w-full font-bold text-[25px] my-5">Filter</div>

            <div className="w-full border border-gray-300 shadow-lg rounded-2xl px-5 py-4">
                <div className="flex flex-wrap gap-6 items-end">

                    {/* Search */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[14px]">Search</label>
                        <input
                            type="search"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search transactions..."
                            className="outline-none border border-gray-300 px-3 py-2 rounded-2xl text-[14px] w-52 focus:ring-2 focus:ring-[#4F6EF7] hover:border-[#4F6EF7] transition-all"
                        />
                    </div>

                    {/* Type */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[14px]">Type</label>
                        <select value={type} onChange={handleType} className={selectStyle}>
                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[14px]">Category</label>
                        <select value={category} onChange={handleCategory} className={selectStyle}>
                            <option value="all">All</option>
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

                </div>
            </div>
        </>
    )
}

export default TransactionFilters