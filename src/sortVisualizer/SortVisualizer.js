import React, { useState, useEffect } from "react";
import { bubbleSortAnimations } from "../algorithms/BubbleSort";
import { mergeSortAnimations } from "../algorithms/MargeSort";
import "./SortVisualizer.css";
//import { bubbleSortAnimations } from "./algorithms/BubbleSort";

const ANIMATION_SPEED_MS = 10;

const PRIMARY_BAR_COLOR = "#824396";
const ACTIVE_BAR_COLOR = "green";

const SortVisualizer = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [array, setArray] = useState([]);
    const [algorithm, setAlgorithm] = useState("bubbleSort");

    const generateArray = () => {
        console.log(isSorting);
        if (!isSorting) {
            const tempArray = [];
            for (let i = 0; i < arraySize; i++) {
                tempArray.push(Math.round(Math.random() * 96) + 2);
            }
            setArray(tempArray);
        }
    };

    useEffect(generateArray, [setArray]);

    const updateArraySize = (event) => {
        if (!isSorting) setArraySize(event.target.value);
    };

    const updateAlgorithm = (event) => {
        if (!isSorting) setAlgorithm(event.target.value);
    };

    const startSorting = () => {
        setIsSorting(true);
        switch (algorithm) {
            case "bubbleSort":
                bubbleSort();
                break;
            // case "insertionSort": insertionSort();
            case "mergeSort":
                mergeSort();
                break;
            // case "quickSort": quickSort();
            default:
                setIsSorting(false);
                break;
        }
    };
    //--------------------------------------------------
    //--------------------merge sort------------------
    //--------------------------------------------------

    const mergeSort = () => {
        const animations = mergeSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color =
                    i % 3 === 0 ? ACTIVE_BAR_COLOR : PRIMARY_BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}%`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setIsSorting(false);
    };

    //--------------------------------------------------
    //--------------------bubble sort-----------------
    //--------------------------------------------------

    const bubbleSort = () => {
        const animations = bubbleSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");

            setTimeout(() => {
                const barOneStyle = arrayBars[animations[i][1]].style;
                const barTwoStyle = arrayBars[animations[i][2]].style;
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_BAR_COLOR;
            }, i * ANIMATION_SPEED_MS);

            if (animations[i][0] === 1) {
                setTimeout(() => {
                    const barOneStyle = arrayBars[animations[i][1]].style;
                    const tmpBarOneHeight = barOneStyle.height;
                    const barTwoStyle = arrayBars[animations[i][2]].style;

                    barOneStyle.height = `${parseInt(barTwoStyle.height)}%`;
                    barTwoStyle.height = `${parseInt(tmpBarOneHeight)}%`;
                }, i * ANIMATION_SPEED_MS);
            } else if (animations[i][0] === 0) {
                setTimeout(() => {
                    const barOneStyle = arrayBars[animations[i][1]].style;
                    const barTwoStyle = arrayBars[animations[i][2]].style;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor = ACTIVE_BAR_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setIsSorting(false);
    };
    //--------------------------------------------------
    //--------------------bubble sort-----------------
    //--------------------------------------------------
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
