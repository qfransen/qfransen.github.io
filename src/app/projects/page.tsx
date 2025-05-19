import Navbar from "@/app/ui/navbar";
import { Metadata } from 'next'
import {JSX} from "react";
import Image from 'next/image';
import './projects.css'


const imageDir = '/images/projects/'

// Generate title for the projects page and other pages in projects
export function generateMetadata(): Metadata {
    return {
        title: "Quinn Fransen | Projects",
    }
}

export default function Page() {
    return (<>
        <h1>Projects</h1>
        <h2>Personal Projects</h2>
        {createProject("Personal Website")}
        {createProject("Snell's Law", "snells.png")}
        {createProject("LeCalculator")}

        <h2>School Projects</h2>
        {createProject('Car Image Classifier', 'car-classifier.png')}
        {createProject('NFL Game Outcome Predictor', 'football-scores.png')}
        {createProject('Backend Web Microservices App')}
        {createProject('Autonomous Lane Keeping', 'autonomous1.png')}
        {createProject('Animation Editor', 'animation.png')}
        {createProject('Logic Game', 'logic-game.png')}
        {createProject('Popping Blimps', 'blimps.png')}
    </>);
}


function createProject(name: string, image?: string): JSX.Element {
    const imgPath: string = imageDir + image
    const alt_description: string = name + '-' + image
    const sectionId = name.toLowerCase().replace(/\s+/g, '-'); // e.g., "Cool Project" -> "cool-project"

    return (
        <div id={sectionId} className="project">
            <h3>{name}</h3>
            {image && (
                <Image src={imgPath} alt={alt_description} width={500} height={300} />
            )}
        </div>
    );
}