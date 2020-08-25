import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import PageNav from './parts/pageNav'
import PageContent from './parts/pageContent'
import PageFooter from './parts/pageFooter'

function App () {
  return (
    <div className="App">
      <Container>
        <Row>
          <PageNav/>
          <PageContent></PageContent>
          <PageFooter/>
        </Row>
      </Container>
    </div>
  )
}

export default App
