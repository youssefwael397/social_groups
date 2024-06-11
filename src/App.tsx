import React from 'react';
import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'; // Import your custom CSS file
import GroupManagement from './components/GroupManagement';
import GroupDetail from './components/GroupDetail';

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
                  <h1 className="text-center main_color my-3">
                    Group Management Interface
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
