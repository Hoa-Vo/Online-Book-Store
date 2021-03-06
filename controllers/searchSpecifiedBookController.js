const booksListModel = require("../models/booksModel");

exports.get = async (req, res, next) => {
  console.log("search bookslist day");
  const totalBooks = await booksListModel.getTotalBooksInDB();
  const bookName = req.query.bookName;
  const booksToShow = await booksListModel.searchBook(bookName);

  const categoriesListToShowInMenu = await booksListModel.getAllCategory();
  const currentCategory = "Tất cả";
  const receivedCategoryID = req.query.categoryID;

  res.render("booksPage/bookslist", {
    bookName,
    totalBooks: totalBooks,
    currentCategoryId: receivedCategoryID,
    books: booksToShow,
    categories: categoriesListToShowInMenu,
    currentCategory: currentCategory,
  });
};
