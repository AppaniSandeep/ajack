document.addEventListener("DOMContentLoaded", function(){
    const dashBoardSection = document.getElementById("dashboardSection");
const formSection = document.getElementById("formSection");
const detailsForm = document.getElementById("addForm");
const addEmployeeButton = document.getElementById("addEmployeeBtn")
const cancelFormButton = document.getElementById("cancelBtn");
const addFormButton = document.getElementById("addBtn");
const listOfEmployees = document.getElementById("employeesList");
const filterButton = document.getElementById("filterBtn")
const filterSection = document.getElementById("filterGroup");
const applyButton = document.getElementById("applyBtn");
const resetButton = document.getElementById("resetBtn")
const searchInputElement = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortBy");
const showSelect = document.getElementById("showPagination");
const paginationElement = document.getElementById("pagination")

//State variables
let employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];
let filteredList = [...employeeList]
let searchFiltered = null;
let currentPage = 1;
let pageSize = parseInt(showSelect.value) || 10;
let sortKey = "";


//Event handlers

addEmployeeButton.onclick = function(){
    dashBoardSection.classList.add("d-none")
    formSection.classList.remove("d-none")
}

cancelFormButton.onclick = function(event){
    event.preventDefault();
    formSection.classList.add("d-none");
    dashBoardSection.classList.remove("d-none");
}

filterButton.onclick = () => filterSection.classList.remove("d-none");

applyButton.onclick = () => {
    const nameValue = document.getElementById("filterName").value.trim().toLowerCase();
    const departmentValue = document.getElementById("filterDepartment").value;
    const roleValue = document.getElementById("filterRole").value;

    filteredList = employeeList.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        return (
            (nameValue === "" || fullName.includes(nameValue)) && (departmentValue === "" || emp.department === departmentValue) && (roleValue === "" || emp.role === roleValue)
        );
    });
    searchFiltered = null;
    currentPage = 1;
    updateView();
}

resetButton.onclick = () => {
    filteredList = [...employeeList];
    searchFiltered = null;
    currentPage = 1;
    updateView();
    filterSection.classList.add("d-none");
}

searchInputElement.oninput = () => {
    const searchInputValue = searchInputElement.value.trim().toLowerCase();
    searchFiltered = employeeList.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        return fullName.includes(searchInputValue) || emp.email.toLowerCase().includes(searchInputValue);
    });
    currentPage = 1;
    updateView(true);
};

sortSelect.onchange = () => {
    sortKey = sortSelect.value;
    if(sortKey){
        filteredList.sort((a,b) => a[sortKey].localCompare(b[sortKey]));
    }
    currentPage = 1;
    updateView();
};

showSelect.onchange = () => {
    pageSize = parseInt(showSelect.value);
    currentPage = 1;
    updateView();
};

addFormButton.onclick = () => {
    localStorage.setItem("employeeList", JSON.stringify(employeeList))
};

function resetFormSubmitToAdd() {
    detailsForm.onsubmit = function (event) {
        event.preventDefault();

        const fNameInput = document.getElementById("firstName");
        const lNameInput = document.getElementById("lastName");
        const emailInput = document.getElementById("email");
        const departmentSelect = document.getElementById("department");
        const roleSelect = document.getElementById("role");

        const firstNameValue = fNameInput.value;
        const lNameInputValue = lNameInput.value;
        const emailInputValue = emailInput.value;
        const departmentSelectValue = departmentSelect.value;
        const roleSelectValue = roleSelect.value;

        if (
            firstNameValue === "" ||
            lNameInputValue === "" ||
            emailInputValue === "" ||
            departmentSelectValue === "" ||
            roleSelectValue === ""
        ) {
            alert("Enter all details");
            return;
        }

        const newEmployee = {
            id: Date.now(),
            firstName: firstNameValue,
            lastName: lNameInputValue,
            email: emailInputValue,
            department: departmentSelectValue,
            role: roleSelectValue
        };

        employeeList.push(newEmployee);
        localStorage.setItem("employeeList", JSON.stringify(employeeList));
        filteredList = [...employeeList];
        searchFiltered = null;
        renderEmployeeList();

        formSection.classList.add("d-none");
        dashBoardSection.classList.remove("d-none");
        detailsForm.reset();
    };
}




