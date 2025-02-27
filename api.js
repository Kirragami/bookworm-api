const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mock data
const users = [
    {
      "email": "kirra@mail.com",
      "password": "$2a$10$LqHNYlecfhYvMNDKqjli4.U17XbxUP04wDveqzq3NwEZ2qUmoDi8a",
      "username": "kirragami",
      "confirmPassword": "asdfgh",
      "userType": "admin",
      "id": 1
    },
    {
      "email": "abhi@mail.com",
      "password": "$2a$10$LqHNYlecfhYvMNDKqjli4.U17XbxUP04wDveqzq3NwEZ2qUmoDi8a",
      "username": "kirragami",
      "confirmPassword": "asdfgh",
      "userType": "user",
      "id": 2
    },
    {
      "email": "ap@heaven.com",
      "password": "$2a$10$S5TSZQDCjO8UkLM5F4GXwu4xWXOEx7HU6hclE.3v80LlSE5oiG85G",
      "username": "ap",
      "confirmPassword": "asdfgh",
      "userType": "user",
      "id": 3
    },
    {
      "email": "aungko@gmail.com",
      "password": "$2a$10$Auk1uNrQR8I4Mk80dKtDseW.Cr4F70SCv71/tV0oPJoxbTHu3ux.W",
      "username": "aungo",
      "userType": "user",
      "id": 4
    },
    {
      "email": "test@tester.com",
      "password": "$2a$10$Q7i/qNg22JMsUkn/lKWqqOygWpQrp.czasg2yIs0GNvuw77JM5Ar2",
      "username": "123",
      "userType": "user",
      "id": 5
    },
    {
      "email": "asdasd@gmail.com",
      "password": "$2a$10$LUMeTPpBvniKpqhrZEEZOeJayy8ZW72yvNhHySHDkv6VJ.Nuthg4e",
      "username": "rgsd",
      "userType": "user",
      "id": 6
    }
  ]

const books = [
    {
      "id": 1,
      "title": "The Grand Design",
      "author": "Stephen Hawking",
      "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-nJ65Glc9kjku7vwaWcEojCZP2p3u3zXFg&s"
    },
    {
      "id": 2,
      "title": "Think Again",
      "author": "Adam Grant",
      "coverImage": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602574232l/55539565.jpg"
    },
    {
      "id": 3,
      "title": "A Brief History Of Time",
      "author": "Stephen Hawking",
      "coverImage": "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "id": 4,
      "title": "A Brief History Of Time",
      "author": "Stephen Hawking",
      "coverImage": "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "id": 5,
      "title": "A Brief History Of Time",
      "author": "Stephen Hawking",
      "coverImage": "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "id": 6,
      "title": "A Brief History Of Time",
      "author": "Stephen Hawking",
      "coverImage": "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "id": 7,
      "title": "A Brief History Of Time",
      "author": "Stephen Hawking",
      "coverImage": "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "title": "Being and Time",
      "author": "Martin Heidegger",
      "description": "test desc",
      "coverImage": "https://m.media-amazon.com/images/I/61dWoaAK2jL._AC_UF1000,1000_QL80_.jpg",
      "id": 8
    }
  ]

const userdata = [
    {
      "id": 3,
      "plantoread": [
        {
          "id": 2,
          "title": "Think Again",
          "author": "Adam Grant",
          "coverImage": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602574232l/55539565.jpg"
        },
        {
          "id": 3,
          "title": "A Brief History Of Time",
          "author": "Stephen Hawking",
          "coverImage": "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg"
        },
        {
          "id": 1,
          "title": "The Grand Design",
          "author": "Stephen Hawking",
          "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-nJ65Glc9kjku7vwaWcEojCZP2p3u3zXFg&s"
        }
      ]
    },
    {
      "id": 6,
      "plantoread": []
    }
  ]

// Get all users (Admin only)
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a specific user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a specific book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

// Get a user's "plan to read" list
app.get('/users/:id/plantoread', (req, res) => {
  const userPlan = userdata.find(u => u.id === parseInt(req.params.id));
  if (!userPlan) return res.status(404).send('User not found');
  res.json(userPlan.plantoread);
});

// Add a book to a user's "plan to read"
app.post('/users/:id/plantoread', (req, res) => {
  const user = userdata.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  
  const { bookId } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).send('Book not found');
  
  user.plantoread.push(book);
  res.status(201).json(user.plantoread);
});

app.patch('/userdata/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedData = req.body; // Updated userdata object
    
    // Find the existing userdata by user ID
    const user = userdata.find(u => u.id === userId);
    if (!user) return res.status(404).send('User not found');
    
    // Update user data
    user.plantoread = updatedData.plantoread;  // Only update the plantoread array
  
    // Optionally, you could also allow updating other fields (like email, username) if needed
    if (updatedData.email) user.email = updatedData.email;
    if (updatedData.username) user.username = updatedData.username;
    
    res.status(200).json(user);  // Return updated userdata
  });

// Remove a book from the "plan to read" list
app.delete('/users/:id/plantoread/:bookId', (req, res) => {
  const user = userdata.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  
  const bookIndex = user.plantoread.findIndex(b => b.id === parseInt(req.params.bookId));
  if (bookIndex === -1) return res.status(404).send('Book not found in plan');
  
  user.plantoread.splice(bookIndex, 1);
  res.status(200).json(user.plantoread);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
