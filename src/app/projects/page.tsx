import Navbar from "@/app/ui/navbar";
import { Metadata } from 'next'
import {JSX} from "react";
import Image from 'next/image';

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
        {createProject("Snell's Law", "snells.png")}

        <h2>School Projects</h2>
    </>);
}


function createProject(name: string, image?: string): JSX.Element {
    const imgPath: string = imageDir + image
    const alt_description: string = name + '-' + image
    return (<>
        <h3>{name}</h3>
        <Image src={imgPath} alt={alt_description} width={500} height={300} />
    </>)
}