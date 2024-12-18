'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import './navbar.css'

// Navigation bar that should appear on the top of all pages in the web app
const Navbar = ({ pageTitle }: { pageTitle: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        // <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50">
        <nav className="fixed top-0 left-0 w-full z-50">
            {/* Contents of Nav bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
                {/* Page Title - Left Side */}
                <div className="text-2xl font-bold text-gray-800">
                    {pageTitle}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex">
                    <Link
                        href="/"
                        className="nav-item"
                    >
                        Home
                    </Link>
                    <Link
                        href="/projects"
                        className="nav-item"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/cv"
                        className="nav-item"
                    >
                        CV
                    </Link>
                    <Link
                        href="/hire"
                        className="nav-item"
                    >
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 focus:outline-none"
                    >
                        {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="absolute top-10 left-0 w-full shadow-md md:hidden nav-menu-open">
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <Link
                                href="/projects"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                Projects
                            </Link>
                            <Link
                                href="/cv"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                CV
                            </Link>
                            <Link
                                href="/hire"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                Hire Me
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            {/* Gradient just at the bottom of the nav bar */}
            {/*<div className="absolute bottom-0 left-0 w-full h-2*/}
            {/*        bg-gradient-to-b from-blue-200/90 to-blue-200/5" />*/}
        </nav>
    );
};

export default Navbar;