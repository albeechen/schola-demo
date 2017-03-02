function getStudents() {
    var XHR = new XMLHttpRequest();
    XHR.open("GET", "/test", true);
    XHR.onload = function() {
        var response = XHR.responseText;// XHR.response
        document.getElementById("myDiv").innerHTML = response;
    }
    XHR.onerror = function() {
        alert("Error");
    }
    XHR.send();
}