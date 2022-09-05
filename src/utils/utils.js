const sort = (item, type) => {
    if (item.type === type) return item;
};

const checkResponse = (response) => {
  if (response.ok) return response.json();
  return response.json().then((res) => Promise.reject(res)) 
};

 function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
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

 function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

 function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function setCookieCompleteDoble(res) {
  let authToken = res.accessToken.split('Bearer ')[1];
  setCookie('token', authToken);
  setCookie('refreshToken', res.refreshToken);
}

export {sort, checkResponse, setCookie, getCookie, deleteCookie}