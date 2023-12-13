const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const studentSchema = new mongoose.Schema({
    name: String,
    stId: String,
    age: Number,
    grade: String,
});

const Student = mongoose.model("students", studentSchema);

mongoose.connect("mongodb://127.0.0.1/StudentRecord", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define a route to fetch all student data
app.get("/fetchAllStudentData", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define a route to fetch a specific student by ID
app.get("/fetchStudent/:studentId", async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findOne({ stId: studentId });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }
    } catch (error) {
        console.error(`Error fetching student with ID ${studentId}:`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.put("/editStudent/:studentId", async (req, res) => {
    const studentId = req.params.studentId;

    try {
    
        const updatedStudent = await Student.findOneAndUpdate({ stId: studentId }, req.body, { new: true });
        res.status(200).json({ message: `Student with ID ${studentId} updated successfully` });
    } catch (error) {
        console.error(`Error editing student with ID ${studentId}:`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete("/deleteStudent/:studentId", async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const deletedStudent = await Student.findOneAndDelete({ stId: studentId });
        if (deletedStudent) {
            res.status(200).json({ message: `Student with ID ${studentId} deleted successfully` });
        } else {
            res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }
    } catch (error) {
        console.error(`Error deleting student with ID ${studentId}:`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.post("/addStudent", async (req, res) => {
    const { name, stId, age, grade } = req.body;

    try {
        const newStudent = new Student({
            name,
            stId,
            age,
            grade
        });

        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "Student added successfully", student: savedStudent });
    } catch (error) {
        console.error("Error adding new student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
