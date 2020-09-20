import Home from '../../search/Home/Home';
import Listing from '../../search/Listing/Listing';

const routes = [
  {
    path: '/',
    exact: true,
    Component: Home,
  },
  {
    path: '/photos',
    exact: true,
    Component: Listing,
  },
];

export default routes;
