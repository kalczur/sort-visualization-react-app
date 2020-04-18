import React, { useState, useEffect } from "react";
import { bubbleSortAnimations } from "../algorithms/BubbleSort";
import { mergeSortAnimations } from "../algorithms/MargeSort";
import { quickSortAnimations } from "../algorithms/QuickSort";
import "./SortVisualizer.css";
//import { bubbleSortAnimations } from "./algorithms/BubbleSort";

const ANIMATION_SPEED_MS = 10;
const PRIMARY_BAR_COLOR = "#a74f53";
const ACTIVE_BAR_COLOR = "green";

const SortVisualizer = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [array, setArray] = useState([]);
    const [algorithm, setAlgorithm] = useState("bubbleSort");

    const generateArray = () => {
        if (!isSorting) {
            const tempArray = [];
            for (let i = 0; i < arraySize; i++) {
                tempArray.push(Math.round(Math.random() * 96) + 2);
            }
            setArray(tempArray);
        } else {
            window.location.reload(true);
        }
    };

    const updateArraySize = (event) => {
        if (!isSorting) setArraySize(event.target.value);
    };

    const updateAlgorithm = (event) => {
        if (!isSorting) setAlgorithm(event.target.value);
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

    const startSorting = () => {
        if (isSorting) return;
        if (array.length != arraySize) return;
        setIsSorting(true);
        let animations = [];

        switch (algorithm) {
            case "bubbleSort":
                animations = bubbleSortAnimations([...array]);
                break;
            // case "insertionSort": //TO DO
            //insertionSort();
            //break;
            case "mergeSort":
                mergeSort();
                return;
            case "quickSort":
                animations = quickSortAnimations([...array]);
                break;
            default:
                setIsSorting(false);
                return;
        }

        let i = -1;

        let sortVisualizationInr = setInterval(() => {
            i++;

            const arrayBars = document.getElementsByClassName("array-bar");
            const barOneStyle = arrayBars[animations[i][1]].style;
            const barTwoStyle = arrayBars[animations[i][2]].style;
            barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_BAR_COLOR;

            if (animations[i][0] === 0)
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor = ACTIVE_BAR_COLOR;
            else if (animations[i][0] === 1) {
                const tmpBarOneHeight = barOneStyle.height;
                barOneStyle.height = `${parseInt(barTwoStyle.height)}%`;
                barTwoStyle.height = `${parseInt(tmpBarOneHeight)}%`;
            }
            if (i == animations.length - 1) {
                printSuccess();
                clearInterval(sortVisualizationInr);
            }
        }, ANIMATION_SPEED_MS);
    };

    const mergeSort = () => {
        const animations = mergeSortAnimations([...array]);
        let i = -1;

        let sortVisualizationInr = setInterval(() => {
            i++;
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color =
                    i % 3 === 0 ? ACTIVE_BAR_COLOR : PRIMARY_BAR_COLOR;

                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            } else {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}%`;
            }
            if (i == animations.length - 2) {
                printSuccess();
                clearInterval(sortVisualizationInr);
            }
        }, ANIMATION_SPEED_MS);
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
