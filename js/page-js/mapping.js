const ipc = require('electron').ipcRenderer;
const m_path = require('path');
const exec = require('child-process-promise').exec;

//after choose folder
ipc.on('openFolder-path', function (event, path) {
    if (!path) path = '';
    if (path instanceof Array) {
        let state = isRepeat('method_list', path[0]);
        if (state === false) {
            let item_name = m_path.basename(path[0]);
            addList("method_list", item_name, path[0]);
        }
    }
})

//after choose format file 
ipc.on('openFormatFile-path', function (event, path) {
    if (!path) path = '';
    $("#input-format-file").val(path);
})

//after choose UDX file
ipc.on('openUDXFile-path', function (event, path) {
    if (!path) path = '';
    $("#input-udx-file").val(path);
})
//after save format file
ipc.on('saveFormatFile-path', function (event, path) {
    if (!path) path = '';
    $("#output-format-file").val(path);
})

//after save UDX file
ipc.on('saveUDXFile-path', function (event, path) {
    if (!path) path = '';
    $("#output-udx-file").val(path);
})


ipc.on('window-close', function (event) {
    $("#close-window")[0].click();
})
function _bindClick() {

    //close window

    $("#continue-going").on('click', function () {
        ipc.send('close-mapping-window');
    });

    //choose method folder
    $("#open_file").on("click", function () {
        ipc.send('openFolder-dialog');
    });

    //choose input  format file
    $("#open-format-file").on('click', function (event) {
        ipc.send('openFormatFile-dialog');
    })

    //choose output UDX file
    $("#save-udx-file").on('click', function (event) {
        ipc.send('saveUDXFile-dialog');
    })

    //choose input UDX file 
    $("#open-udx-file").on('click', function (event) {
        ipc.send('openUDXFile-dialog');
    })

    //choose output format file 
    $("#save-format-file").on('click', function (event) {
        ipc.send('saveFormatFile-dialog');
    })

    //open shcema
    $("#open-udx-schema").on('click', function (event) {
        window.location.href = './udx-data.html';
    })


    //show format file to udx 
    $("#Run_F2U").on('click', function (event) {
        let selectedItem = getSelectedItem("method_list");

        if (selectedItem.filepath === "") {
            toastr.error("you must choose a mapping method.", 'Error', { timeOut: 3000 })
            return false;
        }


        var MethodPath = selectedItem.filepath + "\\vge.jar";
        var InputFilePath = $("#input-format-file").val();
        var OutPutFIlePath = $("#output-udx-file").val();
        if (InputFilePath === "") {
            toastr.error("input file can not null.", 'Error', { timeOut: 3000 })
            return false;
        }
        if (OutPutFIlePath === "") {
            toastr.error("output file can not null.", 'Error', { timeOut: 3000 })
            return false;
        }
        // var MethodPath= "E:\\Kuner\\work\\Schema_Udx_Helper\\now\\AMPHA\\vge.jar";
        // var InputFilePath="E:\\Kuner\\work\\FVCOM_All\\step3\\AMPHA_obc.dat";
        // var OutPutFIlePath = "C:\\Users\\Administrator\\Desktop\\c.xml";
        runF2U(MethodPath, InputFilePath, OutPutFIlePath);

    })

    //show udx to format file 
    $("#Run_U2F").on('click', function (event) {
        let selectedItem = getSelectedItem("method_list");

        if (selectedItem.filepath === "") {
            toastr.error("you must choose a mapping method.", 'Error', { timeOut: 3000 })
            return false;
        }


        var MethodPath = selectedItem.filepath + "\\vge.jar";
        var InputFilePath = $("#input-udx-file").val();
        var OutPutFIlePath = $("#output-format-file").val();
        if (InputFilePath === "") {
            toastr.error("input file can not null.", 'Error', { timeOut: 3000 })
            return false;
        }
        if (OutPutFIlePath === "") {
            toastr.error("output file can not null.", 'Error', { timeOut: 3000 })
            return false;
        }
        // var MethodPath= "E:\\Kuner\\work\\Schema_Udx_Helper\\now\\AMPHA\\vge.jar";
        // var InputFilePath="E:\\Kuner\\work\\FVCOM_All\\step3\\AMPHA_obc.dat";
        // var OutPutFIlePath = "C:\\Users\\Administrator\\Desktop\\c.xml";
        runU2F(MethodPath, InputFilePath, OutPutFIlePath);

    })

}

function runF2U(_MethodPath, _InputFilePath, _OutputFilePath) {

    let m_command = 'java -jar "' + _MethodPath;
    m_command += '" -r -f "' + _InputFilePath;
    m_command += '" -u "' + _OutputFilePath + '"';


    exec(m_command).then(function (result) {
        var stdout = result.stdout;
        var stderr = result.stderr;
        if (stdout !== '') {
            $("#log-area").text('stdout:\n' + stdout);
        }
        if (stderr != '') {
            $("#log-area").text('stdout:\n' + stderr);
        } else {
            toastr.info("Mapping completed.", 'Information', { timeOut: 3000 });
        }
    }).catch(function (err) {
        toastr.error('Mapping error.', 'Error', { timeOut: 3000 });
        $("#log-area").text('Error:\n' + err);
    });
}

function runU2F(_MethodPath, _InputFilePath, _OutputFilePath) {

    let m_command = 'java -jar "' + _MethodPath;
    m_command += '" -w -u "' + _InputFilePath;
    m_command += '" -f "' + _OutputFilePath + '"';


    exec(m_command).then(function (result) {
        var stdout = result.stdout;
        var stderr = result.stderr;
        if (stdout !== '') {
            $("#log-area").text('stdout:\n' + stdout);
        }
        if (stderr != '') {
            $("#log-area").text('stdout:\n' + stderr);
        } else {
            toastr.info("Mapping completed.", 'Information', { timeOut: 3000 });
        }
    }).catch(function (err) {
        toastr.error('Mapping error.', 'Error', { timeOut: 3000 });
        $("#log-area").text('Error:\n' + err);
    });
}

$(function () {
    _bindClick();
})