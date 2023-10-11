import React, { useContext } from 'react'
import style from './PaymentDetails.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Contexts/CartContext'
import { useParams } from 'react-router-dom'


export default function PaymentDetails() {
    let { id }=useParams()
    let {pay}=useContext(CartContext)
    const handlePayment = async(values) => {
        console.log(id);
        let {data}=await pay(values)
        if(data.status=='success'){
            console.log(data.session.url);
            window.location.href=data.session.url
        }
        // console.log(data);
    }
    let Formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: handlePayment
    })
    return <>
        <div className="container w-50">
            <form onSubmit={Formik.handleSubmit}>
                <label htmlFor="Details">Details</label>
                <input className='form-control' type="text" name='details' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.details} id='Details' />

                <label htmlFor="phone">phone</label>
                <input className='form-control' type="tel" name='phone' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.phone} />

                <label htmlFor="City">City</label>
                <input className='form-control' type="text" name='city' onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.city} />

                <button type='submit' className='btn bg-main my-4 text-white'>Pay Now</button>
            </form>
        </div>
    </>
}
