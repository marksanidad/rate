const admin = require('firebase-admin');

let setRate = (req, averates, callback) => {
    admin.database().ref('/GANAPP/' + req.event + '/analytics/rate/' + req.type).set(averates);
    return callback(false);
}

module.exports = {
    setRate : setRate,
}