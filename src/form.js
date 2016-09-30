var Form = function() {

};

Form.prototype.init = function() {
	this.initDatePicker();
	this.initButtons();
	this.initType();
};

Form.prototype.initDatePicker = function() {
	$("#input-collection-date-from").datepicker();
	$("#input-collection-date-to").datepicker();
};

Form.prototype.initButtons = function() {
	$("#btn-submit").click( function(event) {
		event.preventDefault();
		DEMO.form.onSubmitClicked();
	} );

	$("#btn-reset").click( function(event) {
		event.preventDefault();
		DEMO.form.onResetClicked();
	} );
};

Form.prototype.initCountries = function(countries) {
	var selectCountries = $("#select-country");
	selectCountries.append($("<option></option>"));

	for (var i = 0; i < countries.length; ++i) {
		var country = countries[i];
		selectCountries.append($("<option></option>")
			.text(country["Country"]));
	}
};

Form.prototype.getSelectedCountries = function(defaultPostData) {

};

Form.prototype.initType = function(types) {
	var selectCountries = $("#select-type");
	selectCountries.append($("<option></option>"));

	// var selectCountries = $("#select-type").multiselect();
	for (var i = 0; i < HELPER.typeData.length; ++i) {
		selectCountries.append($("<option></option>").text(HELPER.typeData[i].value));
	}
};

Form.prototype.setSelectedTypes = function(defaultPostData) {
	var selectedTypes = this.getSelectedValues(document.getElementById("select-type"));
	var numTypesSelected = selectedTypes.length;

	var typeArr = [];
	for (var i = 0; i < numTypesSelected; ++i) {
		typeArr.push({ Type: selectedTypes[i].toString() });
	}
	defaultPostData.types = typeArr;
};

Form.prototype.onSubmitClicked = function() {
	console.log("Submit clicked...");

	var postData = HELPER.getDefaultPostData();
	this.setSelectedTypes(postData);

	DEMO.fetchSites(postData);
};

Form.prototype.onResetClicked = function() {
	console.log("Reset clicked...");
};

Form.prototype.getSelectedValues = function(select) {
	var result = [];
	var options = select && select.options;
	var opt;

	for (var i = 0, len = options.length; i < len; ++i) {
		opt = options[i];

		if (opt.selected && ((opt.value || opt.text) != "")) {
			result.push(opt.value || opt.text);
		}
	}

	return result;
};