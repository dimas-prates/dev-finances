//Modal buttons, close and open
const Modal = {
    open() {
        //Open modal
        //Add class active to the modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        //Close modal
        //Remove class active to the modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

//random datas for the table
const transactions = [{
    //id: 1,
    description: "Rent",
    amount: -80000,
    //date: "2022-01-05"
    date: "05/01/2022"
},
{
    //id: 2,
    description: "Internet",
    amount: -20000,
    //date: "2022-01-10"
    date: "10/01/2022"
},
{
    //id: 3,
    description: "Web page (job)",
    amount: 500000,
    //date: "2022-01-23"
    date: "23/01/2022"
},
{
    //id: 4,
    description: "Stocks",
    amount: 20000,
    //date: "2022-01-30"
    date: "30/01/2022"
}]

//Working with local storage
const Storage = {
    get() {
        //console.log(localStorage)
        //here it works the opposite, string -> JSON/Array

        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
        //Attention to the way localStorage operates
        //it's all about property/name/key and value
        //to set it needs to be a string, so therefor Array/JSON-> String
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))

    }
}

const Transaction = {
    // all: transactions,
    all: Storage.get(),
    add(transaction) {
        Transaction.all.push(transaction);
        App.reload();
    },
    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },
    incomes() {
        let income = 0;
        //get all transactions
        //for each trasanction
        Transaction.all.forEach(transaction => {
            //if it's greater than zero
            if (transaction.amount > 0) {
                //sum it all up
                income += transaction.amount
            }
        })
        return income;
    },
    outcomes() {
        let outcome = 0;
        //get all transactions
        //for each trasanction
        Transaction.all.forEach(transaction => {
            //if it's less than zero
            if (transaction.amount < 0) {
                //sum it all up    
                outcome += transaction.amount
            }
        })
        return outcome;
    },
    total() {
        return Transaction.incomes() + Transaction.outcomes()
    }
}

//selecting tag table and filling in data
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)

        //Adding index to the data fields
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index) {
        const CCSClasses = transaction.amount < 0 ? "expense" : "income"
        const amount = Utils.formatCurrency(transaction.amount);
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CCSClasses}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Delete transaction">
            </td>
        `
        return html
    },
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.outcomes());
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

//converting numbers to currency BRL
const Utils = {
    formatCurrency(value) {
        const sign = Number(value) < 0 ? "&minus;" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return `${sign}${value}`;
    },
    formatAmount(amount) {
        //amount = Number(amount) * 100
        //amount = Number(amount.replace(/\,\./g, "")) * 100
        //Fixing the thought of it
        //amount = amount.replace(/\,?\.?/g, "") * 100

        //although the correct way is the one below
        //because <input type="number"> already removed the signs
        // value = value * 100
        amount = amount * 100
        return Math.round(amount);
    },
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
};

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    verifyFields() {
        //const description = Form.getValues().description
        const { description, amount, date } = Form.getValues()
        if (description.trim() === "" | amount.trim() === "" | date.trim() === "") {
            throw new Error("Please, fulfill all the fields")
        }
    },
    formatData() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date)

        //return {description:description,amount:amount,date:date}
        return { description, amount, date }
    },
    saveTransaction(transaction) {
        Transaction.add(transaction)
    },
    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    submit(event) {
        //disabling default behavior of the form
        event.preventDefault()

        try {
            //Verifying all information
            Form.verifyFields()
            //Format the data to save it
            const transaction = Form.formatData()
            //Save it
            Form.saveTransaction(transaction)
            //Erase data from the form
            Form.clearFields()
            //close modal window
            Modal.close()
        } catch (error) {
            alert(error.message)
        }

    }
}

const App = {
    init() {
        //autofill data table
        // Transaction.all.forEach(function (transaction,index) {
        //     DOM.addTransaction(transaction,index);
        // });
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance();

        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init();
    },
}

App.init()