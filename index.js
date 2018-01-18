class WeekList extends React.Component {
    render() {
        return (
            <div>
                Week
                {this.dayCellsToRender()}
            </div>
        );
    }

    dayCellsToRender() {
        const daysAhead = [0,1,2,3,4,5,6];
        const dayCells = daysAhead.map(ahead => {
            return (
                <DayCell key={ahead.toString()} daysAhead={ahead}/>
            )
        });

        return dayCells;
    }
}

class DayCell extends React.Component {
    render() {
        return (
            <div>
                {this.props.daysAhead}
                <TodoView/>
                <CalView/>
            </div>
        );
    }
}

class TodoView extends React.Component {
    render() {
        return <div>Todo</div>;
    }
}

class CalView extends React.Component {
    render() {
        return <div>Calendar</div>;
    }
}


ReactDOM.render(
    (
        <div>
            <h1>Hello, Daydash!</h1>
            <WeekList/>
        </div>
    ),
document.getElementById('root')
);