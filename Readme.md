# Backdrop Engineering Challenge

This project provides a solution for the Backdrop Engineering Challenge, implementing a GraphQL API to handle user bank account verification using the Paystack API.

## Getting Started

These instructions will guide you on how to set up and run the project on your local machine.

### Prerequisites

- Node.js (>= 14.x.x)
- npm (>= 6.x.x)
- PostgreSQL (>= 9.x.x)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/backdrop-engineering-challenge.git

```

2. Change to the project directory:

```sh
 cd backdrop-engineering-challenge
```

3. Install the dependencies:

```sh
   yarn install
```

4. Create a `.env` file in the project root directory with the following content:
   DATABASE_URL=postgres://username:password@localhost:5432/your_database_name
   PAYSTACK_API_KEY=your_paystack_api_key
   Replace `username`, `password`, `your_database_name`, and `your_paystack_api_key` with your own PostgreSQL credentials and Paystack API key.

5. Run the application:

```sh
   yarn start
```

## Running Tests

To run the tests, execute the following command:

```sh
yarn test
```

## Levenshtein Distance vs Damerau-Levenshtein Distance

In this specific scenario, the pure Levenshtein Distance algorithm might be more effective than the broader Damerau-Levenshtein Distance algorithm because bank account names typically contain longer words and are less likely to have transpositions (swapped characters). The Levenshtein Distance algorithm is sufficient for detecting small typos or single character differences, which are more common in this context. The added complexity of the Damerau-Levenshtein Distance algorithm may not provide significant benefits in this use case, while also being slightly slower.

## Assumptions

1. The Paystack API provides accurate and up-to-date account name information for the given account number and bank code.
2. The user input for account name is assumed to be generally correct, with only minor errors or typos.
