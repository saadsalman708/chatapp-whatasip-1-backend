const User = require("../../models/user.model");

const searchUsers = async (searchQuery, currentUserId, page = 1, limit = 10) => {
  if (!searchQuery) return { users: [], totalUsers: 0 };

  const regex = new RegExp(searchQuery, "i");
  
  const parsedPage = Math.max(1, parseInt(page));
  const parsedLimit = Math.max(1, parseInt(limit));
  const skip = (parsedPage - 1) * parsedLimit;

  const filter = {
    $and: [
      { _id: { $ne: currentUserId } }, // Never include yourself in friends search
      {
        $or: [
          { username: regex },
          { name: regex },
          { email: regex }
        ]
      }
    ]
  };

  // Senior Performance Trick: Run data fetch and total count concurrently
  const [users, totalUsers] = await Promise.all([
    User.find(filter)
      .select("name username email isOnline lastSeen")
      .skip(skip)
      .limit(parsedLimit)
      .lean(), // .lean() converts Mongoose docs to pure lightweight JS objects for raw speed
    User.countDocuments(filter)
  ]);

  return {
    users,
    totalUsers,
    currentPage: parsedPage,
    totalPages: Math.ceil(totalUsers / parsedLimit),
    hasNextPage: skip + users.length < totalUsers
  };
};

module.exports = searchUsers;