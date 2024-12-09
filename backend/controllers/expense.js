const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount Cannot be negative" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
    
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};


exports.updateExpense = async (req, res) => {

  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    console.log(1);
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(2);
    
    
    if (amount <= 0 || typeof amount !== "number") {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }
    console.log(3);
    const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true } // Return the updated document
    );
    console.log(updatedExpense);
    console.log(4);
    if (!updatedExpense) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income Updated", updatedExpense });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
