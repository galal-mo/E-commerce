import axios from "axios";
import { createContext } from "react";







// const BaseURL=`https://ecommerce.routemisr.com`
export let WhishListContext=createContext()
export default function WhishlistContextProvider({children}){

    
const headers={
    token:localStorage.getItem('usertoken')
}
async function addProductToWhishlist(id){
    // console.log(id);
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers}).then(res=>res).catch(err=>err)
}

async function getProductfromWhishlist(){
    // console.log(id);
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).then(res=>res).catch(err=>err)
}
async function removeProductfromWhishlist(id){
    // console.log(id);
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers}).then(res=>res).catch(err=>err)
}
// async function updateProductinCart(id,count){
//     // console.log(id);
//     return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers}).then(res=>res).catch(err=>err)
// }
// async function clearProductfromCart(){
//     // console.log(id);
//     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then(res=>res).catch(err=>err)
// }


    return <WhishListContext.Provider value={{addProductToWhishlist,getProductfromWhishlist,removeProductfromWhishlist}}>
        {children}
    </WhishListContext.Provider>
}