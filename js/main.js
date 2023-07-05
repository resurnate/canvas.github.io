
function fetchJson(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            } else if (xhr.readyState === 4) {
                reject(xhr.status);
            }
        });
        xhr.open('GET', url);
        xhr.send();
    });
}

function loadImages(urls,callbackOk,callbackErr) {
    let r = [];
    let rl= 0;     // Images loaded
    let rc= false; // Error caught?
    for (let i = 0; i < urls.length; i++) {
        let ru = urls[i];
        let ri = new Image();
        r.push(ri);
        ri.onload = function() {
            rl++;
            if (rl >= urls.length) {  // All images are loaded
                callbackOk(r);
            }
        };
        ri.onerror=function() { // Caught error
            if (rc === false) {
                rc = true;
                callbackErr(ru);
            }
        }
        ri.src = ru;
    }
}
