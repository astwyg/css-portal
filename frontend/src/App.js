import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PageNav from './parts/pageNav';
import PageContent from './parts/pageContent';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <PageNav/>
          <PageContent></PageContent>
        </Row>
      </Container>

    </div>
  );
}

export default App;
