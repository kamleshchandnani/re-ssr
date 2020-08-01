import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Text, Input, Heading } from 'react-ui';

const Home = () => {
  const history = useHistory();
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      //navigate to listing page
      //event.target.value;
      history.push(`/photos?keyword=${event.target.value}`);
    }
  };
  return (
    <Stack
      direction="vertical"
      gap={10}
      justify="flex-start"
      css={{ paddingLeft: 500, paddingRight: 500, paddingTop: 240 }}
    >
      <Stack direction="vertical" gap={2}>
        <Heading size="page">Resplash</Heading>
        <Text variant="subtle" size={4}>
          A gallery of amazing photos
        </Text>
      </Stack>
      <Input type="text" placeholder="Search photos with any keyword" onKeyPress={handleSearch} />
    </Stack>
  );
};

export default Home;
