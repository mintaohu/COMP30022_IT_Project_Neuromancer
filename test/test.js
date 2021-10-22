process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);



let testUser = {
  email: "Test01@gmail.com",
  password: "Test01"
}

let testUserFail = {
  email: "Test01@gmail.com",
  password: "Test03"
}

let testEvent = {
  sponsor: "Test01@gmail.com",
  subject: "Test",
  location: "Melbourne",
  date: "2021-10-22T16:21:41.908+00:00",
  participators: [],
  privacy: "Public",
  details: "Test",
  activity: "🏃‍♀️"
}

let testEditEvent = {
  sponsor: "Test01@gmail.com",
  subject: "Test",
  location: "Melbourne",
  date: "2021-10-22T16:21:41.908+00:00",
  participators: [],
  privacy: "Private",
  details: "Test",
  activity: "🏃‍♀️"
}

let testProfile = {
  email: "Test01@gmail.com",
  age: 20,
  bio: "Test bio", 
  education: "Bachelor of science", 
  work: "None", 
  currentCity: "Melbourne"
}


// register api test
describe('register api', () => {
    it('register failed', async () => {
        const params = {
            email: 'test1@test.com',
            password: 'helloworld',
            username: "Neuromancer",
            age: 23,
            gender: "Male"
          }
        chai.request(server)
            .post('/register')
            .send(params)
            .end((err, res) => {
                res.should.have.status(400);
            });
    });
});


// login api test
describe('login api', () => {
  it('login successfully', async () => {

      chai.request(server)
          .post('/login')
          .send(testUser)
          .end((err, res) => {
              res.should.have.status(200);
              
          });
  });

  it('login failed', async () => {

    chai.request(server)
        .post('/login')
        .send(testUserFail)
        .end((err, res) => {
            res.should.have.status(404);
            
        });
});
});



// editProfile api test
describe('editProfile api', () => {
  it('edit successfully', async () => {

      chai.request(server)
          .post('/editProfile')
          .send(testProfile)
          .end((err, res) => {
              res.should.have.status(200);
              
          });
  });

  it('edit failed', async () => {

    chai.request(server)
        .post('/editProfile')
        .send(testProfile)
        .end((err, res) => {
            res.should.have.status(400);
            
        });
});

});



// createEvent api test
describe('createEvent api', () => {
  it('create successfully', async () => {
      chai.request(server)
          .post('/createEvent')
          .send(testEvent)
          .end((err, res) => {
              res.should.have.status(200);
          });
  });
});




// editEvents api test
describe('editEvent api', () => {
  it('edit failed', async () => {
      chai.request(server)
          .post('/editEvent')
          .send(testEditEvent)
          .end((err, res) => {
              res.should.have.status(404);
          });
  });
});
