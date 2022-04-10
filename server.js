// <!-- Name - Ashwin Anand
// Student Id - 152042206 -->
var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const sequelize = require("sequelize");
const bcrypt = require('bcryptjs');
const clientSessions = require("client-sessions");
const multer = require("multer");
const { getSequelizeTypeFromJsonFormat } = require("sequelizer/lib/JsonSchemaDefinition");

const storage = multer.diskStorage({
    destination: "./public/photos",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(clientSessions({
    cookieName: "session",
    secret: "web_hosting_services'_secret_is_to_win_its_customers'_trust",
    duration: 2 * 60 * 1000,
    activeDuration: 60 * 1000
}));

var HTTP_PORT = process.env.PORT || 9090;


const databaseConn = new sequelize(
    "dd5oircitvaivv", // Database name
    "nyefttijsqgadx", // username
    "69acb70330894c1e334963400bba4522ab9840b40d6f1eda36ba630bea074880", // password
    {
        host: "ec2-3-227-195-74.compute-1.amazonaws.com",
        dialect: 'postgres',
        port: 5432,
        dialectOptions: { ssl: { rejectUnauthorized: false } }
    }
);

const clientsTable = databaseConn.define(
    "customers",
    {
        firstName: {
            type: sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: sequelize.STRING,
            allowNull: false
        },
        emailId: {
            type: sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        mobile: {
            type: sequelize.STRING,
            allowNull: false
        },
        companyName: {
            type: sequelize.STRING,
            defaultValue: null
        },
        street_Address1: {
            type: sequelize.STRING,
            allowNull: false
        },
        street_Address2: {
            type: sequelize.STRING,
            defaultValue: null
        },
        city: {
            type: sequelize.STRING,
            allowNull: false
        },
        province: {
            type: sequelize.STRING,
            allowNull: false
        },
        postcode: {
            type: sequelize.STRING,
            allowNull: false
        },
        country: {
            type: sequelize.STRING,
            allowNull: false
        },
        role: {
            type: sequelize.STRING,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },

    },
    {
        createdAt: false,
        updatedAt: false
    }
);

const plansTable = databaseConn.define(
    "Plans",
    {
        Id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PlanType: {
            type: sequelize.STRING,
            allowNull: false
        },
        Price: {
            type: sequelize.DOUBLE,
            allowNull: false
        },
        Description: {
            type: sequelize.STRING,
        },
        Performance: {
            type: sequelize.STRING,
            allowNull: false
        },
        Websites: {
            type: sequelize.STRING,
            allowNull: false
        },
        Space: {
            type: sequelize.STRING,
            allowNull: false
        },
        EmailAccounts: {
            type: sequelize.STRING,
            allowNull: false
        },
        SSL: {
            type: sequelize.STRING,
            allowNull: false
        },
        Domain: {
            type: sequelize.STRING,
            allowNull: false
        },
        Features: {
            type: sequelize.STRING,
            allowNull: false
        },
        EmailMarketing: {
            type: sequelize.STRING,
            allowNull: false
        },
        IconName: {
            type: sequelize.STRING
        },
        MostPopular: {
            type: sequelize.STRING
        }
    },
    {
        createdAt: false,
        updatedAt: false
    }
);

const ordersTable = databaseConn.define(
    "Orders",
    {
        Id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PlanName: {
            type: sequelize.STRING
        },
        Price: {
            type: sequelize.DOUBLE
        }
    },
    {
        createdAt: false,
        updatedAt: false
    }
);

const cart = databaseConn.define(
    "Cart",
    {
        Id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PlanName: {
            type: sequelize.STRING
        },
        Price: {
            type: sequelize.DOUBLE
        },
        CustomerId: {
            type: sequelize.STRING
        }
    },
    {
        createdAt: false,
        updatedAt: false
    }
);

clientsTable.hasMany(ordersTable);

function authenticate(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");

    } else {
        next();
    }
}

function authorize(req, res, next) {
    if (req.session.user) {
        if (req.session.user.role == "admin") {
            next();
        }
    }
    else {
        res.redirect("/login");
    }
}

app.get("/", (req, res) => {
    res.render("home",
        { msg: "Haytham Qushtom", layout: false });
});

app.get("/hosting-plans", function (req, res) {
    res.render("cwh", { layout: false });
});

app.get("/login", (req, res) => {
    res.render("login", { layout: false });
});

app.get("/becoming_member", (req, res) => {
    res.render("registration", { layout: false });
});
app.get("/plan_enterprise", (req, res) => {
    plansTable.findAll({
        attributes: ["PlanType", "Price", "Description", "Performance", "Websites", "Space", "EmailAccounts", "SSL", "Domain", "Features", "EmailMarketing", "MostPopular"],
        where: {
            Id: 3
        }
    }).then((obj) => {
        let data = obj.map(value => value.dataValues);
        console.log(data);
        res.render("plan_enterprise", { resObj: data[0], layout: false });
    });
});

app.get("/plan_pro", (req, res) => {
    plansTable.findAll({
        attributes: ["PlanType", "Price", "Description", "Performance", "Websites", "Space", "EmailAccounts", "SSL", "Domain", "Features", "EmailMarketing", "MostPopular"],
        where: {
            Id: 2
        }
    }).then((obj) => {
        let data = obj.map(value => value.dataValues);
        console.log(data);
        res.render("plan_pro", { resObj: data[0], layout: false });
    });
});
app.get("/plan_beginner", (req, res) => {
    plansTable.findAll({
        attributes: ["PlanType", "Price", "Description", "Performance", "Websites", "Space", "EmailAccounts", "SSL", "Domain", "Features", "EmailMarketing", "MostPopular"],
        where: {
            Id: 1
        }
    }).then((obj) => {
        let data = obj.map(value => value.dataValues);
        console.log(data);
        res.render("plan_beginner", { resObj: data[0], layout: false });
    });
});

app.get("/viewAllPlans", (req, res) => {
    plansTable.findAll({
        attributes: ['PlanType', 'Id'],
        order: ['Id']
    }).then((plansObj) => {
        let plans = plansObj.map(plan => plan.dataValues);
        res.render("viewAllPlans", { plans: plans, layout: false })
    });
});

app.get("/new-plan", authenticate, authorize, (req, res) => {
    let resObj = {
        name: "",
        price: "",
        desc: "",
        performance: "",
        websites: "",
        space: "",
        emailAccs: "",
        ssl: "",
        domain: "",
        features: "",
        emailMarketing: "",
        mostPopular: "",
        filename: ""
    };

    res.render("new-plan", { resObj: resObj, layout: false });
});

app.get("/selectPlanToUpdate", authenticate, authorize, (req, res) => {
    plansTable.findAll({
        attributes: ['PlanType', 'Id'],
        order: ['Id']
    }).then((plansObj) => {
        let plans = plansObj.map(plan => plan.dataValues);
        res.render("all-plans", { plans: plans, layout: false })
    });
});


app.post("/update-plan", authenticate, authorize, (req, res) => {
    const id = req.body.id;
    plansTable.findAll({
        where: {
            Id: id
        }
    }).then((plansObj) => {
        let plans = plansObj.map(plan => plan.dataValues);
        console.log(plans);
        let resObj = {
            name: plans[0].PlanType,
            price: plans[0].Price,
            desc: plans[0].Description,
            performance: plans[0].Performance,
            websites: plans[0].Websites,
            space: plans[0].Space,
            emailAccs: plans[0].EmailAccounts,
            ssl: plans[0].SSL,
            domain: plans[0].Domain,
            features: plans[0].Features,
            emailMarketing: plans[0].EmailMarketing,
            mostPopular: plans[0].MostPopular,
            filename: plans[0].IconName
        }
        res.render("update-one-plan", { resObj: resObj, layout: false });
    });
});

app.post("/addPlan", authenticate, authorize, upload.single("icon"), (req, res) => {
    let resObj = {
        name: req.body.planName,
        price: req.body.planPrice,
        desc: req.body.planDesc,
        performance: req.body.planPerf,
        websites: req.body.websites,
        space: req.body.space,
        emailAccs: req.body.emailAccs,
        ssl: req.body.ssl,
        domain: req.body.domain,
        features: req.body.features,
        emailMarketing: req.body.emailMar,
        mostPopular: req.body.popular,
        filename: req.file.filename,
    }
    plansTable.create({
        PlanType: resObj.name,
        Price: resObj.price,
        Description: resObj.desc,
        Performance: resObj.performance,
        Websites: resObj.websites,
        Space: resObj.space,
        EmailAccounts: resObj.emailAccs,
        SSL: resObj.ssl,
        Domain: resObj.domain,
        Features: resObj.features,
        EmailMarketing: resObj.emailMarketing,
        IconName: resObj.filename,
        MostPopular: resObj.mostPopular
    }).then(function () {
        console.log("Plan got created");
        clientsTable.findAll({
            attributes: ['firstName', 'lastName', 'emailId'],
            where: {
                role: "admin"
            }
        }).then((obj) => {
            const resObj = obj.map(value => value.dataValues);
            const data = {
                firstName: resObj[0].firstName,
                lastName: resObj[0].lastName,
                emailId: resObj[0].emailId,
                gotCreated: 'Plan Created'
            }
            res.render("admin-dashboard", { resObj: data, layout: false });
        });
    });
});

app.post("/updatePlan", authenticate, authorize, (req, res) => {
    plansTable.update({
        PlanType: req.body.planName,
        Price: req.body.planPrice,
        Description: req.body.planDesc,
        Performance: req.body.planPerf,
        Websites: req.body.websites,
        Space: req.body.space,
        EmailAccounts: req.body.emailAccs,
        SSL: req.body.ssl,
        Domain: req.body.domain,
        Features: req.body.features,
        EmailMarketing: req.body.emailMar,
        MostPopular: req.body.popular
    }, {
        where: {
            PlanType: req.body.planName
        }
    }).then(() => {
        console.log("updated succesfully");
        clientsTable.findAll({
            attributes: ['firstName', 'lastName', 'emailId'],
            where: {
                role: "admin"
            },

        }).then((obj) => {
            const resObj = obj.map(value => value.dataValues);
            res.redirect("/admin-dashboard");
        });

    })
});

app.post("/view-plan", (req, res) => {
    const id = req.body.id;
    plansTable.findAll({
        where: {
            Id: id
        }
    }).then((plansObj) => {
        let plans = plansObj.map(plan => plan.dataValues);
        console.log(plans);
        let resObj = {
            PlanType: plans[0].PlanType,
            Price: plans[0].Price,
            Description: plans[0].Description,
            Performance: plans[0].Performance,
            Websites: plans[0].Websites,
            Space: plans[0].Space,
            EmailAccounts: plans[0].EmailAccounts,
            SSL: plans[0].SSL,
            Domain: plans[0].Domain,
            Features: plans[0].Features,
            EmailMarketing: plans[0].EmailMarketing,
            MostPopular: plans[0].MostPopular,
            filename: plans[0].IconName,
            mostPopular_: ''
        }

        if (resObj.MostPopular == "yes" || resObj.MostPopular == "Yes") {
            resObj.mostPopular_ = 'true';
        }
        if (id == 1)
            res.render("plan_beginner", { resObj: resObj, layout: false });
        else if (id == 2) {
            res.render("plan_pro", { resObj: resObj, layout: false });
        } else if (id == 3) {
            res.render("plan_enterprise", { resObj: resObj, layout: false });
        }
        else {
            res.render("plan", { resObj: resObj, layout: false });
        }
    });
});

app.post("/api/add_to_cart", authenticate, (req, res) => {
    console.log(req.session);
    if (req) {
        let resObj = {
            planName: req.body.planName,
            price: req.body.price,
            email: req.session.user.emailId
        }
        console.log(resObj);
        cart.create({
            PlanName: resObj.planName,
            Price: resObj.price,
            CustomerId: resObj.email
        }).then(function () {
            console.log("order got created");
            let data = {
                msg: "data"
            }
            console.log(data);
            res.json(data);
        });
    }
    else {
        console.log("redirecting");
        res.redirect("/login");
    }

});

app.post("/cart", authenticate, (req, res) => {
    cart.findAll({
        attributes: ["PlanName", "Price"],
        where: {
            CustomerId: req.session.user.emailId
        }
    }).then((cartObj) => {
        let items = cartObj.map(order => order.dataValues);
        let resObj = {
            planName: '',
            price: ''
        }

        console.log(items[0]);
        if (items[0]) {
            resObj.planName = items[0].PlanName;
            resObj.price = items[0].Price;
        }
        res.render("cart_plan", { resObj: resObj, layout: false });
    });
});

app.get("/cart", authenticate, (req, res) => {
    cart.findAll({
        attributes: ["PlanName", "Price"],
        where: {
            CustomerId: req.session.user.emailId
        }
    }).then((cartObj) => {
        let items = cartObj.map(order => order.dataValues);
        let resObj = {
            planName: '',
            price: ''
        }

        console.log(items[0]);
        if (items[0]) {
            resObj.planName = items[0].PlanName;
            resObj.price = items[0].Price;
        }
        res.render("cart_plan", { resObj: resObj, layout: false });
    });
});

app.get("/checkout", authenticate, (req, res) => {

    cart.findOne({
        attributes: ["PlanName", "Price", "CustomerId"],
        where: {
            CustomerId: req.session.user.emailId
        }
    }).then((cartObj) => {

        if (cartObj && cartObj.Price > 0) {
            console.log("price good");
            ordersTable.create({
                PlanName: cartObj.PlanName,
                Price: cartObj.Price,
                customerEmailId: cartObj.CustomerId
            }).then(function () {
                console.log("order created");
                cart.destroy({
                    where: {
                        CustomerId: req.session.user.emailId
                    }
                });
                console.log("cart destroyed");
            });
             res.redirect("/dashboard");
         }
         else{
            // res.render("cart_plan", { errorMsg: errorMsg, layout: false });
            res.redirect("/cart");
         }
    });
});

app.post("/api/ordersummary", authenticate, (req, res) => {
    let oPrice = req.body.oPrice;
    let discountedPrice = req.body.discountedPrice;
    let nMonths = req.body.nMonths;
    let beforeDiscTotalPrice = oPrice * nMonths;
    let afterDiscTotalPrice = discountedPrice * nMonths;
    let savedPrice = beforeDiscTotalPrice - afterDiscTotalPrice;
    let dataToReturn = {
        nMonths: nMonths,
        beforeDiscTotalPrice: beforeDiscTotalPrice,
        afterDiscTotalPrice: afterDiscTotalPrice,
        savedPrice: savedPrice
    }
    res.json(dataToReturn);
});
app.post("/registration", (req, res) => {
    let resObj = {
        firstName: req.body.userFirstName,
        firstNameCheck: '',
        lastName: req.body.userLastName,
        lastNameCheck: '',
        emailId: req.body.userEmail,
        emailCheck: '',
        emailCheck2: '',
        phone: req.body.userPhone,
        phoneCheck: '',
        companyName: req.body.companyName,
        streetAddress1: req.body.streetAddress1,
        addressCheck1: '',
        streetAddress2: req.body.streetAddress2,
        addressCheck2: '',
        city: req.body.city,
        cityCheck: '',
        province: req.body.province,
        provinceCheck: '',
        postcode: req.body.postcode,
        postcodeCheck: '',
        country: req.body.country,
        countryCheck: '',
        password: req.body.userPassword,
        passwordChk: '',
        confirmPass: req.body.confirmPassword,
        confirmPasswordChk: '',
        agreementCheck: req.body.agreementCheck,
        agreementCheckValue: '',
        role: "regular user",
    }

    var fName = resObj.firstName;
    var lName = resObj.lastName;
    var regexName = /^[A-Za-z_]+$/;

    if (fName && regexName.test(fName)) {
        console.log("First Name is valid");
    }
    else {
        console.log("Name not valid");
        resObj.firstNameCheck = 'no first name';
    }

    if (lName && regexName.test(lName)) {
        console.log("Last Name is valid");
    }
    else {
        console.log("Last Name not valid");
        resObj.lastNameCheck = 'no last name';
    }

    var email = resObj.emailId;
    var regexEmail = /^\w+[!#$%&'*+/=?^_`{|}~-]*([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (email && regexEmail.test(email)) {
        console.log("email is valid");
    }
    else {
        console.log("email is not valid");
        resObj.emailCheck = 'no email';
    }

    var mobile = resObj.phone;
    var regexMobile = /^[(]?\d{3}[)]?[-\s]?\d{3}[-\s\.]?\d{4}$/;
    if (mobile && regexMobile.test(mobile)) {
        console.log("mobile is valid");
    }
    else {
        console.log("mobile is not valid");
        resObj.phoneCheck = 'no phone number';
    }

    var address1 = resObj.streetAddress1;
    var address2 = resObj.streetAddress2;
    var addressRegex = /^[a-zA-Z0-9\s',.-]{4,}/;
    if (address1 && addressRegex.test(address1)) {
        console.log("address is valid");
    }
    else {
        console.log("address is not valid");
        resObj.addressCheck1 = 'no address';
    }

    if (address2) {
        console.log("address 2 provided");
        if (!addressRegex.test(address2)) {
            resObj.addressCheck2 = 'no address';
        }
    }
    else {
        console.log("address 2 not provided");
    }

    var city = resObj.city;
    var province = resObj.province;
    var country = resObj.country;
    var cpRegex = /^[^0-9\#\$\@\+]*$/;
    if (city && cpRegex.test(city)) {
        console.log("city is valid");
    }
    else {
        console.log("city is not valid");
        resObj.cityCheck = 'no city';
    }


    if (province && cpRegex.test(province)) {
        console.log("province is valid");
    }
    else {
        console.log("province is not valid");
        resObj.provinceCheck = 'no province';
    }

    if (country && cpRegex.test(country)) {
        console.log("country is valid");
    }
    else {
        console.log("country is not valid");
        resObj.countryCheck = 'no country';
    }


    var postcode = resObj.postcode;
    var postcodeRegex = /^[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}\s?[0-9]{1}[A-Za-z]{1}[0-9]{1}$/;
    if (postcode && postcodeRegex.test(postcode)) {
        console.log("postcode is valid");
    }
    else {
        console.log("postcode is not valid");
        resObj.postcodeCheck = 'no postcode';
    }

    var password = resObj.password;
    var confirmPass = resObj.confirmPass;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#$%^&*]).{6,12}$/;

    if (password && passwordRegex.test(password)) {
        console.log("password is valid");
    }
    else {
        console.log("password is not valid");
        resObj.passwordChk = 'no password';
    }

    if (password) {
        if (confirmPass == password) {
            console.log("password is same");
        }
        else {
            console.log("password is not same");
            resObj.confirmPasswordChk = 'no confirm password';
        }
    }

    if (resObj.firstNameCheck || resObj.lastNameCheck || resObj.emailCheck || resObj.phoneCheck || resObj.addressCheck1 || resObj.cityCheck || resObj.provinceCheck || resObj.postcodeCheck || resObj.passwordChk) {
        res.render("registration", { resObj: resObj, layout: false });
    }
    else {

        clientsTable.findAll(
            {
                attributes: ["emailId"]
            }).then((obj) => {
                console.log(obj);
                const data = obj.map(value => value.dataValues);
                console.log(data);
                for (var j = 0; j < data.length; j++) {
                    if (data[j].emailId == resObj.emailId) {
                        resObj.emailCheck2 = 'Email already exists';
                    }
                }
                console.log(data);
                if (!resObj.emailCheck2) {
                    let hashedPass;
                    bcrypt.hash(resObj.password, 10, function (err, hash) {
                        hashedPass = hash;

                        console.log(hashedPass);
                        clientsTable.create(
                            {
                                firstName: resObj.firstName,
                                lastName: resObj.lastName,
                                emailId: resObj.emailId,
                                mobile: resObj.phone,
                                companyName: resObj.companyName,
                                street_Address1: resObj.streetAddress1,
                                street_Address2: resObj.streetAddress2,
                                city: resObj.city,
                                province: resObj.province,
                                postcode: resObj.postcode,
                                country: resObj.country,
                                password: hashedPass,
                                role: resObj.role,
                            }
                        ).then(() => {
                            req.session.user = {
                                firstName: resObj.firstName,
                                lastName: resObj.lastName,
                                emailId: resObj.emailId,
                                role: "regular user"
                            }
                            res.render("dashboard", { resObj: resObj, layout: false });
                        });
                    });
                }
                else {
                    res.render("registration", { resObj: resObj, layout: false });
                }
            });
    }
});

app.post("/login-submit", (req, res) => {


    let resObj = {
        emailId: req.body.email,
        emailCheck: '',
        password: req.body.password,
        passwordCheck: '',
        rememberMe: req.body.rememberMe,
        emailAndPasswordExist: '',
        role: "regular user"
    }

    var email = resObj.emailId;
    if (!email) {
        resObj.emailCheck = 'no email';
    }

    var password = resObj.password;
    if (!password) {
        resObj.passwordCheck = 'no password';
    }

    if ((resObj.passwordCheck && resObj.emailCheck)) {
        res.render("login", { resObj: resObj, layout: false });
    }
    else {
        clientsTable.findAll(
            {
                attributes: ["emailId", "password", "firstName", "lastName", "role"],
                where: {
                    emailId: resObj.emailId
                }
            }
        ).then((obj) => {
            var valid = 0;
            const data = obj.map(value => value.dataValues);
            let password;
            let verified;
            for (var j = 0; j < data.length && valid != 1; j++) {
                password = data[j].password;
                verified = bcrypt.compareSync(resObj.password, password);
                if (data[j].emailId == resObj.emailId && verified) {
                    valid = 1;
                }
            }
            j = j - 1;

            if (valid) {
                resObj.role = data[j].role;
                req.session.user = {
                    firstName: data[j].firstName,
                    lastName: data[j].lastName,
                    emailId: resObj.emailId,
                    role: data[j].role
                }

                if (resObj.role == "admin") {
                    res.redirect("/admin-dashboard");
                }
                else {
                    res.redirect("/dashboard");
                }
            }
            else {
                resObj.emailAndPasswordExist = 'not exist';
                res.render("login", { resObj: resObj, layout: false });
            }
        });
    }
});


app.get("/admin-dashboard", authenticate, authorize, (req, res) => {
    res.render("admin-dashboard", { resObj: req.session.user, layout: false });
});

app.get("/dashboard", authenticate, (req, res) => {
    res.render("dashboard", { resObj: req.session.user, layout: false });
});

app.get("/logout", function (req, res) {
    req.session.reset();
    console.log("logging out");
    res.redirect("/login");
});

app.use(function (req, res) {
    res.status(404).render("pagenotfound", { layout: false });
});

function onHttpStart() {
    console.log("Server started listening on: " + HTTP_PORT);
}

databaseConn.sync().then(() => app.listen(HTTP_PORT, onHttpStart()));