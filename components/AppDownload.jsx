"use client";
import { useState } from "react";

export default function AppDownload() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {/* 1. Der erste Button auf der Website */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="project-link-btn-download"
            >
                App herunterladen
            </button>

            {/* 2. Das Pop-up (Modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">

                    {/* Die Box an sich: text-center sorgt für den zentrierten Text */}
                    <div className="bg-[#0f102e] border border-cyan-500/50 p-8 rounded-2xl max-w-lg w-full text-center shadow-[0_0_30px_rgba(0,255,255,0.1)]">

                        {/* Optionales Icon zur Auflockerung */}
                        <div className="text-4xl mb-4 flex justify-center">
                            <br />
                            <br />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-white">
                            Wichtiger Installations-Hinweis
                        </h3>

                        <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                            Da wir unsere App direkt anbieten und nicht über den Google Play Store,
                            wird dein Handy beim Öffnen der Datei eine <strong className="text-cyan-400">Sicherheitswarnung</strong> anzeigen.
                        </p>
                        <p className="mb-8 text-sm text-gray-300 leading-relaxed">
                            Das ist völlig normal bei direkten Downloads. Du kannst die Warnung
                            bedenkenlos ignorieren und in deinen Einstellungen <strong className="text-cyan-400">"Installation aus unbekannten Quellen"</strong> zulassen.
                        </p>

                        {/* Die Buttons: items-center zentriert sie, !m-0 killt versteckte Abstände deiner CSS-Klasse */}
                        <div className="flex justify-center items-center gap-4 mt-6">

                            {/* Box 1: Abbrechen */}
                            {/* Beide Elemente sind jetzt <button> Tags. So MUSS der Browser sie gleich behandeln! */}
                            <div className="flex justify-center gap-4 mt-8 w-full">

                                {/* Abbrechen Button */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-full text-gray-300 border border-gray-600 hover:bg-gray-800 hover:text-white transition-all font-medium"
                                >
                                    Abbrechen
                                </button>
                                <br />  

                                {/* Download Button (Jetzt auch ein <button> Tag!) */}
                                <button
                                    onClick={() => {
                                        // Wir triggern den Download per JavaScript, damit wir kein <a> Tag brauchen
                                        const link = document.createElement('a');
                                        link.href = '/downloads/app-release.apk';
                                        link.download = 'app-release.apk';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        setIsModalOpen(false); // Schließt das Fenster
                                    }}
                                >
                                    Jetzt herunterladen
                                </button>

                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}