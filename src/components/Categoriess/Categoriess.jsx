import React, { useEffect, useState } from 'react'
import style from './Categoriess.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Categoriess() {

    let [data, setData] = useState([])
    async function getAllCats() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setData(data)
        console.log(data);
    }
    useEffect(() => {
        getAllCats();
    }, [])
    return <>
        <div className="container">
            <div className="row">
                {data.data?.map((cat) => (
                    <div className="col-md-4 my-3 cursor-pointer">
                            <div>
                                <div className="card w-100" key={cat._id}>
                                    <div>
                                        <img className="card-img-top w-100 overflow-hidden card-img" src={cat.image} alt="Card image cap" />
                                    </div>
                                    <div className="card-body">
                                        <p className="text-main h3 text-center text-bold">{cat.name}</p>
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

