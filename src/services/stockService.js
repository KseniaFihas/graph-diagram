import axios from 'axios';

const baseURL = 'https://rest.statica.pl/rest/stockquotes/';

const stockService = {
  getStockData: async (symbol) => {
    try {
      const response = await axios.get(`${baseURL}${symbol}?type=trades&dt_from=2010-01-01&limit=10000`, {
        auth: {
          username: 'frontend2024',
          password: 'test'
        }
      });
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
};

export default stockService;