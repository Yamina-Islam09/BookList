//GET UI ELEment
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');



//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    constructor() {

    }
    addToBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }
    clearFields() {
        document.querySelector('#title').value = '',
            document.querySelector('#author').value = '',
            document.querySelector('#isbn').value = '';
    }
    showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000)
    }
    deleteFromBook(target) {

        if (target.hasAttribute('href')) {
            if (confirm("Are you sure?")) {
                target.parentElement.parentElement.remove();
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                let ui = new UI();
                ui.showAlert('Book Deleted successfully!', 'success');
            }
        }
    }
}

class Store {
    static getbooks() {
        let books;
        if (localStorage.getItem('books')===null) {
books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books=Store.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static displayBooks(){
        let books=Store.getbooks();
        books.forEach(book => {
            let ui=new UI();
            ui.addToBookList(book);
        });
    }
    static removeBook(isbn){
        let books=Store.getbooks();
        books.forEach((book,index) => {
           if(book.isbn===isbn){
               books.splice(index,1);
           }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}




//add event listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());






//define functions
//add book
function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);
    let ui = new UI();
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('please fill all the fields', 'error');
    } else {
        ui.addToBookList(book);
        ui.clearFields();
        ui.showAlert('Book Added successfully!', 'success');
        Store.addBook(book);
    }

    e.preventDefault();
}



//remove books
function removeBook(e) {
    let ui = new UI();
    ui.deleteFromBook(e.target);

}