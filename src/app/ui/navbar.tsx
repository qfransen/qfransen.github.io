'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

// Navigation bar that should appear on the top of all pages in the web app
const Navbar = ({ pageTitle }: { pageTitle: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Page Title - Left Side */}
                <div className="text-2xl font-bold text-gray-800">
                    {pageTitle}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        href="/"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/projects"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/cv"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        CV
                    </Link>
                    <Link
                        href="/hire"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 focus:outline-none"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <Link
                                href="/projects"
                                className="text-gray-700 hover:text-black"
                                onClick={toggleMenu}
                            >
                                Projects
                            </Link>
                            <Link
                                href="/cv"
                                className="text-gray-700 hover:text-black"
                                onClick={toggleMenu}
                            >
                                CV
                            </Link>
                            <Link
                                href="/hire"
                                className="text-gray-700 hover:text-black"
                                onClick={toggleMenu}
                            >
                                Hire Me
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;