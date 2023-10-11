import React, { useContext, useEffect, useState } from 'react'
import style from './Whishlist.module.css'
import { WhishListContext } from '../../Contexts/WhishlistContext'
import { Oval } from 'react-loader-spinner';
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Whishlist() {



    let { getProductfromWhishlist,removeProductfromWhishlist } = useContext(WhishListContext)   
    let {addProductToCart}=useContext(CartContext)

    let [data, setData] = useState([])
    let [isLoading, setLoading] = useState(false)

    async function getWhishlistData() {
        setLoading(true)
        let { data } = await getProductfromWhishlist()
        setData(data);
        console.log(data);
        setLoading(false)
    }

    async function addedtoCart(id) {
        let { data } = await addProductToCart(id)
        // console.log(data);
        if (data.status = "success") {
            toast.success("your product added successfuly")
        }
    }
    async function toRemoveFromWhishlist(id) {
        await removeProductfromWhishlist(id)
        let { data } = await getProductfromWhishlist()
        setData(data);
        console.log(data);
    }


    useEffect(() => {
        getWhishlistData();
    }, [])

    // async function toRemove(id) {
    //     let { data } = await removeProductfromCart(id)
    //     setData(data);
    //     console.log(data);
    // }

    let NestdData = (data ? <div className='container'>
        <div className='bg-body-tertiary my-5 p-4'>
            <Toaster/>
            <h3>Whishlist</h3>
            {data.data?.map((product) => (
                <div key={product?.id} className="row my-2">
                    <div className="col-md-2">
                        <img src={product?.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between">
                        <div>
                            <h4>{product?.title}</h4>
                            <h6 className='text-main'>price: {product?.price}</h6>
                            <button className='btn' onClick={()=>{toast.promise(toRemoveFromWhishlist(product?.id),{ loading: 'Loading',success: 'product removed successfuly',})}}><i className='me-1 fa fa-trash text-main'></i>Remove</button>
                        </div>
                        <div>
                            <button className='btn btn-brdr' onClick={() => {addedtoCart(product?.id)}}>add to cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div> :
        <div className='container'>
            <div className='bg-body-tertiary my-5 p-4'>
                <h3>Shop Cart</h3>
                <h2 className='text-center'>Your cart is empty</h2>
            </div>
        </div>)

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
        </div> : NestdData
        }
    </>
}
