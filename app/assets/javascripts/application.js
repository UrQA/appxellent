// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require jquery_nested_form
//= require jquery.ui.widget
//= require jquery.iframe-transport
//= require jquery.fileupload
//= require d3.v3
//= require spin.min
//
//= require apks
//= require detail_reports
//= require main
//= require motion_events
//= require projects
//= require test_scenarios
//= require total_reports
//= require total_reports_progress
//= require crashes
//= require_self


var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    window_x = w.innerWidth || e.clientWidth || g.clientWidth,
    window_y = w.innerHeight|| e.clientHeight|| g.clientHeight;

function updateWindow(){
    window_x = w.innerWidth || e.clientWidth || g.clientWidth;
    window_y = w.innerHeight|| e.clientHeight|| g.clientHeight;
}

window.onresize = updateWindow;

//a helper function to move SVG element to front (as html element would using z-index)
d3.selection.prototype.moveToFront = function() {
	return this.each(function(){this.parentNode.appendChild(this);});
};

//a helper function for pagination
var arrayChunk = function(array, chunkSize) {
    var R = [];
    for (var i=0; i<array.length; i+=chunkSize)
        R.push(array.slice(i,i+chunkSize));
    return R;
}

function sidebarHeightCorrect() {
	$(".sidebar").css("height",$(".container-fluid").css("height"));
};
$(function () {
	sidebarHeightCorrect();
});

function generateFilter(div_id, fields, filter_address, query_address, filter_callback) {
	var div = d3.select("#"+div_id).append("form").attr("name","filter_form");

	d3.json(filter_address, function (data) {
		
		var field, field_key, field_value, field_value_each, dropdown_button, dropdown;
		if (fields.indexOf("rank")>-1) {
			field = div.append("div").attr("class","filter-field");
			field_key = field.append("div").attr("class","filter-key").text("Rank")
			field_value = field.append("div").attr("class","filter-value");
			var temp_val_setter = {"A":0, "B":1, "C":2, "D":3 };
			for (i in data.rank) {
				field_value.append("input").attr("type","checkbox").attr("name","checkbox").attr("id","rank").attr("value",temp_val_setter[i]);
				field_value.append("span");
				field_value.append("div").attr("class","filter-value-each")
					.text(i+"("+data.rank[i]+")");
			}
		}
		if (fields.indexOf("status")>-1) {
			field = div.append("div").attr("class","filter-field");
			field_key = field.append("div").attr("class","filter-key").text("Status")
			field_value = field.append("div").attr("class","filter-value");
			for (i in data.status) {
				var status;
				if (i==-1) {status="Error"}
				else if (i==0) {status="Warning"}
				else if (i==1) {status="Pass"}
				field_value.append("input").attr("type","checkbox").attr("name","checkbox").attr("id","status").attr("value",i);
				field_value.append("span");
				field_value.append("div").attr("class","filter-value-each")
					.text(status+"("+data.status[i]+")");
			}
		}
		if (fields.indexOf("os_version")>-1) {
			field = div.append("div").attr("class","filter-field");
			field_key = field.append("div").attr("class","filter-key").text("OS Version")
			field_value = field.append("div").attr("class","filter-value");
			for (i in data.os_version) {
				field_value.append("input").attr("type","checkbox").attr("name","checkbox").attr("id","os_version").attr("value",i);
				field_value.append("span");
				field_value.append("div").attr("class","filter-value-each")
					.text(i+"("+data.os_version[i]+")");
			}
		}
		if (fields.indexOf("device")>-1) {
			field = div.append("div").attr("class","filter-field");
			field_key = field.append("div").attr("class","filter-key").text("Device")
			field_value = field.append("div").attr("class","filter-value");
			var select = field_value.append("div").attr("class","filter-value-each").append("select").attr("name","device_select");
			select.append("option").attr("value","all devices").text("all devices");
			for (i in data.device) {
				select.append("option").attr("value",data.device[i]).text(data.device[i]);
			}
		}
		if (fields.indexOf("name")>-1) {
			field = div.append("div").attr("class","filter-field");
			field_key = field.append("div").attr("class","filter-key").text("Name")
			field_value = field.append("div").attr("class","filter-value");
			var select = field_value.append("div").attr("class","filter-value-each").append("select").attr("name","name_select");
			select.append("option").attr("value","all scenarios").text("all scenarios");
			for (i in data.name) {
				select.append("option").attr("value",data.name[i]).text(data.name[i]);
			}
		}
		//exception for crashes index filter
		if (fields.indexOf("crashes")>-1) {
			var ranks = ["A","B","C","D"];
			d3.selectAll("#rank").attr("id","error_ranks")
			.attr("value", function () {
				return ranks[parseInt(d3.select(this).attr("value"))];
			});
			d3.selectAll("#os_version").attr("id","os_versions");
		}
		
		field = div.append("div").attr("class","filter-submit");
		field.append("div").attr("class","submit-button")
			.append("button").text("Search").attr("type","button").on("click",filtercall);

		function filtercall() {
			var get_string;
			if (query_address.indexOf("?")>-1) {
				get_string = query_address + "&";
			} else {
				get_string = query_address + "?";
			}
			var checkbox = document.filter_form.checkbox;
			for(index in checkbox) {
				if (checkbox[index].checked) {
					get_string += checkbox[index].id+"[]="+checkbox[index].value+"&";
				}
			}
			if (filter_form.device_select && (filter_form.device_select.value!="all devices")) {
				get_string += "model="+filter_form.device_select.value;
			}
			if (filter_form.name_select && (filter_form.name_select.value!="all scenarios")) {
				get_string += "scenario_name="+filter_form.name_select.value;
			}

			//exceptional uri encoding
			get_string = get_string.replace(/ /g,"%20");
			get_string = get_string.replace(/\+/g,"%2B");

			console.log(get_string);
			d3.json(get_string,function (err, data) {
				filter_callback(data);
			});

		}
	})
}
