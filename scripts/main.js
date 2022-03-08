function plotIce() {
	iceCaps.then(function (ice) {
		let i = [];
		for (datum of ice) {
			i.push([datum['Year'], datum['Antarctica Ice Mass Variation (Gigatonnes)']]);
		}

		Highcharts.chart('statsGraph', {
			chart: {
				zoomType: 'x'
			},
			title: {
				text: 'Antarctica Ice Mass Variation'
			},
			subtitle: {
				text: 'Source: NASA'
			},
			xAxis: {
				title: {
					text: 'Year'
				}
			},
			yAxis: {
				title: {
					text: 'Ice Mass Variation (Gigatonnes)'
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				type: 'line',
				name: 'Ice Mass Variation',
				data: i,
				color: 'red'
			}]
		})
	});
	let text = "<ul> <li>The thickness of ice caps has decreased by <b>40%</b> since the 1960s</li> <li>Current Rate: <b>9% per decade</b></li> <li>In the last century, sea level has risen by <b>2 inches</b></li> </ul>";
	document.getElementById("firstInfo").innerHTML = text;
}

function plotTemp() {
	globalTemp.then(function (tmps) {
		let temps = [];
		for (datum of tmps) {
			temps.push([datum['Year'], datum['Mean Annual Temp']]);
		}

		Highcharts.chart('statsGraph', {
			chart: {
				zoomType: 'x'
			},
			title: {
				text: 'Global Temperature'
			},
			subtitle: {
				text: 'Source: Berkeley Earth'
			},
			xAxis: {
				title: {
					text: 'Year'
				}
			},
			yAxis: {
				title: {
					text: 'Mean Temperature (Celsius)'
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				type: 'line',
				name: 'Global Temperature',
				data: temps,
				color: 'red'
			}]
		})
	});
	let text = "<ul><li>Temperature has increased at an average rate of <b>0.07°C per decade</b> since 1880</li> <li>Annual mean rise in temperature over last decade: <b>0.24°C</b></li><li>Rate has over <b>tripled</b> since 1880!</li></ul>";
	document.getElementById("firstInfo").innerHTML = text;
}

function plotCarbon() {
	carbon.then(function (c) {
		let car = [];
		for (datum of c) {
			car.push([datum['Yearly Global CO2 Emission']]);
		}
		Highcharts.chart('statsGraph', {
			chart: {
				inverted: true,
				polar: true
			},
			title: {
				text: 'Annual Carbon Emissions'
			},
			subtitle: {
				text: 'Source: NOAA'
			},
			tooltip: {
				outside: true
			},
			pane: {
				startAngle: 0,
				endAngle: 270
			},
			xAxis: {
				tickInterval: 1,
				labels: {
					align: 'right',
					useHTML: true,
					allowOverlap: true,
					step: 1,
					style: {
						fontSize: '13px'
					}
				},
				lineWidth: 0,
				categories: [
					'1970s',
					'1980s',
					'1990s',
					'2000s',
					'2010s'
				]
			},
			yAxis: {
				crosshair: {
					enabled: true,
					color: '#333'
				},
				lineWidth: 0,
				tickInterval: 100,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				min: 3700
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.25
				}
			},
			series: [{
				name: 'Annual Carbon Emissions (ppm)',
				type: 'column',
				data: car,
				color: 'red'
			}]
		});
	});
	let text = "<ul><li>Since 1970's, CO2 emissions have increased by about <b>90%</b></li> <li>Air pollution kills <b>9 million people</b> every year</li></ul>";
	document.getElementById("firstInfo").innerHTML = text;
}

function plotTree1() {
	tree1.then(function (tr) {
		let i = [];
		for (datum of tr) {
			i.push({name: datum['Country'], value: datum['CO2 emissions (GT)'], colorValue: datum['CO2 emissions (GT)']});
		}
		Highcharts.chart('treeMap1', {
			colorAxis: {
				minColor: 'white',
				maxColor: Highcharts.getOptions().colors[8],
				min: 0,
				max: 10
			},
			legend: {
				title: {
					text: 'CO2 Emissions in Gigatonnes',
				}
			},
			series: [{
				type: 'treemap',
				layoutAlgorithm: 'squarified',
				data: i
			}],
			title: {
				text: 'CO2 Emissions by Country'
			},
			subtitle: {
				text: 'Source: UCS USA'
			}
		})
	}); 
}

function plotTree2() {
	Highcharts.chart('treeMap2', {
		series: [{
			type: "treemap",
			layoutAlgorithm: 'stripes',
			alternateStartingDirection: true,
			levels: [{
				level: 1,
				layoutAlgorithm: 'sliceAndDice',
				dataLabels: {
					enabled: true,
					align: 'left',
					verticalAlign: 'top'
				}
			}],
			data: [{
				id: 'Used',
				name: 'Used Emissions',
				color: Highcharts.getOptions().colors[3]
			}, {
				id: 'Future',
				name: 'Future Emissions',
				color: 'lightgrey'
			}, {
				name: 'Up until 2007',
				parent: 'Used',
				value: 2200
			}, {
				name: '2008-2017',
				parent: 'Used',
				value: 400
			}, {
				name: '2018-2028',
				parent: 'Future',
				value: 240
			}, {
				name: '2028-2037',
				parent: 'Future',
				value: 200
			}, {
				name: '2038-2049',
				parent: 'Future',
				value: 140
			}]
		}],
		title: {
			text: 'Carbon Budget (in billion tons)'
		},
		subtitle: {
			text: 'Source: National Geographic'
		}
	});
}

async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
	globalTemp = loadJSON('./data/Mean_Temp.json');
	carbon = loadJSON('./data/carbon_emission.json');
	iceCaps = loadJSON('./data/ice_caps.json');
	tree1 = loadJSON('./data/treemap1.json');
	plotTree1();
	plotTree2();
}

document.addEventListener('DOMContentLoaded', init, false);

