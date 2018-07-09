const csv = require('fast-csv');

function getNoOfMatchesPerYear(csvFile) {
    return new Promise(function(resolve, reject) {
        let count = 0;
        let objMatchNo = {};
        csvFile
            .pipe(csv())
            .on('data', function(data) {
                if (count != 0) {
                    if (objMatchNo[data[1]] == undefined) {
                        objMatchNo[data[1]] = 1;
                    } else {
                        objMatchNo[data[1]] = objMatchNo[data[1]] + 1;
                    }
                }
                count++;
            })
            .on('end', function(data) {
                resolve(objMatchNo);
            });
    });
}

function getMatchesOwnByAllTeam(csvFile) {

    return new Promise(function(resolve, reject) {
        let matchWinPerYear = {};
        let matchWinPerTeam = {};
        let count = 0;
        csvFile
            .pipe(csv())
            .on('data', function(data) {
                if (count != 0) {
                    if (matchWinPerYear[data[1]] === undefined) {
                        matchWinPerTeam[data[10]] = 1;
                        matchWinPerYear[data[1]] = matchWinPerTeam;
                        matchWinPerTeam = {};
                    } else {
                        if (matchWinPerYear[data[1]].hasOwnProperty(data[10])) {
                            matchWinPerYear[data[1]][data[10]] = matchWinPerYear[data[1]][data[10]] + 1
                        } else {
                            if (data[10] != '')
                                matchWinPerYear[data[1]][data[10]] = 1
                        }
                    }
                }
                count++;
            })
            .on('end', function(data) {
                resolve(matchWinPerYear);
            });
    });
}

function getIdValues(matchCsvFile, season) {
    return new Promise(function(resolve, reject) {
        let seasonId = [];
        matchCsvFile
            .pipe(csv())
            .on('data', function(data) {
                if (data[1] === season)
                    seasonId.push(data[0]);
            })
            .on('end', function(data) {
                resolve(seasonId);
            })

    });
}

function getExtraRunPerTeam(matchCsvFile, deliveryCsvFile) {
    return new Promise(function(resolve, reject) {
        getIdValues(matchCsvFile, '2016').then(function(seasonId) {
            let teamName = {};
            deliveryCsvFile
                .pipe(csv())
                .on('data', function(data) {
                    if (seasonId.includes(data[0])) {
                        let extraRun = parseInt(data[16]);
                        if (teamName[data[3]] === undefined) {
                            teamName[data[3]] = extraRun;
                        } else {
                            teamName[data[3]] = teamName[data[3]] + extraRun;
                        }
                    }
                })
                .on('end', function(data) {
                    resolve(teamName);
                });
        });
    });
}

function getListOfEconomicalBowler(playerList) {
    let getEconomicalBowlerList = {};
    Object.keys(playerList).forEach(function(value) {
        let economicalValue = (playerList[value][1] / playerList[value][0]) * 6;
        getEconomicalBowlerList[value] = economicalValue;
    });
    return getEconomicalBowlerList;
}

function getResultInOrder(listOfPlayer, top, order = 'ascending') {
    let storeArr = [];
    let sortedObj = {};
    for (let i in listOfPlayer) {
        storeArr.push([i, listOfPlayer[i]]);
    }
    if (order === 'ascending') {
        storeArr.sort(function(first, second) {
            return first[1] - second[1];
        });
    } else if (order === 'descending') {
        storeArr.sort(function(first, second) {
            return second[1] - first[1];
        });
    }
    for (let i = 0; i < top; i++) {
        sortedObj[storeArr[i][0]] = storeArr[i][1];
    }
    return sortedObj;
}

function getEconomicalBowlers(matchCsvFile, deliveryCsvFile, top) {
    return new Promise(function(resolve, reject) {
        getIdValues(matchCsvFile, '2015').then(function(seasonId) {
            let bowlerName = {};
            deliveryCsvFile
                .pipe(csv())
                .on('data', function(data) {
                    if (seasonId.includes(data[0])) {
                        let runInBall = parseInt(data[10]) + parseInt(data[13]) + parseInt(data[15]);
                        let list;
                        if (bowlerName[data[8]] === undefined) {
                            list = [1, runInBall];
                        } else {
                            list = [bowlerName[data[8]][0] + 1, bowlerName[data[8]][1] + runInBall];
                        }
                        bowlerName[data[8]] = list;
                    }
                })
                .on('end', function(data) {
                    resolve(getResultInOrder(getListOfEconomicalBowler(bowlerName), top));
                });
        });
    });
}

function getRunRateOfBatsman(objPlayerList) {
    let getBatsmanList = {};
    Object.keys(objPlayerList).forEach(function(value) {
        let battingRunRate = (objPlayerList[value][1] / objPlayerList[value][0]) * 100;
        getBatsmanList[value] = battingRunRate;
    });
    return getBatsmanList;
}

function getTopStrikeRateBatsman(matchCsvFile, deliveryCsvFile, top) {
    return new Promise(function(resolve, reject) {
        getIdValues(matchCsvFile, '2017').then(function(seasonId) {
            let batsmanList = {};
            deliveryCsvFile
                .pipe(csv())
                .on('data', function(data) {
                    if (seasonId.includes(data[0])) {
                        let arr;
                        if (batsmanList[data[6]] === undefined) {
                            arr = [1, parseInt(data[15])];
                        } else {
                            arr = [batsmanList[data[6]][0] + 1, batsmanList[data[6]][1] + parseInt(data[15])];
                        }
                        batsmanList[data[6]] = arr;
                    }
                })
                .on('end', function() {
                    resolve(getResultInOrder(getRunRateOfBatsman(batsmanList), top, 'descendin'));
                });
        });
    });
}
// const fs = require('fs');
// const seasonOfMatches = fs.createReadStream('../test/seasonOfMatches.csv','utf8');
// const deliveryOfExtraRun = fs.createReadStream('../test/deliveryOfExtraRun.csv', 'utf8');
// getTopStrikeRateBatsman(seasonOfMatches, deliveryOfExtraRun, 2).then(function(data){
// 	console.log(data);
// });

module.exports = {
    getNoOfMatchesPerYear: getNoOfMatchesPerYear,
    getMatchesOwnByAllTeam: getMatchesOwnByAllTeam,
    getExtraRunPerTeam: getExtraRunPerTeam,
    getEconomicalBowlers: getEconomicalBowlers,
    getTopStrikeRateBatsman: getTopStrikeRateBatsman
}