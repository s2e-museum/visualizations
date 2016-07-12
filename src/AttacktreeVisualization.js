import React from 'react';
import autobind from 'class-autobind';
import { hierarchy as d3Hierarchy } from 'd3-hierarchy';

import Visualization from './Visualization.js';
import attacktreeVis from './visualizations/attacktree.js';


export default class AttacktreeVisualization extends React.Component {
	constructor(props) {
		super(props);
		autobind(this);

		this.state = {
			data: null,
		};
	}

	componentWillMount() {
		this.updateVisualizationData(this.props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.attacktree !== this.props.attacktree) {
			this.updateVisualizationData(nextProps);
		}
		return false;
	}

	updateVisualizationData(props) {
		const { attacktree } = props;
		if (!attacktree) { return; }

		const hierarchy = d3Hierarchy(
			attacktree.node[0],
			(d) => d.node
		);
		this.setState(
			{ data: hierarchy },
			() => { this.forceUpdate(); }
		);
	}

	render() {
		const props = this.props;
		const state = this.state;
		return <Visualization
			visualization={attacktreeVis}
			data={state.data}
			layout={props.layout}
		/>;
	}
}

AttacktreeVisualization.propTypes = {
	attacktree: React.PropTypes.object/*.isRequired*/,
	layout: React.PropTypes.string.isRequired,
};

AttacktreeVisualization.defaultProps = {
	layout: 'regular',
};
