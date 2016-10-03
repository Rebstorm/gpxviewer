$(document).ready(function(){
	UiElements.init();
})



var UiElements = function(){

	function init(){
		initInput();
	}

	function initInput(){
		$("#input-ui").on("change", function(e){
			GpxLoader.loadGpx(e.target.files);
		})
	}

	function createFilePanel(res, version){
		var resultPanelMain = document.createElement("div"); 
		resultPanelMain.id = "res-panel-"+ HelpFunctions.getNextId();
		resultPanelMain.className = "inline-panel";
		var headLine = document.createElement("h2");
		headLine.textContent = res.fileName;
		resultPanelMain.appendChild(headLine);


		$("#inline-item-main").append(resultPanelMain);
	}

	return {
		init: init,
		createFilePanel : createFilePanel,
	}
}(); 


var HelpFunctions = function(){
	var panelId = 0;
	
	function getNextId(){
		panelId++;
		return panelId;
	}
	
	return {
		getNextId : getNextId,
	}
}();