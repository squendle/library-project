// books array with some default books
const myLibrary = [
  
  new Book("Crime & Punishment", "Fyodor Dostoevsky", 527, "read"),
  new Book("Moby-Dick", "Herman Melville", 378, "read"),
  new Book("Gravity's Rainbow", "Thomas Pynchon", 776, "not yet read"),
  new Book("100 Years of Solitude", "Gabriel Garcia-Marquez", 417, "read")

];

// have default books displayed on pageload
updateLibraryDisplay();

// Book Object Constructor
function Book(title, author, pages, read) {
  
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// form input collection, bypass default submit action on form and collect info for the addBook function
document.getElementById('newBook').addEventListener('submit', function(event){
  event.preventDefault();
  addBookToLibrary();
});

// add new books from form input to array and update display
function addBookToLibrary() {

  let title = document.getElementById("form-title").value;
  let author = document.getElementById("form-author").value;
  let pages = parseInt(document.getElementById("form-pages").value, 10);
  let read = document.getElementById("form-read").checked ? "read" : "not yet read";
  
  //push new book to array using the data collected above
  myLibrary.push(new Book(title, author, pages, read));

  // clear the form after collecting inputs
  document.getElementById("form-title").value = '';
  document.getElementById("form-author").value = '';
  document.getElementById("form-pages").value = '';

  updateLibraryDisplay();
}


// create card for display of book data
function createBookCard(book, index) {
  
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute('data-index', index);

  let cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  let cardAuthor = document.createElement("h3");
  cardAuthor.classList.add("card-author");
  let cardPages = document.createElement("p");
  cardPages.classList.add("card-pages");
  
  let readContainer = document.createElement("div");
  readContainer.classList.add("read-container");
  let readStatus = document.createElement("h3");
  readStatus.classList.add("read-status");
  let changeReadStatus = document.createElement("button");
  changeReadStatus.classList.add("change-read-status");
  changeReadStatus.addEventListener("click", function() {
    book.toggleReadStatus();

    if (book.read === "read") {
      readStatus.textContent = "Read";
      readStatus.style.color = "#47b545";
      changeReadStatus.textContent = "Unread?";
      changeReadStatus.style.backgroundColor = "#cf4040";
    } else {
      readStatus.textContent = "Not Yet Read";
      readStatus.style.color = "#cf4040";
      changeReadStatus.textContent = "Read?";
      changeReadStatus.style.backgroundColor = "#47b545";
    }

  });

  let deleteBook = document.createElement("p");
  deleteBook.classList.add("delete-book");
  deleteBook.addEventListener("click", function(){
    deleteBookFromLibrary(index);
  });

  newCard.appendChild(cardTitle);
  newCard.appendChild(cardAuthor);
  newCard.appendChild(cardPages);
  newCard.appendChild(readContainer);
  readContainer.appendChild(readStatus);
  readContainer.appendChild(changeReadStatus);
  newCard.appendChild(deleteBook);

  return newCard;
}

// display new books on individual cards
function updateLibraryDisplay() {
  document.querySelector(".library").innerHTML = '';
  for (let [index, book] of myLibrary.entries()) {
    let newCard = createBookCard(book, index);
    newCard.querySelector(".card-title").textContent = book.title;
    newCard.querySelector(".card-author").textContent = book.author;
    newCard.querySelector(".card-pages").textContent = book.pages + " Pages";
    if (book.read === "read") {
      newCard.querySelector(".read-status").textContent = "Read";
      newCard.querySelector(".read-status").style.color = "#47b545";
      newCard.querySelector(".change-read-status").textContent = "Unread?";
      newCard.querySelector(".change-read-status").style.backgroundColor = "#cf4040";
      newCard.querySelector(".change-read-status").style.color = "#ffffff"
    } else if (book.read === "not yet read") {
      newCard.querySelector(".read-status").textContent = "Not Yet Read";
      newCard.querySelector(".read-status").style.color = "#cf4040";
      newCard.querySelector(".change-read-status").textContent = "Read?";
      newCard.querySelector(".change-read-status").style.backgroundColor = "#47b545";
      newCard.querySelector(".change-read-status").style.color = "#ffffff"
    }
    newCard.querySelector(".delete-book").textContent = "Delete"
    document.querySelector(".library").appendChild(newCard);
  }
};

Book.prototype.toggleReadStatus = function() {
  if (this.read === "read") {
    this.read = "not yet read";
  } else {
    this.read = "read";
  }
}

function deleteBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  updateLibraryDisplay();
}