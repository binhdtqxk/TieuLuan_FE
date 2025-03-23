import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const handleOpenProfileModel = () => {
        console.log("open profile model")
    }
    const handleFollowUser = () => {
        console.log("follow user");
    }
    return (
        <div>
            <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>

                <KeyboardBackspaceIcon
                    className='cursor-pointer'
                    onClick={handleBack} />
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5 '>Phan Thanh Binh</h1>
            </section>

            <section>
                <img className='w-[100%] h-[15rem] object-cover' src="https://cdn.pixabay.com/photo/2025/03/09/08/26/bridge-9456745_640.jpg" alt="" />
            </section>

            <section className='pl-6'>
                <div className='flex justify-between item-start mt-3 h-[5rem]'>
                    <Avatar className='transform -translate-y-24'
                        alt='Phan Thanh Binh' src='https://pbs.twimg.com/profile_images/1843591782317338628/pGgFUDI9_400x400.png'
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }} />

                    {true ? (<Button
                        onClick={handleOpenProfileModel}
                        variant='contained'
                        sx={{
                            borderRadius: "20px",
                            height:"2.5rem"     
                        }}>
                        Edit Profile
                    </Button>) :
                        (<Button
                            onClick={handleFollowUser}
                            variant='contained'
                            sx={{ borderRadius: "20px" ,
                                height:"2.5rem" 
                            }}>
                            {true ? "Follow" : "UnFollow"}
                        </Button>)}


                </div>
            </section>
        </div>
    )
}

export default Profile