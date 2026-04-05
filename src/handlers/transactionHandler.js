import { useSelector } from "react-redux"

const transactionHandler = () =>{
    const getdata = useSelector((state)=>state.data)
    const data = getdata.data

    return{
        data
    }
}

export default transactionHandler