import Navbar from "@/app/ui/navbar";
import { Metadata } from 'next'

// Generate title for the hire me page
export function generateMetadata(): Metadata {
    return {
        title: "Quinn Fransen | Hire Me",
    }
}

export default function Page() {
    return (<>
        <p>Hire Me</p>;
    </>);

}