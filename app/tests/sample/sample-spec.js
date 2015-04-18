/*global describe*/
/*global it*/
/*global expect*/

(function(describe, it, expect, undefined) {
    "use strict";

    describe("A sample spec.", function() {
        it("should be in a browser", function() {
            expect(window).not.toBe(undefined);
        });
    });
})(describe, it, expect);
