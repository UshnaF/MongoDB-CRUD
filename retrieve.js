const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    stId: String,
    age: Number,
    grade: String,
});

const Student = mongoose.model("students", studentSchema);

mongoose.connect("mongodb://127.0.0.1/StudentRecord")
    .then(() => {
        console.log("Connected to MongoDB");

        const filter = { stId: "sp22-bse-002" };
        return Student.findOne(filter);
    })
    .then(foundStudent => {
        if (foundStudent) {
            console.log("Student found:", foundStudent);
        } else {
            console.log("Student not found");
        }
    })
    .catch(error => {
        console.error("Error retrieving student:", error);
    })
    .finally(() => {
        mongoose.connection.close();
    });
