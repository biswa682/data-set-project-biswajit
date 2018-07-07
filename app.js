// const express = require('express');
// const fs = require('fs');
// const csv = require('fast-csv');
// const app = express();


// app.use(express.static('public'));

// var objMatchNo = {
// 	'2008': 28,
// 	'2009': 36
// };

// app.set('view engine', 'ejs');
// app.get('/', function(req, res){
// 	res.render('index', {matchNo : JSON.stringify(objMatchNo)});
// 	// res.send();
// });
// app.listen(3002, function(){
// 	console.log("Server is running......");
// });




const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');

var objMatchNo = {};

function getNoOfMatchesPerYear(year){
	if(objMatchNo[year] == undefined){
		objMatchNo[year] = 1;
	}
	else{
		objMatchNo[year] = objMatchNo[year] + 1;
	}
}

var count = 0;
matchCsvFile
	.pipe(csv())
	.on('data', function(data){
		if(count != 0){
			getNoOfMatchesPerYear(data[1]);
		}
		count++;const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const app = express();



const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');

function getObjectValue(obj){
	var arr = [];
	for(i in obj){
		arr.push(obj[i]);
	}
	return arr;
}
function getNoOfMatchesPerYear(matchCsvFile){
	let count = 0;
	let objMatchNo = {'key':'value'};
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
			let arr = getObjectValue(objMatchNo);
			return arr;
		});
}	
// console.log(getNoOfMatchesPerYear(matchCsvFile));


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){

	// res.render('index', {'matchNo' : });
	res.send('this is node js file  '+ getNoOfMatchesPerYear(matchCsvFile));
});
app.listen(3000, function(){
	console.log("Server is running......");
});

	})
	.on('end', function(data){
		// console.log(objMatchNo);
	});
