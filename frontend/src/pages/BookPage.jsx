import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/books/${id}`)
      .then(res => {
        if (res.data.success) {
          setBook(res.data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching book details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (!book) {
    return <div className="text-center mt-10 text-red-500">Book not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={book.coverImageUrl}
          alt={book.title}
          className="w-64 h-96 object-cover rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-1">by {book.author}</p>
          <p className="text-sm text-blue-500 mb-2">{book.genre}</p>
          <p className="text-gray-700 mb-4">{book.description}</p>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Average Rating:</span>
            <span>{book.averageRating} ({book.ratingsCount} ratings)</span>
          </div>
          <div className="text-xs text-gray-400 mt-4">
            Added on: {new Date(book.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
