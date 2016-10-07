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
        var item = xmlDoc = $.parseXML(xFile),
            $xml = $(xmlDoc);
            var v = "";

            try{
                v = $xml.find("gpx").attr("version");
            } catch(e){
                console.log("FATAL ERROR - CANNOT READ VERSION OF GPX"); 
            }


            var fileName = readGpxValueDetail($xml, "gpx", "name");
            var segName = readGpxValueDetail($xml, "wpt", "name");
            var trkName = readGpxValueDetail($xml, "trk", "name");
            var time = new Date(readGpxValueDetail($xml,"metadata", "time"));
            var points = readTrkSegment($xml);

        
        var itemParsed = {
            version : v,
            fileName : fileName,
            segName : segName,
            trkName : trkName,
            time : time,
            points : points,
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

            case "1.1":
                UiElements.createFilePanel(itemParsed, VersionEnums.V1_1);
                break;

            default:
                console.log("FATAL: ERROR FINDING RIGHT VERSION");
                break; 
        }
    }

    function readGpxValueDetail(file, namespace, val){
        var x = ""; 
        try{
           x = file.find(namespace).find(val)[0].textContent;
           console.log(x);
        } catch(e){
            x = ""; 
        }
        return x;
    }


    function readTrkSegment(file){
        var t = {};
        t.lon = [];
        t.lat = [];

        file.find("trkseg").find("trkpt").each(function(i){
            t.lat.push($(this).attr("lat"));
            t.lon.push($(this).attr("lon"));
        })
        return t;
    }
    
    var i = 0; 
    function nextValue(){
        i++;
        return i;
    }

    return {
        loadGpx : loadGpx,
        nextValue : nextValue,
    }
}();


var VersionEnums = {
    V1 : 1,
    V1_1 : 2,
    V2 : 3,
}; 