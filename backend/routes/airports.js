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

            db.query(query,[startLat, startLong, rangeKM, minRunway], function(err, rows) {
                if (err) {
                    console.log("Error connecting to DB");
                    throw err;
                }
                console.log("Result:" + rows);
            });
        }


    },
    {
        method: 'GET',
        path: '/getairport/{code}',
        handler: function(request,h) {

            let query = "CALL get_airport(?)"

            db.query(query,[request.params.code], function(err, rows) {
                if (err) {
                    console.log("Error connecting to DB");
                    throw err;
                }
                console.log("Result:" + rows);

            });
        }


    }



]