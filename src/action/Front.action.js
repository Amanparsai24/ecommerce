import {postRequest} from "./helper"

export const loginAction = (data) => {
    return postRequest('loginWithOtp',data).then(res=>{return res.data});
}

export const otpVerificationAction = (data) => {
    return postRequest('otpVerify', data).then(res => { return res.data });
}

export const addressaddAction = (data) => {
    return postRequest('addUserAddresses', data).then(res => { return res.data });
}

export const addresseditAction = (data) => {
    return postRequest('editUserAddresses', data).then(res => { return res.data });
}

export const addressDeleteAction = (data) => {
    return postRequest('deleteUserAddresses', data).then(res => { return res.data });
}

export const getAddressAction = (data) => {
    return postRequest('userLoginList', data).then(res => { return res.data });
}

export const productListAction = (data) => {
    return postRequest('productList', data).then(res => { return res.data });
}

export const categoryListAction = (data) => {
    return postRequest('categoryList', data).then(res => { return res.data });
}

export const saveWishlistItemAction = (data) => {
    return postRequest('addWishList', data).then(res => { return res.data });
}

export const getWishlistAction = (data) => {
    return postRequest('wishList', data).then(res => { return res.data });
}

export const removeWishlistItemAction = (data) => {
    return postRequest('deleteWishListProduct', data).then(res => { return res.data });
}

export const AddlistAction = (data) => {
    return postRequest('addList', data).then(res => { return res.data });
}

export const addProductToListAction = (data) => {
    return postRequest('addListToProduct', data).then(res => { return res.data });
}

export const checkCouponAction = (data) => {
    return postRequest('couponApply', data).then(res => { return res.data });
}

export const updateQuantityAction = (data) => {
    return postRequest('quantityUpdate', data).then(res => { return res.data });
}

export const paymentModeListAction = (data) => {
    return postRequest('PaymentModeList', data).then(res => { return res.data });
}

export const orderPlacedListAction = (data) => {
    return postRequest('buyOrder', data).then(res => { return res.data });
}

export const getOrderAction = (data) => {
    return postRequest('orderList', data).then(res => { return res.data });
}






















