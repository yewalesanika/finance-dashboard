import React from 'react'
import dashboardHandler from '../../handlers/dashboardHandler'
import { BanknoteArrowUp } from 'lucide-react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function SummaryCards() {
  const { cards } = dashboardHandler()
  const borderColors = {
    income: "border-blue-500",
    expense: "border-red-500",
    balance: "border-green-500",
  };

  const textColor = {
    income: "text-blue-500",
    expense: "text-red-500",
    balance: "text-green-500",
  }

  useGSAP(()=>{
    gsap.from(".heading-sum",{
      y:-10,
      opacity:0
    })
    gsap.from(".card",{
      x:-100,
      opacity:0,
      duration:1,
      stagger:0.5
    })
  },[])


  return (
    <>
      <div className="w-full overflow-x-hidden font-bold heading-sum text-[25px] my-5">Summary</div>
      <div className="w-full gap-5 md:gap-0 flex md:flex-row flex-col justify-center items-center md:justify-between">
        {
          cards?.map((card, index) => (
            <div key={index} className={`md:h-35 lg:w-80 md:w-50 w-80 h-30 flex card flex-col gap-10 p-5 rounded-2xl border shadow-lg ${borderColors[card.type]}`}>
              <h1 className='font-bold flex items-center gap-1'><BanknoteArrowUp className={`${textColor[card.type]}`} /><span>{card.type.toUpperCase()}</span></h1>
              <div className="">
                <p className={`${textColor[card.type]} font-bold`}>{card.value}</p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SummaryCards
