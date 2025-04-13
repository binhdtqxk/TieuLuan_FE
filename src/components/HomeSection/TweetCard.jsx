import React, { useEffect } from 'react'
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
import ReplyModal from './ReplyModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReTweet, likeweet } from '../../Store/twit/Action';

const TweetCard = ({item}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch=useDispatch();
    useEffect(()=>{

    },[item?.totalReply])
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
    const handleCreateRetweet=()=>{
        dispatch(createReTweet(item.id))
        console.log("handle create retweet");
    }
    const handleOpenReplyModel = () => {
        console.log("open model");
    }
    const handleOpenReplyModal = () => {
        setOpenReplyModal(true);
    }
    const handleLikeTweet = () => {
        dispatch(likeweet(item.id));
        console.log("handle like tweet")
    }
    const handleCloseReplyModal=()=>{
        setOpenReplyModal(false);
    }
    
    console.log()
    
    return (
        <React.Fragment>
            <div className='flex space-x-5'>
                <Avatar
                    onClick={() => navigate(`/profile/${item.user.id}`)}
                    className='cursor-pointer'
                    alt='username' src={item?.user?.image}
                />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center space-x-2'>

                            <span className='font-semibold'>{item?.user?.fullName}</span>
                            <span className='text-gray-600'>@{item?.user?.fullName?.split(" ").join("_").toLowerCase()} . 2m</span>
                            <img className='ml-2 w-5 h-5' 
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" 
                            alt="" />
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
                        <div onClick={()=>navigate(`/twit/${item?.id}`)} className='cursor-pointer'>
                            <p className='mb-2 p-0'>{item?.content}</p>
                            <img className='w-[28rem] border border-gray-400 p-5 rounded-md' 
                            src={item?.image}
                            alt="" />
                        </div>
                        <div className='py-5 flex flex-wrap justify-between items-center pr-10'>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenReplyModal} />
                                <p className='m-0'>{item?.totalReply}</p>
                            </div>

                            <div className={`${item?.retwit ? "text-pink-600" : "text-gray-600"} space-x-3 flex
                             items-center`}>
                                <RepeatIcon
                                    onClick={handleCreateRetweet}
                                    className='cursor-pointer'
                                />
                                <p className='m-0'>{item?.totalRetweets}</p>
                            </div>
                            <div className={`${item?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex
                             items-center`}>
                                {item?.liked ? <FavoriteIcon
                                    onClick={handleLikeTweet}
                                    className='cursor-pointer' /> :
                                    <FavoriteBorderIcon
                                        onClick={handleLikeTweet}
                                        className='cursor-pointer' />}
                                <p className='m-0'>{item?.totalLike}</p>
                            </div>

                            <div className='space-x-3 flex items-center text-gray-600'>
                                <BarChartIcon
                                    className='cursor-pointer'
                                    onClick={handleOpenReplyModel} />
                                <p className='m-0'>0</p>
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
            <section>
                <ReplyModal handleClose= {handleCloseReplyModal} open={openReplyModal}  item={item} />
            </section>

        </React.Fragment>
    )
}

export default TweetCard