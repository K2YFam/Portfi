const { AuthenticationError } = require('apollo-server-express');
const { User, Charger } = require('../models');
const { signToken } = require('../utils/auth');
const { status, stopCharging, startCharging, setPower } = require('../utils/ocppApi');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('chargers');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('chargers');
    },
    chargers: async (parent, args, context) => {
      // const params = username ? { username } : {};
      // return Charger.find(params).sort({ createdAt: -1 });
      if (context.user) {
        return Charger.findOne({ chargerOwner: context.user.username });
      }
      throw new AuthenticationError('You need to be logged in!');

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
    chargerStatus: async (parent, {chargerId, portId}, context) => {
      if (context.user) {
        // let user = User.findOne({ _id: context.user._id }).populate('chargers');
        // console.log(context.user.charger);
        // console.log(user.chargers.chargerId, user.chargers.portId)
        // console.log(user)
        // return status(user.chargers[0].chargerId, user.chargers[0].portId)
        
        return status(chargerId, portId); 

        // return status(process.env.TEST_STATION, process.env.TEST_PORT); //hard coded for now 
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
      const user = await User.findOne({ email }).populate('chargers');

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
          chargerId: process.env.TEST_STATION, //adding the test charger for now
          portId: portId = process.env.TEST_PORT, //addubg test port for now
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
    },


    stopCharging: async (parent, { activeSessionId }, context) => {
      if (context.user) {

        return stopCharging(activeSessionId);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    startCharging: async (parent, { userId, portId, chargingLimit }, context) => { //default 85
      if (context.user) {

        return startCharging(process.env.TEST_ADMIN, process.env.TEST_PORT, chargingLimit); //hardcoded for now
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    setPower: async (parent, { unit, limit, activeSessionId }, context) => {
      if (context.user) {

        return setPower(unit, limit, activeSessionId);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
