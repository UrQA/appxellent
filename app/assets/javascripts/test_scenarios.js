function testScenarioList (data) {
	var table = d3.select("#scenario-list").html("");
	var th = ["","Name","Description","Recently tested on",""];
	table.append("tr").selectAll("th").data(th).enter().append("th").text(function (d) {return d});

	var tr = table.selectAll("tr").data(data).enter().append("tr");

	sidebarHeightCorrect();
}

function drawEventFlow (data) {

	function dataProcess(data) {
		data.sort(function (a, b) {
			if (a.client_timestamp < b.client_timestamp){
				return -1;
			} else if (a.client_timestamp > b.client_timestamp){
				return 1;
			} else {
				return 0;
			}
		});
		var zero = data[0].client_timestamp;
		data.forEach(function (element, index) {
			element.client_timestamp = (element.client_timestamp - zero) / 1000;
		});
		return data;
	}

	data = dataProcess(data.motion_event_infos);

	var inner_div = d3.select("#event-flow-inner");
	var detail_div = d3.select("#event-detail");
	var rect_width = 110;

	inner_div.style("width",(rect_width+20)*data.length+"px");

	var activities = [];
	for (var i in data) {
		var flag = true;
		var currentActivity = activities[activities.length-1];
		if ( (currentActivity!=null) && (data[i].activity_class == currentActivity.name) ){
			flag = false;
			currentActivity.events.push(data[i]);
			currentActivity.end_time=data[i].client_timestamp;
		}
		if (flag) activities.push({
			"name":data[i].activity_class,
			"events": [data[i]],
			"start_time":data[i].client_timestamp,
			"end_time":data[i].client_timestamp,
		});
	}

	var activity_div = inner_div.selectAll("activity-div").data(activities).enter()
			.append("div").attr("class","activity-div")
			.style("width",function (d) {return rect_width*d.events.length+"px"});

	activity_div.append("div").attr("class","activity-name").text(function (d) {
			var name_string = d.name.split(".");
			return name_string[name_string.length-1]
		})
		.attr("title",function (d) {
			return d.name;
		});

	activity_div.on("click",function (d) {
		detail_div.html("");
		detail_div.append("p").text(d.name);
		detail_div.append("p").text("# of events: "+d.events.length);
		detail_div.append("p").text("Start time: "+d.start_time);
		detail_div.append("p").text("End time: "+d.end_time);
		event.stopPropagation();
	});

	var event_div = activity_div.selectAll("event").data(function (d) {return d.events}).enter()
			.append("div").attr("class","event-div");

	event_div.append("p").text(function (d) {return "View: "+d.view});
	event_div.append("p").text(function (d) {return "Action: "+d.action_type});

	event_div.on("click",function (d) {
		detail_div.html("");
		detail_div.append("p").text(d.name);
		detail_div.append("p").text("Action type: "+d.action_type);
		detail_div.append("p").text("View: "+d.view);
		detail_div.append("p").text("Parameter: "+d.param);
		event.stopPropagation();
	});
}