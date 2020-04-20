const PRIMARY_BAR_COLOR = "#ea4335";
const ACTIVE_BAR_COLOR = "#4285f4";
const SWAP_BAR_COLOR = "#34a853";

let i = -1;

const vizualizeAnimations = (animations, speed) => {
    let sortVisualizationInr = setInterval(() => {
        i++;

        const arrayBars = document.getElementsByClassName("array-bar");
        const barOneStyle = arrayBars[animations[i][1]].style;

        if (animations[i][0] === 0) {
            const barTwoStyle = arrayBars[animations[i][2]].style;
            barOneStyle.backgroundColor = barTwoStyle.backgroundColor = ACTIVE_BAR_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_BAR_COLOR;
            }, speed);
        } else if (animations[i][0] === 1) {
            const barTwoStyle = arrayBars[animations[i][2]].style;
            const tmpBarOneHeight = barOneStyle.height;
            barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SWAP_BAR_COLOR;
            barOneStyle.height = `${parseInt(barTwoStyle.height)}%`;
            barTwoStyle.height = `${parseInt(tmpBarOneHeight)}%`;
            setTimeout(() => {
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_BAR_COLOR;
            }, speed);
        } else if (animations[i][0] === 2) {
            barOneStyle.backgroundColor = SWAP_BAR_COLOR;
            barOneStyle.height = `${parseInt(animations[i][2])}%`;
            setTimeout(() => {
                barOneStyle.backgroundColor = PRIMARY_BAR_COLOR;
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

export default vizualizeAnimations;
