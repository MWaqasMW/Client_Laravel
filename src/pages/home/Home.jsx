import React from 'react';
import UserForm from '../../componets/UserForm';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: Import a CSS effect

// import Image from '../../assets/bg_Slider13.webp';

const Home = () => {
    return (
        <div>
            <h1>Hello</h1>

            {/* <LazyLoadImage
                src={Image}
                alt="Your Alt Text"
                effect="blur" // Optional: Apply a blur effect
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                }}
            /> */}
            <UserForm />
            {/* Other content */}
        </div>
    );
};

export default Home;
