const { AuthenticationError } = require('apollo-server-express');
const { User, Charger } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('chargers');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('chargers');
    },
    chargers: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Charger.find(params).sort({ createdAt: -1 });
    },
    charger: async (parent, { id }) => {
      return Charger.findOne({ _id: id });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('chargers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCharger: async (parent, { chargerId, portId }, context) => {
      if (context.user) {
        const charger = await Charger.create({
          chargerId,
          portId,
          chargerOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { chargers: charger._id } }
        );

        return charger;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeCharger: async (parent, { id }, context) => {
      if (context.user) {
        const charger = await Charger.findOneAndDelete({
          _id: id,
          chargerOwner: context.user.username, //do we need this?
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { chargers: charger._id } }
        );

        return charger;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
