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
//= require socket.io
//= require connection
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

$(function () {
	$(".sidebar").css("height",$(".container-fluid").css("height"));
})