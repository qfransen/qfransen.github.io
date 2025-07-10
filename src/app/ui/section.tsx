// This is used for creating sections in the CV page
'use client';

import React, { useState, ReactNode } from 'react';
import './section.css';

interface SectionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="section-container">
            <div className="section-header-container">
                <button className="section-button" onClick={handleToggle}>
                    <span className="section-title">{title}</span>
                    <span className="toggle-icon">{isOpen ? '−' : 'v'}</span>
                </button>
            </div>
            <div className={`section-content ${isOpen ? 'open' : 'closed'}`}>
                {children}
            </div>
        </div>
    );
};

export default Section;