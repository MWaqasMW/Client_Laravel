import React from 'react';

const ResponsiveImage = ({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block', // To remove extra space below inline images
                margin: '0 auto', // To center the image within its container
            }}
        />
    );
};

export default ResponsiveImage;
