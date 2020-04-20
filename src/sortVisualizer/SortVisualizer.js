import React, { useState, useEffect } from "react";
import { bubbleSortAnimations } from "../algorithms/BubbleSort";
import { insertionSortAnimations } from "../algorithms/InsertionSort";
import { mergeSortAnimations } from "../algorithms/MargeSort";
import { quickSortAnimations } from "../algorithms/QuickSort";
import "./SortVisualizer.css";

const SWAP_COLOR = "#4285f4"; //blue
const COMPARE_COLOR = "#34a853"; //green
const PRIMARY_COLOR = "#ea4335"; //red

const SortVisualizer = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [array, setArray] = useState([]);
    const [algorithm, setAlgorithm] = useState("bubbleSort");
    const [speed, setSpeed] = useState(10);

    const generateArray = () => {
        if (!isSorting) {
            const tempArray = [];
            for (let i = 0; i < arraySize; i++) {
                tempArray.push(Math.round(Math.random() * 96) + 2);
            }
            setArray(tempArray);
            //resetBarsColor();
        } else {
            window.location.reload(true);
        }
    };

    const updateSpeed = (event) => {
        if (!isSorting) setSpeed(event.target.value);
    };

    const updateArraySize = (event) => {
        if (!isSorting) setArraySize(event.target.value);
    };

    const updateAlgorithm = (event) => {
        if (!isSorting) setAlgorithm(event.target.value);
    };

    const startSorting = () => {
        if (isSorting) return;
        if (array.length != arraySize) return;
        setIsSorting(true);

        // animations is 3xN array
        // [0,x,y] - compare x,y bars
        // [1,x,y] - swap x,y bars
        // [2,x,y] - x value = y value
        let animations = [];

        switch (algorithm) {
            case "bubbleSort":
                animations = bubbleSortAnimations([...array]);
                break;
            case "insertionSort":
                animations = insertionSortAnimations([...array]);
                break;
            case "mergeSort":
                animations = mergeSortAnimations([...array]);
                return;
            case "quickSort":
                animations = quickSortAnimations([...array]);
                break;
            default:
                setIsSorting(false);
                return;
        }

        visualizeAnimations(animations, speed);
    };

    const visualizeAnimations = (animations, speed) => {
        let i = -1;
        let sortVisualizationInr = setInterval(() => {
            i++;

            const arrayBars = document.getElementsByClassName("array-bar");
            const barOneStyle = arrayBars[animations[i][1]].style;

            if (animations[i][0] === 0) {
                const barTwoStyle = arrayBars[animations[i][2]].style;
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor = COMPARE_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, speed);
            } else if (animations[i][0] === 1) {
                const barTwoStyle = arrayBars[animations[i][2]].style;
                const tmpBarOneHeight = barOneStyle.height;
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SWAP_COLOR;
                barOneStyle.height = `${parseInt(barTwoStyle.height)}%`;
                barTwoStyle.height = `${parseInt(tmpBarOneHeight)}%`;
                setTimeout(() => {
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, speed);
            } else if (animations[i][0] === 2) {
                barOneStyle.backgroundColor = SWAP_COLOR;
                barOneStyle.height = `${parseInt(animations[i][2])}%`;
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                }, speed);
            }
            if (i == animations.length - 1) {
                printSuccess();
                clearInterval(sortVisualizationInr);
            }
        }, speed);
    };

    const printSuccess = () => {
        const arrayBars = document.getElementsByClassName("array-bar");
        let i = -1;
        let finish = setInterval(() => {
            i++;
            arrayBars[i].classList.add(".active-array-bar");

            if (i == arrayBars.length - 1) {
                setIsSorting(false);
                clearInterval(finish);
            }
        }, 20);
    };

    const resetBarsColor = () => {
        const arrayBars = document.getElementsByClassName("array-bar");
        if (arraySize == arrayBars.length)
            for (let i = 0; i < arrayBars.length; i++)
                arrayBars.style.backgroundColor = PRIMARY_COLOR;
    };

    return (
        <div
            className={`SortVisualizer ${
                darkMode ? "dark-mode" : "light-mode"
            }`}
        >
            <header>
                <nav>
                    <button className="nav-item" onClick={startSorting}>
                        Sort
                    </button>
                    <select
                        className="nav-item"
                        onChange={updateSpeed}
                        value={speed}
                    >
                        <option value="100">Very slow</option>
                        <option value="50">Slow</option>
                        <option value="10">Medium</option>
                        <option value="5">Fast</option>
                        <option value="1">Very Fast</option>
                    </select>
                    <select
                        className="nav-item"
                        onChange={updateAlgorithm}
                        value={algorithm}
                    >
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
