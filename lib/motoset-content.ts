// Gemeinsame Inhalte für die MotoSet-Onepager-Designvarianten.

export const MS_SCREENS = [
  "/assets/images/motoset-00.jpg",
  "/assets/images/motoset-01.jpg",
  "/assets/images/motoset-02.jpg",
  "/assets/images/motoset-03.jpg",
  "/assets/images/motoset-04.jpg",
  "/assets/images/motoset-05.jpg",
  "/assets/images/motoset-06.jpg",
  "/assets/images/motoset-07.jpg",
];

export const MS_MARQUEE = [
  "Setup", "Suspension", "Trackday", "Offline", "Versioniert", "Pro Bike",
  "Gabel", "Dämpfer", "Vorspannung", "Zugstufe", "Druckstufe",
];

export const MS_FEATURES: { icon: string; title: string; text: string }[] = [
  { icon: "🏍️", title: "Setups pro Bike", text: "Jedes Motorrad bekommt sein eigenes Profil mit allen Fahrwerks-Werten – sauber getrennt, nie wieder vertauscht." },
  { icon: "🕓", title: "Versioniert", text: "Jede Änderung wird gespeichert. Ein Setup war besser? Hol den alten Stand in Sekunden zurück." },
  { icon: "📡", title: "100% Offline", text: "Funktioniert ohne Netz – genau da, wo du es brauchst: in der Box am Trackday." },
  { icon: "⚡", title: "Sofort abrufbar", text: "Gabel, Dämpfer, Zug- & Druckstufe – in Sekunden nachgeschlagen statt im Zettelchaos gesucht." },
];

export const MS_LINKS = {
  apk: "/downloads/motoset.apk",
  web: "https://motoset-2d516.web.app/",
};

export const MS_LEAD =
  "Schluss mit Zetteln, Fotos und Excel. MotoSet speichert jedes Fahrwerks-Setup pro Bike – versioniert, blitzschnell abrufbar und offline am Trackday.";
