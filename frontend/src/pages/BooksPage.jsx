import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const BooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "");


  useEffect(() => {
    setLoading(true); 
    fetch(`http://localhost:3001/books?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBooks(data.data);
          setTotalPages(data.totalPages);
          setTotalBooks(data.totalBooks);
        }
        setLoading(false); 
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false); 
      });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    !userId && navigate('/');
  }, [userId]);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Browse Books</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[20vh]">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {books.map(book => (
              <Link to={`/books/${book.id}`} key={book.id}>
                <div key={book.id} className="border rounded-lg p-5 hover:shadow-md transition">
                  <img 
                    src={book.coverImageUrl} 
                    alt={book.title}
                    className="w-full h-60 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-700">{book.title}</h2>
                  <p className="text-sm text-gray-500 mb-1">by {book.author}</p>
                  <p className="text-xs text-blue-500 mb-2">{book.genre}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BooksPage;

// Add this CSS for the loader (in your main CSS file or a <style> tag)
/*
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/
