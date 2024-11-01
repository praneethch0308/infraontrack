import { Typography } from '@mui/material'
import React from 'react'

const AssetDetails = ({title,value}) => {
  return (
    <>
    <div className='flex w-full  justify-between m-1 p-2'>
    <div className='w-1/3' >
        <Typography className='text-[#002a5c] font-semibold'>{title}</Typography></div>
    <div className='1-1/3'>:</div>
    <div className='font-semibold w-1/3 '>
        <Typography>{value}</Typography></div>
    </div>
    </>
  )
}

export default AssetDetails