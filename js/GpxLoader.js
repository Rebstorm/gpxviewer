var GpxLoader = function(){
    function loadGpx(files){

        var asyncHandling = new Promise(function(resolve, reject){

            for(var i = 0; i < files.length; i++){
                var file = new FileReader();

                file.readAsText(files[i]);
                file.onload = function(e){
                    handleGpx(e.target.result);
                }
            }
        });


    }

    function handleGpx(xFile){
        var data = new DOMParser();
        data = data.parseFromString(xFile, "application/xml");

        var item = xmlDoc = $.parseXML(xFile),
            $xml = $(xmlDoc),
            v = $xml.find("gpx").attr("version"),
            fileName = $xml.find("gpx").find("name")[0].textContent,
            segName = $xml.find("wpt").find("name")[0].textContent,
            trkName = $xml.find("trk").find("name")[0].textContent;

        
        var itemParsed = {
            version : v,
            fileName : fileName,
            segName : segName,
            trkName : trkName,
            xml : $xml
        };

        
        if(itemParsed.version == undefined){
            console.log("TODO: version could not be found");
            return;
        }

        switch(itemParsed.version){
            case "1.0":
                UiElements.createFilePanel(itemParsed, VersionEnums.V1);
                break;

            default:
                console.log("TODO: ERROR FINDING RIGHT VERSION");
                break; 
        }
    }

    return {
        loadGpx : loadGpx
    }
}();


var VersionEnums = {
    V1 : 1,
    V2 : 2,
}; 