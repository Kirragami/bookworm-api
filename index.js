const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample data
const data = {
  users: [
    { email: "kirra@mail.com", password: "$2a$10$LqHNYlecfhYvMNDKqjli4.U17XbxUP04wDveqzq3NwEZ2qUmoDi8a", username: "kirragami", confirmPassword: "asdfgh", userType: "admin", id: 1 },
    { email: "abhi@mail.com", password: "$2a$10$LqHNYlecfhYvMNDKqjli4.U17XbxUP04wDveqzq3NwEZ2qUmoDi8a", username: "kirragami", confirmPassword: "asdfgh", userType: "user", id: 2 },
    { email: "ap@heaven.com", password: "$2a$10$S5TSZQDCjO8UkLM5F4GXwu4xWXOEx7HU6hclE.3v80LlSE5oiG85G", username: "ap", confirmPassword: "asdfgh", userType: "user", id: 3 },
    { email: "aungko@gmail.com", password: "$2a$10$Auk1uNrQR8I4Mk80dKtDseW.Cr4F70SCv71/tV0oPJoxbTHu3ux.W", username: "aungo", userType: "user", id: 4 },
    { email: "test@tester.com", password: "$2a$10$Q7i/qNg22JMsUkn/lKWqqOygWpQrp.czasg2yIs0GNvuw77JM5Ar2", username: "123", userType: "user", id: 5 },
    { email: "asdasd@gmail.com", password: "$2a$10$LUMeTPpBvniKpqhrZEEZOeJayy8ZW72yvNhHySHDkv6VJ.Nuthg4e", username: "rgsd", userType: "user", id: 6 }
  ],
  books: [
    { id: 1, title: "The Grand Design", author: "Stephen Hawking", coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-nJ65Glc9kjku7vwaWcEojCZP2p3u3zXFg&s" },
    { id: 2, title: "Think Again", author: "Adam Grant", coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602574232l/55539565.jpg" },
    { id: 3, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" },
    { id: 4, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" },
    { id: 5, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" },
    { id: 6, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" },
    { id: 7, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" },
    { id: 8, title: "Being and Time", author: "Martin Heidegger", description: "test desc", coverImage: "https://m.media-amazon.com/images/I/61dWoaAK2jL._AC_UF1000,1000_QL80_.jpg" }
  ],
  userdata: [
    { id: 3, plantoread: [{ id: 2, title: "Think Again", author: "Adam Grant", coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602574232l/55539565.jpg" }, { id: 3, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" }, { id: 1, title: "The Grand Design", author: "Stephen Hawking", coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-nJ65Glc9kjku7vwaWcEojCZP2p3u3zXFg&s" }] },
    { id: 6, plantoread: [] }
  ]
};

// Endpoints
app.get('/api/users', (req, res) => {
  res.json(data.users);
});

app.get('/api/books', (req, res) => {
  res.json(data.books);
});

app.get('/api/userdata', (req, res) => {
  res.json(data.userdata);
});

app.get('/api/user/:id/plantoread', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = data.userdata.find(u => u.id === userId);
  if (user) {
    res.json(user.plantoread);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
