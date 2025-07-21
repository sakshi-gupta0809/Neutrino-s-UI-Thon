import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swipe from './swipe';
import { useNavigate } from 'react-router-dom';
import { cards, socialMediaLinks } from './Cards';
import Footer from './footer';
import profilePic from './assets/Images/nts logo img.jpeg';

const CarouselPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();


    const CARD_HEIGHT = 110;
    const RADIUS = 260;

    const updateActive = (newIndex: number) => {
        setActiveIndex(newIndex);
    };

    return (
        <div
            style={{
                flex:1,
                color: 'white',
                backgroundColor: 'black',
                minHeight: '100vh', // Ensure the overall page takes at least the full viewport height
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '96%',
                        maxWidth: '2000px',
                        marginLeft: '2%',
                        marginRight: '2%',
                        // REMOVE FIXED HEIGHT: `height: 600` was causing the overlap
                        // Instead, let it grow based on its content:
                        height: 'auto', // Allow height to adjust automatically
                        minHeight: '70vh', // Or set a minimum height relative to viewport for responsiveness
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            // minHeight: '700px', // This min-height was also contributing to potential overflow if content was smaller
                            height: 'auto', // Make sure this also adjusts
                        }}
                    >
                        <img
                  src={profilePic}
                  style={{ width: '200px', height: '70px', position: 'absolute', top:20, right:20, borderRadius:5}}
                />
                        <img
                            src={cards[activeIndex].image}
                            alt={`slide-${activeIndex}`}
                            style={{
                                width: '100%',
                                height: 550, // Important: set height to auto for the image to maintain aspect ratio
                                //maxHeight: '60vh', // Set a max height to control image size relative to viewport
                                objectFit: 'cover',
                                borderRadius: '0.25rem',
                                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                padding: '1rem',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                gap: '1rem',
                            }}
                        >
                            
                            <div
                                style={{
                                    backgroundColor: 'rgba(52, 58, 64, 0.75)',
                                    position: 'relative',
                                    // top: '-100px', // This value might need slight adjustment based on final layout
                                    padding: '1rem',
                                    borderRadius: '0.25rem',
                                    color: 'white',
                                    marginBottom: '0',
                                    width: '50%',
                                    flexShrink: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >

                                {/* Left Side: Logo, Title, Button */}
                                <div style={{ flex: 1 }}>
                                    {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <img
                                            src="https://media.licdn.com/dms/image/v2/D4D0BAQGL_yZG-qOSmw/company-logo_200_200/company-logo_200_200/0/1726125367060/neutrinotechsystems_logo?e=2147483647&v=beta&t=tmzl8RMdWAb8bG_oHjUwboOuk1wYPsQJmbkuij89aOQ"
                                            alt="Neutrino Logo"
                                            style={{ width: '30px', height: '30px', marginRight: '0.5rem' }}
                                        />
                                        <h5 style={{ margin: 0 }}>Neutrino Tech System</h5>
                                    </div> */}

                                    <h4 style={{ margin: 0 }}>{cards[activeIndex].title}</h4>

                                    <button
                                        style={{
                                            backgroundColor: 'linear-gradient(to right,rgb(220, 124, 33),rgb(171, 171, 179))',

                                            color: '#212529',
                                            border: '1px solid #f8f9fa',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                            marginTop: '0.5rem',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        window.location.href =cards[activeIndex].nextpageurl
                                        }}
                                    >
                                        SEE MORE
                                    </button>
                                </div>

                                {/* Right Side: Description */}
                                <div style={{ flex: 1, borderLeft: '2px solid white', paddingLeft: '1rem' }}>
                                    <h4 style={{ margin: 0 }}>{cards[activeIndex].description}</h4>
                                </div>

                            </div>


                            <div
                                style={{
                                    position: 'relative',
                                    top:100,
                                    width: 350,
                                    height: `${RADIUS + CARD_HEIGHT * 2}px`,
                                    minWidth: '200px',
                                    flexGrow: 1,
                                    overflow: 'hidden',
                                }}
                            >
                                <Swipe updateActive={updateActive} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

          <Footer/>
        </div >
    );
};

export default CarouselPage;