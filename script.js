    $(document).ready(function () {
        $.get("http://localhost:3000/fetchAllStudentData", function (data) {
            renderStudentData(data);
        });
    });

    function renderStudentData(students) {
        const studentList = $("#student-list");

        students.forEach(student => {
            const studentDiv = $("<div>").addClass("student-item");
            studentDiv.append($("<p>").text(`Name: ${student.name}`));
            studentDiv.append($("<p>").text(`Student ID: ${student.stId}`));
            studentDiv.append($("<p>").text(`Age: ${student.age}`));
            studentDiv.append($("<p>").text(`Grade: ${student.grade}`));

            const editBtn = $("<button>").text("Edit").addClass("edit-btn");
            const deleteBtn = $("<button>").text("Delete").addClass("delete-btn");

            editBtn.click(() => handleEdit(student.stId));
            deleteBtn.click(() => handleDelete(student.stId));

            studentDiv.append(editBtn);
            studentDiv.append(deleteBtn);

            studentList.append(studentDiv);
        });
    }

    function handleEdit(studentId) {

        const newName = prompt("Enter the new name:");

        if (newName !== null) {
            const updatedData = { name: newName };

            $.ajax({
                url: `http://localhost:3000/editStudent/${studentId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function (data) {  5``  
                    console.log(data.message);
                    updateStudentList();
                },
                error: function (error) {
                    console.error(`Error editing student with ID ${studentId}:`, error);
                }
            });
        }
    }

    function updateStudentList() {
        $.get("http://localhost:3000/fetchAllStudentData", function (data) {
            renderStudentData(data);
        });
    }



    function handleDelete(studentId) {
        $.ajax({
            url: `http://localhost:3000/deleteStudent/${studentId}`,
            method: 'DELETE',
            success: function (data) {
                console.log(`Delete request successful for student ID: ${studentId}`);
                // Optionally, update the UI to reflect the deletion
            },
            error: function (error) {
                console.error(`Error deleting student with ID ${studentId}:`, error);
            }
        });
    }
    $(document).ready(function () {
        // Fetch student data and render on page load
        $.get("http://localhost:3000/fetchAllStudentData", function (data) {
            renderStudentData(data);
        });

        // Add click event for the "Add Student" button
        $("#addStudentBtn").click(function () {
            handleAddStudent();
        });
    });

    // ...

    function handleAddStudent() {
        const name = prompt("Enter the student's name:");
        const stId = prompt("Enter the student's ID:");
        const age = prompt("Enter the student's age:");
        const grade = prompt("Enter the student's grade:");

        if (name !== null && stId !== null && age !== null && grade !== null) {
            const newStudent = { name, stId, age, grade };

            // Send the new student data to the server
            $.ajax({
                url: "http://localhost:3000/addStudent",
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newStudent),
                success: function (data) {
                    console.log(data.message);
                    // Optionally, update the UI to reflect the addition
                    updateStudentList();
                },
                error: function (error) {
                    console.error("Error adding new student:", error);
                }
            });
        }
    }
