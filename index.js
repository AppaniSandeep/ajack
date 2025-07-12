// Data store
let employeeList = []

let employeCount = employeeList.length


const dashBoardSection = document.getElementById("dashboardSection");
const formSection = document.getElementById("formSection");
const detailsForm = document.getElementById("addForm");
const addEmployeeButton = document.getElementById("addEmployeeBtn")
const cancelFormButton = document.getElementById("cancelBtn");
const addFormButton = document.getElementById("addBtn");
const listOfEmployees = document.getElementById("employeesList");



addEmployeeButton.onclick = function(){
    dashBoardSection.classList.add("d-none")
    formSection.classList.remove("d-none")
}

cancelFormButton.onclick = function(event){
    event.preventDefault();
    formSection.classList.add("d-none");
    dashBoardSection.classList.remove("d-none");
}



detailsForm.onsubmit = function(event){
    event.preventDefault();

    const fNameInput = document.getElementById("firstName");
    const lNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const departmentSelect = document.getElementById("department")
    const roleSelect = document.getElementById("role")


    const firstNameValue = fNameInput.value;
    const lNameInputValue = lNameInput.value;
    const emailInputValue = emailInput.value;
    const departmentSelectValue = departmentSelect.value; 
    const roleSelectValue = roleSelect.value;

    if (firstNameValue === "" || lNameInputValue === "" || emailInputValue === "" || departmentSelectValue === "" || roleSelectValue === ""){
        alert("Enter all details");
        return;
    }

    const newEmployee = {
        id: employeCount,
        firstName: firstNameValue,
        lastName:lNameInputValue,
        email: emailInputValue,
        department: departmentSelectValue,
        role:roleSelectValue
    }

    employeeList.push(newEmployee);
    createAndAppendEmployeeListItem(newEmployee)
    formSection.classList.add("d-none")
    dashBoardSection.classList.remove("d-none")
    detailsForm.reset()

}

function createAndAppendEmployeeListItem(eachEmployee) {
    let employeeItem = document.createElement("li");
    let containerElement = document.createElement("div");
    employeeItem.appendChild(containerElement);
    let nameElement = document.createElement("h1");
    nameElement.textContent = eachEmployee.firstName + eachEmployee.lastName;
    containerElement.appendChild(nameElement);
    let emailElement = document.createElement("p");
    emailElement.textContent = eachEmployee.email;
    containerElement.appendChild(emailElement);
    let departmentElement = document.createElement("p");
    departmentElement.textContent = eachEmployee.department;
    containerElement.appendChild(departmentElement);
    let roleElement = document.createElement("p");
    roleElement.textContent = eachEmployee.role;
    containerElement.appendChild(roleElement)
    let buttonContainer = document.createElement("div")
    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit";
    buttonContainer.appendChild(editBtn)
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete";
    buttonContainer.appendChild(deleteBtn)
    listOfEmployees.appendChild(employeeItem)

}

for (let eachEmployee of employeeList){
    createAndAppendEmployeeListItem(eachEmployee)
}