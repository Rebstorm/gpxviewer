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
		detailButton.addEventListener("click", function(){
			setMainPopupPanel(res);
		})
		
		resultPanelMain.appendChild(flavourBar);
		resultPanelMain.appendChild(headLine);
		resultPanelMain.appendChild(detailButton);

		
		$("#inline-item-main").append(resultPanelMain);
	}
	
	var mainPopupPanel; 
	var mainPanel;
	function getMainPopupPanel(){
		if(mainPopupPanel == undefined){
			mainPopupPanel = createPopupPanel().mainPopupPanel;
			mainPanel = createPopupPanel().mainPanel;
			document.body.appendChild(mainPopupPanel);
			mainPopupPanel.appendChild(mainPanel);
			setPopupPanelEventListeners(mainPopupPanel, mainPanel);
		} 
			return document.getElementsByClassName("popup-panel")[0];
		
	}

	function setMainPopupPanel(res){
		var panel = getMainPopupPanel();
		var contentPanel = document.getElementById("content-popup-panel");
		contentPanel.textContent = res.fileName;	

		console.log(res);

		panel.style.display = "block";
	}

	function createPopupPanel(){
		var mainPopupPanel = document.createElement("div"); 
		// css options
		mainPopupPanel.className = "popup-panel";

		var mainPanel = document.createElement("div");
		//css options
		mainPanel.className = "popup";

		var mainPanelContent = document.createElement("div");
		var contentPanel = document.createElement("div");
		contentPanel.id = "content-popup-panel";
		contentPanel.style.position = "relative";
		contentPanel.style.marginRight = "30px";

		var closeButton = document.createElement("button");
		closeButton.textContent = "X";
		closeButton.style.position = "absolute";
		closeButton.style.right = "0px";
		closeButton.id = "panel-close";

		mainPanelContent.appendChild(closeButton);
		mainPanelContent.appendChild(contentPanel)
		mainPanel.appendChild(mainPanelContent);

		var res = {
			mainPopupPanel : mainPopupPanel,
			mainPanel : mainPanel
		};

		return res;

	}

	function setPopupPanelEventListeners(mainPopupPanel, mainPanel){
		var closeButton = document.getElementById("panel-close");
	
		// click exit
		closeButton.addEventListener("click", function(e){
			e.preventDefault();
			mainPopupPanel.style.display = "none";
		});

	}

	return {
		init: init,
		createFilePanel : createFilePanel,
		getMainPopupPanel : getMainPopupPanel,
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