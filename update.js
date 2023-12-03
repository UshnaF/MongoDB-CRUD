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

        const filter = { stId: "sp22-bse-001" };
        const update = { grade: "A+" };

        return Student.findOneAndUpdate(filter, update, { new: true });
    })
    .then(updatedStudent => {
        console.log("Student updated successfully:", updatedStudent);
    })
    .catch(error => {
        console.error("Error updating student:", error);
    })
    .finally(() => {
        mongoose.connection.close();
    });
