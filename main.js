const express = require('express');
var sync = require('synchronize')
const fs = require('fs');
const csv = require('fast-csv');
const app = express();


const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
// const matchCsvFile = fs.readFileSync('./ipl/matches.csv');
// const matchCsvFile = sync(fs, './ipl/matches.csv');
function getObjectValue(obj){
	var arr = [];
	for(i in obj){
		arr.push(obj[i]);
	}
	return arr;
}
// function getNoOfMatchesPerYear(matchCsvFile){
// 	let count = 0;
// 	let objMatchNo = {};
// 	let arr = [];
// 	matchCsvFile
// 		.pipe(csv())
// 		.on('data', function(data){
// 			if(count != 0){
// 				if(objMatchNo[data[1]] == undefined){
// 					objMatchNo[data[1]] = 1;
// 				}
// 				else{
// 					objMatchNo[data[1]] = objMatchNo[data[1]] + 1;
// 				}
// 			}
// 			count++;

// 		})
// 		.on('end', function(data){
// 			arr = getObjectValue(objMatchNo);
// 			console.log(objMatchNo);
// 			// return objMatchNo;
// 		});		
// }
	var result = new Promise(function(resolve, reject){
		let count = 0;
		let objMatchNo = {};
		let arr = [];
		matchCsvFile
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
			.on('end', function(data){
				arr = getObjectValue(objMatchNo);
				// console.log(objMatchNo);
				// return objMatchNo;
			});
			return resolve(objMatchNo);
	});
	var k ;
	setTimeout(function(){
		// console.log(result);
		module.exports = {
			showResult : result
		}
	}, 200);
	// setTimeout(function(){
		// module.exports = {
		// 	showResult : showResult
		// }
	// }, 200);