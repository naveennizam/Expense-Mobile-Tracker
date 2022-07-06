const balance  = document.querySelector("#balance");
const money_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");

const localStorageTransactions = JSON.parse(localStorage.getItem("transaction"));
let transactions = localStorage.getItem("transaction") !== null ? localStorageTransactions:[];

//Add Transacttion
function addTransaction(e) {
    e.preventDefault();
    if (
        text.value.trim()=== "" || amount.value.trim() === ""
    ) {
        alert("Please Enter Text & Value")
    } else {
        const transaction = {
            id : generateID(),
            text:text.value,
            amount: +amount.value,
        }

        transactions.push(transaction)
        addtransDOM(transaction)
        LocalStorage();
        updateValues();
        text.value = "";
        amount.value = ""
    }
}


//Generate id 
function generateID(){
    return Math.floor(Math.random()*10000000)
}

function addtransDOM(transaction) {
    const sign  = transaction.amount < 0 ? "-" : "+";
    const item =document.createElement("li");

    item.classList.add(
    transaction.amount < 0 ? 'minus' : 'plus'
    )

    item.innerHTML = ` ${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)} 
    </span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})"> x </button> `;

    list.appendChild(item)

}

//Remove Transaction
function removeTransaction(id) {
    transactions = transactions.filter((transaction)=> transaction.id !== id);
    LocalStorage();
    init();
}
//update updateValues
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item =>item > 0 ).reduce((acc,item) => (acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0 ).reduce((acc,item) => (acc +=item),0) * -1
    ).toFixed(2);

    balance.innerText = `Rs  ${total}`;
    money_plus.innerText = ` Rs +${income}`;
    money_minus.innerText = `Rs -${expense}`;
}
// Update localStorage
function LocalStorage(){
    localStorage.setItem("transaction",JSON.stringify(transactions));
}


//init app
function init() {
    list.innerHTML = "";
    transactions.forEach(addtransDOM);
    updateValues();
}

init();

form.addEventListener("submit",addTransaction);
