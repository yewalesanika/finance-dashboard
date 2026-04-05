import data from "../../data/transaction_data.js";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
} from "recharts";

// ── Monthly Bar Chart Data ──────────────────────────────────────────
const prepareMonthlyData = () => {
    const monthMap = {};
    data.forEach((t) => {
        const month = new Date(t.date).toLocaleString("default", { month: "short" });
        if (!monthMap[month]) monthMap[month] = { month, income: 0, expenses: 0 };
        if (t.type === "income") monthMap[month].income += t.amount;
        else monthMap[month].expenses += t.amount;
    });
    return Object.values(monthMap);
};

// ── Pie Chart Data ──────────────────────────────────────────────────
const preparePieData = () => {
    const categoryMap = {};
    data
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            if (!categoryMap[t.category]) categoryMap[t.category] = 0;
            categoryMap[t.category] += t.amount;
        });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
};

const CATEGORY_COLORS = {
    Food: "#F59E0B",
    Rent: "#EF4444",
    Transport: "#3B82F6",
    Shopping: "#8B5CF6",
    Health: "#22C55E",
    Utilities: "#06B6D4",
};

const monthlyData = prepareMonthlyData();
const pieData = preparePieData();

export default function Charts() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mt-10">

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-4 shadow">
                <h2 className="text-[#0F1117] font-semibold mb-4">Monthly Overview</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="expenses" fill="#EF4444" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-4 shadow">
                <h2 className="text-[#0F1117] font-semibold mb-4">Spending by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                        >
                            {pieData.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={CATEGORY_COLORS[entry.name] || "#94A3B8"}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}