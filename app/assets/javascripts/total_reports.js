function drawPies() {

	var fail_data = {
			"A":[20,80],
			"B":[20,80],
			"C":[20,80],
			"D":[20,80]
			};

	var test_fail_svg = d3.select("#test_fail_box_1")
						.append("svg")
						.attr("width",540)
						.attr("height",120);

	var arc = d3.svg.arc()
			.outerRadius(45)
			.innerRadius(22);

	var innerarc = d3.svg.arc()
				.outerRadius(29)
				.innerRadius(22);

	var pie = d3.layout.pie()
				.sort(null)
				.value(function (d) {return d});

	var pieA = test_fail_svg.selectAll(".arc A")
				.data(pie(fail_data.A))
				.enter()
				.append("g")
				.attr("transform", "translate(50,60)")
				.attr("class","arc");
	pieA.append("path")
		.attr("d",arc)
		.style("fill",function (d, i) {if (i==1) return "#C1633E"; else return "#EA7C4B";});
	pieA.append("path")
		.attr("d",innerarc)
		.style("fill",function (d, i) {if (i==1) return "#A35338"; else return "#CE6C46";});
	pieA.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy","0.3em")
		.attr("fill","white")
		.style("text-anchor", "middle")
		.text(function (d, i) {if (i==1) return "80"; else return "20";});

	var pieB = test_fail_svg.selectAll(".arc B")
				.data(pie(fail_data.B))
				.enter()
				.append("g")
				.attr("transform", "translate(160,60)")
				.attr("class","arc");
	pieB.append("path")
		.attr("d",arc)
		.style("fill",function (d, i) {if (i==1) return "#BF7593"; else return "#ED9FBD";});
	pieB.append("path")
		.attr("d",innerarc)
		.style("fill",function (d, i) {if (i==1) return "#8E516D"; else return "#CE91AA";});
	pieB.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy","0.3em")
		.attr("fill","white")
		.style("text-anchor", "middle")
		.text(function (d, i) {if (i==1) return "80"; else return "20";});

	var pieC = test_fail_svg.selectAll(".arc C")
				.data(pie(fail_data.C))
				.enter()
				.append("g")
				.attr("transform", "translate(270,60)")
				.attr("class","arc");
	pieC.append("path")
		.attr("d",arc)
		.style("fill",function (d, i) {if (i==1) return "#34989A"; else return "#52C4D0";});
	pieC.append("path")
		.attr("d",innerarc)
		.style("fill",function (d, i) {if (i==1) return "#2D7C7C"; else return "#3AA4A7";});
	pieC.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy","0.3em")
		.attr("fill","white")
		.style("text-anchor", "middle")
		.text(function (d, i) {if (i==1) return "80"; else return "20";});

	var pieD = test_fail_svg.selectAll(".arc D")
				.data(pie(fail_data.D))
				.enter()
				.append("g")
				.attr("transform", "translate(380,60)")
				.attr("class","arc");
	pieD.append("path")
		.attr("d",arc)
		.style("fill",function (d, i) {if (i==1) return "#A28BBC"; else return "#D6B6EF";});
	pieD.append("path")
		.attr("d",innerarc)
		.style("fill",function (d, i) {if (i==1) return "#826CA3"; else return "#BBA3D1";});
	pieD.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy","0.3em")
		.attr("fill","white")
		.style("text-anchor", "middle")
		.text(function (d, i) {if (i==1) return "80"; else return "20";});

	var rank_text = test_fail_svg.append("g").attr("class","rank_label");
	rank_text.append("text").attr("transform","translate(50,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("A");
	rank_text.append("text").attr("transform","translate(160,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("B");
	rank_text.append("text").attr("transform","translate(270,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("C");
	rank_text.append("text").attr("transform","translate(380,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("D");

}

function drawDeviceFailure () {

	var data = [
		{
			"device_name":"Galaxy S2",
			"os_version":"2.3",
			"fail_data":[{"num":4,"place":0,"list":[]},{"num":3,"place":4,"list":[]},{"num":2,"place":7,"list":[]},{"num":1,"place":9,"list":[]}]
		},
		{
			"device_name":"LG Optimus",
			"os_version":"2.2",
			"fail_data":[{"num":4,"place":0,"list":[]},{"num":3,"place":4,"list":[]},{"num":2,"place":7,"list":[]},{"num":1,"place":9,"list":[]}]
		},
		{
			"device_name":"Nexus S",
			"os_version":"2.3",
			"fail_data":[{"num":4,"place":0,"list":[]},{"num":3,"place":4,"list":[]},{"num":2,"place":7,"list":[]},{"num":1,"place":9,"list":[]}]
		},
		{
			"device_name":"Nexus 7",
			"os_version":"4.4",
			"fail_data":[{"num":4,"place":0,"list":[]},{"num":3,"place":4,"list":[]},{"num":2,"place":7,"list":[]},{"num":1,"place":9,"list":[]}]
		},
		{
			"device_name":"Galaxy S4",
			"os_version":"4.3",
			"fail_data":[{"num":4,"place":0,"list":[]},{"num":3,"place":4,"list":[]},{"num":2,"place":7,"list":[]},{"num":1,"place":9,"list":[]}]
		}
	]

	var fail_by_device_svg = d3.select("#test_fail_bar_graph").append("svg")
								.attr("width",700).attr("height",350);

	var y_domain = [];
	for (var each in data) {
		y_domain.push(data[each].device_name);
	}

	var x_scale = d3.scale.linear().domain([0,10]).range([120,600]);
	var y_scale = d3.scale.ordinal().domain(y_domain).rangeRoundBands([300,30],0.3,0.3);

	var x_axis = fail_by_device_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,300)")
				.call(d3.svg.axis()
					.scale(x_scale)
					.innerTickSize(3)
					.outerTickSize(0));

	var y_axis = fail_by_device_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(120,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.orient("left"));

	var columns = fail_by_device_svg.selectAll("g column")
		.data(data).enter().append("g")
			.attr("class","device_row")
			.attr("transform",function (d) {return "translate(120,"+y_scale(d.device_name)+")"})
		.selectAll("rect")
		.data(function (d) {return d.fail_data}).enter();
	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.num)-x_scale(0);}).attr("height",40)
			.attr("x",function (d) {return x_scale(d.place)-x_scale(0);}).attr("y",0)
			.attr("fill",function (d, i) {if (i==0) return "#EA7C4B"; else if (i==1) return "#ED9FBD"; else if (i==2) return "#52C4D0"; else return "#D6B6EF";});
	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.num)-x_scale(0);}).attr("height",8)
			.attr("x",function (d) {return x_scale(d.place)-x_scale(0);}).attr("y",32)
			.attr("fill",function (d, i) {if (i==0) return "#C1633E"; else if (i==1) return "#BF7593"; else if (i==2) return "#34989A"; else return "#A28BBC";});

}
