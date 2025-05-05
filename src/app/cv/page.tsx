import Navbar from "@/app/ui/navbar";
import { Metadata } from 'next'
import {JSX} from "react";
import './cv.css'

// Generate title for this page
export function generateMetadata(): Metadata {
    return {
        title: "Quinn Fransen | CV",
    }
}

export default function Page() {
    return (<>
        <h1>Curriculum Vitae</h1>
        {fullEducation()}
        {fullExperiences()}
        {fullProjects()}
    </>);
}

function section(sectionName: string): JSX.Element {
    return (<>
        <hr className={"sectionSeparator"} />
        <h2>{sectionName}</h2>
    </>);
}

function subsection(sectionName: string): JSX.Element {
    return (<>
        <hr className={"subsectionSeparator"} />
        <h2>{sectionName}</h2>
    </>);
}

function createEducation(schoolName: string, location: string, gpa: string, timeframe: string, degree: string): JSX.Element {
    // TODO: add activities category
    // TODO: add awards category
    return (<>
        <div className="two-part-row">
            <h3>{schoolName}</h3>
            <p>{location}</p>
        </div>
        <div className="two-part-row">
            <p>{degree}; GPA: {gpa}</p>
            <p>{timeframe}</p>
        </div>
    </>)
}

// Creates the entire education section
// All education constants can be found here
function fullEducation(): JSX.Element {
    return (<>
        {section('Education')}
        {createEducation('Michigan State University', 'East Lansing, Michigan', '4.00',
        'September 2023 - December 2025', 'Bachelor of Science, Computer Science')}
        {createEducation('Delta College', 'University Center, Michigan', '3.99',
        'September 2020 - April 2023', 'Associate in Science, General Science')}
        {createEducation('Bullock Creek High School', 'Midland, Michigan', '4.22 - look this up',
        'September 2018 - May 2022', 'High School Diploma')}
    </>)
}


function createExperience(company: string, location: string, role: string, timeframe: string, bullets: any): JSX.Element {
    // TODO: add bullets functionality
    return (<>
        <div className="two-part-row">
            <h3>{company}</h3>
            <p>{location}</p>
        </div>
        <div className="two-part-row">
            <p>{role}</p>
            <p>{timeframe}</p>
        </div>
    </>)
}

// Creates all the experience section
function fullExperiences(): JSX.Element {
    return (<>
        {section('Experience')}

        {createExperience('Auto-Owners Insurance', 'Lansing, Michigan', 'Web Development Intern',
        'May 2025 - August 2025', [])}
        {createExperience('Michigan State University - HAAIL',
        'East Lansing, Michigan', 'Research Assistant', 'September 2023 - May 2025', [])}
        {createExperience('Auto-Owners Insurance', 'Lansing, Michigan', 'Technical Business Analyst Intern',
            'May 2024 - August 2024', [])}
        {createExperience('Nexteer Automotive', 'Saginaw Michigan', 'Engineering Co-op',
        'Aprl 2023 - August 2023', [])}
        {createExperience('US Soccer Federation', 'Midland, Michigan', 'Soccer Referee',
        'August 2018 - November 2022', [])}
    </>)
}


function createProject(): JSX.Element {
    return (<>
    </>)
}

// Creates all the projects
function fullProjects(): JSX.Element {
    // TODO: make links to sections of the projects page for where the projects will be.
    // Have images for the projects in the projects page, not in the CV
    return (<>
        {section('Projects')}
        {subsection('Personal Projects')}
        {subsection('School Projects')}
    </>)
}