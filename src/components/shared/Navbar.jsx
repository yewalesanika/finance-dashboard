import { Menu, X } from 'lucide-react'
import navbarhandler from '../../handlers/navbarHandler'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../store/slice/roleSlice';

export default function Navbar() {
    const { toggleNavbar, openMenu } = navbarhandler()
    const dispatch = useDispatch()

    useGSAP(() => {
        gsap.from(".nav-link", { y: -20, opacity: 0, stagger: 0.5, duration: 1 })
        gsap.from('.header-name', { x: '-100vw', duration: 1, opacity: 0 })
    }, [])

    useGSAP(() => {
        if (openMenu) {
            gsap.from(".open", { x: -200, duration: 0.5 })
            gsap.from(".nav-link-2", { y: 50, opacity: 0, stagger: 0.2, duration: 0.8, delay: 0.5, ease: "power2.out" })
        }
    }, [openMenu])

    const handleRole = (e) => {
        dispatch(setRole(e.target.value))
    }

    const selectStyle = "px-3 py-1 rounded-md border border-gray-300 bg-white text-[14px] font-medium cursor-pointer outline-none focus:ring-2 focus:ring-[#4F6EF7] hover:border-[#4F6EF7] transition-all"

    return (
        <>
            <div className='fixed hidden md:flex z-50 top-0 right-0 w-full h-15 bg-white shadow-lg shadow-[#E2E8F0]'>
                <div className="flex justify-between items-center px-5 w-full h-full">
                    <div className="text-[#0F1117] font-semibold">
                        <Link to='/'><h1 className='cursor-pointer hover:scale-110 header-name transition-all'>Finance Dashboard</h1></Link>
                    </div>
                    <div className="flex gap-5 pr-5">
                        <Link to='/'><p className='hover:text-[#4F6EF7] nav-link cursor-pointer'>Dashboard</p></Link>
                        <Link to='/transaction'><p className='hover:text-[#4F6EF7] nav-link cursor-pointer'>Transaction</p></Link>
                        <Link to='/insights'><p className='hover:text-[#4F6EF7] nav-link cursor-pointer'>Insights</p></Link>
                        <div className="nav-link">
                            <select onChange={handleRole} defaultValue="" className={selectStyle}>
                                <option value="" disabled>Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden flex mt-2">
                <div className="w-full fixed h-15 top-0 bg-white left-0 z-10 px-3 flex justify-between items-center">
                    <div className="text-[#0F1117] font-semibold">
                        <h1 className='text-[25px]'>Finance Dashboard</h1>
                    </div>
                    <Menu onClick={() => toggleNavbar(true)} size={25} />
                </div>
                {openMenu && (
                    <div className="h-screen w-screen open flex flex-col gap-5 bg-[#FFFFFF] relative z-30">
                        <div className="flex justify-end mt-5 mr-5">
                            <X size={25} onClick={() => toggleNavbar(false)} />
                        </div>
                        <div className="flex flex-col gap-5 items-center">
                            <Link to='/'><p className='text-[25px] nav-link-2 font-semibold'>Dashboard</p></Link>
                            <Link to='/transaction'><p className='text-[25px] nav-link-2 font-semibold'>Transaction</p></Link>
                            <Link to='/insights'><p className='text-[25px] nav-link-2 font-semibold'>Insights</p></Link>
                            <div className="nav-link-2">
                                <select onChange={handleRole} defaultValue="" className={selectStyle}>
                                    <option value="" disabled>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}