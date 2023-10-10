import axios from 'axios';

export const getDataDetail = async () => {
  try {
    const baseUrl = 'https://parseapi.back4app.com/classes/hotel/bVonXoSUHK';
    const config = {
      headers: {
        'X-Parse-Application-Id': `Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3`,
        'X-Parse-REST-API-Key': '4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy',
      },
    };
    const result = await axios.get(baseUrl, config);
    return Promise.resolve(result.data);
  } catch (error) {
    console.log('error@getDataDetail.Services.index.js', error);
    return Promise.reject(error);
  }
};
