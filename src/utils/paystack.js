const axios = require('axios');
require('dotenv').config();

const PAYSTACK_API_KEY = process.env.PAYSTACK_API_KEY;

async function resolveAccount(account_number, bank_code) {
  try {
    const response = await axios.get(`https://api.paystack.co/bank/resolve`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_API_KEY}`,
      },
      params: {
        account_number,
        bank_code,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { resolveAccount };
