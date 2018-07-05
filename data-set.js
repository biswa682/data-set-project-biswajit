var http = require('http');
var fs = require('fs');
var csv = require('fast-csv');
var objMatchNo = {};
var objMatchWinner = {};
var objMatchWinYear = {};
var objBatsmanName = {};
var strikeRate = {};
var count = 0;
var idOfYear17 = [];
var idOfYear16 = [];
var idOfYear15 = [];
// var main_file = fs.readFileSync('./ipl/matches.csv', 'utf8');
var matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
function getEconomicalBowler(objPlayerList){
	let getEconomicalBowlerList = {};
	Object.keys(objPlayerList).forEach(function(value){
		 	// console.log(value, objPlayerName[value]);
		let economicalValue = (objPlayerList[value][1]/objPlayerList[value][0])*6;
		getEconomicalBowlerList[value] = economicalValue;
	});
	return getEconomicalBowlerList;
}
function getRunRateOfBatsman(objPlayerList){
	let getBatsmanList = {};
	Object.keys(objPlayerList).forEach(function(value){
		let battingRunRate = (objPlayerList[value][1]/objPlayerList[value][0])*100;
		getBatsmanList[value] = battingRunRate;
	});
	return getBatsmanList;	
}
function getTopResultOfEconomicalBowler(listOfPlayer, top, order = 'ascending'){
	let storeArr = [];
	let sortedObj = {};
	for(let i in listOfPlayer){
		storeArr.push([i, listOfPlayer[i]]);
	}
	if(order === 'ascending'){
		storeArr.sort(function(first, second){
			return first[1] - second[1];
		});
	}
	else if(order === 'descending'){
		storeArr.sort(function(first, second){
			return second[1] - first[1];
		});	
	}
	for(let i=0;i<top;i++){
		sortedObj[storeArr[i][0]] = storeArr[i][1];
	}
	return sortedObj;
	// return storeArr;
}

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
			if(data[1] === '2017'){
				idOfYear17.push(data[0]);
			}
			if(data[1] === '2016'){
				idOfYear16.push(data[0]);
			}
			if(data[1] === '2015'){
				idOfYear15.push(data[0]);
			}
			if(objMatchWinYear[data[1]] == undefined){
				if(objMatchWinner[data[10]]  == undefined){
					if(data[10] != '')
						objMatchWinner[data[10]] = 1;
				}
				else{
					objMatchWinner[data[10]] = objMatchWinner[data[10]] + 1;	
				}
			}else{
				if(objMatchWinner[data[10]]  == undefined){
					if(data[10] != '')
						objMatchWinner[data[10]] = 1;
				}
				else{
					objMatchWinner[data[10]] = objMatchWinner[data[10]] + 1;	
				}
			}
			objMatchWinYear[data[1]] = objMatchWinner;
		}
		count++;
	})
	.on('end', function(data){
		// console.log(objMatchWinYear);
		// console.log(objMatchNo);
	}); 



var objTeamName = {};
var objPlayerName = {}; 
var runAndBall = [];
var deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');
var economicalBall = {};
var runRate = {};
deliveriesCsvFile
	.pipe(csv())
	.on('data', function(data){
		deliveriesCsvFile.pause();
			if(idOfYear15.includes(data[0])){
				let runInBall = parseInt(data[10]) + parseInt(data[13]) + parseInt(data[15]);
				if(objPlayerName[data[8]] ===  undefined){
					let arr = [1, runInBall];
					objPlayerName[data[8]] = arr;
				}
				else{
					let arr = [objPlayerName[data[8]][0]+1 , objPlayerName[data[8]][1] + runInBall];
					objPlayerName[data[8]] = arr;
				}
			}
			if(idOfYear16.includes(data[0])){
				let extraRun = parseInt(data[16]);
				if(objTeamName[data[3]] == undefined){
					objTeamName[data[3]] = extraRun;
				}
				else{
					objTeamName[data[3]] = objTeamName[data[3]] + extraRun;	
				}
			}
			if(idOfYear17.includes(data[0])){
				if(objBatsmanName[data[6]] === undefined){
					let arr = [1, parseInt(data[15])];
					objBatsmanName[data[6]]= arr;
				}
				else{
					let arr = [objBatsmanName[data[6]][0] + 1,objBatsmanName[data[6]][1] + parseInt(data[15])];
					objBatsmanName[data[6]]= arr;	
				}
			}
		deliveriesCsvFile.resume();
	})
	.on('end', function(data){
		// economicalBowler = getTopResultOfEconomicalBowler(getEconomicalBowler(objPlayerName), 5);
		// strikeRate = getTopResultOfEconomicalBowler(getRunRateOfBatsman(objBatsmanName), 5, 'descending');		
		// console.log(economicalBowler);
	});

// var server = http.createServer(function(req, res){
// 	res.writeHead(200, {'Content-Type': 'application/json'});
// 	// res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.end(JSON.stringify());
// });
// server.listen(3000);
// console.log("Server is on .......");

// objMatchNo : Using for 1st question
// objMatchWinYear : Using for 2nd question
// objTeamName : Using for 3rd question
// economicalBowler : Using for 4th question
// strikeRate : Using for 5th question