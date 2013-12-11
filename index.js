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
