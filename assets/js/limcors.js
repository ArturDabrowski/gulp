/*
    Add/import this file just after axios.min.js
    Use minimised limcors.min.js instead.
 */

window.addEventListener('unload', function(e) {
    clearCorsParams();
});

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.interceptors.response.use(function (response){
    if (response.headers['x-session-id']) {
        setupCorsParam('session_id', response.headers['x-session-id']);
    }
    if (response.headers['x-csrf-token']) {
        setupCorsParam('csrf_token', response.headers['x-csrf-token'])
    }
    return response;
});


if (window.localStorage.getItem('session_id')) {
    setupCorsParam('session_id', window.localStorage.getItem('session_id'));
}
if (window.localStorage.getItem('csrf_token')) {
    setupCorsParam('csrf_token', window.localStorage.getItem('csrf_token'));
}

function setupCorsParam(key, value) {
    var v, header;

    switch (key) {
        case 'session_id' : v = 'session_id'; header = 'X-SESSION-ID'; break;
        case 'csrf_token' : v = 'csrf_token'; header = 'X-CSRF-TOKEN'; break;
    }
    if (typeof v !== 'undefined' && typeof header !== 'undefined') {
        window.localStorage.setItem(v, value);
        window.axios.defaults.headers.common[header] = value;
    }
}

function clearCorsParams() {
    window.localStorage.removeItem('session_id');
    window.localStorage.removeItem('csrf_token');
}