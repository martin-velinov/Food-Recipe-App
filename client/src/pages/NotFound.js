import React from 'react'
import notfound from '../assets/img/404.jpg'

const NotFound = () => {
  return (
    <div style={{textAlign:'center'}}>
      <img src={notfound} width={'70%'} height={'50%'} alt="not found" />
    </div>

  )
}

export default NotFound