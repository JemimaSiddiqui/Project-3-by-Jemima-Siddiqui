const { AuthenticationError } = require('apollo-server-express');
const { User, Tutor, } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('tutors');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('tutors');
    },
    tutors: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Tutor.find(params).sort({ createdAt: -1 });
    },
    tutor: async (parent, { tutorId }) => {
      return Tutor.findOne({ _id: tutorId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('tutors').populate('savedTutors');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
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
    addTutor: async (parent, { tutorAbout, tutorLoc, tutorCert, tutorPic, tutorPh }, context) => {
      if (context.user) {
        const tutor = await Tutor.create({
          tutorAbout,
          tutorLoc,
          tutorCert,
          tutorPic,
          tutorPh,
          tutorAuthor: context.user.firstName,
          tutorFirst: context.user.firstName,
          tutorLast: context.user.lastName,
          tutorEmail: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tutors: tutor._id } }
        );

        return tutor;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTutor: async (parent, { tutorId, tutorAbout, tutorLoc, tutorCert, tutorPic, tutorPh }, context) => {
			if (context.user) {
				return await Tutor.findOneAndUpdate(
					{_id: tutorId},
					{tutorAbout, tutorLoc, tutorCert, tutorPic, tutorPh },
					{
						new: true,
					}
				);
			}
			throw new AuthenticationError('Must be logged in!');
		},
    addRating: async (parent, { tutorId, ratingText }, context) => {
      if (context.user) {
        return Tutor.findOneAndUpdate(
          { _id: tutorId },
          {
            $addToSet: {
              ratings: { ratingText, ratingAuthor: context.user.email },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeTutor: async (parent, { tutorId }, context) => {
      if (context.user) {
        const tutor = await Tutor.findOneAndDelete({
          _id: tutorId,
          tutorAuthor: context.user.firstName,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tutors: tutor._id } }
        );

        return tutor;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRating: async (parent, { tutorId, ratingId }, context) => {
      if (context.user) {
        return Tutor.findOneAndUpdate(
          { _id: tutorId },
          {
            $pull: {
              ratings: {
                _id: ratingId,
                ratingAuthor: context.user.email,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveTutor: async (parent, { tutorId }, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { savedTutor: tutorId } },
              { new: true, runValidators: true}
          );
          return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSavedTutor: async (parent, { tutorId }, context) => {
      if (context.user) {
        console.log(tutorId);
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedTutors: tutorId } },
              { new: true }
              
          );
          return updatedUser;
          
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
