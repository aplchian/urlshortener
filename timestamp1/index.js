var express = require("express");
var app = express();

var output = {
	"unix": null,
	"natural": null
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month,day,year;

app.get('/', function(req, res){
	res.send('hello world!');
});

app.get('/date/:thedate', function(req,res){
	var multDate = (parseInt(req.params.thedate) * 1000);
	var strDate = req.params.thedate;
	var strArray = req.params.thedate.split(" ");
	console.log(req.params.thedate);
	console.log(req.params.multDate);

	if (strArray.length === 3){
		month = strArray[0];
		console.log(strArray[1]);
		if (strArray[1].length === 2){
			day = strArray[1].substr(0,1);
		}else if ( strArray[1].length === 3){
			day = strArray[1].substr(0,2);
		}
		year = strArray[2];
	}

	

	if (Number.isInteger(theDate) && theDate >= 0){
		var workingDate = new Date(multDate);
		output.unix = multDate;
		output.natural = months[workingDate.getMonth()] + " " + workingDate.getDate() + ", " + workingDate.getFullYear();
		res.send(JSON.stringify(output));

	}else if(months.indexOf(month) != -1 && day > 0 && year > 0 ){
		var workingDate = new Date(strDate);
		output.unix = workingDate.getTime();
		output.natural = strDate;
		res.send(JSON.stringify(output));
	}else {
		output.unix = null;
		output.natural = null;
		res.send(JSON.stringify(output));
	}	
});

app.set('port', (process.env.PORT || 2000));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});