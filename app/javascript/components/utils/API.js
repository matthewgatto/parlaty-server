const API = (function(){
  var _token = null;
  var checkStatus = function(res){
    if(res.status >= 200 && res.status < 300) {
      return res.text().then(function(text) {
        return text ? JSON.parse(text) : {}
      });
    } else {
      return res.text().then(function(text) {
        if(text){
          const {error} = JSON.parse(text);
          throw {formError: (error && Array.isArray(error) && error.length > 0) ? error[0] : "An unexpected error has occurred"}
        } else {
          throw res.status
        }
      })
    }
  }
  return {
        setToken: token => {_token = token},
        get: (url) => fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${_token}`
              }
            }
          ).then(checkStatus),
        post: (url, body) => fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${_token}`,
                'Accept': 'application/json'
              },
              body: JSON.stringify(body)
            }
          ).then(checkStatus),
        put: (url, body) => fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${_token}`,
                'Accept': 'application/json'
              },
              body: JSON.stringify(body)
            }
          ).then(checkStatus),
        multipost: (url, body, token) => fetch(url, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token || _token}`
              },
              body
            }
          ).then(checkStatus),
        multiput: (url, body, token) => fetch(url, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token || _token}`
              },
              body
            }
          ).then(checkStatus),
        patch: (url, body) => fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type':'application/json',
              'Authorization': `Bearer ${_token}`
            },
            body: JSON.stringify(body)
          }
        ).then(checkStatus),
        delete: (url) => fetch(url, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${_token}`
              }
            }
          )
    };
})();

export default API;
