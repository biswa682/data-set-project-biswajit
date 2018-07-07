const fs = require('fs');
const csv = require('fast-csv');
const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
// getNoOfMatchesPerYear(matchCsvFile).then(function(data){
// 	// console.log(data);

// });

function getNoOfMatchesPerYear(csvFile){
	var result = new Promise(function(resolve, reject){
		let count = 0;
		let objMatchNo = {};
		csvFile
			.pipe(csv())
			.on('data', function(data){
				if(count != 0){
					if(objMatchNo[data[1]] == undefined){
						objMatchNo[data[1]] = 1;
					}
					else{
						objMatchNo[data[1]] = objMatchNo[data[1]] + 1;
					}
				}
				count++;
			})
			on('end',function(data){

			});
			resolve(objMatchNo);
	});
	return result;
}