import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="font-bold">
                    OpenReddit
                </Link>
                <div>
                    <Link to="/" className="mr-4">
                        Home
                    </Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
