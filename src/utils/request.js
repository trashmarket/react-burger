export const postRequest = (url, body) => {
 return fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    ingredients: body
  })
 }) 
}