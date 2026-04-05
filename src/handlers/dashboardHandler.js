import { useSelector } from "react-redux";

const dashboardHandler = () => {
    const getdata = useSelector((state)=>state.data)
    const data = getdata.data
    const totalincome = () => {
        const incomeArray = data?.filter((dat) => (dat.type == "income"))
        return incomeArray.reduce((acc, item) => acc + Number(item.amount), 0);
    }

    const totalexpense = () => {
        const expenseArray = data?.filter((dat) => (dat.type == "expense"))
        return expenseArray.reduce((acc, item) => acc + Number(item.amount), 0);
    }

    const totalbalance = () => {
        let balance = 0
        return balance = totalincome() - totalexpense()
    }
    const cards = [
        { type: "income", value: totalincome(), border:'blue' },
        { type: "expense", value: totalexpense(),border:'red' },
        { type: "balance", value: totalbalance(),border:'green' },
    ];

    return {
        cards
    }
}

export default dashboardHandler