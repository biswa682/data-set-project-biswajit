const expect = require('chai').expect;
const mainFunction = require('./main');
const fs = require('fs');
const matchCsvFile = fs.createReadStream('./ipl/matches.csv', 'utf8');
const deliveriesCsvFile = fs.createReadStream('./ipl/deliveries.csv', 'utf8');

var obj =
{ '2008': 58,
  '2009': 57,
  '2010': 60,
  '2011': 73,
  '2012': 74,
  '2013': 76,
  '2014': 60,
  '2015': 59,
  '2016': 60,
  '2017': 59 }

describe("Test the match file", function(){
	it("count the no of matches per year", function(){
		// setTimeout(function(){
			expect(mainFunction.showResult()).equals(false);
		// }, 500);
		
	});
});