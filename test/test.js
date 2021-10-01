process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);


/*
  * Test the /POST route
  */
describe('register api', () => {
    it('it should register successfully', async () => {
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
                res.should.have.status(200);
                
            });
    });
});


describe('login api', () => {
  it('it should login successfully', async () => {
      const params = {
          email: 'test1@gmail.com',
          password: 'helloworld',
        }
      chai.request(server)
          .post('/login')
          .send(params)
          .end((err, res) => {
              res.should.have.status(200);
              
          });
  });



});
