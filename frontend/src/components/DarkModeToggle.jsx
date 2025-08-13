import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex items-center h-6 rounded-full w-14 
        transition-colors duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        >
            {/* Sun icon (left) */}
            <Sun
                size={12}
                className="absolute left-1 text-yellow-400 pointer-events-none"
            />
            {/* Moon icon (right) */}
            <Moon
                size={12}
                className="absolute right-1 text-black-400 pointer-events-none"
            />

            {/* Knob */}
            <span
                className={`inline-block w-5 h-5 transform bg-white rounded-full 
          transition-transform duration-300 ${darkMode ? "translate-x-8" : "translate-x-1"
                    }`}
            />
        </button>
    );
}
