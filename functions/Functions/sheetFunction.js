var gsjson = require('google-spreadsheet-to-json');

var nameArray = [];
var progArray = [];
let program = {}

//1WrJMRJ-T7JGLuhZMA3n5OvD6La5_xcuItCSvPGeV3T4
//1o1GN0Lv0ojpWZ8HyLOoyhpk64kw7xvzIDnAyLPrflJ0

let postRateSheet = (req, callback) => {
    gsjson({
        spreadsheetId: req,
    })
        .then(function (result) {
            for (i = 0; i < result.length; i++) {
                if (progArray.includes(result[i].agendaId) === false) {
                    progArray.push(result[i].agendaId)
                }
            }

            for (p = 0; p < progArray.length; p++) {
                Object.assign(program, {
                    [progArray[p]]: {}
                })

                for (q = 0; q < result.length; q++) {
                    if (progArray[p] === result[q].agendaId) {
                        var speakerID = (result[q].name).toLowerCase().replace(/\s+/g, "").replace(/"/g, "");
                        Object.assign(program[progArray[p]], {
                            program: result[q].program,
                            [speakerID]: {
                                name: result[q].name,
                                aveRate: 0,
                            },
                        })
                    }
                }
            }

            console.log(program)
            return callback(false, program)

        })
        .catch(function (err) {
            console.log(err.message);
            console.log(err.stack);
        });

}

module.exports = {
    postRateSheet: postRateSheet
}

