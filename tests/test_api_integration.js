'use strict';

/*global test: false, ok: false, throws: false, ApiApontador: false*/

(function () {

    var api,
        access_token = '7c23c3da-032e-42d6-b7ea-aae679c1de58',
        placeId = 'M25GJ288';

    module("Api Methods", {
        setup: function () {
            api = new ApiApontador(access_token);
        }
    });

    asyncTest("gets info about a place.", function () {

        expect(2);

        var result_info,
            result_reviews;

        api.getPlaceInfo(placeId, function () {
            result_info = this.responseText;
        });

        api.getPlaceReviews(placeId, function () {
            result_reviews = this.responseText;
            console.log(result_reviews);
        });

        setTimeout(function () {
            result_info = JSON.parse(result_info);
            result_reviews = JSON.parse(result_reviews);

            equal(result_info.place.id, placeId, "Info gotten.");
            ok(result_reviews.reviewResults, "Reviews gotten.");
            start();
        }, 1500);

    });

})();