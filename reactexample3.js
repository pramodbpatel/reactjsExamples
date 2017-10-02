const Stars = (props) => {
    //const numberOfStars = 1 + Math.floor(Math.random() * 9);
    /* let stars = [];
    for (i = 0; i < numberOfStars; i++) {
        stars.push(
            <i key={i} className="fa fa-star"></i>
        );
    }; */
    return (
        <div className="col-5">
            {_
                .range(props.numberOfStars)
                .map(i =>< i key = {
                    i
                }
                className = "fa fa-star" > </i>)}
        </div>
    );
};
const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i>
            </button>;
            break;
        case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times"></i>
            </button>;
            break;
        default:
            button = <button
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length === 0}>=</button>;
            break;

    }
    return (
        <div className="col-2 text-center">
            {button}
            <br/><br/>
            <button
                className="btn btn-warning btn-sm"
                onClick={props.redraw}
                disabled={props.redraws === 0}>
                <i className="fa fa-refresh">&nbsp; {props.redraws}</i>
            </button>
        </div>
    );
};
const Answer = (props) => {
    return (
        <div className="col-5">
            {props
                .selectedNumbers
                .map((number, i) => <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>)}
        </div>
    );
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumber.indexOf(number) >= 0) {
            return 'used';
        };
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        };
    };
    return (
        <div className="card text-center">
            <div>
                {Numbers
                    .list
                    .map((number, i) => <span
                        key={i}
                        className={numberClassName(number)}
                        onClick={() => {
                        props.selectNumber(number)
                    }}>{number}</span>)}
            </div>
        </div>
    );
};
Numbers.list = _.range(1, 10);

class Game extends React.Component {
    state = {
        selectedNumbers: [],
        randomNumberofStars: 1 + Math.floor(Math.random() * 9),
        answerIsCorrect: 0,
        usedNumber: [],
        redraws: 5
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        this.setState(prevState => ({
            answerIsCorrect: 0,
            selectedNumbers: prevState
                .selectedNumbers
                .concat(clickedNumber)
        }));
    };
    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: 0,
            selectedNumbers: prevState
                .selectedNumbers
                .filter(number => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberofStars === prevState
                .selectedNumbers
                .reduce((acc, n) => acc + n, 0)
        }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumber: prevState
                .usedNumber
                .concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: 0,
            randomNumberofStars: 1 + Math.floor(Math.random() * 9)
        }));
    };
    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(prevState => ({
            randomNumberofStars: 1 + Math.floor(Math.random() * 9),
            selectedNumbers: [],
            answerIsCorrect: 0,
            redraws: prevState.redraws - 1
        }));
    };
    render() {
        const {selectedNumbers, randomNumberofStars, answerIsCorrect, usedNumber, redraws} = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={randomNumberofStars}/>
                    <Button
                        selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        answerIsCorrect={answerIsCorrect}
                        redraw={this.redraw}
                        redraws={redraws}/>
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                <br/>
                <Numbers
                    selectedNumbers={selectedNumbers}
                    selectNumber={this.selectNumber}
                    usedNumber={usedNumber}/>
            </div>
        );
    };
};

class App extends React.Component {
    render() {
        return (
            <div><Game/></div>
        );
    };
};
