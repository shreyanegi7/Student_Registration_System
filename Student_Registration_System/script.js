document.addEventListener("DOMContentLoaded", loadStudents);

// Add Student Functionality
document.getElementById("add-btn").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;

    // Validation
    if (!name.match(/^[A-Za-z\s]+$/)) {
        alert("Invalid Name: Only letters allowed!");
        return;
    }
    if (!studentId.match(/^[0-9]+$/)) {
        alert("Invalid Student ID: Only numbers allowed!");
        return;
    }
    if (!contact.match(/^[0-9]{10}$/)) {
        alert("Invalid Contact: Must be 10 digits!");
        return;
    }
    if (!email.includes("@")) {
        alert("Invalid Email Address!");
        return;
    }

    // Create Student Object
    const student = { name, studentId, email, contact };
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    addStudentToTable(student);
    document.querySelector("form").reset();
});

// Load Students from Local Storage
function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(addStudentToTable);
}

// Add Student to Table
function addStudentToTable(student) {
    const table = document.getElementById("student-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="action-btn edit-btn">Edit</button>
            <button class="action-btn delete-btn">Delete</button>
        </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function () {
        row.remove();
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students = students.filter(s => s.studentId !== student.studentId);
        localStorage.setItem("students", JSON.stringify(students));
    });

    row.querySelector(".edit-btn").addEventListener("click", function () {
        document.getElementById("name").value = student.name;
        document.getElementById("student-id").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;
        row.remove();
    });

    table.appendChild(row);
}
