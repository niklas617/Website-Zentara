"use client";

import { useState } from "react";

interface Props {
    buttonLabel: string;   // Text auf dem Button (z.B. "Android App")
    apkPath: string;       // Pfad (z.B. "/downloads/app-v1.apk")
    apkName: string;       // Name der Datei (z.B. "app-v1.apk")
    title: string;         // Überschrift im Modal
    description: string;   // Text im Modal
}

export default function ApkDownloadButton({ buttonLabel, apkPath, apkName, title, description }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = apkPath;
        link.download = apkName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Der Button, der das Modal öffnet */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="project-link-btn-download"
            >
                {buttonLabel}
            </button>

            {/* Das Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
                    <div className="bg-[#0f102e] border border-cyan-500/50 p-8 rounded-2xl max-w-lg w-full text-center shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                        <p className="mb-8 text-sm text-gray-300 leading-relaxed">{description}</p>

                        {/* Die Buttons: items-center zentriert sie, !m-0 killt versteckte Abstände deiner CSS-Klasse */}
                        <div className="flex justify-center items-center gap-4 mt-6">



                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 rounded-full text-gray-300 border border-gray-600 hover:bg-gray-800 hover:text-white transition-all font-medium"
                            >
                                Abbrechen
                            </button>
                            <br />
                            <button
                                onClick={handleDownload}
                                className="px-6 py-3 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition-all font-medium"
                            >
                                Jetzt herunterladen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}