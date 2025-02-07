// src/components/Footer.jsx
import React from 'react';
const Footer = React.memo(() => {
    return (
        <footer className="bg-dark-400 text-gray-100">
            <div className="container mx-auto py-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} HRM Services. All rights reserved.
                </p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a
                        href="#"
                        className="hover:text-primary transition"
                        aria-label="Facebook"
                    >
                        Facebook
                    </a>
                    <a
                        href="#"
                        className="hover:text-primary transition"
                        aria-label="Twitter"
                    >
                        Twitter
                    </a>
                    <a
                        href="#"
                        className="hover:text-primary transition"
                        aria-label="LinkedIn"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
});

export default Footer;