import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css'
import Home from './../Home/Home';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../Contexts/UserContext';
export default function Layout() {

    let {setUserToken}=useContext(UserContext)
    useEffect(()=>{
        if(localStorage.getItem('usertoken')!=null)
        {
            setUserToken(localStorage.getItem('usertoken'))
        }
    })
    return <>
    <Navbar/>
    <Outlet/>
    </>
}
