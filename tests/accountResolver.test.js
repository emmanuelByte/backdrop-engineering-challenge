const request = require('supertest');
const { ApolloServer } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('graphql-tag');
const fs = require('fs');
const resolvers = require('../src/resolvers/accountResolver');
const User = require('../src/models/User');
const Account = require('../src/models/Account');
const path = require('path');

const typeDefs = gql(
  fs.readFileSync(
    path.join(__dirname, '../src/schema/accountSchema.graphql'),
    'utf8'
  )
);

const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);

beforeEach(async () => {
  // Reset the test database before each test
  await User.destroy({ where: {}, truncate: true });
  await Account.destroy({ where: {}, truncate: true });
});

describe('accountResolver', () => {
  test('verifyAccount mutation', async () => {
    // Prepare test data
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
    });
    await Account.create({
      user_id: user.id,
      account_number: '0157148304',
      bank_code: 'GTB',
      account_name: 'John Doe',
    });

    // Mutation
    const VERIFY_ACCOUNT = `
      mutation VerifyAccount($input: VerifyAccountInput!) {
        verifyAccount(input: $input) {
          id
          is_verified
        }
      }
    `;

    const variables = {
      input: {
        user_account_number: '0157148304',
        user_bank_code: 'GTB',
        user_account_name: 'John Doe',
      },
    };

    // Execute the mutation and test the result
    const res = await mutate({ query: VERIFY_ACCOUNT, variables });

    expect(res.data.verifyAccount).toBeTruthy();
    expect(res.data.verifyAccount.id).toBe(user.id);
    expect(res.data.verifyAccount.is_verified).toBe(true);
  });

  test('resolveAccount query', async () => {
    // Prepare test data
    const user = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
    await Account.create({
      user_id: user.id,
      account_number: '0157148310',
      bank_code: 'GTB',
      account_name: 'Jane Doe',
    });

    // Query
    const RESOLVE_ACCOUNT = `
      query ResolveAccount($bank_code: String!, $account_number: String!) {
        resolveAccount(bank_code: $bank_code, account_number: $account_number)
      }
    `;

    const variables = {
      bank_code: 'GTB',
      account_number: '0157148310',
    };

    // Execute the query and test the result
    const res = await query({ query: RESOLVE_ACCOUNT, variables });

    expect(res.data.resolveAccount).toBeTruthy();
    expect(res.data.resolveAccount).toBe('Jane Doe');
  });
});
