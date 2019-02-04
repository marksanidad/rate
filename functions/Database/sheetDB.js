const admin = require('firebase-admin');

let setSpeakerRate = (req, averates, callback) => {
    admin.database().ref('/GANAPP/' + req.event + '/analytics/rate/' + req.type).set(averates);
    return callback(false);
}

module.exports = {
    setSpeakerRate : setSpeakerRate,
}