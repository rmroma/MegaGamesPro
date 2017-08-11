'use strict';

define(['app'], function (app) {

    // FOR cross origin token stuff
    var csrfService = function () {
        var cookies = document.cookie.split('; ');
        for (var i=0; i<cookies.length; i++) {
            var cookie = cookies[i].split('=');
            if(cookie[0].indexOf('XSRF-TOKEN') > -1) {
                return cookie[1];
            }
        }
        return 'none';
    };

    app.factory('csrfService', csrfService);
});