const form = document.getElementById('form');
const name = document.getElementById('name');
const rollno = document.getElementById('rollno');
const cls = document.getElementById('class');

const letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
var numbers = /^[A-Za-z]{4}\d{5}$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
});

var sum = 0;
function checkInputs() {
  let i = 1;
  // trim to remove the whitespaces
  const nameValue = name.value.trim();
  const rollnovalue = rollno.value.trim();

  if (nameValue == '') {
    alert('name cannot be blank');
    name.focus();
    i = 0;
  }
  if (!nameValue.match(letters)) {
    alert('Please enter alphanumeric characters only');
    i = 0;
  }
  if (rollnovalue == '') {
    alert('rollno cannot be blank');
    rollno.focus();
    i = 0;
  }
  if (!rollnovalue.match(numbers)) {
    rollno.focus();
    alert('please enter rollno in this format: COEP23456');
    i = 0;
  }

  if (!rollno.length > 9) {
    rollno.focus();
    alert('please enter rollno in this format: COEP23456');
    i = 0;
  }
  let history = JSON.parse(localStorage.getItem('Submarks'));

  if (history == null) {
    alert('please enter subject and marks');
    i = 0;
  }

  if (i == 1) {
    myfunction();
    window.location.href = 'grade.html';
  } else {
    return false;
  }
}
let studentinfo = [];
function myfunction() {
  var a = document.form1.txtname.value;
  var e = document.form1.txtrollno.value;

  let marks = JSON.parse(localStorage.getItem('Submarks'));
  let info = {
    name: a,
    rollno: e,

    subject: marks
  };
  studentinfo.push(info);
  var studenthistory = JSON.parse(localStorage.getItem('Submarks'));

  if (studenthistory != null) {
    let newarr = Object.entries(studenthistory);
    ////console.log(arr);
    newarr.push(studentinfo);
    localStorage.setItem('details', JSON.stringify(studentinfo));
  } else {
    //arr.push(submarks);
    localStorage.setItem('details', JSON.stringify(studentinfo));
  }

  document.getElementById('name').value = '';
  document.getElementById('rollno').value = '';
}

var information = [];
var insert = 0;

var room = 1;
/*For adding subject in  new row*/
function duplicate() {
  var marks = document.getElementById('marks1').value;
  var subject = document.getElementById('sub1').value;

  if (marks == '') {
    alert('please enter marks');
    return false;
  }

  if (!marks.match(/^[0-9]+$/)) {
    alert('please enter number');
    return false;
  }

  if (!subject.match(letters)) {
    alert('please enter correct subject name');
    return false;
  }
  var selectedmarks = document.getElementById('outofmarks');
  var opt = selectedmarks.value;
  if (opt == '50') {
    if (marks > 50) {
      alert('please enter marks inside 50');

      return false;
    }
  }

  if (opt == '100') {
    if (marks > 100) {
      alert('please enter marks inside 50');
      return false;
    }
  }

  let newopt = opt == 100 ? 100 : 50;
  let minvalue = opt == 100 ? 33 : 17;
  console.log(minvalue);
  submarks = {
    subject: subject,
    marks: marks,
    opt: newopt,
    minvalue: minvalue
  };
  information.push(submarks);
  console.log(information);

  var drophistory = JSON.parse(localStorage.getItem('Submarks'));
  if (drophistory != null) {
    let arr = Object.entries(drophistory);
    ////console.log(arr);
    arr.push(information);
    localStorage.setItem('Submarks', JSON.stringify(information));
  } else {
    //arr.push(submarks);
    localStorage.setItem('Submarks', JSON.stringify(information));
  }
  room++;

  var parentDiv = document.getElementById('tbl2');

  var childDiv = document.createElement('div'); // create child div on the fly
  childDiv.setAttribute('class', 'removeclass' + room);

  childDiv.innerHTML =
    '' +
    ' <div width="140" id="subname" >' +
    '<input type="text" placeholder="enter subject name" id="sub1"  disabled="disabled" value="' +
    subject +
    '"/>' +
    '</div>&nbsp;' +
    '<div id="marks">' +
    '<input type="text" name="txtaccount" maxlength="2" size="10" id="marks1" placeholder="marks" disabled="disabled" value="' +
    marks +
    '"/>' +
    '&nbsp;Out of ' +
    opt +
    ' &nbsp;&nbsp;' +
    '<button type="button" name="reset" onclick="deletefromrow(this)" id="add">' +
    'Delete' +
    '</button>' +
    '</div>';
  insert++;
  parentDiv.appendChild(childDiv);

  // updatemarks(room);
  document.getElementById('marks1').value = '';
  document.getElementById('sub1').value = '';
}
var newopt = 0;
function deletefromrow(o) {
  var p = o.parentNode.parentNode;
  console.log(p);
  var subname = p.getElementsByTagName('div')[0].innerHTML;
  var table = document.getElementById('tbl');

  var dataarray = JSON.parse(localStorage.getItem('Submarks'));

  let delrow = p.children[0].children[0].value;
  var removeindex = dataarray
    .map(function (item) {
      return item.subject;
    })
    .indexOf(delrow);

  if (removeindex > -1) {
    dataarray.splice(removeindex, 1);
  }
  localStorage.setItem('Submarks', JSON.stringify(dataarray));

  information.splice(removeindex, 1);
  p.parentNode.removeChild(p);

  alert('Your item has been deleted successfully');
}
