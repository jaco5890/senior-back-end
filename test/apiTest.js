const request = require('supertest');
const app = require('../server');

//==================== Get all employees test ====================

/**
 * Testing get all employees endpoint
 */
describe('GET /employees', function () {
    it('respond with json containing a list of all employees', function (done) {
        request(app)
            .get('/employees')
            .set('Accept', 'application/json')
            .set('authorization', process.env.ENVTOKEN)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a employee endpoint by giving an existing employee
 */
describe('GET /employee/:id', function () {
    it('respond with json containing a single employee', function (done) {
        request(app)
            .get('/employees/652d7df1ad7203205b029004')
            .set('Accept', 'application/json')
            .set('authorization', process.env.ENVTOKEN)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a employee endpoint by giving an employee that does not exist
 */
describe('GET /employee/:id', function () {
    it('respond with json containing no employees', function (done) {
        request(app)
            .get('/employees/652d7df1ad7203205b029003')
            .set('Accept', 'application/json')
            .set('authorization', process.env.ENVTOKEN)
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

/**
 * Testing post employee endpoint
 */
describe('POST /employee', function () {
    let data = {
        "basicInformation": {
            "firstName": "jaco",
            "lastName": "van der merwe",
            "contactNumber": "0748904346",
            "email": "jacovandermerwe@gmail.com",
            "birthday": "1992-11-03"
        },
        "addressInformation": {
            "streetAddress": "test street 5",
            "city": "pretoria",
            "postalCode": 4580,
            "country": "South Africa"
        },
        "skills": [{
            "skill": "angular",
            "yearsExperience": 3,
            "seniority": "junior"
        }]
    }
    it('respond with 201 created that the user has been created', function (done) {
        request(app)
            .post('/employees')
            .send(data)
            .set('Accept', 'application/json')
            .set('authorization', process.env.ENVTOKEN)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint with missing data
 */
describe('POST /users', function () {
    let data = {
        "basicInformation": {
            "firstName": "",
            "lastName": "",
            "contactNumber": "0748904346",
            "email": "jacovandermerwe@gmail.com",
            "birthday": "1992-11-03"
        },
        "addressInformation": {
            "streetAddress": "test street 5",
            "city": "pretoria",
            "postalCode": 4580,
            "country": "South Africa"
        },
        "skills": [{
            "skill": "angular",
            "yearsExperience": 3,
            "seniority": "junior"
        }]
    }
    it('respond with 400 not created due to missing data', function (done) {
        request(app)
            .post('/employees')
            .send(data)
            .set('Accept', 'application/json')
            .set('authorization', process.env.ENVTOKEN)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing patch employee endpoint
 */
describe('PATCH /employee', function () {
    let data = {
        "basicInformation": {
            "firstName": "jacoooooooooooo",
            "lastName": "van der merwe",
            "contactNumber": "0748904346",
            "email": "jacovandermerwe@gmail.com",
            "birthday": "1992-11-03"
        },
        "addressInformation": {
            "streetAddress": "test street 5",
            "city": "pretoria",
            "postalCode": 4580,
            "country": "South Africa"
        },
        "skills": [{
            "skill": "angular",
            "yearsExperience": 3,
            "seniority": "junior"
        }]
    }
    it('respond with 200 that the user has been updated', function (done) {
        request(app)
            .patch('/employees/652d7df1ad7203205b029004')
            .send(data)
            .set('Accept', 'application/json')
            .set('authorization', process.env.ENVTOKEN)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
