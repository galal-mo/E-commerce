import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert'
import Swal from 'sweetalert2'




export default function Brands() {
const MySwal = withReactContent(Swal)

    let [data, setData] = useState([])
    async function getAllCats() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/Brands')
        setData(data)
        console.log(data);
    }
    useEffect(() => {
        getAllCats();
    }, [])
    async function singleBrand(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        console.log(data.data.name);

        MySwal.fire({
            // title: <p className='text-main text-bold'>{data.data.name}</p>,
            html:<div className='d-flex justify-content-between'>
                <div><p className='text-main text-bold align-self-center h2'>{data.data.name}</p></div>
                <div><img src={data.data.image} alt={data.data.slug} className='w-100'/></div>
            </div>
        })
    }
    return <>
        <div className="container">
            <div className="d-flex justify-content-center mt-3">
                <h2 className='text-main text-bold'>All Brands</h2>
            </div>
            <div className="row">
                {data.data?.map((brand) => (
                    <div className="col-md-3 my-3 cursor-pointer" key={brand._id}>
                        <div>
                            <div className="card w-100" onClick={() => { singleBrand(brand._id) }} key={brand._id}>
                                <div>
                                    <img className="card-img-top w-100" src={brand.image} alt="Card image cap" />
                                </div>
                                <div className="card-body">
                                    <p className="text-main h3 text-center text-bold">{brand.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    </>

}
