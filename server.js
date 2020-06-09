var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comp');

var Employee = mongoose.model('Employee', mongoose.Schema({
	legalentityname:String,
    legalentitycode:Number,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    countrycode:Number,
    mobileno:Number,
    addr1:String,
    addr2:String,
    country:String,
    state:String,
    city:String,
    postalcode:Number,
    logo:String
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Get employee by id
app.get('/api/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Add employee
app.post('/api/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});


//Delete selected employee
app.delete('/api/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Update selected employee
app.put('/api/employees/:id', function(req, res){
	var query = {
		legalentityname:req.body.legalentityname,
        legalentitycode:req.body.legalentitycode,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        countrycode:req.body.countrycode,
        mobileno:req.body.mobileno,
		addr1:req.body.addr1,
		addr2:req.body.addr2,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        postalcode:req.body.postalcode,
        logo:req.body.logo
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});


app.listen(3000, function(){
	console.log('server is running on port 3000..');
});