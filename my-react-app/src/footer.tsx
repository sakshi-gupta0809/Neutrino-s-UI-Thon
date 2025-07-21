import { socialMediaLinks } from "./Cards"
import profilePic from './assets/Images/1-removebg-preview.png';
const footer=()=>{
    return(
         <footer
        style={{
          background: 'linear-gradient(to right,rgb(220, 124, 33),rgb(171, 171, 179))',
          color: 'white',
          padding: '2rem 1rem',
          marginTop: 'auto',
          marginLeft: 20,
          borderRadius: 5,
          width: '96%',
          marginBottom:30
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h4 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>About Us</h4>
           <img
                  src={profilePic}
                  style={{ width: '200px', height: '70px' }}
                />
          <p style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>
            {/* Email:{' '}
            <a href="mailto:info@neutrinotechsystems.com" style={{ color: '#E0F2F1', textDecoration: 'none' }}>
              info@neutrinotechsystems.com
            </a> */}

            Email:{' '}
  <a 
    href="mailto:info@neutrinotechsystems.com" 
    style={{ color: '#E0F2F1', textDecoration: 'none' }}
  >
    info@neutrinotechsystems.com
  </a>
          </p>
          <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>website: <a href="http://neutrinotechsystems.com/">neutrinotechsystems.com</a></p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {socialMediaLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              </a>
            ))}
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} Neutrino Tech System. All rights reserved.
          </p>
        </div>
      </footer>
    )
}
export default footer;