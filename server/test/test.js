process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');

const agent = require('superagent');
const assert = require('chai').assert;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// describe('register()', function() {
//   it('success', async function() {
//     const params = {
//       email: 'test@test.com',
//       password: 'helloworld',
//       username: "Neuromancer",
//       age: 23,
//       gender: "Male"
//     };

//     const token = await agent.post('/register', params);

//     assert.ok(token);
//     assert.ok(token._id);
//   });
// });


/*
  * Test the /POST route
  */
describe('register api', () => {
    it('it should register successfully', async () => {
        const params = {
            email: 'test@gmail.com',
            password: 'helloworld',
            name: "Neuromancer",
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
          email: 'test@gmail.com',
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
