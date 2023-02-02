import app from 'app';
import supertest from 'supertest';
import { FruitInput } from './../src/services/fruits-service';


describe("fruits tests", ()=>{
    it("should create a valid fruit", async()=>{
        const body: FruitInput = {
            name: "Banana",
            price: 14
        }
        const result = await supertest(app).post("/fruits").send(body)
        const status = result.status
        expect(status).toBe(201)
    })
    it("should not create the same fruit", async()=>{
        const body: FruitInput = {
            name: "Banana",
            price: 14
        }
        const result = await supertest(app).post("/fruits").send(body)
        const status = result.status
        expect(status).toBe(409)
    })
    it("should create another different fruit", async()=>{
        const body: FruitInput = {
            name: "Maçã",
            price: 18
        }
        const result = await supertest(app).post("/fruits").send(body)
        const status = result.status
        expect(status).toBe(201)
    })
    it("should return all the fruits", async()=>{
        const result = await supertest(app).get("/fruits")
        const status = result.status
        const response = result.body
        expect(status).toBe(200)
        expect(response.length).toBe(2)
    })
    it("should return a fruit by id", async()=>{
        const id = 2
        const result = await supertest(app).get("/fruits/"+id)
        const status = result.status
        expect(status).toBe(200)
    })
    it("should not return a fruit for non-existent id", async()=>{
        const id = 4
        const result = await supertest(app).get("/fruits/"+id)
        const status = result.status
        expect(status).toBe(404)
    })
})