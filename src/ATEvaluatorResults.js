/**
 * attack tree evaluator results
 *
 * @module visualizations/components/ATEvaluatorResults
 */

import React from 'react';
import autobind from 'class-autobind';
const R = require('ramda');

import Visualization from './Visualization.js';
import ateVis from './visualizations/ate.js';

const sortByProbability = R.sortBy(R.prop('probability'));


function isProfitable(profit, item) {
	return profit > item.cost;
}


export default class ATEvaluatorResults extends React.Component {
	constructor(props) {
		super(props);
		autobind(this);
	}

	onHover(item, index, event) {
		// event.preventDefault();
		this.props.onHover(item);
	}

	onHoverOut(/*item, index, */event) {
		// event.preventDefault();
		this.props.onHoverOut(/*item*/);
	}

	onSelect(item, index, event) {
		if (event) { event.preventDefault(); }
		this.props.onSelect(item, index);
	}

	renderRow(item, index) {
		return <tr
			key={index}
			onMouseEnter={R.partial(this.onHover, [item, index])}
			onMouseOut={R.partial(this.onHover, [/*item, index*/])}
			onClick={R.partial(this.onSelect, [item, index])}
		>
			<td>{item.probability}</td>
			<td>{item.cost}</td>
		</tr>;
	}

	renderTable(data) {
		return <table>
			<thead>
				<tr>
					<td>Probability</td>
					<td>Cost</td>
				</tr>
			</thead>
			<tbody>
				{data.map(this.renderRow)}
			</tbody>
		</table>;
	}

	render() {
		const { props } = this;

		const sorted = sortByProbability(props.data)
			.map((item) => {
				if (props.profit) {
					return Object.assign(
						{},
						item,
						{ profitable: isProfitable(props.profit, item) }
					);
				}
				return item;
			})
			.reverse();

		const data = {
			results: sorted,
			profit: props.profit,
		};

		const style = {
			height: props.height || '100%',
			width: props.width || '100%'
		};

		return <div className='ATEvaluatorResults'>
			{(!data.results.length)
				? <div>No attacks found</div>
				: <div style={style}>
					<Visualization
						visualization={ateVis}
						data={data}
						{...R.omit([
							'data',
							'profit',
							'showTable',
						], props)}
					/>
				</div>
			}
			{(props.showTable)
				? <div>{this.renderTable(sorted)}</div>
				: null
			}
		</div>;
	}
}

ATEvaluatorResults.propTypes = {
	data: React.PropTypes.array,
	profit: React.PropTypes.number,
	height: React.PropTypes.number,
	width: React.PropTypes.number,
	showTable: React.PropTypes.bool,
	onHover: React.PropTypes.func,
	onHoverOut: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	selectedIndex: React.PropTypes.number,
};

ATEvaluatorResults.defaultProps = {
	data: [],
	height: 400,
	width: 0,
	showTable: false,
	onHover: () => {},
	onHoverOut: () => {},
	onSelect: () => {},
};
