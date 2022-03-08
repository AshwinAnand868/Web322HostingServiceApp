// <!-- Name - Ashwin Anand
// Student Id - 152042206 -->

var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const sequelize = require("sequelize");
const bcrypt = require('bcryptjs');

const databaseConn = new sequelize(
    "dd5oircitvaivv", // Database name
    "nyefttijsqgadx", // username
    "69acb70330894c1e334963400bba4522ab9840b40d6f1eda36ba630bea074880", // password
    {
        host : "ec2-3-227-195-74.compute-1.amazonaws.com",
        dialect : 'postgres',
        port: 5432,
        dialectOptions : {ssl : {rejectUnauthorized : false}}
    }
);

const clientsTable = databaseConn.define(
    "customers",
    {
        firstName :{
            type : sequelize.STRING,
            allowNull: false
        },
        lastName :{
            type : sequelize.STRING,
            allowNull: false
        },
        emailId : {
            type : sequelize.STRING,
            primaryKey : true,
            allowNull: false
        },
        mobile :{
            type : sequelize.STRING,
            allowNull: false
        },
        companyName :{
            type : sequelize.STRING,
            defaultValue: null
        },
        street_Address1 :{
            type : sequelize.STRING,
            allowNull: false
        },
        street_Address2 :{
            type : sequelize.STRING,
            defaultValue: null
        },
        city :{
            type : sequelize.STRING,
            allowNull: false
        },
        province :{
            type : sequelize.STRING,
            allowNull: false
        },
        postcode :{
            type : sequelize.STRING,
            allowNull: false
        },
        country :{
            type : sequelize.STRING,
            allowNull: false
        },
        role:{
            type : sequelize.STRING,
            allowNull : false
        },
        password :{
            type : sequelize.STRING,
            allowNull: false
        },

    },
    {
        createdAt : false,
        updatedAt : false
    }
);

