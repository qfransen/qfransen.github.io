import { Metadata } from 'next'

// Generate title for the hire me page
export const metadata: Metadata = {
    title: "Quinn Fransen | Hire Me",
    description: "Reach out to connect or collaborate.",
};

export default function Page() {
    return (<main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">

        {/* Wrapper to control spacing */}
        <div className="space-y-6 max-w-lg">

            <h1 className="text-3xl font-bold tracking-tight">
                Let's Connect
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
                If you like what I do, feel free to reach out!
            </p>

            {/* Link section */}
            <div className="flex flex-col space-y-4 pt-4">
                <p>
                    LinkedIn:{' '}
                    <a
                      href="https://www.linkedin.com/in/quinnfransen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                        quinnfransen
                    </a>
                </p>
                <p>
                    Email:{' '}
                    <a
                      href="mailto:qpfransen@gmail.com"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                        qpfransen@gmail.com
                    </a>
                </p>
            </div>

        </div>
    </main>);

}