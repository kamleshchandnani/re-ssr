import Unsplash from 'unsplash-js';

export const getPhotos = async (keyword) => {
  const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY });
  try {
    const response = await unsplash.search.photos(keyword, 1, 30, { orientation: 'landscape' });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
