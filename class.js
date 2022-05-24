const addBtn = document.querySelector("#add-btn");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const form = document.querySelector("#form");
const booksContainer = document.getElementById("books-inner-container");
const removeBtn = document.querySelector(".remove-book")
let books = [];

class Book {
  constructor(title, author, books) {
    this.title = title;
    this.author = author;
    this.books = books;
  }

  removeBook() {
    booksContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-book') || e.target.parentElement.classList.contains('remove-book')) {
        const bookId = e.target.closest('li').id;
        this.deleteBook(bookId);
      }
    });
  }

  deleteBook (id){
    console.log("ID", id)
    books = books.filter((book) => book.id !== parseInt(id));
    localStorage.setItem('books', JSON.stringify(books));
    document.getElementById(id).remove();
  }

  getBooks(){
    let data = JSON.parse(localStorage.getItem('books')) 
    if (data) {
      data.map((book) => {
        const bookElement = document.createElement('li');
        bookElement.setAttribute('id', book.id);
        const bookElMarkup = `
          <div class="content-container">
          <p>${book.title}</p>
          <p>${book.author}</p>
          </div>
          <button class="remove-book">Remove</button>
        `;
        bookElement.innerHTML = bookElMarkup;
        booksContainer.appendChild(bookElement);
      });
    }
  }

  addBook() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      books.title = inputTitle.value;
      books.author = inputAuthor.value;
      if (inputTitle.value === '' || inputAuthor.value === '') {
        alert("Input Fields Should not be empty")
      } else {
        const book = {
          id: new Date().getTime(),
          title: inputTitle.value,
          author: inputAuthor.value,
        };
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        const bookElement = document.createElement("li");
        bookElement.setAttribute("id", book.id);
        const bookElMarkup = `
        <div class="content-container">
        <p>${book.title}</p>
        <p>${book.author}</p>
        </div>
        <button class="remove-book">Remove</button>
      `;
        bookElement.innerHTML = bookElMarkup;
        booksContainer.appendChild(bookElement);
        inputTitle.value = '';
        inputAuthor.value = '';
      }
    });
  }

}
let newBook = new Book(inputTitle, inputAuthor, books);
console.log(newBook)
newBook.addBook();
newBook.getBooks();
newBook.removeBook();



