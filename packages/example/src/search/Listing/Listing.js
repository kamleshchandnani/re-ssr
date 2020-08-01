import React from 'react';
import { Stack, Text, Image, Heading, Grid, Column } from 'react-ui';
import { useLocation } from 'react-router-dom';
import { getPhotos } from '../../api/api';

const Listing = () => {
  const [fetching, setFetching] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const search = new URLSearchParams(useLocation().search).get('keyword');

  const fetchPhotos = async (keyword) => {
    setFetching(true);
    const response = await getPhotos(keyword);
    setFetching(false);
    setPhotos(response.results);
  };

  React.useEffect(() => {
    fetchPhotos(search);
  }, [search]);

  return (
    <Stack direction="vertical" gap={10} justify="flex-start" css={{ padding: 80 }}>
      <Stack direction="vertical" gap={2}>
        <Heading size="page">{search}</Heading>
        <Text variant="subtle" size={4}>
          Showing search results matching {search}
        </Text>
      </Stack>
      {fetching ? <Text variant="subtle">Fetching photos...</Text> : null}
      <Grid columnGap={4} rowGap={4}>
        {photos.map((photo) => (
          <Column span={3} key={photo.id}>
            <Image alt={photo.description} src={photo.urls.regular} />
          </Column>
        ))}
      </Grid>
    </Stack>
  );
};

export default Listing;
