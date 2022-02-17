interface AppState {
    checkedState: boolean[][]
};

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
                checkedState: Array.from({ length: 20 }).map((_, i) => {
                    return Array.from({ length: 30 }).map((__, j) => Math.random() < 0.5 ? true : false)
                })
        };
        // this.handleCellChange = this.handleCellChange.bind(this);
    }

    invert = () => {
        this.setState(oldState => { return {
            checkedState: oldState.checkedState.map(v => v.map(w => !w))
        };});
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
                <button onClick={this.invert}>invert</button>
                {/* <button onClick={this.randomize}>randomize</button> */}
        </>);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('reactapp')
);