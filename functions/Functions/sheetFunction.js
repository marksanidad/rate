const sheetDB = require('../Database/sheetDB');

var gsjson = require('google-spreadsheet-to-json');

var speakerID = '';
var progArray = [];
let program = {}

//1WrJMRJ-T7JGLuhZMA3n5OvD6La5_xcuItCSvPGeV3T4
//1o1GN0Lv0ojpWZ8HyLOoyhpk64kw7xvzIDnAyLPrflJ0

let postRateSheet = (req, callback) => {
    if (req.type === "speaker") {
        postSpeakerRates(req, callback);
    }
}

let postSpeakerRates = (req, callback) => {
    gsjson({
        spreadsheetId: req.sheetid,
    })
        .then(result => {
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
                        speakerID = (result[q].name).toLowerCase().replace(/\s+/g, "").replace(/"/g, "");
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
    
            for (j = 0; j < progArray.length; j++) {
                //console.log("program", progArray[j])
                for (k = 1; k < Object.keys(program[progArray[j]]).length; k++) {
                    var speaker = Object.keys(program[progArray[j]]);
                    var count = 0;
                    //console.log("speaker", speaker[k])
                    for (l = 0; l < result.length; l++) {
                        speakerID = (result[l].name).toLowerCase().replace(/\s+/g, "").replace(/"/g, "");
                        if (progArray[j] === result[l].agendaId && speaker[k] === speakerID) {
                            //console.log("ratedBy",result[l].ratedBy, "rating", result[l].rating)
                            count++;
                            var rating = result[l].rating + program[progArray[j]][speaker[k]].aveRate;
    
                            Object.assign(program[progArray[j]][speaker[k]], {
                                //[result[l].ratedBy]: result[l].rating,
                                aveRate: rating
                            })
                        }
                    }
    
                    Object.assign(program[progArray[j]][speaker[k]], {
                        aveRate: (rating / count).toFixed(3)
                    })
                }
            }

            console.log(program)
            
            sheetDB.setSpeakerRate(req, program, (err,res) => {
                if (err) throw err;
            })

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

