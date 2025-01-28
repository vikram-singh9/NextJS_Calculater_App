"use client"; // Mark this as a Client Component

import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        const calculatedResult = eval(input).toString();
        setResult(calculatedResult);
        setShowResult(true);
        setTimeout(() => setShowResult(false), 1000); // Popup effect
      } catch (error) {
        setResult("Error");
        setShowResult(true);
        setTimeout(() => setShowResult(false), 1000); // Popup effect
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
        {/* Display */}
        <div className="mb-4 relative">
          <div className="text-right text-3xl font-semibold bg-gray-100 p-4 rounded-lg">
            {input || "0"}
          </div>
          {showResult && (
            <div className="absolute top-0 right-0 transform -translate-y-full bg-green-500 text-white px-4 py-2 rounded-lg text-lg animate-popup">
              {result}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {[
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+",
            "C",
          ].map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className={`p-5 text-xl font-semibold rounded-lg transition-all duration-200 ${
                button === "="
                  ? "col-span-2 bg-green-500 hover:bg-green-600 text-white"
                  : button === "C"
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : button === "/" || button === "*" || button === "-" || button === "+"
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}