const addBtn = document.querySelector('#add-btn');
const inputTitle = document.querySelector('#input-title');
const inputAuthor = document.querySelector('#input-author');
const form = document.querySelector('#form');
const booksContainer = document.getElementById('books-inner-container');
const removeBtn = document.querySelectorAll('.remove-book');

const listContainer = document.getElementById('list-container');
const addContainer = document.getElementById('add-container');
const contactContainer = document.getElementById('contact-container');

class Book {
  constructor(title, author) {
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
          <p>"${book.title}" by</p>
          <p>${book.author}</p>
          <button class="remove-book">Remove</button>
          </div>
          
        `;
        bookElement.innerHTML = bookElMarkup;
        booksContainer.appendChild(bookElement);
      });
    }
  };

  addBook = () => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { title, author } = this;
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
        <p>"${book.title}" by </p>
        <p>${book.author}</p>
        <button class="remove-book">Remove</button>
        </div>
        
      `;
        bookElement.innerHTML = bookElMarkup;
        booksContainer.appendChild(bookElement);
        inputTitle.value = '';
        inputAuthor.value = '';
        listContainer.classList.remove('none');
        addContainer.classList.add('none');
        contactContainer.classList.add('none');
      }
    });
  };

  deleteBook = () => {
    booksContainer.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('remove-book')
        || e.target.parentElement.classList.contains('remove-book')
      ) {
        const bookId = e.target.closest('li').id;
        this.books = this.books.filter((book) => book.id !== parseInt(bookId, 10));
        localStorage.setItem('books', JSON.stringify(this.books));
        document.getElementById(bookId).remove();
      }
    });
  };
}

const newBook = new Book(inputTitle, inputAuthor);
newBook.getBooks();
newBook.addBook();
newBook.deleteBook();

function toListContainer() {
  listContainer.classList.remove('none');
  addContainer.classList.add('none');
  contactContainer.classList.add('none');
}

function toAddContainer() {
  listContainer.classList.add('none');
  addContainer.classList.remove('none');
  contactContainer.classList.add('none');
}

function toContactContainer() {
  listContainer.classList.add('none');
  addContainer.classList.add('none');
  contactContainer.classList.remove('none');
}

const goToListContainer = document.getElementById('list');
const goToAddContainer = document.getElementById('add');
const goToContactContainer = document.getElementById('contact');
const date = document.getElementById('date');

goToListContainer.addEventListener('click', toListContainer);
goToAddContainer.addEventListener('click', toAddContainer);
goToContactContainer.addEventListener('click', toContactContainer);

function displayDate() {
  const date = new Date();
  return date;
}

date.innerHTML = displayDate();
