import axios from "axios";
import { createContext, useState } from "react";







// const BaseURL=`https://ecommerce.routemisr.com`
export let CartContext = createContext()
export default function CartCOntextProvider({ children }) {
    let [cartId, setCartid] = useState(null)
    const headers = {
        token: localStorage.getItem('usertoken')
    }
    async function addProductToCart(id) {
        // console.log(id);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: id }, { headers }).then(res => res).catch(err => err)
    }
    async function getProductfromCart() {
        // console.log(id);
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then(res => res).catch(err => err)
    }
    async function removeProductfromCart(id) {
        // console.log(id);
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers }).then(res => res).catch(err => err)
    }
    async function updateProductinCart(id, count) {
        // console.log(id);
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers }).then(res => res).catch(err => err)
    }
    async function clearProductfromCart() {
        // console.log(id);
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then(res => res).catch(err => err)
    }

    function pay(data) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                shippingAddress: data
            }
            ,
            { headers }).then(res => res).catch(err => err)
    }
    async function Orders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`)
    }

    return <CartContext.Provider value={{ addProductToCart, getProductfromCart, removeProductfromCart, updateProductinCart, clearProductfromCart, pay, cartId, setCartid, Orders }}>
        {children}
    </CartContext.Provider>
}