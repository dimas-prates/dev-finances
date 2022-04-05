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