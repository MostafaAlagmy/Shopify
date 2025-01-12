import {configureStore} from '@reduxjs/toolkit'


import authSlice from './authSlice'
import AdminProductsSlice from './admin/products-slice';
import productSlice from './shop/productSlice';
import reviewslice from './shop/review-slice';
import cartSliceShop from './shop/cart-slice';
import AdressSlice from './shop/address-slice';
import AdminorderSlice from './admin/admin-slice';
import ShoporderSlice from './shop/order-slice';
import commonFeatureSlice from "./common-slice";
import shopSearchSlice from "./shop/search-slice";



const store =configureStore({
    reducer:{
        auth:authSlice,
        adminProducts: AdminProductsSlice,
        shopProducts:productSlice,
        shopReview: reviewslice,
        cartSlice:cartSliceShop,
        addressSlice:AdressSlice,
        adminOrderSlice:AdminorderSlice,
        shopingOrderSlice:ShoporderSlice,
        commonFeature: commonFeatureSlice,
        shopSearch: shopSearchSlice,

    }
})
export default store