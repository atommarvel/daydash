class CollapsibleContainer extends React.Component {

    render() {
        let result;
        if (this.props.isCollapsed) {
            result = (<div onClick={this.props.toggleCollapse}>....</div>);
        } else {
            result =
            (<div onClick={this.props.toggleCollapse}>
                {this.props.children}
            </div>);
        }
        return result;
    }
}

module.exports = CollapsibleContainer;