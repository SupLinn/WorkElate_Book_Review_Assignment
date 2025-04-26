const { db } = require('../utils/db');
// import { eq } from 'drizzle-orm'; 
const { eq } = require('drizzle-orm')
const { books, users } = require('../utils/schema');

const getAllBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10; // books per page
    const offset = (page - 1) * limit;

    // Fetch paginated books
    const bookList = await db
      .select()
      .from(books)
      .limit(limit)
      .offset(offset);

    // Fetch total count using Drizzle ORM's `count()` function
    const totalBooksResult = await db
      .select()
      .from(books);

    const totalBooks = totalBooksResult.length;  // Get total number of rows

    // Calculate total pages
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({
      success: true,
      data: bookList,
      totalPages,
      currentPage: page,
      totalBooks: totalBooks, // Total count of books
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// const getAllBooks = async (req, res) => {
//     try {
//       const page = Number(req.query.page) || 1;
//       const limit = 10; // books per page
//       const offset = (page - 1) * limit;
  
//       const bookList = await db.select().from(books).limit(limit).offset(offset);
//       res.json({ success: true, data: bookList });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };
  

const getBookById = async (req, res) => {
  try {
    // Extract the id from request parameters
    const { id } = req.params;
    console.log(id, " This is whats coming")
    // Query the books table using Drizzle ORM
    const book = await db
      .select()
      .from(books)  // Reference the schema defined in the schema.js file
      .where(eq(books.id, Number(id))); // Use eq() for equality check

    // Check if the book exists
    if (book.length === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Return the first book object (since it's a single book)
    res.json({ success: true, data: book[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, coverImageUrl, createdBy } = req.body;
    const newBook = await db.insert(books).values({
      title,
      author,
      description,
      genre,
      coverImageUrl,
      createdBy,
    }).returning();

    res.status(201).json({ success: true, data: newBook[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllBooks, getBookById, addBook };
