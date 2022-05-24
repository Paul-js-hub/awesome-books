const addBtn = document.querySelector('#add-btn');
const inputTitle = document.querySelector('#input-title');
const inputAuthor = document.querySelector('#input-author');
const form = document.querySelector('#form');
const booksContainer = document.getElementById('books-inner-container');
const removeBtn = document.querySelector('.remove-book');
//let books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author, books) {
    this.title = title;
    this.author = author;
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  getBooks = () => {
    if (localStorage.getItem('books')) {
      this.books.map((book) => {
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

  addBook = () => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { title, author } = this
      if (title.value !== '' && author.value !== '') {
        const book = {
          id: new Date().getTime(),
          title: title.value,
          author: author.value,
        };
        this.books.push(book);
        localStorage.setItem('books', JSON.stringify(this.books));
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
        inputTitle.value = '';
        inputAuthor.value = '';
      } 
    });
  }

  deleteBook = (id) => {
    let books =  this.books.filter((book) => book.id !== parseInt(id));
    let data = JSON.stringify(books)
    localStorage.setItem('books', data);
    document.getElementById(id).remove();
  }

  removeBook() {
    booksContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-book') || e.target.parentElement.classList.contains('remove-book')) {
        const bookId = e.target.closest('li').id;
        console.log("BOOKID", bookId)
        this.deleteBook(bookId);
      }
    });
  }

}



const newBook = new Book(inputTitle, inputAuthor);

newBook.getBooks();
newBook.addBook();
newBook.removeBook();

