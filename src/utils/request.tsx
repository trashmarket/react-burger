import { getCookie } from "./utils";
import { baseUrl } from './constants'
import { checkResponse } from '../utils/utils'
import { TForm, TRefreshToken } from '../services/actions/person';
import { TPostEmailBody } from '../services/types/data'
import { TingredientsId } from '../services/actions/cart'

type TpostRequestBody = 
  | TForm
  | TRefreshToken
  | TPostEmailBody

export const postRequest = (url: string, body: TpostRequestBody) => {
 return fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(body)
 }) 
}

export const postOrderRequest = (url: string, body: TingredientsId) => {
  return fetch(url, {
   method: "POST",
   headers: {
     "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('token') 
   },
   body: JSON.stringify(body)
  }) 
 }
 
export const getUserRequest = (url: string) => fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
     Authorization: 'Bearer ' + getCookie('token')
  }
})

export const patchUserRequest = (url: string, body: TForm) => fetch(url, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
     Authorization: 'Bearer ' + getCookie('token')
  },
  body: JSON.stringify(body)
})

export const upadateToken = () => fetch(baseUrl + 'auth/token', {
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
