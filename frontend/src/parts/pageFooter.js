import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PageFooter = () => {
  return (
    <Row style={{ width: '100%', marginTop: '20px' }}>
      <Col sm={12} style={{ color: 'rgba(173, 173, 173, 1)' }}>
        津ICP备16004869号-1 <br className="d-block d-sm-none" />我们正在骄傲的使用飞腾CPU支撑本系统
      </Col>
    </Row>
  )
}

export default PageFooter
