"use client"; // Wichtig in Next.js App-Router, da wir Interaktivität (Klicks) haben
import { useState } from "react";

export default function AppDownload() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* 1. Der erste Button, den der Nutzer auf der Website sieht */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="project-link-btn-download"
      >
        App herunterladen
      </button>

      {/* 2. Das Pop-up (Modal), das sich öffnet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#0a0a1f] border border-blue-500 p-8 rounded-xl max-w-md text-white">
            
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              Wichtiger Installations-Hinweis
            </h3>
            
            <p className="mb-4 text-sm text-gray-300">
              Da wir unsere App direkt anbieten und nicht über den Google Play Store, 
              wird dein Handy beim Öffnen der Datei eine <strong>Sicherheitswarnung</strong> anzeigen.
            </p>
            <p className="mb-6 text-sm text-gray-300">
              Das ist völlig normal bei direkten Downloads. Du kannst die Warnung 
              bedenkenlos ignorieren und in deinen Einstellungen <strong>"Installation aus unbekannten Quellen"</strong> zulassen.
            </p>

            <div className="flex gap-4">
              {/* Der Button, der das Fenster wieder schließt */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                Abbrechen
              </button>

              {/* Der ECHTE Download-Link zur APK-Datei */}
              <a 
                href="/downloads/app-release.apk" 
                download
                onClick={() => setIsModalOpen(false)} // Schließt das Fenster nach dem Klick
                className="project-link-btn-download"
              >
                Jetzt herunterladen
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}