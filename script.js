//Modal buttons, close and open
const Modal = {
    open (){
        //Open modal
        //Add class active to the modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close () {
        //Close modal
        //Remove class active to the modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

//random data to the table
const transactions = [{
    id: 1,
    description: "Rent",
    amount: -80000,
    date: "2022-01-05"
},
{
    id: 2,
    description: "Internet",
    amount: -20000,
    date: "2022-01-10"
},
{
    id: 3,
    description: "Web page (job)",
    amount: 500000,
    date: "2022-01-23"
},
{
    id: 4,
    description: "Stocks",
    amount: 20000,
    date: "2022-01-30"
}]

const Transaction = {
    incomes(){
        let income =0 ;
        //get all transactions
        //for each trasanction
        transactions.forEach( transaction => {
            //if it's greater than zero
            if (transaction.amount > 0){
                //sum it all up
                income += transaction.amount
            }
        })
        return income;
    },
    outcomes(){
        let outcome = 0;
        //get all transactions
        //for each trasanction
        transactions.forEach( transaction => {
            //if it's less than zero
            if (transaction.amount < 0){
                //sum it all up    
                outcome += transaction.amount
            }
        })
        return outcome;
    },
    total(){
        return Transaction.incomes() + Transaction.outcomes()
    }

}


//selecting tag table and filling in data
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction) {
        const CCSClasses = transaction.amount < 0 ? "expense" : "income"
        const amount = Utils.formatCurrency(transaction.amount);
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CCSClasses}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Delete transaction">
            </td>
        `
        return html
    },
    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.outcomes());
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

//converting numbers to currency BRL
const Utils = {
    formatCurrency(value){
        const sign = Number(value) < 0 ? "&minus;" : ""
        value = String(value).replace(/\D/g, "")
        value = (Number(value)/100)
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return `${sign}${value}`;
    }
};

//autofill data table
transactions.forEach( function(transaction) {
    DOM.addTransaction(transaction);
});

DOM.updateBalance();