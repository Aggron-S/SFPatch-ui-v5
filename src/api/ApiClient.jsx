export const Execute = (url, method = "GET", body = null, headers = null) => {
  var headersForRequest = {};
  headersForRequest["Content-Type"] = "application/json";

  sessionStorage.getItem("theAnswer");

  const authToken = sessionStorage.getItem("authToken");
  if (authToken) {
    headersForRequest["Authorization"] = "Bearer " + authToken;
  }

  if (headers) {
    headersForRequest = headersForRequest.concat(headers);
  }

  const baseUrl = "https://patch-tool-api.onrender.com/";

  return new Promise((resolve, reject) => {
    fetch(baseUrl + url, {
      method: method,
      body: method == "POST" ? JSON.stringify(body ? body : {}) : null,
      headers: headersForRequest,
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log("catch fetch !ok");
          reject(new Error("Response not correct"));
        }

        response
          .json()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log("catch json");
            reject(err);
          });
      })
      .catch((err) => {
        console.log("catch fetch");
        reject(err);
      });
  });
};
