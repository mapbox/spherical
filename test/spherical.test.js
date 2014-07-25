var spherical = require('../');
var test = require('tap').test;

test('heading', function(t) {
    t.equal(spherical.heading([0, 0], [0, 10]), 0);
    t.equal(spherical.heading([0, 0], [10, 0]), -90);
    t.equal(spherical.heading([0, 0], [-10, 0]), 90);
    t.equal(spherical.heading([0, 0], [5, 5]), -44.890778452007524);
    t.equal(spherical.heading([0, 0], [0, -1]), 180);
    t.end();
});

test('distance', function(t) {
    // https://en.wikipedia.org/wiki/Longitude#Length_of_a_degree_of_longitude
    t.equal(spherical.distance([0, 0], [1, 0]), 111319.49079327357);
    t.equal(spherical.distance([0, 45], [1, 45]), 78714.26727214214);
    t.end();
});

test('radial', function(t) {
    // https://en.wikipedia.org/wiki/Longitude#Length_of_a_degree_of_longitude
    t.deepEqual(spherical.radial([0, 45], 90, 78714.267), [
        -0.9999428878440672,
        44.995636953778806
    ]);
    t.deepEqual(spherical.radial([0, 45], -90, 78714.267), [
        0.9999428878440672,
        44.995636953778806
    ]);
    t.deepEqual(spherical.radial([0, 0], -90, 111319.49079327357), [
        0.9999999999999887,
        6.12272091015678e-17,
    ]);
    t.deepEqual(spherical.radial([0, 0], 90, 111319.49079327357), [
        -0.9999999999999887,
        6.12272091015678e-17,
    ]);
    t.deepEqual(spherical.radial([179, 0], -90, 1000000), [
      187.9831528411952, // != -0.9999999999999887
      5.477905766684302e-16 // != 6.12272091015678e-17
    ], 'no wrap');
    t.deepEqual(spherical.radial([179, 0], -90, 1000000, true), [
      -172.0168471588048, // != -0.9999999999999887
      5.477905766684302e-16 // != 6.12272091015678e-17
    ], 'wrap');

    t.end();
});
