 const addBtn = document.querySelector('#add-btn');
  const inputTitle = document.querySelector('#input-title');
  const inputAuthor = document.querySelector('#input-author');
  const form = document.querySelector('#form');

class Book {
  constructor(title, author){
     this.title = title;
     this.author = author;
  }
  
  addBook(book){
   const books = document.getElementById('books-inner-container');

  const bookElement = document.createElement('li');
  bookElement.setAttribute('id', book.title);
  const bookElMarkup = `
    <div class="content-container">
    <p>${book.title}</p>
    <p>${book.author}</p>
    </div>
    <button class="remove-book">Remove</button>
  `;
  bookElement.innerHTML = bookElMarkup;
  books.appendChild(bookElement);
  }

  removeBook(){
    delete this.book;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let books = [];
  const title = inputTitle.value;
  const author = inputAuthor.value;
  if (inputTitle.value !== '' && inputAuthor.value !== '') {
     const book = new Book(title, author);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    book.addBook(book);
    inputTitle.value = '';
    inputAuthor.value = '';
  }
});