import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const RightPart = () => {
    const handleChangeTheme = () => {
        console.log("handle change theme");
    }
    return (
        <div className='py-5 sticky top'>
            <div className='relative flex items-center'>
                <input type="text" className='py-3 rounded-full outline text-gray-500 w-full pl-12' />

                <div className='absolute top-0 left-0 pl-3 pt-3'>
                    <SearchIcon className='text-gray-500' />
                </div>

                <Brightness6Icon className='ml-3 cursor-pointer'
                    onClick={handleChangeTheme} />
            </div>

            <section className='my-3'>

                <h5 className='text-xl font-bold'>
                    Get Verified
                </h5>
                <h6 className='font-bold my-2'>Subscribe to unlock new feature</h6>
                <Button variant='contained' sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}>
                    Get verified
                </Button>
            </section>
            <section className='mt-7 space-y-5'>
                <h3 className='font-bold text-xl py-1'>What's happening</h3>

                <div>
                    <p className='text-sm'>Entertainment. Trending</p>
                    <p className='font-bold'>Viruss</p>
                </div>

                <div className='flex justify-between w-full'>
                    <div>
                        <p className='text-sm'>Entertainment. Trending</p>
                        <p className='font-bold'>#kera</p>
                        <p>45k tweets</p>
                    </div>
                    <MoreHorizIcon />
                </div>
            </section>
        </div>
    )
}

export default RightPart