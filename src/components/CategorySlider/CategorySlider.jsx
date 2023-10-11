import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import slider1 from '../../images/slider-image-1.jpeg'
import slider2 from '../../images/slider-image-2.jpeg'
import slider3 from '../../images/slider-image-3.jpeg'
import banner1 from '../../images/blog-img-1.jpeg'
import banner2 from '../../images/blog-img-2.jpeg'

import axios from 'axios'
export default function CategorySlider() {
    let [catdata, setcatdata] = useState([]);
    async function getAllcat() {
        let { data } = await axios('https://ecommerce.routemisr.com/api/v1/categories')
        setcatdata(data)
    }
    useEffect(() => {
        getAllcat()
    }, [])
    // console.log(catdata.data);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
    };
    var setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return <>
        <div className="mb-5 ">
            <div className="row gx-0 mb-2">
                <div className="col-md-8">
                <Slider {...setting}>
                        <img src={slider1} height={415} className='w-100' alt="" />
                        <img src={slider2} height={415} className='w-100' alt="" />
                        <img src={slider3} height={415} className='w-100' alt="" />
                    </Slider>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={banner1} className='w-100' alt="" />
                        </div>
                        <div className="col-md-12">
                            <img src={banner2} className='w-100' alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Slider {...settings}>
                {catdata.data?.map((item) => (
                    <img key={item._id} height={300} src={item.image} className='w-100' />
                ))}
            </Slider>
        </div>
    </>
}