const plansTable = databaseConn.define(
    "Plans",
    {
        Id : {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        PlanType : {
            type : sequelize.STRING,
            allowNull:false
        },
        Price : {
            type : sequelize.DOUBLE,
            allowNull:false
        },
        Performance : {
            type : sequelize.STRING,
            allowNull:false
        },
        Websites : {
            type : sequelize.STRING,
            allowNull:false
        },
        Space : {
            type : sequelize.STRING,
            allowNull:false
        },
        EmailAccounts : {
            type : sequelize.STRING,
            allowNull:false
        },
        SSL : {
            type : sequelize.STRING,
            allowNull:false
        },
        Domain: {
            type : sequelize.STRING,
            allowNull:false
        },
        Features : {
            type : sequelize.STRING,
            allowNull:false
        },
        EmailMarketing : {
            type : sequelize.STRING,
            allowNull:false
        }
    },
    {
        createdAt : false,
        updatedAt : false
    }
)
var HTTP_PORT =  process.env.PORT || 8081;


app.use(bodyParser.urlencoded({ extended: false }));

app.engine(".hbs", handlebars.engine(
    { 
        extname: '.hbs',
        helpers: { 
            warning: function(options) {
                return "<div style='margin-left:30px;' class='alert alert-danger' role='alert'>" 
                        +
                        "</div>";
            }
        }
        
    }
));
app.set('view engine', '.hbs');

app.use(express.static('views'));

app.get("/", (req,res) => {
    res.render("home",
    { msg: "Haytham Qushtom", layout: false });
});

app.get("/hosting-plans",function (req, res){
    res.render("cwh", {layout: false });
});

app.get("/login", (req, res) => {
   res.render("login", {layout: false });
});

app.get("/becoming_member", (req, res) => {
    res.render("registration", {layout: false});
});

app.get("/plan_enterprise", (req,res)=>{
  

     plansTable.findAll({
        attributes : ["PlanType", "Price", "Performance", "Websites", "Space", "EmailAccounts", "SSL", "Domain", "Features", "EmailMarketing"],
        where : {
            Price : 11.89
        }
    }).then((obj)=>{
        let data = obj.map(value => value.dataValues);
        console.log(data);
        res.render("plan_enterprise", {resObj : data[0], layout: false });
    }); 
});

app.get("/plan_pro", (req,res)=>{
     plansTable.findAll({
        attributes : ["PlanType", "Price", "Performance", "Websites", "Space", "EmailAccounts", "SSL", "Domain", "Features", "EmailMarketing"],
        where : {
            Price : 3.92
        }
    }).then((obj)=>{
        let data = obj.map(value => value.dataValues);
        console.log(data);
        res.render("plan_pro", {resObj : data[0], layout: false });
    }); 
});
app.get("/plan_beginner", (req,res)=>{
     plansTable.findAll({
        attributes : ["PlanType", "Price", "Performance", "Websites", "Space", "EmailAccounts", "SSL", "Domain", "Features", "EmailMarketing"],
        where : {
            Price : 3.89
        }
    }).then((obj)=>{
        let data = obj.map(value => value.dataValues);
        console.log(data);
        res.render("plan_pro", {resObj : data[0], layout: false });
    }); 
});
app.post("/dashboard", (req,res)=>{
    let resObj = {
        firstname : req.body.userFirstName,
        firstNameCheck : '',
        lastname : req.body.userLastName,
        lastNameCheck : '',
        email : req.body.userEmail,
        emailCheck : '',
        emailCheck2 : '',
        phone : req.body.userPhone,
        phoneCheck : '',
        companyName : req.body.companyName,
        streetAddress1 : req.body.streetAddress1,
        addressCheck1 : '',
        streetAddress2 : req.body.streetAddress2,
        addressCheck2 : '',
        city : req.body.city,
        cityCheck : '',
        province : req.body.province,
        provinceCheck : '',
        postcode : req.body.postcode,
        postcodeCheck : '',
        country : req.body.country,
        countryCheck : '',
        password : req.body.userPassword, 
        passwordChk : '',
        confirmPass : req.body.confirmPassword,
        confirmPasswordChk : '',
        agreementCheck : req.body.agreementCheck,
        agreementCheckValue : '',
        role : "regular user",
    }

        var fName = resObj.firstname;
        var lName = resObj.lastname;
        var regexName = /^[A-Za-z_]+$/;

        if(fName &&  regexName.test(fName)){
            console.log("First Name is valid");
        }
        else{
            console.log("Name not valid");
            resObj.firstNameCheck = 'no first name';
        }

        if(lName  && regexName.test(lName)){
            console.log("Last Name is valid");
        }
        else{
            console.log("Last Name not valid");
            resObj.lastNameCheck = 'no last name';
        }


        var email = resObj.email;
        var regexEmail = /^\w+[!#$%&'*+/=?^_`{|}~-]*([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if(email && regexEmail.test(email)){
            console.log("email is valid");
        }
        else{
            console.log("email is not valid");
            resObj.emailCheck = 'no email';
        }

        var mobile = resObj.phone;
        var regexMobile = /^[(]?\d{3}[)]?[-\s]?\d{3}[-\s\.]?\d{4}$/;
        if(mobile && regexMobile.test(mobile)){
            console.log("mobile is valid");
        }
        else{
            console.log("mobile is not valid");
            resObj.phoneCheck = 'no phone number';
        }

        var address1 = resObj.streetAddress1;
        var address2 = resObj.streetAddress2;
        var addressRegex = /^[a-zA-Z0-9\s',.-]{4,}/;
        if(address1 && addressRegex.test(address1)){
            console.log("address is valid");
        }
        else{
            console.log("address is not valid");
            resObj.addressCheck1 = 'no address';
        }

        if(address2){
            console.log("address 2 provided");
            if(!addressRegex.test(address2)){
                resObj.addressCheck2 = 'no address';
            }
        }
        else{
            console.log("address 2 not provided");
        }

        var city = resObj.city;
        var province = resObj.province;
        var country = resObj.country;
        var cpRegex =  /^[^0-9\#\$\@\+]*$/;
        if(city && cpRegex.test(city)){
            console.log("city is valid");
        }
        else{
            console.log("city is not valid");
            resObj.cityCheck = 'no city';
        }


        if(province && cpRegex.test(province)){
            console.log("province is valid");
        }
        else{
            console.log("province is not valid");
            resObj.provinceCheck = 'no province';
        }

        if(country && cpRegex.test(country)){
            console.log("country is valid");
        }
        else{
            console.log("country is not valid");
            resObj.countryCheck = 'no country';
        }


        var postcode = resObj.postcode;
        var postcodeRegex = /^[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}\s?[0-9]{1}[A-Za-z]{1}[0-9]{1}$/;
        if(postcode && postcodeRegex.test(postcode)){
            console.log("postcode is valid");
        }
        else{
            console.log("postcode is not valid");
            resObj.postcodeCheck = 'no postcode';
        }

        var password = resObj.password;
        var confirmPass = resObj.confirmPass;
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,12}$/;

        if(password && passwordRegex.test(password)){
            console.log("password is valid");
        }
        else{
            console.log("password is not valid");
            resObj.passwordChk = 'no password';
        }

        if(password){
            if(confirmPass == password){
                console.log("password is same");
            }
            else{
                console.log("password is not same");
                resObj.confirmPasswordChk = 'no confirm password';
            }
        }

        if(resObj.firstNameCheck || resObj.lastNameCheck || resObj.emailCheck || resObj.phoneCheck || resObj.addressCheck1 || resObj.cityCheck || resObj.provinceCheck || resObj.postcodeCheck || resObj.passwordChk){
            res.render("registration", { resObj : resObj, layout : false});
        }
        else{

            clientsTable.findAll(
            {
                attributes : ["emailId"]
                }).then((obj)=>{
                var i = 0;
                const data = obj.map(value => value.dataValues);
                obj.map(value => {
                     i++;
                });

                for(var j =0; j < i; j++)
                {
                    if(data[j].emailId == resObj.email){
                        resObj.emailCheck2 = 'Email already exists';
                    }
                }
                console.log(data);
                if(!resObj.emailCheck2){
                    let hashedPass;
                    bcrypt.hash(resObj.password, 10, function(err,hash){
                        hashedPass = hash;
                    
                    console.log(hashedPass);
                    clientsTable.create(
                            {
                                firstName : resObj.firstname,
                                lastName : resObj.lastname,
                                emailId : resObj.email,
                                mobile : resObj.phone,
                                companyName : resObj.companyName,
                                street_Address1 : resObj.streetAddress1,
                                street_Address2 : resObj.streetAddress2,
                                city : resObj.city,
                                province:resObj.province,
                                postcode : resObj.postcode,
                                country : resObj.country,
                                password : hashedPass,
                                role : resObj.role,
                            }
                        ).then(()=>{
                            res.render("dashboard", { resObj : resObj, layout : false});
                    }); 
                });
                }
                else{
                    res.render("registration", {resObj : resObj, layout : false});
                }
            });
        }
});

app.post("/login-submit", (req, res) => {
    let resObj = {
        email : req.body.email,
        emailCheck : '',
        password : req.body.password,
        passwordCheck : '',
        rememberMe : req.body.rememberMe,
        emailAndPasswordExist : '',
        firstname : '',
        lastname:'',
        roleUpdated : '',
        role : "regular user"
    }

    var email = resObj.email;
    if(!email){
        resObj.emailCheck = 'no email';
    }

    var password = resObj.password;
    if(!password){
        resObj.passwordCheck = 'no password';
    }

    if((resObj.passwordCheck && resObj.emailCheck))
    {
        res.render("login", {resObj : resObj, layout: false });
    }
    else
    {
        clientsTable.findAll(
            {
                attributes : ["emailId", "password", "firstName", "lastName"]
            }
        ).then((obj)=>{
            var valid = 0;
            var i = 0;
            const data = obj.map(value => value.dataValues);

            obj.map(value => {
                 i++;
            });
            let verified;
            for(var j = 0; j < i && valid != 1; j++){
                verified = bcrypt.compareSync(resObj.password, data[j].password);
                console.log(verified);
                if(data[j].emailId == resObj.email && verified){
                    valid = 1;
                }
            }            
            j = j - 1;
            resObj.firstname = data[j].firstName;
            resObj.lastname = data[j].lastName;
            
            if(valid){                      
                if(resObj.email == "anandashwin868@gmail.com"){
                    res.render("admin-dashboard", {resObj : resObj, layout : false})
                }
                else{
                    res.render("dashboard", { resObj :resObj, layout : false});
                }
            }
            else{
                resObj.emailAndPasswordExist = 'not exist';
                console.log(resObj.emailAndPasswordExist);
                console.log(resObj);
                res.render("login", {resObj : resObj, layout: false});
            }
        });
    }
 });

app.use(function(req,res){
    res.status(404).render("pagenotfound", {layout: false });
});

function onHttpStart(){
    console.log("Server started listening on: " + HTTP_PORT);
}

databaseConn.sync().then(()=>app.listen(HTTP_PORT, onHttpStart()));