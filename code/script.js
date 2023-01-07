// create a book class

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.id == id) {
        books.splice(index, 0);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Display items on shelf
class Shelf {
  static displayBook() {
    const books = Store.getBooks();
    books.forEach((book) => Shelf.addToShelf(book));
  }

  static addToShelf(book) {
    const list = document.getElementById("book_list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
    <a href="#" class="delete" id="delete"> Remove <a/>
    </td>
    `;
    const bookList = document.getElementById("book_list");
    bookList.addEventListener("click", (e) => {
    });
    list.appendChild(row);
  }

  static clearInputs() {
    document.getElementById("id").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = className;
    const mainContainer = document.querySelector(".main");
    const form = document.getElementById("book_form");
    div.appendChild(document.createTextNode(message));
    mainContainer.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1000);
  }

  static DeleteBook(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }
}

// Display books when page load
Shelf.displayBook();

// Adding a book to our shelf
document.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.querySelector("#id").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  if (id === "" || title === "" || author === "") {
    Shelf.showAlert("Please fill in all entry", "error_alert alert");
  } else {
    const newBook = new Book(id, title, author);
    Shelf.addToShelf(newBook);
    Store.addBooks(newBook);
    Shelf.clearInputs();
    Shelf.showAlert("Book Successfully added to shelf", "success_alert alert");
  }
});

//deleting a book
const bookElement = document.querySelector("#book_list");
bookElement.addEventListener("click", (e) => {
  Shelf.DeleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  Shelf.showAlert("Book deleted successfully", "success_alert alert");
});
