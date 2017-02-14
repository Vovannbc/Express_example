(function () {
    let me = {};

    me.loadPhrase = ()=> {
        let url = '/phrase';
        $.ajax(url, {
            type: GET,
            xhrFields: { withCredentials: true},
            success: function(userProgramSubscriptions){
                callbacks.onSuccess(userProgramSubscriptions);
            },
            error: function( jqxhr, textStatus, error ) {
                top.Auth.checkAjax(jqXHR, function (errorInfo) {
                    callbacks.onError(errorInfo);
                });
            },
        });
    }
})();