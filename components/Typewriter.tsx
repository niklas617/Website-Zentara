"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Typewriter.module.css";

const words = ["kreativ", "verständlich", "innovativ", "inspirierend", "digital affin", "verlässlich",];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Tipp-Logik
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500); // Pause wenn Wort fertig
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150); // Löschen geht schneller als Tippen

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.staticText}>
        <Link href="/offer" className="logo">
          Zentara
        </Link>{" "}
        ist 
      </span>
      <span className={styles.dynamicBox}>
        {words[index].substring(0, subIndex)}
        <span className={styles.cursor}>_</span>
      </span>
    </div>
  );
}
