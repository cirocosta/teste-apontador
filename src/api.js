var ApontadorClient = function(applicationAccessToken){
    var _getPlace = function(localId) {
        return jQuery.ajax({
            type: 'GET',
            url: 'https://api.apontador.com.br/v2/places/'+ localId  + 
                '?access_token=' + applicationAccessToken,
            dataType: 'jsonp'
        });
    };

    return{
        getPlace : _getPlace
    };
};