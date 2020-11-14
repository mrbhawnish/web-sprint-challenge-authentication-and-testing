const bcrypt = require("bcrypt");
const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig.js')

beforeEach(async () => {   // Make sure there are no tables before each test starts
    await db('users').truncate() // and will reset all of the id's so we start with 1 again
}) 

describe('supertests for endpoints', () => {
    describe('[POST] ENDPOINT TEST', () => {
        it('succesfully posts a user for register', async () => {
            const res =  await request(server).post('/api/auth/register').send({ username: "ketal", password: "abc123" })
    
            expect(res.status).toBe(201)

    
        })

        it('[POST] Returns the correct data', async () => {
            const newRes =  await request(server).post('/api/auth/register').send({ username: "ketal", password: "abc123" })
            // const data = await db("users").where({username: res.body.username})
    

            expect(newRes.body).toMatchObject({ username: "ketal" })
    
        })

        describe('[POST] LOGIN ENDPOINT TEST', () => {
            it('succesfully posts a user for login, async ', async () => {
                await request(server).post('/api/auth/register').send({ username: "ketal", password: "abc123" })
                const res =  await request(server).post('/api/auth/login').send({ username: "ketal", password: "abc123" })
                
        
                expect(res.status).toBe(200)    // Gets correct status cod
        
            })
            it('succesfully returns back an object after logging in ', async () => {
                await request(server).post('/api/auth/register').send({ username: "ketal", password: "abc123" })
                const res =  await request(server).post('/api/auth/login').send({ username: "ketal", password: "abc123" })
                
                expect(res.body).toMatchObject({ username: "ketal" })    // Gets correct status cod
        
            })
        })

        describe('[GET] LOGIN ENDPOINT TEST', () => {
            it('Blocks a user from entering without authentication ', async () => {
                const res =  await request(server).get('/api/jokes')
                
                 expect(res.status).toBe(401)        //assertion test 1
                 expect(res.body).toMatchSnapshot()   //assertion test 2
        
            })
        })





    });

});