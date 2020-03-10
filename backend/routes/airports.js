module.exports = [
    {
        method: 'POST',
        path: '/getairports',
        handler: function(request,h) {
            const payload = request.payload;
            let startLat = payload.latitude;
            let startLong = payload.longitude;
            let range = payload.range;
            let rangeKM = range * 1.852;
            let minRunway = payload.runway;

            let query = "CALL get_airports(?,?,?,?)"

            db.query(query,[startLat, startLong, rangeKM, minRunway], function(err, rows, fields) {

            });
        }


    },
    {
        method: 'GET',
        path: '/getairport/:code',
        handler: function(request,h) {
            const payload = request.payload;

            let query = "CALL get_airports(?,?,?,?)"

            db.query(query,[startLat, startLong, rangeKM, minRunway], function(err, rows, fields) {

            });
        }


    }



]