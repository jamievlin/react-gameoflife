interface AppState {
    checkedState: boolean[][]
    intervalId: number | undefined
};

function get_or_default<T>(arr: T[][], idx: [number, number], defaultReturn: T) : T {
    if (0 <= idx[0] && idx[0] < arr.length) {
        if (0 <= idx[1] && idx[1] < arr[idx[0]].length) {
            return arr[idx[0]][idx[1]]
        }
    }
    return defaultReturn;
}

function countneighbors(arr: boolean[][], idx: [number, number]): number {
    const searchIdx = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    let neighbors = searchIdx.map(([dx, dy]) =>
        get_or_default(arr, [idx[0] + dx, idx[1] + dy], false));
    return neighbors.filter(v => v).length;

}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
                checkedState: Array.from({ length: props.width }).map((_, i) => {
                    return Array.from({ length: props.height }).map((__, j) => Math.random() < 0.1 ? true : false)
                }),
                intervalId: undefined
        };
        // this.handleCellChange = this.handleCellChange.bind(this);
    }

    invert = () => {
        this.setState(oldState => { return {
            checkedState: oldState.checkedState.map(v => v.map(w => !w))
        };});
    }

    step = () => {
        let newArray: boolean[][] = this.state.checkedState.map((varr, i) => {
            let newSubArr = varr.map((v, j) => {
                let neighborCount = countneighbors(this.state.checkedState, [i, j]);
                if (neighborCount < 2 || neighborCount > 3) {
                    return false;
                } else if (neighborCount === 2) {
                    return v;
                } else { // neighborCount === 3
                    return true;
                }
            });
            return newSubArr;
        });

        console.log('hello?')
        this.setState(oldState => { return {
            checkedState: newArray
        }; });
    }

    startTick = () => {
        if (this.state.intervalId === undefined) {
            let newIntervalId = setInterval(this.step, 100)
            this.setState(_ => { return {
                intervalId: newIntervalId
            }});
        }
    }

    stop = () => {
        clearInterval(this.state.intervalId);
        this.setState(_ => {
            return {
                intervalId: undefined
            }
        });
    }

    /*
    randomize = () => {
        this.setState(oldState => {
            return {
                checkedState: oldState.checkedState.map(v => Math.random() < 0.5 ? true : false)
            };
        });
    }
    */

    handleCellChange = (index: [number, number], checked: boolean) => {
        console.log(`checked index: ${index}, checked=${checked}`);
        let newArray = [...this.state.checkedState];
        newArray[index[0]] = [...this.state.checkedState[index[0]]]
        newArray[index[0]][index[1]] = checked;
        this.setState(oldState => { return {
            checkedState: newArray
        };});

    }

    render() {
        return (
        <>
            <table><tbody>{
                this.state.checkedState.map((v, i) => (
                    <tr>
                    { v.map((f: boolean, j: number) => (
                            <th>
                            <Cell
                            key={[i,j].toString()} idx={[i,j]}
                            initCheckedState={f}
                            changeFn={this.handleCellChange}
                            />
                            </th>
                            ))
                    }
                    </tr>))
                    }</tbody></table>
                <br />
                number checked: {
                    this.state.checkedState.reduce((ps, arr) =>
                        ps + arr.filter(v => v).length, 0)}
                <button onClick={this.step}>step</button>
                <button onClick={this.startTick}>start</button>
                <button onClick={this.stop}>stop</button>

                {/* <button onClick={this.randomize}>randomize</button> */}
        </>);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('reactapp')
);