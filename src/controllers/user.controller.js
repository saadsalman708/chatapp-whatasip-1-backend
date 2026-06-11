const searchUsers = require("../services/user/searchUsers.service");
const catchAsync = require("../utils/catchAsync");

const findFriends = catchAsync(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  const currentUserId = req.user._id;

  const paginationResults = await searchUsers(query, currentUserId, page, limit);

  res.status(200).json({
    success: true,
    meta: {
      totalResults: paginationResults.totalUsers,
      totalPages: paginationResults.totalPages,
      currentPage: paginationResults.currentPage,
      hasNextPage: paginationResults.hasNextPage
    },
    data: paginationResults.users,
  });
});

module.exports = findFriends;