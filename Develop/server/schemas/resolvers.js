const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Mutation: {
    async login(parent, { email, password }, context) {
      const user = await User.findOne({
        $or: [{ username: email }, { email }],
      });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },

    async addUser(parent, { username, email, password }, context) {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new Error("Something went wrong!");
      }

      const token = signToken(user);
      return { token, user };
    },

    async saveBook(parent, { book }, { user }) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Could not save book");
      }
    },

    async removeBook(parent, { bookId }, { user }) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
