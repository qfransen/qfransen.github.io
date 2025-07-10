import Navbar from "@/app/ui/navbar";
import { Metadata } from 'next'
import {JSX} from "react";
import Section from '@/app/ui/section';
import './cv.css'

// Generate title for this page
export function generateMetadata(): Metadata {
    return {
        title: "Quinn Fransen | CV",
    }
}

export default function Page() {
    return (<div className={'cv-container'}>
        <h1 className={"content-wrapper"}><b>C</b>urriculum <b>V</b>itae</h1>

        <Section title="Education">
            {fullEducation()}
        </Section>

        <Section title="Experience">
            {fullExperiences()}
        </Section>

        <Section title="Projects">
            {fullProjects()}
        </Section>
    </div>);
}

// function section(sectionName: string): JSX.Element {
//     return (<>
//         <hr className={"sectionSeparator"} />
//         <h2 className={"content-wrapper"}>{sectionName}</h2>
//     </>);
// }
//
function subsection(sectionName: string): JSX.Element {
    return (<>
        <hr className={"subsectionSeparator"} />
        <h2 className={"content-wrapper"}>{sectionName}</h2>
    </>);
}

function createEducation(schoolName: string, location: string, gpa: string, timeframe: string, degree: string,
                         activities: string[], awards: string[]): JSX.Element {
    return (<div className={"content-wrapper"}>
        <div className="two-part-row">
            <h3 className={'underline-b'}>{schoolName}</h3>
            <p>{location}</p>
        </div>
        <div className="two-part-row">
            <p>{degree}; GPA: {gpa}</p>
            <p>{timeframe}</p>
        </div>

        <h4 className={'underline-squiggle'}>Activities</h4>
        <ul className={'bullet-list'}>
            {activities.map((bullet, index) => (
                <li key={index}>{bullet}</li>
            ))}
        </ul>

        <h4 className={'underline-squiggle'}>Awards</h4>
        <ul className={'bullet-list'}>
            {awards.map((bullet, index) => (
                <li key={index}>{bullet}</li>
            ))}
        </ul>
        <br/>
    </div>)
}

// Creates the entire education section
// All education constants can be found here
function fullEducation(): JSX.Element {
    return (<>
        {createEducation('Michigan State University', 'East Lansing, Michigan', '4.00',
        'September 2023 - December 2025', 'Bachelor of Science, Computer Science',
        ['Spartan Brass', 'Honors College', 'Michigander Scholar','Running Club'],
            ['Alumni Distinguished Scholars Semi-finalist',
            'Honors College Invite', 'Professorial Assistantship', 'TODO: look up MSU scholarships'])}

        {createEducation('Delta College', 'University Center, Michigan', '3.99',
        'September 2020 - April 2023', 'Associate in Science, General Science',
            ['Mid-Michigan Brass Band', 'Honors Political Science Project', 'Co-op',
            'American Mathematical Association of Two Year Colleges (AMATYC) Competition'],
            ['Jim and Janis Van Tiflin Mathematics Award', 'Board of Trustees Award', 'AMATYC Top Scorer'])}

        {createEducation('Bullock Creek High School', 'Midland, Michigan', '4.22 - look this up',
        'September 2018 - May 2022', 'High School Diploma',
            [
            'Varsity Band, Solo & Ensemble, Jazz Band - 4 years; Section Leader - 2 years',
            'Mid-Michigan Brass Band',
            'Varsity Soccer - 4 years',
            'Varsity Track - 3 years (lost a year to Covid); Iron G Attendance Award',
            'Varsity Robotics - 4 years; Entrepreneurship team leader - 2 years',
            'National Honor Society'],
            ['Valedictorian',
            'Bullock Creek Area Business Scholarship',
            'Tom Gilstad Award',
            'Honors in Mathematics',
            'Honors in Sciences',
            'All-Conference Academics'])}
    </>)
}


