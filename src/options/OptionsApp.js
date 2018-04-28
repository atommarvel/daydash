const OptionItemView = require('./OptionItemView.js');
const StorageClient = require('../data/StorageClient.js');

// TODO: Refactor to a more pleasant system:  https://app.asana.com/0/527712617898694/653479704881740/f
const initialState = {
    loaded: false,
    btnState: "noChanges",
    todoKey: {
        title: "Todoist API Key",
        type: "textboxOption",
        value: ""
    },
    calIds: {
        title: "Calendar Names",
        type: "calendarOption",
        value: ""
    },
    keys: ["todoKey", "calIds"]
};

class OptionsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.bindFuncs();
    }

    bindFuncs() {
        this.saveAll = this.saveAll.bind(this);
        this.optionChangeListener = this.optionChangeListener.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Options</h2>
                {this.renderOptions()}
                {this.renderSaveButton()}
            </div>
        );
    }

    renderOptions() {
        // Just show a loading screen if we don't have the data yet
        // TODO: Find a loading placeholder library or make one myself: https://app.asana.com/0/527712617898694/653528546808740/f
        if (!this.state.loaded) {
            return (<div>Loading...</div>);
        } else {
            let items = this.state.keys.map((key) => {
                return <OptionItemView data={this.state[key]} changeListener={this.optionChangeListener} key={key} storageKey={key}/>
            });

            return (
                <div>
                    {items}
                </div>
            );
        }
    }

    renderSaveButton() {
        let result;
        // TODO: Make save button states not just hard-coded strings: https://app.asana.com/0/527712617898694/653528546808741/f
        switch (this.state.btnState) {
            case "noChanges":
                result = (<div></div>);
                break;
            case "changes":
                result = (<button onClick={this.saveAll} className={"saveBtn"}>Save</button>);
                break;
            case "saving":
                result = (<div className={"saveBtn"}>Saving</div>);
                break;
            case "saved":
                result = (<div className={"saveBtn"}>Saved Options</div>);
        }
        return result;
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        let items = await StorageClient.getItems(this.state.keys);
        let newState = {};
        for (let key in items) {
            let data = this.state[key];
            data.value = items[key];
            newState[key] = data;
        }
        newState.loaded = true;
        this.setState(newState);
    }

    optionChangeListener(key, data) {
        let newState = this.state;
        newState[key].value = data;
        newState.btnState = "changes";
        this.setState(newState);
    }

    saveAll() {
        let data = {};
        this.state.keys.forEach((key) => {
            data[key] = this.state[key].value;
        });
        StorageClient.save(data).then(done => {
            this.setState({btnState: "saved"});
        });
        this.setState({btnState: "saving"});
        ping({onOptionsUpdated: true});
    }
}

// wrapper to save myself 22 characters to call this
function ping(msg, cb) {
    chrome.runtime.sendMessage(msg, cb);
}

module.exports = OptionsApp;