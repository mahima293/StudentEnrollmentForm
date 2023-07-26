console.log("workinggggg....");
var jpdbBaseUrl = 'http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var studDBName='SCHOOL-DB';
var studRelationName='STUDENT-TABLE';
var connToken='90931418|-31949321929859563|90949980';

$('#rollno').focus();

function saveRecNo2LS(jsonObj){
    var lvdata=JSON.parse(jsonObj.data); 
    localStorage.setItem("recno",lvdata.rec_no);
}

 function getStudRollNoAsJsonObj()
 {
     var rollNoVar= $("#rollno").val();
     var jsonStr={
         rollno:rollNoVar
     };
    return JSON.stringify(jsonStr); 
 }
 
function resetForm()
{
    $("#rollno").val("");
    $("#fullname").val("");
    $("#classs").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#edate").val("");
    
    $("#rollno").prop('disabled',false);
    $("#save").prop('disabled',true);
    $("#update").prop('disabled',true);
    $("#reset").prop('disabled',true);
    $("#fullname").prop('disabled', true);
    $("#classs").prop('disabled', true);
    $("#dob").prop('disabled', true);
    $("#address").prop('disabled', true);
    $("#edate").prop('disabled', true);
    
    $("#rollno").focus();
}

function updateData()
{
    $("#update").prop('disabled', true);
    var jsonChg = validateAndGetData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg, studDBName,studRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
    $("#rollno").focus();
}

function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#rollno").val(data.rollno);
    $("#fullname").val(data.fullname);
    $("#classs").val(data.class);
    $("#dob").val(data.dob);
    $("#address").val(data.address);
    $("#edate").val(data.enrolldate);
}

function getStud()
{
    console.log("getttttttt....");
    var studIdJsonObj = getStudRollNoAsJsonObj();
    console.log("aaaaaaaaaa",studIdJsonObj);
    var getRequest = createGET_BY_KEYRequest(connToken,studDBName,studRelationName,studIdJsonObj);
//    console.log("aaaaaaaaaa",getRequest);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseUrl,jpdbIRL);
    console.log("aaaaaaaaaa",resJsonObj);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400)
    {
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#fullname").focus();

    } else if (resJsonObj.status === 200)
    {
        $("#rollno").prop('disabled', true);
        fillData(resJsonObj);
        $("#update").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#fullname").focus();
    }
    $("#fullname").prop('disabled', false);
    $("#classs").prop('disabled', false);
    $("#dob").prop('disabled', false);
    $("#address").prop('disabled', false);
    $("#edate").prop('disabled', false);
}

function validateAndGetData()
{
    var rollno=$('#rollno').val();
    var fullname=$('#fullname').val();
    var classs=$('#classs').val();
    var dob=$('#dob').val();
    var address=$('#address').val();
    var edate=$('#edate').val();
    
    if(rollno === '')
    {
        alert('Roll No missing....');
        $('#rollno').focus();
        return "";
    }
    if(fullname === '')
    {
        alert('Full Name missing....');
        $('#fullname').focus();
        return "";
    }
    if(classs === '')
    {
        alert('Class missing....');
        $('#classs').focus();
        return "";
    }
    if(dob === '')
    {
        alert('Date Of Birth missing....');
        $('#dob').focus();
        return "";
    }
    if(address === '')
    {
        alert('Address is missing....');
        $('#address').focus();
        return "";
    }
    if(edate === '')
    {
        alert('Enrollment-date missing....');
        $('#edate').focus();
        return "";
    }
    
    var jsonStrObj = {
        rollno : rollno,
        fullname : fullname,
        class : classs,
        dob : dob,
        address : address,
        enrolldate : edate
    };
    return JSON.stringify(jsonStrObj);
}

function saveData(){
    var jsonStrObj = validateAndGetData();
    if(jsonStrObj === "")
        return "";
    var putRequest= createPUTRequest(connToken,jsonStrObj,studDBName,studRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseUrl,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rollno').focus();
}

