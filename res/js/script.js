// Form
var generatorForm = $('#generator-form');
var downloadBtn = $('#downloadBtn');

// Banner Elements
var banner = $('#banner');
var spinnerOverlay = $('.spinnerOverlay');
var errorOverlay = $('.errorOverlay');

// Constants
const API = 'https://generator.devbanner.center/banner?';
const EXAMPLE_BANNER = 'res/images/examplebanner.png';

generatorForm.on('submit', function (event) {
	event.preventDefault();

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
});

banner.on('load', function () {
	// Overlay
	spinnerOverlay.fadeOut();
});