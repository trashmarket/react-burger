import { getCookie } from "./utils";
import { authToken } from './constants'
import { checkResponse } from '../utils/utils'

export const postRequest = (url, body) => {
 return fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify(body)
 }) 
}

export const getUserRequest = (url) => fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: 'Bearer ' + getCookie('token')
  }
})

export const patchUserRequest = (url, body) => fetch(url, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: 'Bearer ' + getCookie('token')
  },
  body: JSON.stringify(body)
})

export const upadateToken = () => fetch(authToken, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    token: getCookie('refreshToken')
  })
})
.then(checkResponse)
.catch(error => console.log(error))
