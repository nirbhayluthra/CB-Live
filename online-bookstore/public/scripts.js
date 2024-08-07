document.addEventListener("DOMContentLoaded", () => {
  checkLogin();

  fetch("/api/books")
    .then((response) => response.json())
    .then((books) => {
      const booksDiv = document.getElementById("books");
      booksDiv.innerHTML = "";
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.innerHTML = `
            <img src="${book.imageUrl}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>$${book.price}</p>
            <button onclick="orderBook('${book._id}', ${book.price})">Order</button>
          `;
        booksDiv.appendChild(bookDiv);
      });
    });
});

function checkLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";
  } else {
    document.getElementById("login-btn").style.display = "inline-block";
    document.getElementById("signup-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "none";
  }
}

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  checkLogin();
  alert("Logged out successfully");
  window.location.href = "/";
});
function orderBook(bookId, price) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to order.");
    return;
  }

  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      books: [{ book: bookId, quantity: 1 }],
      total: price,
    }),
  })
    .then((response) => response.json())
    .then((order) => {
      if (order.error) {
        alert(`Error: ${order.error}`);
      } else {
        alert("Book ORDERED!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
