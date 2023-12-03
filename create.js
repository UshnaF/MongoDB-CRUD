const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  stId: String,
  age: Number,
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);

mongoose.connect("mongodb://127.0.0.1/StudentRecord")
  .then(() => {
    console.log("Connected to MongoDB");

    const student1 = new Student({ name: "Aliya Kamran", age: 20, stId: "sp22-bse-001", grade: "A" });
    const student2 = new Student({ name: "Jaminah Bob", age: 19, stId: "sp22-bse-002", grade: "B+" });
    const student3 = new Student({ name: "Maria ahmad", age: 21, stId: "sp22-bse-003", grade: "C" });
    const student4 = new Student({ name: "Charles Noris", age: 24, stId: "sp22-bse-004", grade: "D" });
    const student5 = new Student({ name: "Alexa Smith", age: 18, stId: "sp22-bse-005", grade: "A" });

    return Promise.all([
      student1.save(),
      student2.save(),
      student3.save(),
      student4.save(),
      student5.save(),

    ]);
  })
  .then(results => {
    console.log("Students saved successfully:", results);
  })
  .catch(error => {
    console.error("Error saving students:", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
