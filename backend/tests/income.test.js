const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Income = require("../models/IncomeModel");
require('dotenv').config();

const testIncome = {
  title: "Salary",
  amount: 5000,
  category: "Job",
  description: "Monthly salary",
  date: "2024-12-01",
};


beforeAll(async () => {
  const dbUrl = process.env.TEST_DATABASE_URL || "mongodb://localhost:27017/expenseTrackerTest";
  console.log(dbUrl);
  await mongoose.connect(dbUrl);
  console.log("Connected to the test database");
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
  
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });
  

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  console.log("Disconnected from the test database");
});

describe("Income API", () => {
  it("should add a new income", async () => {
    const response = await request(app).post("/api/v1/add-income").send(testIncome);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Income Added");

    const income = await Income.findOne({ title: "Salary" });
    expect(income).toBeTruthy();
    expect(income.amount).toBe(5000);
  });

  it("should return an error for missing fields", async () => {
    const response = await request(app).post("/api/v1/add-income").send({
      title: "Partial Data",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  it("should fetch all incomes", async () => {
    await Income.create(testIncome);

    const response = await request(app).get("/api/v1/get-incomes");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Salary");
  });

  it("should update an income", async () => {
    const createdIncome = await Income.create(testIncome);

    const updatedData = {
      title: "Updated Salary",
      amount: 5500,
      category: "Job",
      description: "Updated monthly salary",
      date: "2024-12-02",
    };

    const response = await request(app)
      .put(`/api/v1/update-income/${createdIncome._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Income Updated");

    const updatedIncome = await Income.findById(createdIncome._id);
    expect(updatedIncome.title).toBe("Updated Salary");
    expect(updatedIncome.amount).toBe(5500);
  });

  it("should delete an income", async () => {
    const createdIncome = await Income.create(testIncome);

    const response = await request(app).delete(`/api/v1/delete-income/${createdIncome._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Income Deleted");

    const deletedIncome = await Income.findById(createdIncome._id);
    expect(deletedIncome).toBeNull();
  });
});
