const Account = require('../models/Account');
const User = require('../models/User');
const { resolveAccount } = require('../utils/paystack');
const { levenshtein } = require('fast-levenshtein');

const accountResolver = {
  Mutation: {
    async verifyAccount(_, { input }) {
      const { user_account_number, user_bank_code, user_account_name } = input;

      const paystackResponse = await resolveAccount(
        user_account_number,
        user_bank_code
      );

      if (!paystackResponse) {
        throw new Error('Failed to resolve account');
      }

      const paystackAccountName = paystackResponse.account_name;
      const ld = levenshtein.get(
        user_account_name.toLowerCase(),
        paystackAccountName.toLowerCase()
      );

      if (ld <= 2) {
        const user = await User.findOne({
          where: { account_number: user_account_number },
        });

        if (user) {
          user.is_verified = true;
          await user.save();
          return user;
        } else {
          throw new Error('User not found');
        }
      } else {
        throw new Error('Account verification failed');
      }
    },
  },
  Query: {
    async resolveAccount(_, { bank_code, account_number }) {
      const account = await Account.findOne({
        where: { account_number, bank_code },
      });

      if (account) {
        return account.account_name;
      } else {
        const paystackResponse = await resolveAccount(
          account_number,
          bank_code
        );

        if (paystackResponse) {
          return paystackResponse.account_name;
        } else {
          throw new Error('Failed to resolve account');
        }
      }
    },
  },
};

module.exports = accountResolver;
