const WeekList = require('./ui/WeekList.js');
const GreetingView = require('./ui/GreetingView.js');

ReactDOM.render(
    (
        <div>
            <GreetingView/>
            <WeekList/>
        </div>
    ),
document.getElementById('root')
);