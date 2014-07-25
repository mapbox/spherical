var wgs84 = require('wgs84');

module.exports.heading = function(from, to) {
    var y = Math.sin(Math.PI * (from[0] - to[0]) / 180) * Math.cos(Math.PI * to[1] / 180);
    var x = Math.cos(Math.PI * from[1] / 180) * Math.sin(Math.PI * to[1] / 180) -
        Math.sin(Math.PI * from[1] / 180) * Math.cos(Math.PI * to[1] / 180) * Math.cos(Math.PI * (from[0] - to[0]) / 180);
    return 180 * Math.atan2(y, x) / Math.PI;
};

module.exports.distance = function(from, to) {
    var sinHalfDeltaLon = Math.sin(Math.PI * (to[0] - from[0]) / 360);
    var sinHalfDeltaLat = Math.sin(Math.PI * (to[1] - from[1]) / 360);
    var a = sinHalfDeltaLat * sinHalfDeltaLat +
        sinHalfDeltaLon * sinHalfDeltaLon * Math.cos(Math.PI * from[1] / 180) * Math.cos(Math.PI * to[1] / 180);
    return 2 * wgs84.RADIUS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

module.exports.radial = function(from, tc_deg, d_m, wrap) {
    var tc = rad(tc_deg);
    var d = d_m / wgs84.RADIUS;

    var lon1 = rad(from[0]),
        lat1 = rad(from[1]);

    var lat = Math.asin(
        Math.sin(lat1) *
        Math.cos(d) +
        Math.cos(lat1) *
        Math.sin(d) *
        Math.cos(tc));

    var dlon = Math.atan2(
        Math.sin(tc) *
        Math.sin(d) *
        Math.cos(lat1),
        Math.cos(d) -
        Math.sin(lat1) *
        Math.sin(lat));

    var lon;
    if (wrap) {
        lon = (lon1 - dlon + Math.PI) %
            (2 * Math.PI) - Math.PI;
    } else {
        lon = (lon1 - dlon + Math.PI) - Math.PI;
    }

    return [deg(lon), deg(lat)];
};

function rad(_) {
    return _ * (Math.PI / 180);
}

function deg(_) {
    return _ * (180 / Math.PI);
}
