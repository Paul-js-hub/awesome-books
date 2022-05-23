let booksArray = JSON.parse(localStorage.getItem("booksArray")) || [];

let books = document.getElementById("books-inner-container");
let addBtn = document.querySelector("#add-btn");
let inputTitle = document.querySelector("#input-title");
let inputAuthor = document.querySelector("#input-author");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  booksArray.title = inputTitle.value;
  booksArray.author = inputAuthor.value;
  if (inputTitle.value != "" && inputAuthor.value != "") {
    const book = {
      id: new Date().getTime(),
      title: inputTitle.value,
      author: inputAuthor.value,
    };
    booksArray.push(book);
    localStorage.setItem("booksArray", JSON.stringify(booksArray))
    addBook(book);
    inputTitle.value = "";
    inputAuthor.value = "";
  }
});

let addBook = (book) => {
  const bookElement = document.createElement("li");
  bookElement.setAttribute("id", book.id);
  const taskElMarkup = `
    <div class="content-container">
    <p>${book.title}</p>
    <p>${book.author}</p>
    </div>
    <button class="remove-book">Remove</button>
  `;
  bookElement.innerHTML = taskElMarkup;
  books.appendChild(bookElement);
};


books.addEventListener('click', (e) =>{
    if(e.target.classList.contains("remove-book") || e.target.parentElement.classList.contains("remove-book")){
        let bookId = e.target.closest("li").id
        removeBook(bookId);
    }
})

let removeBook = (id) =>{
    booksArray = booksArray.filter(book => book.id !== parseInt(id));
    localStorage.setItem("booksArray", JSON.stringify(booksArray));
    document.getElementById(id).remove();
}
 
if (localStorage.getItem("booksArray")) {
  booksArray.map((book) => {
    addBook(book);
  });
}
