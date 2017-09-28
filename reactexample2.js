const Card = (props) => {
    return (
        <div style={{
            margin: "1em"
        }}>
            <img scr={props.avatar_url} width="75"/>
            <div
                style={{
                display: "inline-block",
                margin: 10
            }}>
                <div
                    style={{
                    fontSize: "1.25em",
                    fontWeight: "bold"
                }}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props
                .cards
                .map(
                card =>< Card key = {
                    card.id
                }
                {
                    ...card
                } />)}
        </div>
    );
};

class Form extends React.Component {
    state = {
        userName: ''
    };
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Event: Form Sumit " + this.state.userName);
        axios
            .get('https://api.github.com/users/' + this.state.userName)
            .then((resp) => {
                this
                    .props
                    .onSubmit(resp.data);
                this.setState({userName: ''});
            })
            .catch(err => console.log("Error" + err))
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={(event) => this.setState({userName: event.target.value})}
                    placeholder="Github username"
                    required/>
                <button type="submit">Add card</button>
            </form>
        );
    };
};

class App extends React.Component {
    state = {
        cards: [/*{
                name: "Paul O’Shannessy",
                avatar_url: "https://avatars1.githubu…rcontent.com/u/8445?v=4",
                company: "Facebook"
            }, {
                name: "Ben Alpert",
                avatar_url: "https://avatars1.githubu…rcontent.com/u/8445?v=4",
                company: "Facebook"
            }*/
            ]
    };
    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState
                .cards
                .concat(cardInfo)
        }));
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards}/>
            </div>
        );
    };
};

ReactDOM.render(
    <App/>, mountNode);
