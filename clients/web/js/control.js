function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function transform(jsonText){
    jsonText = replaceAll(jsonText, "'", "\"");
    if(jsonText != ""){
        var json = JSON.parse(jsonText);
        if(json.voxel == "right")
            updateGrid("right");
        if(json.voxel == "up")
            updateGrid("up");
        if(json.voxel == "left")
            updateGrid("left");
        if(json.voxel == "down")
            updateGrid("down");
        if(json.voxel == "in")
            updateGrid("in");
        if(json.voxel == "out")
            updateGrid("out");
        if(json.vertex == "add")
            capturePoint();
        if(json.stage == "yawCCW")
            rotateOrthogonally("right");
        if(json.stage == "pitchCCW")
            rotateOrthogonally("down");
        if(json.stage == "yawCW")
            rotateOrthogonally("left");
        if(json.stage == "pitchCW")
            rotateOrthogonally("up");
        if(json.vertex == "back")
            cycleVoxel('back');
        if(json.vertex == "forward")
            cycleVoxel('forward');
        if(json.vertex == "delete")
            deleteVoxel(1);
        if(json.stage == "reset")
            window.location='display.html';
        if(json.stage == "center")
            resetStage();
        if(json.stage == "import")
            importMesh(document.getElementById('importExport').value);
        if(json.stage == "export_default")
            saveMesh('export_default');
        if(json.stage == "export_blender")
            saveMesh('export_blender');
    }
}

function pingRadServer(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
           transform(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

if(isRadDeviceConnected == true){
    window.setInterval(function(){pingRadServer(radUrl);}, pingInterval);
}