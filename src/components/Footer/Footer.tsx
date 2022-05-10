import React, { MouseEvent } from 'react'

interface FooterProps {
  handleNextPage: (e: MouseEvent) => void
  handlePreviousPage: (e: MouseEvent) => void

}

const Footer:React.FC<FooterProps> = ({handleNextPage, handlePreviousPage}) => {
  return (
    <div className="footer">
      <div className="button-container">
        <button className="previous-button" onClick={(e) => handlePreviousPage(e)}>Previous</button>
        <button className="next-button" onClick={(e) => handleNextPage(e)}>Next</button>
      </div>
    </div>
  )
}

export default Footer;