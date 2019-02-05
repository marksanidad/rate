// var gsjson = require('google-spreadsheet-to-json');

// var speakerID = '';
// var progArray = [];
// let program = {}

// gsjson({
//     spreadsheetId: "1nYgWqNNJAea3wdu0We29NNCWHDf5apWEIFFsB1RTUl4",
//     worksheet: "Session",
// })
//     .then(result => {

//         for (i = 0; i < result.length; i++) {
//             if (progArray.includes(result[i].agendaId) === false) {
//                 progArray.push(result[i].agendaId)
//             }
//         }

//         for (p = 0; p < progArray.length; p++) {
//             Object.assign(program, {
//                 [progArray[p]]: {}
//             })

//             for (q = 0; q < result.length; q++) {
//                 if (progArray[p] === result[q].agendaId) {
//                     Object.assign(program[progArray[p]], {
//                         name: result[q].topic,
//                         aveRate: 0,
//                     })
//                 }
//             }
//         }

//         for (j = 0; j < progArray.length; j++) {
//             var count = 0;
//             for (k = 0; k < result.length; k++) {
//                 if (progArray[j] === result[k].agendaId) {
//                     count++;
//                     var rating = result[k].rating + program[progArray[j]].aveRate;

//                     Object.assign(program[progArray[j]], {
//                         aveRate: rating
//                     })
//                 }
//             }
   
//             Object.assign(program[progArray[j]], {
//                 aveRate: (rating / count).toFixed(3)
//             })
//         }

//         console.log(program)

//     })
//     .catch(function (err) {
//         console.log(err.message);
//         console.log(err.stack);
//     });
