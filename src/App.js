// import { Route, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import Navigation from './routers/navigation/navigation.component.jsx';
import Home from './routers/home/home.component.jsx';
import Authentication from './routers/authentication/authentication.component.jsx';

const Shop = () => {
  return <h1>i am the shop page</h1>;
};

const App = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'auth',
        element: <Authentication />,
      },
    ],
  },
]);

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



// const App = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       path='/'
//       element={<Navigation />}>
//       <Route
//         index
//         element={<Home />}
//       />
//       <Route
//         path='shop'
//         element={<Shop />}
//       />
//     </Route>
//   )
// );

export default App;
