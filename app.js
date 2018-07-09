const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');
const operation = require('./src/checkFunction');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
let objMatchCountPerYear = {};
let objWinnerTeamPerYear = {};
let objExtraRunPerTeam = {};
let objEconomicalBowler = {};
let objStrikeRateBatsman = {};

// 1st question
// Matches count in each year

let a = operation.getNoOfMatchesPerYear(matchCsvFile).then(function(data){
	try{
		objMatchCountPerYear = data;
	}
	catch(e){
		console.log("There is an error in getNoOfMatchesPerYear method");
	}
});
//2nd Question
// no of winning match by each team per year

operation.getMatchesOwnByAllTeam(matchCsvFile).then(function(data){
	try{
		objWinnerTeamPerYear = data;
	}
	catch(e){
		console.log("There is an error in getMatchesOwnByAllTeam method");
	}
});

//3rd Question
//the extra run by each team in 2016
operation.getExtraRunPerTeam(matchCsvFile, deliveriesCsvFile).then(function(data){
	try{
		objExtraRunPerTeam = data;
	}
	catch(e){
		console.log("There is an error in getExtraRunPerTeam method");
	}
});

//4th Question
//The top Economical bowler list in 2015
operation.getEconomicalBowlers(matchCsvFile, deliveriesCsvFile, 10).then(function(data){
	try{
		objEconomicalBowler = data;
	}
	catch(e){
		console.log("There is an error in getEconomicalBowlers method");
	}
});

//5th Question
//The top strike rate Batsman
operation.getTopStrikeRateBatsman(matchCsvFile, deliveriesCsvFile, 10).then(function(data){
	try{
		objStrikeRateBatsman = data;
	}
	catch(e){
		console.log("There is an problem in getTopStrikeRateBatsman method");
	}
});
app.get('/',function(req, res){
	res.render('index');
});
app.get('/noOfMatches', function(req, res){
	res.render('noOfMatches', {matchNo : JSON.stringify(objMatchCountPerYear)});
});
app.get('/winnerTeamPerYear', function(req, res){
	res.render('winnerTeamPerYear',{winnerPerYear : JSON.stringify(objWinnerTeamPerYear)});
});
app.get('/extraRunInEachTeam', function(req, res){
	res.render('extraRunInEachTeam',{extraRun : JSON.stringify(objExtraRunPerTeam)});
});
app.get('/economicalBowlers', function(req, res){
	res.render('economicalBowlers', {economicalBowler : JSON.stringify(objEconomicalBowler)});
});
app.get('/strikerateOfBatsman', function(req, res){
	res.render('strikerateOfBatsman', {strikerateOfBatsman : JSON.stringify(objStrikeRateBatsman)});
});
app.listen(3000, function(){
	console.log("Server is running......");
});