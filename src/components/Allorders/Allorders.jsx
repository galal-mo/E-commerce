import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import axios from 'axios'
import { CartContext } from '../../Contexts/CartContext'
export default function Allorders() {
    // let[data,setit]=useState()
    let {Orders}=useContext(CartContext)
    async function fordata(){
        let {data}=await Orders()
        console.log(data);
    }
    useEffect(() => {
        fordata();
    }, [])
    return <>
        Allorders
    </>
}
