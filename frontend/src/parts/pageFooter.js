import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PageFooter = () => {
  return (
    <Row style={{ width: '100%', margin: '4em auto 2em auto' }}>
      <Col>
        <a href='#' className='info-text' >津ICP备16004869号-1</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        <span className='info-text' >
          我们正在骄傲的使用飞腾CPU支撑本系统
        </span>
      </Col>
    </Row>
  )
}

export default PageFooter
