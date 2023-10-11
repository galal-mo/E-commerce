import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from './../../Contexts/CartContext';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Cart() {
    let { getProductfromCart, updateProductinCart, removeProductfromCart, clearProductfromCart,setCartid } = useContext(CartContext)

    let [data, setData] = useState([])
    let [isLoading, setLoading] = useState(false)

    async function getCartData() {
        setLoading(true)
        let { data } = await getProductfromCart()
        setData(data);
        setCartid(data?.data?._id)
        console.log(data);
        setLoading(false)
    }

    async function toRemove(id) {
        let { data } = await removeProductfromCart(id)
        setData(data);
        console.log(data);
    }
    async function toUpdate(id, count) {
        let { data } = await updateProductinCart(id, count)
        setData(data);
    }
    async function toClear() {
        let { data } = await clearProductfromCart()
        setData(data);
    }
    useEffect(() => {
        getCartData();
    }, [])
    let NestdData = (data ? <div className='container'>
        <div className='bg-body-tertiary my-5 p-4'>
            <h3>Shop Cart</h3>
            {data ?<div className='d-flex justify-content-between'> <span className='text-main'>total Cart Price: {data.data?.totalCartPrice}</span><Link to={`/PaymentDetails`} className='btn bg-main text-white'>CheckOut</Link> </div>: <div className='container'>
                <h2 className='text-center'>Your cart is empty</h2>
            </div>}

            {data.data?.products.map((product) => (
                <div key={product.product?.id} className="row my-2">
                    <div className="col-md-2">
                        <img src={product.product?.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between">
                        <div>
                            <h4>{product.product?.title}</h4>
                            <h6 className='text-main'>price: {product?.price}</h6>
                            <button className='btn' onClick={() => { toRemove(product.product?.id) }}><i className='me-1 fa fa-trash text-main'></i>Remove</button>
                        </div>
                        <div>
                            <button className='btn btn-brdr' onClick={() => { toUpdate(product.product?.id, product.count + 1) }}><i className='fas fa-plus'></i></button>
                            <span className='mx-2'>{product.count}</span>
                            <button className='btn btn-brdr' onClick={() => { product.count - 1 === 0 ? toRemove(product.product?.id) : toUpdate(product.product?.id, product.count - 1) }}><i className='fas fa-minus'></i></button>
                        </div>
                    </div>
                </div>
            ))}

            {data.data?.totalCartPrice == 0 ?  "":<div className='d-flex justify-content-center'>
                <Link to={'/'}>
                <button className='btn btn-brdr' onClick={() => toClear()}>Clear your cart</button>
                </Link>
            </div>}
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
