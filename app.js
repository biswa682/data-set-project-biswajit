const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const app = express();


app.use(express.static('public'));

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
		count++;
	})
	.on('end', function(data){
		// console.log(objMatchNo);
	});




app.set('view engine', 'ejs');
app.get('/', function(req, res){
	res.render('index', {matchNo : JSON.stringify(objMatchNo)});
	// res.send();
});
app.listen(3000, function(){
	console.log("Server is running......");
});




