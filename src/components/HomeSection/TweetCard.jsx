import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Avatar, Menu, MenuItem } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Chat } from '@mui/icons-material';

const TweetCard = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteTweet = () => {
        console.log("delete tweet");
        handleClose();
    }
    const handleOpenReplyModel = () => {
        console.log("open model");
    }
    const handleCreateRetweet = () => {
        console.log("handle create retweet")
    }
    const handleLikeTweet = () => {
        console.log("handle like tweet")
    }
    return (
        <div className=''>

            {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
                <RepeatIcon />
                <p>You Retweet</p>
            </div> */}

            <div className='flex space-x-5'>
                <Avatar
                    onClick={() => navigate(`/profile/${6}`)}
                    className='cursor-pointer'
                    alt='username' src='https://pbs.twimg.com/profile_images/1843591782317338628/pGgFUDI9_400x400.png'
                />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center space-x-2'>

                            <span className='font-semibold'>Phan Thanh Binh</span>
                            <span className='text-gray-600'>@PhanThanhBinh . 2m</span>
                            <img className='ml-2 w-5 h-5' src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" alt="" />
                        </div>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
                            </Menu>
                        </div>

                    </div>


                    <div className='mt-2'>
                        <div className='cursor-pointer'>
                            <p className='mb-2 p-0'>social network- full stack project with spring boot and reactJs
                            </p>
                            <img className='w-[28rem] border border-gray-400 p-5 rounded-md' src="https://pbs.twimg.com/profile_images/1843591782317338628/pGgFUDI9_400x400.png" alt="" />
                        </div>
                        <div className='py-5 flex flex-wrap justify-between items-center'>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenReplyModel} />
                                <p className='m-0'>43</p>
                            </div>

                            <div className={`${true ? "text-pink-600" : "text-gray-600"} space-x-3 flex
                             items-center`}>
                                <RepeatIcon
                                    onClick={handleCreateRetweet}
                                    className='cursor-pointer'
                                />
                                <p className='m-0'>54</p>
                            </div>
                            <div className={`${true ? "text-pink-600" : "text-gray-600"} space-x-3 flex
                             items-center`}>
                                {true ? <FavoriteIcon
                                    onClick={handleLikeTweet}
                                    className='cursor-pointer' /> :
                                    <FavoriteBorderIcon
                                        onClick={handleLikeTweet}
                                        className='cursor-pointer' />}
                                <p className='m-0'>54</p>
                            </div>

                            <div className='space-x-3 flex items-center text-gray-600'>
                                <BarChartIcon
                                    className='cursor-pointer'
                                    onClick={handleOpenReplyModel} />
                                <p className='m-0'>430</p>
                            </div>

                            <div className='space-x-3 flex items-center text-gray-600'>
                                <FileUploadIcon
                                    className='cursor-pointer'
                                    onClick={handleOpenReplyModel} />
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TweetCard