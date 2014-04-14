
function projectsShow (fail_data) {

	var test_fail_svg, arc, innerarc, pie, pieA, pieB, pieC, pieD;

	var inner_radius=25;
	var outer_radius=50;

	function initialize() {

		test_fail_svg = d3.select("#test_fail_box")
							.append("svg")
							.attr("width",540)
							.attr("height",120);

		arc = d3.svg.arc()
				.outerRadius(outer_radius)
				.innerRadius(inner_radius);

		innerarc = d3.svg.arc()
					.outerRadius(inner_radius+8)
					.innerRadius(inner_radius);

		pie = d3.layout.pie()
					.sort(null)
					.value(function (d) {return d});

		pieA = test_fail_svg.selectAll(".arc A")
				.data(pie(fail_data.A))
				.enter()
				.append("g")
				.attr("transform", "translate(60,60)")
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
			.text(function (d) {return d.value});


		pieB = test_fail_svg.selectAll(".arc B")
				.data(pie(fail_data.B))
				.enter()
				.append("g")
				.attr("transform", "translate(180,60)")
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
			.text(function (d) {return d.value});


		pieC = test_fail_svg.selectAll(".arc C")
				.data(pie(fail_data.C))
				.enter()
				.append("g")
				.attr("transform", "translate(300,60)")
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
			.text(function (d) {return d.value});

		pieD = test_fail_svg.selectAll(".arc D")
				.data(pie(fail_data.D))
				.enter()
				.append("g")
				.attr("transform", "translate(420,60)")
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
			.text(function (d) {return d.value});

		var rank_text = test_fail_svg.append("g").attr("class","rank_label");
		rank_text.append("text").attr("transform","translate(60,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("A");
		rank_text.append("text").attr("transform","translate(180,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("B");
		rank_text.append("text").attr("transform","translate(300,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("C");
		rank_text.append("text").attr("transform","translate(420,60)").attr("dy","0.3em").attr("font-size","16px").style("text-anchor", "middle").text("D");

	}

	initialize();

}

function drawFailByDevice (data) {

	var fail_by_device_svg = d3.select("#test_fail_bar_graph").append("svg")
								.attr("width",700).attr("height",350);

	var y_domain = [];
	for (var each in data) {
		y_domain.push(data[each].device_name);
	}

	var x_extent = [0,data[0].fail_data.A.length+data[0].fail_data.B.length+data[0].fail_data.C.length+data[0].fail_data.D.length];

	var x_scale = d3.scale.linear().domain(x_extent).range([120,600]);
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
			.attr("transform",function (d) {return "translate(120,"+y_scale(d.device_name)+")"});
	
	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.A.length)-x_scale(0);}).attr("height",40)
			.attr("x",function (d) {return x_scale(0)-x_scale(0);}).attr("y",0)
			.attr("fill","#EA7C4B")
			.on("click",function (d) {renewDetailTable("A", d.device_name, d.fail_data.A)});

	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.B.length)-x_scale(0);}).attr("height",40)
			.attr("x",function (d) {return x_scale(d.fail_data.A.length)-x_scale(0);}).attr("y",0)
			.attr("fill","#ED9FBD")
			.on("click",function (d) {renewDetailTable("B", d.device_name, d.fail_data.B)});

	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.C.length)-x_scale(0);}).attr("height",40)
			.attr("x",function (d) {return x_scale(d.fail_data.A.length+d.fail_data.B.length)-x_scale(0);}).attr("y",0)
			.attr("fill","#52C4D0")
			.on("click",function (d) {renewDetailTable("C", d.device_name, d.fail_data.C)});

	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.D.length)-x_scale(0);}).attr("height",40)
			.attr("x",function (d) {return x_scale(d.fail_data.A.length+d.fail_data.B.length+d.fail_data.C.length)-x_scale(0);}).attr("y",0)
			.attr("fill","#D6B6EF")
			.on("click",function (d) {renewDetailTable("D", d.device_name, d.fail_data.D)});


	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.A.length)-x_scale(0);}).attr("height",8)
			.attr("x",function (d) {return x_scale(0)-x_scale(0);}).attr("y",32)
			.attr("fill","#C1633E");

	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.B.length)-x_scale(0);}).attr("height",8)
			.attr("x",function (d) {return x_scale(d.fail_data.A.length)-x_scale(0);}).attr("y",32)
			.attr("fill","#BF7593");

	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.C.length)-x_scale(0);}).attr("height",8)
			.attr("x",function (d) {return x_scale(d.fail_data.A.length+d.fail_data.B.length)-x_scale(0);}).attr("y",32)
			.attr("fill","#34989A");

	columns.append("rect")
			.attr("width",function (d) {return x_scale(d.fail_data.D.length)-x_scale(0);}).attr("height",8)
			.attr("x",function (d) {return x_scale(d.fail_data.A.length+d.fail_data.B.length+d.fail_data.C.length)-x_scale(0);}).attr("y",32)
			.attr("fill","#A28BBC");

	function renewDetailTable (rank, device_name, error_array) {

		d3.select("#table_title_rank").text(rank);
		d3.select("#table_title_device_name").text(device_name);

		//TODO: hyperlink to specific report page


		d3.select("#detail_table").remove();
		var detail_table = d3.select("#test_fail_chart").append("table").attr("id","detail_table");
		var table_label = detail_table.append("tr").attr("class","table_head");
		table_label.append("td").attr("class","name").text("Name");
		table_label.append("td").attr("class","error").text("Error");

		for (var row in error_array) {
			var row_tr = detail_table.append("tr");
			row_tr.append("td").text(error_array[row].scenario_name);
			row_tr.append("td").text(error_array[row].error_message);
		}
	}

}


