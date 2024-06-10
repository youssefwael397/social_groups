import React from 'react';
import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'; // Import your custom CSS file
import GroupManagement from './components/GroupManagement.tsx';
import GroupDetail from './components/GroupDetail.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-center text-primary my-3">
                    Group Management App
                  </h1>
                  <GroupManagement />
                </>
              }
            />
            <Route path="/group/:groupId" element={<GroupDetail />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
};

export default App;
