// Form
var generatorForm = $('#generator-form');
var downloadBtn = $('#downloadBtn');
var usernameInput = $('#username');
var subtextInput = $('#subtext');
var widthInput = $('#width');
var widthText = $('#widthText');

// Banner Elements
var banner = $('#banner');
var spinnerOverlay = $('.spinnerOverlay');
var errorOverlay = $('.errorOverlay');
var forbiddenOverlay = $('.forbiddenOverlay');

// Constants
const API = 'https://generator.devbanner.center/banner?';
const EXAMPLE_BANNER = 'res/images/examplebanner.png';
const SUBTEXT_REGEX = /^[A-Za-z0-9\.\,\(\)\s?!\(%\)\[#\]\{@\}\/&<\-+=>$:;,.*'_|~"]*$/g;

generatorForm.on('submit', function (event) {
	event.preventDefault();

	// Test for forbidden characters
	if (!subtextInput.val().match(SUBTEXT_REGEX)) {
		spinnerOverlay.hide();
		errorOverlay.hide();
		forbiddenOverlay.show();
		return;
	}

	// Store username in cookie (gets automatically shown on next page load)
	$.cookie('dB_username', usernameInput.val());

	// Create URL
	var bannerUrl = API + generatorForm.serialize();

	// Disable spamming generate-button
	if (banner.prop('src') == bannerUrl) {
		return;
	}

	// Load/Generate banner
	banner.prop('src', bannerUrl);
	downloadBtn.prop('href', bannerUrl);
	downloadBtn.removeClass('disabled');

	// Overlay
	spinnerOverlay.show();
	errorOverlay.hide();
	forbiddenOverlay.hide();
});

generatorForm.on('input', function () {
	// Disable download if input changed (so user gets what he expects)
	downloadBtn.addClass('disabled');
});

banner.on('error', function () {
	// Set banner to example
	banner.prop('src', EXAMPLE_BANNER);
	downloadBtn.prop('href', EXAMPLE_BANNER);
	downloadBtn.addClass('disabled');

	// Overlay
	spinnerOverlay.hide();
	errorOverlay.show();
	forbiddenOverlay.hide();
});

banner.on('load', function () {
	// Overlay
	spinnerOverlay.fadeOut();
});

widthInput.on('input change', function () {
	widthText.text(this.value + 'px');
});

$(document).ready(function () {
	if ($.cookie('dB_username')) {
		// If cookie exists set value of username-input to its value
		usernameInput.val($.cookie('dB_username'));
		$('#username').addClass('x');
	} else {
		// else create a new cookie
		$.cookie('dB_username', '');
	}
});


// Input Clear button
function tog(v) {
	return v ? 'addClass' : 'removeClass';
}
$(document).on('input', '.clearable', function () {
	$(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function (e) {
	$(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
}).on('touchstart click', '.onX', function (ev) {
	ev.preventDefault();
	$(this).removeClass('x onX').val('').change();
});
