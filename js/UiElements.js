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
		if(res.fileName != "")
			headLine.textContent = res.fileName;
		else if(res.time != "")
			headLine.textContent = res.time;
		else
			headLine.textContent = "file" + GpxLoader.nextValue();
		
		var flavourBar = document.createElement("div");
		flavourBar.className = "flavourbar";

		var detailButton = document.createElement("a");
		detailButton.href="#";
		detailButton.textContent = "read more";
		
		resultPanelMain.appendChild(flavourBar);
		resultPanelMain.appendChild(headLine);
		resultPanelMain.appendChild(detailButton);

		
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