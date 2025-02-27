const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password verification
const app = express();
const port = process.env.PORT || 3000;

// Sample data (same as before)
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
    { title: "Being and Time", author: "Martin Heidegger", description: "test desc", coverImage: "https://m.media-amazon.com/images/I/61dWoaAK2jL._AC_UF1000,1000_QL80_.jpg", id: 8 }
  ],
  userdata: [
    { id: 3, plantoread: [ { id: 2, title: "Think Again", author: "Adam Grant", coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602574232l/55539565.jpg" }, { id: 3, title: "A Brief History Of Time", author: "Stephen Hawking", coverImage: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF894,1000_QL80_.jpg" }, { id: 1, title: "The Grand Design", author: "Stephen Hawking", coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-nJ65Glc9kjku7vwaWcEojCZP2p3u3zXFg&s" }] },
    { id: 6, plantoread: [] }
  ]
};

// Middleware to parse JSON bodies
app.use(express.json());

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.headers;

  // Find user by email
  const user = data.users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Compare the password hash with the provided password
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (isMatch) {
      // Password matched
      return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          userType: user.userType
        }
      });
    } else {
      // Password did not match
      return res.status(400).json({ message: "Invalid password" });
    }
  });
});

// POST /api/books to add a new book
app.post('/api/books', (req, res) => {
  const { title, author, coverImage } = req.body;

  if (!title || !author || !coverImage) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Generate a new ID for the book
  const newBook = {
    id: data.books.length + 1, // Generate an ID based on the current length
    title,
    author,
    coverImage
  };

  data.books.push(newBook); // Add the new book to the books array

  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// PATCH /api/userdata/:id to update a user's "Plan to Read"
app.patch('/api/userdata/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { plantoread } = req.body;

  // Validate that the plantoread field is an array
  if (!Array.isArray(plantoread)) {
    return res.status(400).json({ message: "plantoread must be an array" });
  }

  // Find the user data
  const user = data.userdata.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's "Plan to Read" list
  user.plantoread = plantoread;

  res.json({ message: 'User data updated successfully', userdata: user });
});

// Sample endpoints
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

// PATCH /api/userdata/:id to update user data partially
app.patch('/api/userdata/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedData = req.body;

  // Find the user data
  const userIndex = data.userdata.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Apply the patch by merging the existing user data with the updated data
  data.userdata[userIndex] = { ...data.userdata[userIndex], ...updatedData };

  res.json({ message: 'User data updated successfully', userdata: data.userdata[userIndex] });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
