// // import styled from "styled-components";
// // import bg from './media/img/bg.png';
// // import { MainLayout } from "./styles/Layouts";


// // function App() {
// //   return (
// //     <AppStyled bg={bg} className="App">
// //       <MainLayout>
// //         <h1>Hello World</h1>
// //       </MainLayout>
// //     </AppStyled>
// //   );
// // }

// // const AppStyled = styled.div`
// //   height: 100vh;
// //   background-image: url(${props => props.bg});
// //   position: relative;

// // `
// // export default App;

// import React from 'react';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import './App.css';

// const App = () => {
//   return (
//     <div className="app">
//       <Sidebar />
//       <Dashboard />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AddIncomePage from './pages/AddIncomePage';
import AddExpensePage from './pages/AddExpensePage';
import ViewTransactionsPage from './pages/ViewTransactionsPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-income" element={<AddIncomePage />} />
            <Route path="/add-expense" element={<AddExpensePage />} />
            <Route path="/view-transactions" element={<ViewTransactionsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
