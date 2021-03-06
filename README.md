[![Build Status](https://travis-ci.org/mapbox/spherical.png)](https://travis-ci.org/mapbox/spherical)

# spherical

Spherical world utilities

## api

The default value of the radius is Earth's radius of 6378137 meters.

`heading(from, to)`

Heading expressed as degrees between locations expressed as `[lon, lat]`.

`distance(from, to, [radius])`

Distance in meters between locations expressed as `[lon, lat]`.

`radial(from, heading, distance, [radius])`

Given a location as `[lon, lat]`, heading in degrees, and distance in meters,
return another `[lon, lat]` point of a point at that offset.

## credits

Adapted from OpenLayers

* [Aviation Formulary](http://williams.best.vwh.net/avform.htm)
