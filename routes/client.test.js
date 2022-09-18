/** 
 * after we could test that we can register successfully
 * the plan is to make a full cycle to test all APIs 
 * but i want to apply the cookie to this project and then we can continue testing  
 * */

const request = require('supertest')
const app = require('../app/app')
const { dbConnect, dbClose } = require('../models/dbconnection/dbconnection')

let newUser = {
    "name":"AmrH",
    "phoneNumber":"01501784881",
    "password":"123456",
    "userType":"client",
    "email":"caayrtrr@yahoo.com"
};
let token;

describe('Test Client APIs', () => {
    beforeAll( () => dbConnect() )

    describe('register user', () => {
        
    
    
        test('should register successfully', async () => {
            const response = await request(app)
                .post('/register')
                .send(newUser)
                .expect(201);
            
            token = response.data
        })
    })

    afterAll(() => dbClose());
})