function createExperience(company: string, location: string, role: string, timeframe: string, bullets: string[]): JSX.Element {
    // TODO: look at padding styling instead of <br>
    return (<div className={"content-wrapper"}>
        <div className="two-part-row">
            <h3>{company}</h3>
            <p>{location}</p>
        </div>
        <div className="two-part-row">
            <p>{role}</p>
            <p>{timeframe}</p>
        </div>
        <ul className={'bullet-list'}>
            {bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
            ))}
        </ul>
        <br/>
    </div>)
}

// Creates all the experience section
function fullExperiences(): JSX.Element {
    return (<>
        {createExperience('Auto-Owners Insurance', 'Lansing, Michigan', 'Web Development Intern',
        'May 2025 - August 2025', ['Coming Soon'])}

        {createExperience('Michigan State University - HAAIL',
        'East Lansing, Michigan', 'Research Assistant', 'September 2023 - May 2025',
            ['Full stack web development training',
            'Developed web extension that used OpenAI API capabilities',
            'Designed and ran an experiment on the usage of AI during online information gathering'])}

        {createExperience('Auto-Owners Insurance', 'Lansing, Michigan', 'Technical Business Analyst Intern',
            'May 2024 - August 2024',
            ['Analyzed data and created automation to increase underwriter efficiency',
            'Created and compiled documentation through reading and communicating with team ' +
            'members to better organize the team’s information going forward',
            'Organized the implementation of a new product for the company’s web systems to ' +
            'ensure the applications were capable on time for the product release\n'])}

        {createExperience('Nexteer Automotive', 'Saginaw, Michigan', 'Engineering Co-op',
        'Aprl 2023 - August 2023',
            ['Created learning materials for new software and developed Python scripts to make simulation setup more efficient for new and experienced users',
            'Programmed an interface for lab equipment in Visual Basic .NET to provide new data collection capabilities and improve user experience',
            'Awarded Nexteer Scholarship for outstanding academic and professional performance'])}

        {createExperience('US Soccer Federation', 'Midland, Michigan', 'Soccer Referee',
        'August 2018 - November 2022',
            ['Functioned as a team to consistently officiate and address problems',
            'Educated new referees and provided feedback for improvement'])}
    </>)
}


function createProject(title: string, description: string, link?: string): JSX.Element {
    const fullLink = link ? `/projects#${link}` : undefined;

    return (<div className={"content-wrapper"}>
        <h3>
            {link ? <a href={fullLink}>{title}</a> : title}
        </h3>
        <p>{description}</p>
    </div>)
}

// Creates all the projects
function fullProjects(): JSX.Element {
    // TODO: make links to sections of the projects page for where the projects will be.
    // Have images for the projects in the projects page, not in the CV
    return (<>
        {subsection('Personal Projects')}
        {createProject('Personal Website', 'A personal website to tell my story ' +
            'and to store information about my projects',
            "personal-website")}

        {createProject("Snell's Law Visualizer", "An online physics lab demonstration " +
            "on the refraction of light",
        "snell's-law")}

        {createProject('LeCalculator', 'Coming soon...',
        "lecalculator")}

        {subsection('School Projects')}
        {createProject('Car Image Classifier', 'An image classifier created as a group project' +
            'in my Machine Learning class at MSU',
        "car-image-classifier")}

        {createProject('NFL Game Predictor', 'Created summary statistics and model to ' +
            'predict winners of NFL games in my Big Data Analysis class at MSU',
        "nfl-game-outcome-predictor")}

        {createProject('Backend Web and Microservices App', 'Projects created while ' +
            'taking Cloud and Information Sciences class at MSU',
        "backend-web-microservices-app")}

        {createProject('Autonomous Lane Keeping', 'Autonomous lane keeping simulation ' +
            'created while taking an Autonomous Vehicles class at MSU',
        "autonmous-lane-keeping")}

        {createProject('Animation Editor', 'Tool to create animations for 2D ' +
            'characters/images',
        "animation-editor")}

        {createProject('Logic Game', 'Group project in Software Design class ' +
            'where we created a game that has the user combine logic gates',
        "logic-game")}

        {createProject('Popping Blimps', 'Game created during Programming II class at Delta College',
        "popping-blimps")}
    </>)
}