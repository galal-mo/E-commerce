import React, { useContext, useEffect } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
// import  BeatLoader  from 'react-spinners/ClipLoader';
import CategorySlider from './../CategorySlider/CategorySlider';
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { WhishListContext } from '../../Contexts/WhishlistContext';

export default function Home() {
    // const [ prods, setProds ] = useState([])
    let [disabled, setdisabled] = useState(false)
    let { addProductToCart } = useContext(CartContext)
    let { addProductToWhishlist, getProductfromWhishlist } = useContext(WhishListContext)
    let [whishlistId, setit] = useState([])
    // let { getProductfromWhishlist,removeProductfromWhishlist } = useContext(WhishListContext)

    let [searchValue,setSearch]=useState('')

    async function addedtoCart(id) {
        setdisabled(true)
        let { data } = await addProductToCart(id)
        // console.log(data);
        setdisabled(false)
        if (data.status = "success") {
            toast.success("your product added successfuly")
        }
    }

    async function addprodtowhishlist(id) {
        setdisabled(true)
        let { data } = await addProductToWhishlist(id)
        console.log(data);
        setdisabled(false)
        if (data.status = "success") {
            toast.success("your product added successfuly")
            setit(data?.data)
        }
    }
    async function getWhishlistData() {
        let { data } = await getProductfromWhishlist()
        // console.log(data?.data);
        setit(data?.data)
    }
    async function getAllProds() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        // setProds(data?.data.data)
    }
    useEffect(() => {
        getAllProds()
        getWhishlistData()
    }, [whishlistId])
    let { isLoading, data } = useQuery('getAllProds', getAllProds)
    // console.log(data?.data.data);
    function Heart(id) {
        let here = false
        for (let i = 0; i < whishlistId?.length; i++) {
            if (whishlistId[i]._id === id) {
                here = true
            }
            // console.log(whishlistId);
        }
        return here
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value)
    };

    return <>
        {
            isLoading ? <div className='d-flex justify-content-center align-items-center vh-100'>
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
                <div className="container">
                    <div className="row">
                        <CategorySlider />
                        <Toaster />
                        <div className="col-md-12 mb-4">
                            <input type="text" id='search' placeholder='search' className='form-control w-75 mx-auto' onChange={handleChange} />
                        </div>
                        {data?.data.data.map((product) => {
                            return product.title?.toLowerCase().includes(searchValue.toLowerCase())?<div className="col-md-3" key={product.id}>
                                <div className="product p-3">
                                    <Link to={`product/${product._id}`}>
                                        <img src={product.imageCover} className='w-100' alt={product.title} />
                                        <span className='text-main'> {product.category.name}</span>
                                        <h2 className='h5'>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                        <div className='d-flex justify-content-between'>
                                            <span>{product.price}EG</span>
                                            <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
                                        </div>
                                    </Link>
                                    <div className='d-flex flex-row-reverse'>
                                        <button onClick={() => { addprodtowhishlist(product._id) }} disabled={disabled} className={Heart(product._id) ? 'myBtn added' : 'myBtn'}><i className='fas fa-heart'></i></button>
                                    </div>
                                    <button disabled={disabled} className={disabled ? 'btn bg-main-light w-100 mt-2 text-white' : 'btn bg-main w-100 mt-2 text-white'} onClick={() => { addedtoCart(product._id) }}>Add To Cart</button>
                                </div>
                            </div>:''
                        })}
                    </div>
                </div>
        }
    </>
}
