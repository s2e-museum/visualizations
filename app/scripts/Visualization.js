import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'class-autobind';


export default class Visualization extends React.Component {
	constructor(props) {
		super(props);
		autobind(this);
	}

	componentDidMount() {
		const props = this.props;
		this._d3RootSelection = props.vis.init(ReactDOM.findDOMNode(this));
		props.vis.update(this._d3RootSelection, props.data);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const props = this.props;
		props.vis.update(this._d3RootSelection, nextProps.data);
		return false;
	}

	componentDidUpdate() {
		console.warn('this should never be called');
		// this.props.vis.update(this._d3RootSelection, this.props.data);
	}

	render() {
		// const props = this.props;
		return <svg></svg>;
	}
}

Visualization.propTypes = {
	vis: React.PropTypes.object.isRequired,
	data: React.PropTypes.array,
	// dispatch: React.PropTypes.func,
};

Visualization.defaultProps = {
	data: [],
};