function createAndAppendEmployeeListItem(eachEmployee) {
    listOfEmployees.classList.add("d-flex","flex-wrap", "gap-3", "mt-3");

    //Create card wraper
    let employeeItem = document.createElement("li");
    employeeItem.classList.add("list-unstyled");
    
    let card = document.createElement("div");
    card.className = "card shadow-sm p-3 mb-3";
    card.style.width = "18rem";

    // Card body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    //Name (Card title)
    let nameElement = document.createElement("h5");
    nameElement.className = "card-title";
    nameElement.textContent = eachEmployee.firstName + " " + eachEmployee.lastName;
    cardBody.appendChild(nameElement);

    //Email (Card text)
    let emailElement = document.createElement("p");
    emailElement.className = "card-text mb-1";
    emailElement.innerHTML = `<span class="fw-bold">Email: </span>${eachEmployee.email}`;
    cardBody.appendChild(emailElement);

    //Department
    let departmentElement = document.createElement("p");
    departmentElement.className = "card-text mb-1";
    departmentElement.innerHTML = `<span class="fw-bold">Department: </span>${eachEmployee.department}`;
    cardBody.appendChild(departmentElement);

    //Role
    let roleElement = document.createElement("p");
    roleElement.className = "card-text mb-3";
    roleElement.innerHTML = `<span class="fw-bold">Role: </span>${eachEmployee.role}`;
    cardBody.appendChild(roleElement)

    //Button Container
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex justify-content-between";

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-outline-primary btn-sm";
    editBtn.onclick = function () {
        dashBoardSection.classList.add("d-none");
        formSection.classList.remove("d-none");

        //Pre-filling form values

        document.getElementById("firstName").value = eachEmployee.firstName;
        document.getElementById("lastName").value = eachEmployee.lastName;
        document.getElementById("email").value = eachEmployee.email;
        document.getElementById("department").value = eachEmployee.department;
        document.getElementById("role").value = eachEmployee.role;

        detailsForm.onsubmit = function(event){
            event.preventDefault();

            eachEmployee.firstName = document.getElementById("firstName").value;
            eachEmployee.lastName = document.getElementById("lastName").value;
            eachEmployee.email = document.getElementById("email").value;
            eachEmployee.department = document.getElementById("department").value;
            eachEmployee.role = document.getElementById("role").value;

            localStorage.setItem("employeeList", JSON.stringify(employeeList));
            filteredList = [...employeeList];
            renderEmployeeList();

            formSection.classList.add("d-none");
            dashBoardSection.classList.remove("d-none");
            detailsForm.reset();

            resetFormSubmitToAdd();
        }


    }
    buttonContainer.appendChild(editBtn)

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-outline-danger btn-sm";
    deleteBtn.onclick = function(){
        if (confirm("Are you sure you want to delete this employee?")){
            employeeList = employeeList.filter(emp => emp.id !== eachEmployee.id)
            localStorage.setItem("employeeList", JSON.stringify(employeeList));
            filteredList = [...employeeList];
            updateView();
        }
    }
    buttonContainer.appendChild(deleteBtn)

    cardBody.appendChild(buttonContainer);
    card.appendChild(cardBody);
    employeeItem.appendChild(card);
    listOfEmployees.appendChild(employeeItem);
}


function renderEmployeeList(){
    filteredList = [...employeeList];
    updateView();
}


function updateView(useSearch = false){
    listOfEmployees.innerHTML = "";
    const base = useSearch && searchFiltered ? searchFiltered : filteredList;
    const total = base.length;
    const pages = Math.ceil(total / pageSize) || 1;
    if (currentPage > pages) currentPage = pages;

    const start = (currentPage -1) * pageSize;
    const pageItems = base.slice(start, start + pageSize);
    listOfEmployees.className = "d-flex flex-wrap gap-3 mt-3"
    pageItems.forEach(element => createAndAppendEmployeeListItem(element));
    renderPagination(pages);
}

function renderPagination(totalPages){
    paginationElement.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
        const li = document.createElement("li");
    li.className = `page-item${i === currentPage ? " active" : ""}`;
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = i;
    a.onclick = e => {
      e.preventDefault();
      currentPage = i;
      updateView();
    };
    li.appendChild(a);
    paginationElement.appendChild(li);
  }
    
}

resetFormSubmitToAdd()
renderEmployeeList();
})
