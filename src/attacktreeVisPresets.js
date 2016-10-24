const R = require('ramda');


const normal = {
	layout: 'regular',
	showSimilarity: false,
	overrideEdgeStyle: (props, d, index) => {
		if (!props.highlightNodeIds
			|| !props.highlightNodeIds.length) {
			return {
				strokeOpacity: 1,
			};
		}

		if (R.contains(d.data.id, props.highlightNodeIds)) {
			return {
				strokeWidth: 4,
				strokeOpacity: 1,
			};
		} else {
			return {
				strokeOpacity: 0.25,
			};
		}
	},
};


const similarity = {
	showSimilarity: true,
	overrideEdgeStyle: (props, d, index) => {
		return {
			strokeWidth: 20,
		};
	},
};


const frequency = normal;


const presets = { normal, similarity, frequency };
module.exports = R.keys(presets)
	.reduce((acc, name) => {
		acc[name] = R.merge(
			presets[name],
			{
				overrideEdgeStyle: (props) => R.partial(
					presets[name].overrideEdgeStyle,
					[props]
				),
			}
		);
		return acc;
	}, {});
