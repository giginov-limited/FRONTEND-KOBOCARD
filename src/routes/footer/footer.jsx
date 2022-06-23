import {Outlet} from 'react-router-dom'
import './footer.scss'
const Footer = () => {

  return(
    <div className="footer">
    <Outlet />
      <div className='footer-links'>
        <ul>
          <li>Home</li>
          <li>Join Now</li>
          <li>Live Games</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="logo-socials">
        <div className="logo">
           KoboCard
        </div>
        <div>
          <img src="https://www.transparentpng.com/thumb/instagram-logo-icon/JTKuuM-instagram-logo-icon-free-transparent.png" alt="Instagram Logo ICON Free Transparent @transparentpng.com"/>
          <img src="https://www.transparentpng.com/thumb/facebook-logo/facebook-logo-png-file-8.png" alt="facebook logo png file @transparentpng.com"/>
        </div>
        <div className="bottom-footer">
          <ul>
            <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
                <li>Copyright KoboCard 2022 All Rights Reserved.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer;
