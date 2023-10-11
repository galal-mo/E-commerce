import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContext } from '../../Contexts/CartContext'
import toast, { Toaster } from 'react-hot-toast';   






export default function ProductDetails() {
    
    let { addProductToCart } = useContext(CartContext)
    async function addedtoCart(id) {
        let {data}=await addProductToCart(id)
        console.log(data);
        if(data.status="success")
        {
            toast.success("your product added successfuly")
        }
    }
    let { id } = useParams()
    let [data, setData] = useState([])
    let [isLoading, setLoading] = useState(false)
    async function getProdDeta(x) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
        setData(data)
        setLoading(false)
    }
    useEffect(() => {
        getProdDeta(id)
    }, [])
    console.log(data.data);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // console.log(id);
    return <>
        {isLoading ? <div className='d-flex justify-content-center align-items-center vh-100'>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div> :
            <div className='container'>
                <div className="row align-items-center p-2">
                    <Toaster/>
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {data.data?.images.map((imgsrc) => (
                                <img key={id} src={imgsrc}  alt="" />
                            ))}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <h2 className='text-main'>{data.data?.title}</h2>
                        <p>{data.data?.description}</p>
                        <h5>{data.data?.category.name}</h5>
                        <div className='d-flex justify-content-between'>
                            <span>{data.data?.price}EG </span>
                            <span><i className='fas fa-star rating-color'></i>
                                <span>{data.data?.ratingsAverage}</span>
                            </span>
                        </div>
                        <button className='btn text-white w-100 mt-2 bg-main' onClick={() => { addedtoCart(data.data.id) }}>Add To Cart</button>
                    </div>

                </div>
            </div>
        }
    </>
}
