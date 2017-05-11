var subtitleSeletor = "video::-webkit-media-text-track-display";

function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

function createSheet() {
	var style = document.createElement("style");

	// WebKit hack :(
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style.sheet;
}

function findCssRule(selector){
	var foundedRule = null;
	var rules = document.styleSheets[0].cssRules;
	for (var j=0; j<rules.length; j++) {
		if (rules[j].selectorText === selector) {
			foundedRule = rules[j];
		}
	}
	return foundedRule;
}

function resizeSubtitle(size) {
	if (document.styleSheets === undefined) {
		createSheet();
	}

	var cssText = "font-size: " + size + "%;";
	var rule = findCssRule(subtitleSeletor);

	if (rule !== null) {
		rule.style.cssText = cssText;
	}else{
		addCSSRule(document.styleSheets[0], subtitleSeletor, cssText,0);
	}
}

console.log(subtitleSize);
resizeSubtitle(subtitleSize);