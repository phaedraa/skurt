# Skurt: Programming Challenge
The code runs a program which polls the Skurt interview car status API for all available cars and their corresponding location data.

The API returns data related to the car's location and it's polygonal region.
Should any car be located outside the bounds of its corresponding polygonal
region (being on a vertex or edge qualifies as being WITHIN the region), then
Skurt Engineering is emailed with an notification and the car's ID and longitude
and latitude. Should the API fail to return any data, then Skurt Engineering
will be emailed with the failure and corresponding error message.

To run the program:

-Download this repo
-Install and save node (globally or locally in this repo)
-In this directory, run `node notifyIfDriverOutOfRange.js`

To run the tests:
-Download this repo
-Install and save Jasmine (globally or locally in this repo)
-In this directory, run `jasmine`

A few notes:

This test suite does not include testing as to whether emails send correctly 
(though this was tested in implementation). This is something I'd add with more
time.



Helpful Resources
-geojson.io : This will be very useful with debugging. Copy paste the GeoJSON (equivalent to JSON) returned by the endpoints entirely into the right panel of the site to view the location of the car.
-http://geojson.org/ : If you’re interested in the specification and details of geojson.