function drawTestResults(test_results_data) {

	var test_results_svg, g_run, x_axis, y_axis;

	test_results_svg = d3.select("#test_results")
							.append("svg")
							.attr("width",970)
							.attr("height",150);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,800]);
	var y_scale = d3.scale.linear().domain([0,110]).range([130,20]);

	x_axis = test_results_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = test_results_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-760,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.failure/(d.failure+d.warning+d.pass)*100)});
	test_results_svg.append("path")
					.attr("d",line(test_results_data))
					.attr("class","failure_path")
					.attr("stroke","#D87342")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale((d.failure+d.warning)/(d.failure+d.warning+d.pass)*100)});
	test_results_svg.append("path")
					.attr("d",line(test_results_data))
					.attr("class","warning_path")
					.attr("stroke","#E7CC2F")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(100)});
	test_results_svg.append("path")
					.attr("d",line(test_results_data))
					.attr("class","pass_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	g_run = test_results_svg.selectAll("g_run")
					.data(test_results_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_failure")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.failure/(d.failure+d.warning+d.pass)*100)})
			.attr("stroke","#D87342")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_warning")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale((d.failure+d.warning)/(d.failure+d.warning+d.pass)*100)})
			.attr("stroke","#E7CC2F")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_pass")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(100)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = test_results_svg.append("g").attr("class","legend")
				.attr("transform","translate(830,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("MAX");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("AVG");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("MIN");
}

function drawCPUusage(cpu_trend_data) {

	var cpu_trend_svg = d3.select("#cpu_trend")
								.append("svg")
								.attr("width",560)
								.attr("height",200);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,440]);
	var y_scale = d3.scale.linear().domain([0,100]).range([130,20]);

	x_axis = cpu_trend_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = cpu_trend_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-400,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.interpolate("monotone")
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.max)});
	cpu_trend_svg.append("path")
					.attr("d",line(cpu_trend_data))
					.attr("class","max_path")
					.attr("stroke","#E4603C")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.interpolate("monotone")
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.avg)});
	cpu_trend_svg.append("path")
					.attr("d",line(cpu_trend_data))
					.attr("class","avg_path")
					.attr("stroke","#F7CE25")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.interpolate("monotone")
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.min)});
	cpu_trend_svg.append("path")
					.attr("d",line(cpu_trend_data))
					.attr("class","min_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	var g_run = cpu_trend_svg.selectAll("g_run")
					.data(cpu_trend_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_max")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.max)})
			.attr("stroke","#E4603C")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_avg")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.avg)})
			.attr("stroke","#F7CE25")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_min")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.min)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = cpu_trend_svg.append("g").attr("class","legend")
				.attr("transform","translate(470,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("MAX");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("AVG");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("MIN");

}

function drawMemUsage(mem_trend_data) {

	var mem_trend_svg = d3.select("#mem_trend")
								.append("svg")
								.attr("width",560)
								.attr("height",200);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,440]);
	var y_scale = d3.scale.linear().domain([0,512]).range([130,20]);

	x_axis = mem_trend_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = mem_trend_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-400,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.max)});
	mem_trend_svg.append("path")
					.attr("d",line(mem_trend_data))
					.attr("class","max_path")
					.attr("stroke","#E4603C")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.avg)});
	mem_trend_svg.append("path")
					.attr("d",line(mem_trend_data))
					.attr("class","avg_path")
					.attr("stroke","#F7CE25")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.min)});
	mem_trend_svg.append("path")
					.attr("d",line(mem_trend_data))
					.attr("class","min_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	var g_run = mem_trend_svg.selectAll("g_run")
					.data(mem_trend_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_max")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.max)})
			.attr("stroke","#E4603C")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_avg")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.avg)})
			.attr("stroke","#F7CE25")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_min")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.min)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = mem_trend_svg.append("g").attr("class","legend")
				.attr("transform","translate(470,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("MAX");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("AVG");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("MIN");

}

function drawNetworkTrend(net_trend_data) {

	var net_trend_svg = d3.select("#network_trend")
								.append("svg")
								.attr("width",560)
								.attr("height",200);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,440]);
	var y_scale = d3.scale.linear().domain([0,800]).range([130,20]);

	x_axis = net_trend_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = net_trend_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-400,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.max)});
	net_trend_svg.append("path")
					.attr("d",line(net_trend_data))
					.attr("class","max_path")
					.attr("stroke","#E4603C")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.avg)});
	net_trend_svg.append("path")
					.attr("d",line(net_trend_data))
					.attr("class","avg_path")
					.attr("stroke","#F7CE25")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.min)});
	net_trend_svg.append("path")
					.attr("d",line(net_trend_data))
					.attr("class","min_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	var g_run = net_trend_svg.selectAll("g_run")
					.data(net_trend_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_max")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.max)})
			.attr("stroke","#E4603C")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_avg")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.avg)})
			.attr("stroke","#F7CE25")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_min")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.min)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = net_trend_svg.append("g").attr("class","legend")
				.attr("transform","translate(470,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("MAX");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("AVG");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("MIN");

}

function drawBatteryTrend(battery_trend_data) {

	var battery_trend_svg = d3.select("#battery_trend")
								.append("svg")
								.attr("width",560)
								.attr("height",200);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,440]);
	var y_scale = d3.scale.linear().domain([0,100]).range([130,20]);

	x_axis = battery_trend_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = battery_trend_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-400,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.max)});
	battery_trend_svg.append("path")
					.attr("d",line(battery_trend_data))
					.attr("class","max_path")
					.attr("stroke","#E4603C")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.avg)});
	battery_trend_svg.append("path")
					.attr("d",line(battery_trend_data))
					.attr("class","avg_path")
					.attr("stroke","#F7CE25")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.min)});
	battery_trend_svg.append("path")
					.attr("d",line(battery_trend_data))
					.attr("class","min_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	var g_run = battery_trend_svg.selectAll("g_run")
					.data(battery_trend_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_display")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.max)})
			.attr("stroke","#E4603C")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_sound")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.avg)})
			.attr("stroke","#F7CE25")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_network")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.min)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = battery_trend_svg.append("g").attr("class","legend")
				.attr("transform","translate(470,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("Display");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("Sound");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("Network");

}

function drawThreadTrend(thread_trend_data) {

	var thread_trend_svg = d3.select("#thread_trend")
								.append("svg")
								.attr("width",560)
								.attr("height",200);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,440]);
	var y_scale = d3.scale.linear().domain([0,25]).range([130,20]);

	x_axis = thread_trend_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = thread_trend_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-400,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.max)});
	thread_trend_svg.append("path")
					.attr("d",line(thread_trend_data))
					.attr("class","max_path")
					.attr("stroke","#E4603C")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.avg)});
	thread_trend_svg.append("path")
					.attr("d",line(thread_trend_data))
					.attr("class","avg_path")
					.attr("stroke","#F7CE25")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.min)});
	thread_trend_svg.append("path")
					.attr("d",line(thread_trend_data))
					.attr("class","min_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	var g_run = thread_trend_svg.selectAll("g_run")
					.data(thread_trend_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_max")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.max)})
			.attr("stroke","#E4603C")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_avg")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.avg)})
			.attr("stroke","#F7CE25")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_min")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.min)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = thread_trend_svg.append("g").attr("class","legend")
				.attr("transform","translate(470,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("MAX");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("AVG");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("MIN");

}

function drawFrameTrend(frame_trend_data) {

	var frame_trend_svg = d3.select("#frame_trend")
								.append("svg")
								.attr("width",560)
								.attr("height",200);

	var run_scale = d3.scale.linear().domain([0.7,10.3]).range([40,440]);
	var y_scale = d3.scale.linear().domain([0,40]).range([130,20]);

	x_axis = frame_trend_svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,130)")
				.call(d3.svg.axis()
					.scale(run_scale)
					.tickFormat(function (d) {return "run "+d})
					.innerTickSize(3)
					.outerTickSize(0));

	y_axis = frame_trend_svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate(40,0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.tickSize(-400,0)
					.ticks(5)
					.orient("left"));

	var line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.max)});
	frame_trend_svg.append("path")
					.attr("d",line(frame_trend_data))
					.attr("class","max_path")
					.attr("stroke","#E4603C")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.avg)});
	frame_trend_svg.append("path")
					.attr("d",line(frame_trend_data))
					.attr("class","avg_path")
					.attr("stroke","#F7CE25")
					.attr("stroke-width",2.5)
					.attr("fill","none");
	line = d3.svg.line()
					.x(function (d, i) {return run_scale(i+1)})
					.y(function (d, i) {return y_scale(d.min)});
	frame_trend_svg.append("path")
					.attr("d",line(frame_trend_data))
					.attr("class","min_path")
					.attr("stroke","#5DBE88")
					.attr("stroke-width",2.5)
					.attr("fill","none");


	var g_run = frame_trend_svg.selectAll("g_run")
					.data(frame_trend_data)
					.enter()
					.append("g");

	g_run.append("circle")
			.attr("class","circle_max")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.max)})
			.attr("stroke","#E4603C")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_avg")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.avg)})
			.attr("stroke","#F7CE25")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	g_run.append("circle")
			.attr("class","circle_min")
			.attr("r",6)
			.attr("cx", function (d, i) {return run_scale(i+1)})
			.attr("cy", function (d, i) {return y_scale(d.min)})
			.attr("stroke","#5DBE88")
			.attr("stroke-width",2.5)
			.attr("fill","white");

	var legend = frame_trend_svg.append("g").attr("class","legend")
				.attr("transform","translate(470,70)");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",15).attr("y2",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",15)
		.attr("stroke-width",2.5).attr("stroke","#E4603C").attr("fill","white");
	legend.append("text").attr("transform","translate(30,18)")
		.text("MAX");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",30).attr("y2",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",30)
		.attr("stroke-width",2.5).attr("stroke","#F7CE25").attr("fill","white");
	legend.append("text").attr("transform","translate(30,33)")
		.text("AVG");
	legend.append("line").attr("x1",0).attr("x2",24).attr("y1",45).attr("y2",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88");
	legend.append("circle").attr("r",6).attr("cx",12).attr("cy",45)
		.attr("stroke-width",2.5).attr("stroke","#5DBE88").attr("fill","white");
	legend.append("text").attr("transform","translate(30,48)")
		.text("MIN");
}