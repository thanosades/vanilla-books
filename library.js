class Book {

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadState() {
    this.read = !this.read;
  }

}

let myLibrary = [];
let timeoutRef;

function addBookToLibrary(e) {
  e.preventDefault();
  if (timeoutRef) clearTimeout(timeoutRef);
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  const bookPages = document.querySelector('#pages').value;
  const bookRead = document.querySelector('#read').checked;
  const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  myLibrary.push(book);

  const addNotify = document.querySelector('.notifications');
  addNotify.classList.add('confirm-add');
  timeoutRef = setTimeout(() => addNotify.classList.remove('confirm-add'),
   1000);
  render();
}

function bookButtonClicked(e) {
  if (e.target.tagName !== 'BUTTON') return;
  const parent = e.target.parentElement;
  // identifying the button that was clicked by its class
  if (e.target.classList.contains('book-del')) {
    myLibrary.splice(parent.getAttribute('data-index'), 1);
  } else if (e.target.classList.contains('book-read')) {    
    myLibrary[parent.getAttribute('data-index')].toggleReadState();    
  }
  render();
}

function bookElement(tag, cssClass, bookInfo) {
  const currentElement = document.createElement(tag);
  currentElement.classList.add(cssClass);
  currentElement.textContent = bookInfo;
  return currentElement;
}

function render() {
  const libraryContainer = document.querySelector('.container-library');  
  libraryContainer.textContent = ''; // empty everything before rendering
    
  for (let i = 0; i < myLibrary.length; i += 1) {
    const book = myLibrary[i]; // for readability
    const bookEntry = document.createElement('div');
    /* adding custom attribute that matches the index of myLibrary
     * for accessing book objects faster */
    bookEntry.setAttribute('data-index', i);
    bookEntry.classList.add('book');
    bookEntry.appendChild(bookElement('h2', 'book-title', book.title));
    bookEntry.appendChild(bookElement('p', 'book-author', book.author));
    bookEntry.appendChild(bookElement('p', 'book-page', book.pages));
    const bookReadBtn = bookElement('button', 'book-read',
      book.read ? 'read' : 'not read');
    if (book.read) {
      bookReadBtn.style.backgroundColor = '#1fd882bd';
    } else {
      bookReadBtn.style.backgroundColor = 'crimson';
    }
    bookEntry.appendChild(bookReadBtn);
    bookEntry.appendChild(bookElement('button', 'book-del', 'Delete'));
    libraryContainer.appendChild(bookEntry);    
  }
}

function displayForm(e) {
  e.preventDefault();
  const form = document.querySelector('.new-book-form');
  const overlay = document.getElementById('overlay');
  overlay.classList.toggle('dark-overlay');
  form.classList.toggle('visible-form');
}

// event listeners
(function addListeners() {
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.addEventListener('click', addBookToLibrary);

  const newBookBtn = document.querySelector('.add-new-book');
  newBookBtn.addEventListener('click', displayForm);

  const cancelBtn = document.querySelector('.cancel-btn');
  cancelBtn.addEventListener('click', displayForm);

  const libraryContainer = document.querySelector('.container-library');
  libraryContainer.addEventListener('click', bookButtonClicked);
}());

