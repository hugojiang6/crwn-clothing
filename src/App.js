import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// import { createBrowserRouter } from 'react-router-dom';

import Navigation from './routers/navigation/navigation.component.jsx';
import Home from './routers/home/home.component.jsx';
import Authentication from './routers/authentication/authentication.component.jsx';
import Shop from './routers/shop/shop.component.jsx';

// const App = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navigation />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: 'shop',
//         element: <Shop />,
//       },
//       {
//         path: 'auth',
//         element: <Authentication />,
//       },
//     ],
//   },
// ]);

// const App = () => {
//   return (
//     <Routes>
//       <Route
//         path='/'
//         element={<Navigation />}>
//         <Route
//           index
//           element={<Home />}
//         />
//         <Route
//           path='shop'
//           element={<Shop />}
//         />
//       </Route>
//     </Routes>
//   );
// };

const App = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
    </Route>
  )
);

export default App;
