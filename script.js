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
    income(){

    },
    outcome(){

    }
}

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
    }
}

const Utils = {
    formatCurrency(value){
        const sign = Number(value) < 0 ? "&minus;" : ""
        value = String(value).replace(/\D/g, "")
        value = (Number(value)/100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return `${sign}${value}`;
    }
};

transactions.forEach( function(transaction) {
    DOM.addTransaction(transaction);
});