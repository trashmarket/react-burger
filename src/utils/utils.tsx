import { TItems } from '../services/types/data'

const sort = (item: TItems, type: string) => {
  if (item.type === type) return item;
};

const checkResponse = (response: Response) => {
if (response.ok) return response.json();
return response.json().then((res:any) => Promise.reject(res)) 
};

export const checkResponseCart = (response: Response) => {
if (response.ok) return response.json();
return Promise.reject(response.status);
}

const checkHistory = (history: any) => {
if (
  history.location?.pathname &&
  history.location?.state?.ingredientId &&
  history.location.pathname.indexOf(history.location.state.ingredientId)
) {
  history.replace({
    pathname: history.location.pathname,
  });
}
}

type TpropsCookie = { [key: string]: number | Date | string | boolean}  ;
function setCookie(name: string, value: string | null, props:TpropsCookie) {
props = props || {};
let exp = props.expires;

if (typeof exp == 'number' && exp) {
  const d = new Date();
  d.setTime(d.getTime() + exp * 1000);
  exp = props.expires = d;
}
if (exp && (exp as Date).toUTCString) {
  props.expires = (exp as Date).toUTCString();
}

value = encodeURIComponent(value !== null && value);
let updatedCookie = name + '=' + value;

for (const propName in props) {
  updatedCookie += '; ' + propName;
  const propValue = props[propName];
  if (propValue !== true) {
    updatedCookie += '=' + propValue;
  }
}
document.cookie = updatedCookie;
}

function getCookie(name: string) {
const matches = document.cookie.match(
  new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
);
return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name: string) {
setCookie(name, null, { expires: -1 });
}

type TSetCookieCompleteDoble = {
  accessToken: string;
  refreshToken: string;
}

export function setCookieCompleteDoble(res: TSetCookieCompleteDoble) {
let authToken = res.accessToken.split('Bearer ')[1];
setCookie('token', authToken, {path: '/'});
setCookie('refreshToken', res.refreshToken, {path: '/'});
}

export {sort, checkResponse, setCookie, getCookie, deleteCookie, checkHistory}