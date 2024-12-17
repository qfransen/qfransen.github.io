import Navbar from "@/app/ui/navbar";
import { Metadata } from 'next'

// Generate title for this page
export function generateMetadata(): Metadata {
    return {
        title: "Quinn Fransen | CV",
    }
}

export default function Page() {
    return (<>
        <p>Curriculum Vitae</p>;
    </>);
}