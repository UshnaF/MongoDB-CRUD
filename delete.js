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

        const filter = { stId: "sp22-bse-004" };
        return Student.findOneAndDelete(filter);
    })
    .then(deletedStudent => {
        if (deletedStudent) {
            console.log("Student deleted successfully:", deletedStudent);
        } else {
            console.log("Student not found");
        }
    })
    .catch(error => {
        console.error("Error deleting student:", error);
    })
    .finally(() => {
        mongoose.connection.close();
    });
