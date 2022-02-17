interface CellIntf {
    idx: [number, number],
    initCheckedState: boolean,
    changeFn: any
}

class Cell extends React.Component<CellIntf> {
    constructor(props: CellIntf) {
        super(props);
    }

    onCheck: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.props.changeFn(this.props.idx, e.target.checked);
    }

    render() {
        return (
            <input
                type="checkbox"
                key={ this.props.idx.toString() }
                checked={ this.props.initCheckedState }
                onChange={ this.onCheck }></input>
        );
    }
}