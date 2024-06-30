import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import BookDetail from './components/BookDetails';
import AddReview from './components/AddReview';
import Login from './components/Login';
import Register from './components/Register';
import { isAuthenticated } from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/:id"
          element={isAuthenticated() ? <BookDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-review/:bookId"
          element={isAuthenticated() ? <AddReview /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
