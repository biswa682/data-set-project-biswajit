const express = require('express');
const app = express();
app.set('view engine', 'ejs');

var arr = [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175];
app.get('/', function(req, res){
	res.render('index2', {arr : arr});
	// res.sendFile(__dirname+'/index2.html');
})
app.get('/students/:id', function(req, res){
	res.send("The student id is "+req.params.id);
});
app.listen(3000, function(){
	console.log("server is on .....");
});