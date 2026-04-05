import { useState } from "react"

const navbarhandler = () =>{
    const [openMenu,setOpenMenu] = useState(false)

    const toggleNavbar = (data) =>{
        if(data){
            setOpenMenu(true)
        }
        else{
            setOpenMenu(false)
        }
    }

    return{
        openMenu,
        toggleNavbar
    }
}

export default navbarhandler