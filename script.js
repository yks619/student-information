let form = document.getElementById("dataForm");
let table = document.getElementById("dataTable");
let count = 0;

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load existing data from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    let storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData.forEach((data, index) => {
        addRowToTable(data, index + 1);
    });
    count = storedData.length;

    // Add event listener for search input with debounce
    const searchInput = document.getElementById("search");
    const debouncedSearch = debounce(function(e) {
        searchData(e.target.value);
    }, 300); // 300ms delay

    searchInput.addEventListener("input", debouncedSearch);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let firstNameInput = document.getElementById("firstName").value;
    let lastNameInput = document.getElementById("lastName").value;
    let dobInput = document.getElementById("dob").value;
    let genderInput = document.getElementById("gender").value;
    let fatherNameInput = document.getElementById("fatherName").value;
    let motherNameInput = document.getElementById("motherName").value;
    let contactInput = document.getElementById("contact").value;
    let addressInput = document.getElementById("address").value;
    let sectionInput = document.getElementById("section").value;
    let rollNoInput = document.getElementById("rollNo").value;

    if(firstNameInput && lastNameInput && dobInput && genderInput && fatherNameInput && 
       motherNameInput && contactInput && addressInput && sectionInput && rollNoInput) {
        count++;

        let rowData = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            dob: dobInput,
            gender: genderInput,
            fatherName: fatherNameInput,
            motherName: motherNameInput,
            contact: contactInput,
            address: addressInput,
            section: sectionInput,
            rollNo: rollNoInput,
        };

        // Save to local storage
        let storedData = JSON.parse(localStorage.getItem("formData")) || [];
        storedData.push(rowData);
        localStorage.setItem("formData", JSON.stringify(storedData));

        addRowToTable(rowData, count);
        form.reset();
    }
});

function addRowToTable(rowData, rowNumber) {
    let newRow = document.createElement("tr");
    newRow.classList.add("border-t");
    newRow.innerHTML = `
        <td class="px-4 py-2 text-center">${rowNumber}</td>
        <td class="px-4 py-2 text-center">${rowData.firstName}</td>
        <td class="px-4 py-2 text-center">${rowData.lastName}</td>
        <td class="px-4 py-2 text-center">${rowData.dob}</td>
        <td class="px-4 py-2 text-center">${rowData.gender}</td>
        <td class="px-4 py-2 text-center">${rowData.fatherName}</td>
        <td class="px-4 py-2 text-center">${rowData.motherName}</td>
        <td class="px-4 py-2 text-center">${rowData.contact}</td>
        <td class="px-4 py-2 text-center">${rowData.address}</td>
        <td class="px-4 py-2 text-center">${rowData.section}</td>
        <td class="px-4 py-2 text-center">${rowData.rollNo}</td>
    `;
    table.appendChild(newRow);
}

function searchData(searchQuery = '') {
    searchQuery = searchQuery.toLowerCase();
    const students = JSON.parse(localStorage.getItem("formData")) || [];
    const table = document.getElementById("dataTable");
    table.innerHTML = "";

    const filteredStudentsData = students.filter(student => (
        student.firstName.toLowerCase().includes(searchQuery) 
        // student.lastName.toLowerCase().includes(searchQuery) || 
        // student.dob.toLowerCase().includes(searchQuery) ||
        // student.gender.toLowerCase().includes(searchQuery) ||
        // student.fatherName.toLowerCase().includes(searchQuery) || 
        // student.motherName.toLowerCase().includes(searchQuery) || 
        // student.contact.toLowerCase().includes(searchQuery) ||
        // student.address.toLowerCase().includes(searchQuery) || 
        // student.section.toLowerCase().includes(searchQuery) || 
        // student.rollNo.toLowerCase().includes(searchQuery)
    ));

    if (filteredStudentsData.length > 0) {
        filteredStudentsData.forEach((student, index) => {
            addRowToTable(student, index + 1);
        });
    } else {
        const rowData = document.createElement("tr");
        rowData.innerHTML = `
            <td colspan="11" class="text-red-500 font-bold py-2 text-center">Result Not Found</td>
        `;
        table.appendChild(rowData);
    }
}