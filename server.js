var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

var HTTP_PORT =  process.env.PORT || 80;


app.use(bodyParser.urlencoded({ extended: false }));

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
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
    res.render("registration", {layout: false });
});

app.post("/registration-submit", (req,res)=>{
    let resObj = {
        firstname : req.body.userFirstName,
        firstNameCheck : '',
        lastname : req.body.userLastName,
        lastNameCheck : '',
        email : req.body.userEmail,
        emailCheck : '',
        phone : req.body.userPhone,
        phoneCheck : '',
        companyName : req.body.companyName,
        streetAddress1 : req.body.streetAddress1,
        streetAddress2 : req.body.streetAddress2,
        addressCheck : '',
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
        formSubmit : req.body.submitbtn
    }
    console.log(resObj);
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
            resObj.addressCheck = 'no address';
        }

        if(!address2){
            console.log("address 2 not provided");
        }
        else{
            console.log("address 2 provided");
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
            resObj.postcodeCheck = 'no password';
        }

        var password = resObj.password;
        var confirmPass = resObj.confirmPass;
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,12}$/;
        if(password && passwordRegex.test(password)){
            console.log("password is valid");
        }
        else{
            console.log("password is not valid");
            resObj.passwordChk = '';
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



        if(resObj.agreementCheck){
            console.log("Agreement Accepted");
        }else{
            console.log("Agreement not accepted");
        }

        if(resObj.formSubmit){
            console.log("Registered");
        }
        console.log(resObj);
        res.render("registration", { resObj : resObj, layout : false});
});

app.use(function(req,res){
    res.status(404).render("pagenotfound", {layout: false });
});


app.listen(HTTP_PORT);