import React, { useState, useEffect } from "react";
import "./SortVisualizer.css";

const SortVisualizer = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [array, setArray] = useState([]);

    const generateArray = () => {
        if (!isSorting) {
            const tempArray = [];
            for (let i = 0; i < arraySize; i++) {
                tempArray.push(Math.round(Math.random() * 98) + 2);
            }
            setArray(tempArray);
        }
    };

    useEffect(generateArray, []);

    const updateArraySize = (event) => {
        if (!isSorting) setArraySize(event.target.value);
    };

    return (
        <div
            className={`SortVisualizer ${
                darkMode ? "dark-mode" : "light-mode"
            }`}
        >
            <header>
                <nav>
                    <button className="nav-item">Sort</button>
                    <select className="nav-item">
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                    </select>
                    <select
                        className="nav-item"
                        onChange={updateArraySize}
                        value={arraySize}
                    >
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                    </select>
                    <button className="nav-item" onClick={generateArray}>
                        Generate
                    </button>
                    <div className="onoffswitch">
                        <input
                            type="checkbox"
                            name="onoffswitch"
                            className="onoffswitch-checkbox"
                            id="myonoffswitch"
                        />
                        <label
                            className="onoffswitch-label"
                            htmlFor="myonoffswitch"
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}
                        >
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                        </label>
                    </div>
                </nav>
            </header>

            <div className="visualizer-container">
                {array.map((barHeight, index) => (
                    <div
                        key={index}
                        className="array-bar"
                        style={{
                            height: `${barHeight}%`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SortVisualizer;
