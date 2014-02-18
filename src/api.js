'use strict';

/*global XMLHttpRequest: false */

/**
 * Object for accessing in a better way the Api (simplified).
 * See `@todo` elements for improvements that are pending. 
 * @param {String} access_token the access token you receive.
 * @see https://api.apontador.com.br/v2/docs/authentication
 */
function ApiApontador(accessToken) {

    this.basePath = "https://api.apontador.com.br/v2/";

    /**
     * Generic exception to be thrown if an API exception raises
     * @param {String} message quick description of the error.
     */
    this.ApiApontadorException = function (message) {
        this.message = message;
        this.name = "ApiApontadorException";
    };

    if (! accessToken) {
        throw new this.ApiApontadorException(
            "ApiApontadorException: No access token provided."
        );
    }

    this.accessToken = accessToken;
}

/**
 * Given a relative path, returns the full path.
 * @param  {String} where the relative path
 * @return {String}       the absolute path
 */
ApiApontador.prototype._buildPath = function (where) {
    if (where[0] === '/') {
        where = where.slice(1, where.length);
    }
    return this.basePath + where;
};

/**
 * Generates a GET query string given an object.
 * @param  {Object} params a one-layer object containing the params
 * @return {String}        the string representation of the object
 * @todo Implement urlencode for non-ascii params.
 */
ApiApontador.prototype._buildQuery = function (params) {
    var result = "", i = 0;
    for(var key in params) {
        if(i++) {
            result += "&" + key + "=" + params[key];
        } else {
            result +=  "?" + key + "=" + params[key];
        }
    }
    return result;
};

/**
 * Makes a request for getting info about a Place.
 * @param  {String} placeId  the ID of the Place
 * @param  {Function} listener the listener function to be executed when the
 *                             request is completed. The context is XHR Obj.
 * @param  {Object} args     An object representing the args to be passed for
 *                           the query. Does not needs to add access_token.
 * @see https://api.apontador.com.br/v2/docs/places
 */
ApiApontador.prototype.getPlaceInfo = function (placeId, listener, args) {
    var path = this._buildPath("/places/" + placeId);
    args = args || {};
    args.access_token = this.accessToken;

    path += this._buildQuery(args);

    var xhr = new XMLHttpRequest();
    xhr.onload = listener || function () {};
    xhr.open("GET", path, true);
    xhr.send();
};

/**
 * Makes a request for getting the reviews of a Place.
 * @param  {String} placeId  the ID of the Place
 * @param  {Function} listener the listener function to be executed when the
 *                             request is completed. The context is XHR Obj.
 * @param  {Object} args     An object representing the args to be passed for
 *                           the query. Does not need to add access_token.
 * @see https://api.apontador.com.br/v2/docs/reviews
 */
ApiApontador.prototype.getPlaceReviews = function (placeId, listener, args) {
    var path = this._buildPath("/places/" + placeId + "/reviews");
    args = args || {};
    args.access_token = this.accessToken;

    path += this._buildQuery(args);

    var xhr = new XMLHttpRequest();
    xhr.onload = listener || function () {};
    xhr.open("GET", path, true);
    xhr.send();    
};



