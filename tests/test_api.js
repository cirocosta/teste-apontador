/**
 * Unit Tests for both internal and external methods that the
 * ApiApontador object contains. For the integration tests,
 * @see  tests/test_api_integration.js
 */

'use strict';

/*global test: false, ok: false, throws: false, ApiApontador: false*/

(function () {

    module("Api Definition");

    test("instantiation of the object", function () {

        var instance_ok = new ApiApontador("access-token");
        ok(instance_ok);

        throws(function () {
            new ApiApontador();
        }, /^ApiApontador[a-zA-Z :]*/,
            "should fail if no access token provided.");
    });

})();

(function () {

    var api,
        access_token = 'access-token',
        placeId = 'place-id';

    module("Api Methods", {
        setup: function () {
            api = new ApiApontador(access_token);
        }
    });

    test("generates the full path", function () {
        var generated_path_1 = api._buildPath("/places");
        var generated_path_2 = api._buildPath("places");
        var expected_path = "https://api.apontador.com.br/v2/places"

        equal(generated_path_1, expected_path);
        equal(generated_path_2, expected_path);
    });

    test("generates the correct query", function () {
        var stub_obj = { key1: "value1", key2: "value2" };
        var expected_query = "?key1=value1&key2=value2";
        var generated_query = api._buildQuery(stub_obj);

        equal(generated_query, expected_query);
    });

})();