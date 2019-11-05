const API = (function(){
  var _token = null;
  var checkStatus = function(res){
    if(res.status >= 200 && res.status < 300) return res;
    throw new Error(res.status)
  }
  return {
        setToken: token => {_token = token},
        get: (url) => fetch(`${url}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${_token}`
              }
            }
          ).then(checkStatus).then(response => response.json()),
        post: (url, body) => fetch(`${url}`, {
              method: 'POST',
              headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${_token}`
              },
              body: JSON.stringify(body)
            }
          ).then(checkStatus).then(response => response.json()),
        patch: (url, body) => fetch(`${url}`, {
            method: 'PATCH',
            headers: {
              'Content-Type':'application/json',
              'Authorization': `Bearer ${_token}`
            },
            body: JSON.stringify(body)
          }
        ).then(checkStatus).then(response => response.json()),
        delete: (url) => fetch(`${url}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${_token}`
              }
            }
          )
    };
})();

export default API;
