import { Avatar } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import {Button} from '@mui/material';
import TweetCard from './TweetCard';
const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required")
})

const HomeSection = () => {
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleSubmit = (values) => {
        console.log("value", values)
    }
    const formik = useFormik({
        initialValues: {
            content: "",
            image: ""
        },
        onSubmit: handleSubmit,
        validationSchema,
    })
    const handleSelectImage = (event) => {
        setUploadingImage(true);
        const imgUrl = event.target.files[0]
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    }
    return (
        <div className='space-y-5'>
            <section>
                <h1 className='text-sm font-bold opacity-90' style={{ fontSize: '1.5rem' }}>Home</h1>
            </section>
            <section className={`pb-10`}>
                <div className='flex space-x-5'>
                    <Avatar alt="username"
                        src='https://pbs.twimg.com/profile_images/1843591782317338628/pGgFUDI9_400x400.png' />
                    <div className='w-full'>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input type="text" name='content' placeholder='What is happening?'
                                    className={`border-none outline-none text-xl bg-transparent `}

                                    {...formik.getFieldProps("content")} 
                                    />
                                {formik.errors.content && formik.touched.content && (
                                    <span className='text-red-500'>{formik.errors.content}</span>
                                )}
                                {/* </div>
                            <img src="" alt="" />
                            <div> */}
                                <div className='flex justify-between items-center mt-5'>
                                    <div className='flex space-x-5 items-center'>
                                        <label className='flex items-center space-x-2 rounded-md cursor-pointer'>

                                            <ImageIcon className='text-[#1d9bf0]' />
                                            <input
                                                type="file"
                                                name='imageFile'
                                                className='hidden'
                                                onChange={handleSelectImage} />

                                        </label>
                                        <FmdGoodIcon className='text-[#1d9bf0]' />
                                        <TagFacesIcon className='text-[#1d9bf0]' />
                                    </div>

                                    <div>
                                        <Button sx={{
                                            width: "100%",
                                            borderRadius: "20px",
                                            paddingY: "8px",
                                            paddingX:"20px",
                                            bgcolor: "#1e88e5"
                                        }}
                                            variant='contained'
                                            type='submit'>
                                            Tweet
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


            </section>
            <section >
                <TweetCard/>
            </section>
        </div>
    )
}

export default HomeSection