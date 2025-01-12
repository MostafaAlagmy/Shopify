import { filterOptions } from '@/config'
import { Label } from '@radix-ui/react-label'
import React, { Fragment, useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'
import { useAuth } from '@/context/AuthProvider'

const ShowFilter = ({handleFilter,filters,setdisplayCheck,displayCheck}) => {
  let {checkCatagory}=useAuth()
  let[hideCatagory,sethideCatagory]=useState(sessionStorage.getItem('hide'))
  console.log(hideCatagory);
  useEffect(()=>{
    sethideCatagory(sessionStorage.getItem('hide'))

  },[sessionStorage.getItem('hide')])
  
 
  return (
    <div className="bg-background rounded-lg shadow-sm">
         <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filters</h2>
         </div>
         <div className="p-4 space-y-4">
         {Object.keys(filterOptions).map((keyItem) => (
        
          <Fragment>
            <div className={`${hideCatagory && keyItem==hideCatagory && 'hidden' }`} >
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex font-medium items-center gap-2 ">
                    <Checkbox


                    checked={
                      filters &&
                      Object.keys(filters).length >0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id)>-1
                    }

                   

                     
                      onCheckedChange={()=> handleFilter(keyItem,option.id)}

                   
                    />
                    
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className={`${hideCatagory && keyItem==hideCatagory && 'hidden' }`}  />
          </Fragment>
        ))}

         </div>

    </div>
  )
}

export default ShowFilter