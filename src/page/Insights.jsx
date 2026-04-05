import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import RoleGate from '../components/role/RoleGate'
import { TrendingUp, TrendingDown, Wallet, PiggyBank, BarChart2 } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const prepareInsights = (data) => {
    const now = new Date()
    const thisMonth = now.getMonth()
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
    const thisYear = now.getFullYear()
    const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear

    const thisMonthExpenses = data
        .filter((t) => {
            const d = new Date(t.date)
            return t.type === 'expense' && d.getMonth() === thisMonth && d.getFullYear() === thisYear
        })
        .reduce((acc, t) => acc + t.amount, 0)

    const lastMonthExpenses = data
        .filter((t) => {
            const d = new Date(t.date)
            return t.type === 'expense' && d.getMonth() === lastMonth && d.getFullYear() === lastYear
        })
        .reduce((acc, t) => acc + t.amount, 0)

    const categoryMap = {}
    data.filter((t) => t.type === 'expense').forEach((t) => {
        if (!categoryMap[t.category]) categoryMap[t.category] = 0
        categoryMap[t.category] += t.amount
    })
    const highestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]

    const totalIncome  = data.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
    const totalExpense = data.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
    const savingsRate  = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0

    const uniqueDays = [...new Set(data.filter((t) => t.type === 'expense').map((t) => t.date))].length
    const avgDaily   = uniqueDays > 0 ? (totalExpense / uniqueDays).toFixed(0) : 0

    const monthDiff = thisMonthExpenses - lastMonthExpenses
    const monthChange = lastMonthExpenses > 0
        ? (((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100).toFixed(1)
        : 0

    return { thisMonthExpenses, lastMonthExpenses, highestCategory, savingsRate, avgDaily, monthDiff, monthChange }
}

function InsightCard({ icon, title, value, subtitle, color }) {
    return (
        <div className={`insight-card bg-white rounded-2xl shadow border border-gray-100 p-5 flex items-start gap-4`}>
            <div className={`p-3 rounded-xl ${color}`}>
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-[13px] text-[#64748B] font-medium">{title}</p>
                <p className="text-[22px] font-bold text-[#0F1117]">{value}</p>
                {subtitle && <p className="text-[12px] text-[#94A3B8]">{subtitle}</p>}
            </div>
        </div>
    )
}

function Insights() {
    const data = useSelector((state) => state.data.data)
    const containerRef = useRef(null)

    const {
        thisMonthExpenses, lastMonthExpenses,
        highestCategory, savingsRate,
        avgDaily, monthDiff, monthChange
    } = prepareInsights(data)

    useGSAP(() => {
        gsap.from('.insight-card', {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.5,
            ease: 'power2.out'
        })
    }, [])

    return (
        <RoleGate allowedRoles={['admin', 'viewer']}>
            <div className="" ref={containerRef}>
                <h1 className="text-[28px] font-bold text-[#0F1117] my-5">Insights</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <InsightCard
                        icon={<BarChart2 size={22} className="text-[#8B5CF6]" />}
                        title="Highest Spending Category"
                        value={highestCategory ? highestCategory[0] : 'N/A'}
                        subtitle={highestCategory ? `₹${highestCategory[1].toLocaleString('en-IN')} total spent` : ''}
                        color="bg-purple-100"
                    />

                    <InsightCard
                        icon={monthDiff > 0
                            ? <TrendingUp size={22} className="text-[#EF4444]" />
                            : <TrendingDown size={22} className="text-[#22C55E]" />}
                        title="This Month vs Last Month"
                        value={`₹${thisMonthExpenses.toLocaleString('en-IN')}`}
                        subtitle={monthDiff > 0
                            ? `▲ ${monthChange}% more than last month (₹${lastMonthExpenses.toLocaleString('en-IN')})`
                            : `▼ ${Math.abs(monthChange)}% less than last month (₹${lastMonthExpenses.toLocaleString('en-IN')})`}
                        color={monthDiff > 0 ? "bg-red-100" : "bg-green-100"}
                    />

                    <InsightCard
                        icon={<PiggyBank size={22} className="text-[#22C55E]" />}
                        title="Savings Rate"
                        value={`${savingsRate}%`}
                        subtitle="of total income saved"
                        color="bg-green-100"
                    />

                    <InsightCard
                        icon={<Wallet size={22} className="text-[#F59E0B]" />}
                        title="Average Daily Expense"
                        value={`₹${Number(avgDaily).toLocaleString('en-IN')}`}
                        subtitle="based on days with transactions"
                        color="bg-yellow-100"
                    />

                    <InsightCard
                        icon={<TrendingUp size={22} className="text-[#4F6EF7]" />}
                        title="Total Transactions"
                        value={data.length}
                        subtitle={`${data.filter(t => t.type === 'income').length} income · ${data.filter(t => t.type === 'expense').length} expenses`}
                        color="bg-blue-100"
                    />

                </div>
            </div>
        </RoleGate>
    )
}

export default Insights