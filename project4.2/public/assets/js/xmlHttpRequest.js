function createHeader() {
    var list_header = ["firstName", "lastName", "studentId"];
    var table = document.createElement('table');
    table.setAttribute('border', '1');
    table.setAttribute('width', '100%');
    table.id = 'data_table';
    var row = table.insertRow(0);
    for (j = 0; j < list_header.length; j++) {
        var text = document.createTextNode(list_header[j]);
        var cell = row.insertCell(j);
        cell.setAttribute('align', 'center')
        cell.appendChild(text);
    }
    document.getElementById('list').appendChild(table);
}

function showAll(lists) {
    var table = document.getElementById('data_table');
    for (i = 1; i <= lists.length; i++) {
        var row = table.insertRow(i);
        var data = lists[i - 1];
        var index = 0;
        for (key in data) {
            var content = data[key];
            if (key === 'classes_docs')
                continue; //content = data[key][0].className;
            if (key != '_id') {
                var text = document.createTextNode(content);
                var cell = row.insertCell(index);
                cell.setAttribute('align', 'center');
                index++;
                cell.appendChild(text);
            }
        }
    }
}

function ediableStudentRow() {
    var name_list = ["firstName", "lastname", "studentId"];
    var table = document.getElementById('data_table');
    var row = table.insertRow(1);
    for (var i = 0; i < name_list.length; i++) {
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('style', 'width:100%');
        input.setAttribute('id', name_list[i]);
        var cell = row.insertCell(i);
        cell.appendChild(input);
    }
}

function setStudentData(data) {
    document.getElementById('firstName').value = data[0].firstName;
    document.getElementById('lastname').value = data[0].lastname;
    document.getElementById('studentId').value = data[0].studentId;
}

function getStudentFromServer(studentId) {
    createNewRow();
    return new Promise((resolve, reject) => {
        var url = '/students/' + studentId;
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.onload = function() {
            if (XHR.status == 200 && XHR.responseText != 'no match') {
                resolve(JSON.parse(XHR.responseText));
            } else {
                reject(Error(XHR.responseText));
            }
        }
        XHR.onerror = function() {
            reject(Error("Network Error"));
        }
        XHR.send();
    });
}

function searchStudent() {
    var studentId = document.getElementById('search_studentId').value;
    return getStudentFromServer(studentId)
        .then(function(student) {
            return setStudentData(student);
        })
        .catch(function(err) {
            console.log(err);
        });
}


function createNewRow() {
    var nodes = document.getElementById('list');
    while (nodes.hasChildNodes()) {
        nodes.removeChild(nodes.firstChild);
    }
    createHeader();
    ediableStudentRow("");
}


function getStudentsFromServer() {
    return new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();
        XHR.open("GET", "/students", true);
        XHR.onload = function() {
            if (XHR.status == 200) {
                resolve(JSON.parse(XHR.responseText));
            } else {
                reject(Error(XHR.responseText));
            }
        }
        XHR.onerror = function() {
            reject(Error("Network Error"));
        }
        XHR.send();
    });
}

function getStudents() {
    return getStudentsFromServer()
        .then(function(student) {
            var nodes = document.getElementById('list');
            while (nodes.hasChildNodes()) {
                nodes.removeChild(nodes.firstChild);
            }
            createHeader();
            return showAll(student);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function postStudentFromServer(studentId) {
    return new Promise((resolve, reject) => {
        var url = "/students/" + studentId;
        var XHR = new XMLHttpRequest();
        XHR.open("post", url, true);
        XHR.setRequestHeader("Content-type", "application/json");
        var data = {
            'firstName': document.getElementById('firstName').value,
            'lastname': document.getElementById('lastname').value,
            'studentId': document.getElementById('studentId').value
        };
        XHR.onload = function() {
            if (XHR.status == 200 && XHR.responseText != 'existed. Please use update') {
                resolve(JSON.parse(XHR.responseText));
            } else {
                reject(Error(XHR.responseText));
            }
        }
        XHR.onerror = function() {
            reject(Error("Network Error"));
        }
        XHR.send(JSON.stringify(data));
    });
}


function postStudent() {
    var studentId = document.getElementById('search_studentId').value;
    return postStudentFromServer(studentId)
        .then(function(student) {
            return getStudents();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function putStudentFromServer(studentId) {
    return new Promise((resolve, reject) => {
        var url = "/students/" + studentId;
        var XHR = new XMLHttpRequest();
        XHR.open("put", url, true);
        XHR.setRequestHeader("Content-type", "application/json");
        var data = {
            'firstName': document.getElementById('firstName').value,
            'lastname': document.getElementById('lastname').value,
            'studentId': document.getElementById('studentId').value
        };
        XHR.onload = function() {
            if (XHR.status == 200 && XHR.responseText != 'no match') {
                resolve(JSON.parse(XHR.responseText));
            } else {
                reject(Error(XHR.responseText));
            }
        }
        XHR.onerror = function() {
            alert("Error");
        }
        XHR.send(JSON.stringify(data));
    });
}

function putStudent() {
    var studentId = document.getElementById('search_studentId').value;
    return putStudentFromServer(studentId)
        .then(function(student) {
            return getStudents();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function deleteStudentFromServer(studentId) {
    return new Promise((resolve, reject) => {
        var url = "/students/" + studentId;
        var XHR = new XMLHttpRequest();
        XHR.open("delete", url, true);
        XHR.setRequestHeader("Content-type", "application/json");
        var data = {
            'studentId': document.getElementById('studentId').value
        };
        XHR.onload = function() {
            if (XHR.status == 200 && XHR.responseText != 'no match') {
                resolve(JSON.parse(XHR.responseText));
            } else {
                reject(Error(XHR.responseText));
            }
        }
        XHR.onerror = function() {
            alert("Error");
        }
        XHR.send(JSON.stringify(data));
    });
}


function deleteStudent() {
    var studentId = document.getElementById('search_studentId').value;
    return deleteStudentFromServer(studentId)
        .then(function(student) {
            return getStudents();
        })
        .catch(function(err) {
            console.log(err);
        });
}