import {postRequest} from "./helper"

export const adminLoginAction = (data) => {
    return postRequest('login', data).then(res => { return res.data });
}














