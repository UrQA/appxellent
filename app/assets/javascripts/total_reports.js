function addBandGraph (key, num_success, num_fail) {
	var band_row = d3.select("#band-graph").append("div").attr("class","band-row")
	band_row.append("div").attr("class","band-row-key").text(key);
	var success_div = band_row.append("div").attr("class","band-row-success").text(num_success)
	if (num_fail!=0) {
		var fail_div = success_div.append("div").attr("class","band-row-fail").text(num_fail)
			.style("width",num_fail/(num_success+num_fail)*100+"%");
	}
	if (num_success==0) {
		fail_div.style("border-top-right-radius","10px").style("border-bottom-right-radius","10px");
	}
}

function addColoredBandGraph (div_id, data_rough) {

	var keys = Object.keys(data_rough);

	var segment = d3.select("#"+div_id).selectAll(".band-chart-segment").data(keys).enter()
					.append("div").attr("class","band-chart-segment")
					.style("width",100/keys.length +"%");

	segment.append("div").attr("class",function (d) {return "band-chart-label "+d}).text(function (d) {return d});
	var band = segment.append("div").attr("class","band-chart");
	var success = band.append("div").attr("class","band-chart-success").text(function (d){return data_rough[d][0]});
	var fail = success.append("div").attr("class",function (d) {return "band-chart-fail "+d})
					.text(function (d){return data_rough[d][1]})
					.style("width",function (d) {return data_rough[d][1]/(data_rough[d][0]+data_rough[d][1])*100+"%"})
					.style("display",function (d) {if (data_rough[d][1]==0) {return "none"} else return "initial"})
}

function drawDeviceFail (data) {

	//IF NO ERROR
	if (data.length == 0) {
		var all_pass_div = d3.select(".dashboard-right").html("")
							.append("div").attr("class","all-pass");
		all_pass_div.append("img").attr("src","/assets/pass.png");
		all_pass_div.append("span").text("All tests passed.");
		d3.select("#device-fail-all").html("");
	}

	var width = d3.select("#test_fail_bar_graph").style("width").split("px")[0];
	var height = d3.select("#test_fail_bar_graph").style("height").split("px")[0];
	var margin = {top: 10, right: 10, bottom: 30, left: 100};

	var svg = d3.select("#test_fail_bar_graph").append("svg")
				.attr("width",width).attr("height",height);

	var defs = svg.append("defs");
	
	function gradation(defs) {

		addGradation("grad-A","#EA7C4B","#C1633E");
		addGradation("grad-B","#ED9FBD","#BF7593");
		addGradation("grad-C","#52C4D0","#34989A");
		addGradation("grad-D","#D6B6EF","#A28BBC");
		
		function addGradation(id, color1, color2) {
			var grad = defs.append("linearGradient").attr("id",id)
				.attr("x1","0%").attr("x2","0%").attr("y1","0%").attr("y2","100%");
			grad.append("stop").attr("offset","0%").attr("stop-color",color1);
			grad.append("stop").attr("offset","78%").attr("stop-color",color1);
			grad.append("stop").attr("offset","78%").attr("stop-color",color2);
			grad.append("stop").attr("offset","100%").attr("stop-color",color2);
		}
	};
	
	gradation(defs);

	var y_domain = [];
	for (var each in data) {
		y_domain.push(data[each].device_name);

		if (data[each].fail_data.A == undefined) {
			data[each].fail_data.A = [];
		}
		if (data[each].fail_data.B == undefined) {
			data[each].fail_data.B = [];
		}
		if (data[each].fail_data.C == undefined) {
			data[each].fail_data.C = [];
		}
		if (data[each].fail_data.D == undefined) {
			data[each].fail_data.D = [];
		}
	}

	var x_extent = [0,data[0].fail_data.A.length+data[0].fail_data.B.length+data[0].fail_data.C.length+data[0].fail_data.D.length];

	var x_scale = d3.scale.linear().domain(x_extent).range([margin.left,width-margin.right]);
	var y_scale = d3.scale.ordinal().domain(y_domain).rangeRoundBands([margin.top,height-margin.bottom],0.3,0.3);

	var x_axis = svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,"+(height-margin.bottom)+")")
				.call(d3.svg.axis()
					.scale(x_scale)
					.orient("bottom")
					.innerTickSize(3)
					.outerTickSize(0));

	var y_axis = svg.append("g")
				.attr("class", "y axis")
				.attr("transform","translate("+margin.left+",0)")
				.call(d3.svg.axis()
					.scale(y_scale)
					.orient("left")
					.innerTickSize(3)
					.outerTickSize(0));

	var columns = svg.selectAll("device-column")
				.data(data).enter().append("g")
				.attr("class","device_row")
				.style("cursor","pointer")
				.attr("transform",function (d) {return "translate("+margin.left+","+y_scale(d.device_name)+")"});

	var rect_height = (height-margin.top-margin.bottom) / data.length * 0.5;

	columns.each(function (d, i){
		var sum = 0;
		var ranks = ["A","B","C","D"]
		for (var index in ranks) {
			var rank = ranks[index];
			if(d.fail_data[rank]) {
				d3.select(this).append("rect").attr("class",rank)
					.attr("width",x_scale(d.fail_data[rank].length)-x_scale(0))
					.attr("height",rect_height)
					.attr("x",x_scale(sum)-margin.left)
					.attr("y",0)
					.on("click",function (d) {
						rank = d3.select(this).attr("class");
						renewDetailTable(rank, d.device_name, d.fail_data[rank]);
					})
				sum = sum + d.fail_data[rank].length;
			}
		}
	})

	function onResize() {
		width = d3.select("#test_fail_bar_graph").style("width").split("px")[0];
		svg.attr("width",width);
		x_scale.range([margin.left,width-margin.right]);
		x_axis.call(d3.svg.axis().scale(x_scale).orient("bottom").innerTickSize(3).outerTickSize(0));
		columns.each(function (d, i){
			var sum = 0;
			var ranks = ["A","B","C","D"]
			for (var index in ranks) {
				var rank = ranks[index];
				if(d.fail_data[rank]) {
					d3.select(this).select("."+rank)
						.attr("width",x_scale(d.fail_data[rank].length)-x_scale(0))
						.attr("x",x_scale(sum)-margin.left)
					sum = sum + d.fail_data[rank].length;
				}
			}
		});
	}
	d3.select(window).on("resize",onResize);

	function renewDetailTable (rank, device_name, error_array) {

		d3.select("#table_title_rank").attr("class","test_rank "+rank).text(rank);
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
