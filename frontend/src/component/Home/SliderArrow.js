import React from 'react'
import "./Home.css"

export default ({className, to, onClick}) => (
  <button type="button" onClick={onClick} className={`button button--text button--icon ${className}`} aria-label={to}>
    <img className="nst" src="https://th.bing.com/th/id/OIP.c-RvAn6QNla0yhswYGFa2AHaJG?pid=ImgDet&rs=1" />
  </button>
)