const booksListModel = require("../models/booksModel");
const accountModel = require("../models/accountModel");

exports.listing = async (req, res, next) => {
  // get req category
  const totalBooks = await booksListModel.getTotalBooksInDB();
  console.log(totalBooks);
  const receivedCategoryID = req.query.categoryID;
  let currentCategory = null;
  const allPublisher = await booksListModel.getAllPublisher();
  let booksToShow;
  console.log(`Received with query: ${receivedCategoryID}`);

  if (receivedCategoryID === "all") {
    res.redirect("/bookslist/");
    return;
  }
  if (receivedCategoryID != undefined) {
    booksToShow = await booksListModel.listByCategory(receivedCategoryID);
    currentCategory = await booksListModel.getCategoryNameById(receivedCategoryID);
    currentCategory = currentCategory.name;
  } else {
    currentCategory = "Tất cả";
  }
  let userToShow = null;
  if (req.user) {
    console.log(`req.user: ${req.user._id}`);
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
    console.log(userToShow);
  }
  const categoriesListToShowInMenu = await booksListModel.getAllCategory();
  // Pass data to view to display list of books
  res.render("booksPage/bookslist", {
    totalBooks: totalBooks,
    currentCategoryId: receivedCategoryID,
    categories: categoriesListToShowInMenu,
    currentCategory: currentCategory,
    userToShow: userToShow,
    allPublisher: allPublisher,
  });
};
