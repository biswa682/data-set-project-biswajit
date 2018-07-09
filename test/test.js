const expect = require('chai').expect;
const result = require('../src/checkFunction');
const fs = require('fs');
const countMatchesPerYear = fs.createReadStream('countMatchesPerYe.csv','utf8');
const seasonOfMatches = fs.createReadStream('seasonOfMatches.csv','utf8');
const deliveryOfExtraRun = fs.createReadStream('deliveryOfExtraRun.csv', 'utf8');


// Discussing the Strike rate

describe("Checking the top Strike rates in 2017", function(){
	it("Top strike rate list", function(done){
		let expectedOutput = {
			'Yuvraj Singh': 100,
			'DJ Hooda': 180
		}
		result.getTopStrikeRateBatsman(seasonOfMatches, deliveryOfExtraRun, 2).then(function(data){
			try{
				expect(data).deep.equals(expectedOutput);
				done();
			}	
			catch(e){
				console.log("There is an error in Checking strike rate method");
				done(e);
			}
		});
	});
});

// Count the top economical Bowler

xdescribe('Checking The list of economical Bowler of 2015', function(){
	it("Get the list of Economical Bowler", function(done){
		let expectedOutput = {
			'TS Mills': 12,
			'YS Chahal': 10	
		}
		result.getEconomicalBowlers(seasonOfMatches, deliveryOfExtraRun, 2).then(function(data){
			try{
				expect(data).deep.equals(expectedOutput);
				done();
			}
			catch(e){
				console.log("There is an error in getEconomicalBowlers method");
				done(e);
			}
		});
	});
});

//Count the no of extra run exded by each team :----

xdescribe("Checking the Extra run conceded by each team in 2016", function(){
	it("Get the extra run per team", function(done){
		let expectedOutput = {
			'Mumbai Indians': 6,
			'Kolkata Knight Riders': 3,
			'Royal Challengers Bangalore': 1,
			'Kings XI Punjab': 4,
			'Rising Pune Supergiant': 19
		}
		result.getExtraRunPerTeam(seasonOfMatches, deliveryOfExtraRun).then(function(data){
			try{
				expect(data).deep.equals(expectedOutput);
				done();
			}
			catch(e){
				done(e);
			}
		});
	});
});

//Count the no of matches per year: ---

xdescribe("Checking the no of matches per year", function(){
	it("Get the no of matches per year", function(done){
		let expectedOutput = {
			'2017': 1,
			'2016': 2,
			'2015': 3,
			'2014': 1,
			'2013': 3
		};

		result.getNoOfMatchesPerYear(countMatchesPerYear).then(function(data){
			try{
				expect(data).deep.equals(expectedOutput);
				done();
			}
			catch(e){
				console.log("There is an error"+e);
				done(e);
			}
		});
	});
});

//Count the no of matches win by per team in each year:----

xdescribe("No of matches win by per team in per year", function(){
	it("Checking Winner Per Year csv file", function(done){
		let expectedOutput = {
			'2017':{
				'Sunrisers Hyderabad': 1
			},
			'2016':{
				'Rising Pune Supergiant': 1,
				'Kolkata Knight Riders': 1
			},
			'2015':{
				'Kings XI Punjab': 2,
				'Royal Challengers Bangalore': 1
			},
			'2014':{
				'Mumbai Indians': 1
			},
			'2013':{
				'Kings XI Punjab': 1,
				'Mumbai Indians': 2
			}
		};
		result.getMatchesOwnByAllTeam(countMatchesPerYear).then(function(data){
			try{
				expect(data).deep.equals(expectedOutput);
				done();
			}
			catch(e){
				console.log("There is an error in getMatchesOwnByAllTeam method");
				done(e);
			}
		});
	});
});