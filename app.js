const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const operation = require('./src/checkFunction');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/',function(req, res){
	res.render('index');
});

app.get('/first', function(req, res){
	const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
	operation.getNoOfMatchesPerYear(matchCsvFile).then(function(data){
		res.render('noOfMatches', {matchNo : JSON.stringify(data)});
	});
});

app.get('/second', function(req, res){
	const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
	operation.getMatchesOwnByAllTeam(matchCsvFile).then(function(data){
		res.render('winnerTeamPerYear',{winnerPerYear : JSON.stringify(data)});	
	});
});

app.get('/third', function(req, res){
	const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
	const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');
	operation.getExtraRunPerTeam(matchCsvFile, deliveriesCsvFile).then(function(data){
		res.render('extraRunInEachTeam',{extraRun : JSON.stringify(data)});	
	});
});

app.get('/fourth', function(req, res){
	const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
	const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');
	operation.getEconomicalBowlers(matchCsvFile, deliveriesCsvFile, 10).then(function(data){
		res.render('economicalBowlers', {economicalBowler : JSON.stringify(data)});	
	});	
});

app.get('/fifth', function(req, res){
	const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
	const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');
	operation.getTopStrikeRateBatsman(matchCsvFile, deliveriesCsvFile, 10).then(function(data){
		res.render('strikerateOfBatsman', {strikerateOfBatsman : JSON.stringify(data)});
	});	
});

app.listen(3000, function(){
	console.log("Server is running......");
});