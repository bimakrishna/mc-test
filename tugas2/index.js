const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");


const expenseButton = document.querySelector(".tab1")
const incomeButton = document.querySelector(".tab2")
const allButton = document.querySelector(".tab3")


const addExpense = document.querySelector(".add-expense")
const titleExpense = document.getElementById("expense-title-input")
const amountExpense = document.getElementById("expense-amount-input")

const addIncome = document.querySelector(".add-income")
const titleIncome = document.getElementById("income-title-input")
const amountIncome = document.getElementById("income-amount-input")

let ENTRY_LIST
let balance = 0
let income = 0
let outcome = 0

const DELETE = "delete"

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || []
updateUI()

expenseButton.addEventListener("click", function()  {
    show(expenseEl)
    hide([incomeEl, allEl])
    active( expenseButton )
    inactive( [incomeButton, allButton])
})

incomeButton.addEventListener("click", function() {
    show(incomeEl)
    hide([expenseEl, allEl])
    active(incomeButton)
    inactive([expenseButton, allButton])
})

allButton.addEventListener("click", function() {
    show(allEl)
    hide([incomeEl, expenseEl])
    active(allButton)
    inactive([incomeButton, expenseButton])
})

addExpense.addEventListener("click", function() {
    if(!titleExpense.value || !amountExpense.value) return

    let expense = {
        type: "expense",
        title : titleExpense.value,
        amount : parseInt(amountExpense.value)
    }
    ENTRY_LIST.push(expense)

    updateUI()
    clearInput( [titleExpense, amountExpense])
})

addIncome.addEventListener("click", function(){
    if(!titleIncome.value || !amountIncome.value ) return;

    let income = {
        type : "income",
        title : titleIncome.value,
        amount : parseInt(amountIncome.value)
    }
    ENTRY_LIST.push(income);

    updateUI();
    clearInput( [titleIncome, amountIncome] )
})

incomeList.addEventListener("click", deleteEntry);
expenseList.addEventListener("click", deleteEntry);
allList.addEventListener("click", deleteEntry);

function deleteEntry(entry){
    ENTRY_LIST.splice( entry.id, 1);
    updateUI();
}

function updateUI() {
    income = calculateTotal("income", ENTRY_LIST)
    outcome = calculateTotal("expense", ENTRY_LIST)
    balance = Math.abs(calculateBalance(income, outcome))

    let sign = (income >= outcome) ? "Rp." : "- Rp."

    balanceEl.innerHTML = `<small>${sign}</small>${balance}`
    outcomeTotalEl.innerHTML = `<small>Rp. </small>${outcome}`
    incomeTotalEl.innerHTML = `<small>Rp. </small>${income}`

    clearElement([expenseList, incomeList, allList])

    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "expense") {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        }
        else if( entry.type == "income") {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    })
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST))
}

function showEntry( list, type, title, amount, id) {

    const entry =   `<li id ="${id}" class="${type}"
                        <div class="entry">${title}: Rp. ${amount}</div>
                        <div id="delete"></div>
                    </li>`;
    const position = "afterbegin"

    list.insertAdjacentHTML(position, entry)
}

function clearElement (elements) {
    elements.forEach( element => {
        element.innerHTML = ""
    })
}

function calculateTotal(type, list) {
    let sum = 0

    list.forEach(entry => {
        if (entry.type == type) {
            sum +=entry.amount
        }
    })
    return sum
}

function calculateBalance(income, outcome) {
    return income - outcome
}

function show(element) {
    element.classList.remove("hide")
} 

function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide")
    })
}

function active(element) {
    element.classList.add("active")
}

function inactive(elements) {
    elements.forEach( element => {
        element.classList.remove("active")
    })
}

function clearInput(inputs) {
    inputs.forEach( input => {
        input.value = ""
    })
}