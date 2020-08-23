const form = document.getElementById('form');
const name = document.getElementById('name');
const rollno = document.getElementById('rollno');

const letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
var numbers = /^[A-Za-z]{4}\d{5}$/;

form.addEventListener('submit', (e) => {

 e.preventDefault()

 checkInputs();
  


});



var sum = 0;
function checkInputs() {
  let i=1;
  // trim to remove the whitespaces
  const nameValue = name.value.trim();
  const rollnovalue = rollno.value.trim();

 
  if (nameValue === '') {
    alert('name cannot be blank');
    name.focus();
  i=0;
  }
  if(name.length>20){
    alert('name cannot be more than 20 words');
    name.focus();
    i=0; 
  }

  if(name.length<3){
    alert('name cannot be less than 3 words');
    name.focus();
    i=0; 
  }

  if (!nameValue.match(letters)) {
    alert('Please enter alphanumeric characters only');
    i=0;
  }
  if (rollnovalue === '') {
    alert('rollno cannot be blank');
    rollno.focus();
    i=0;
  }
  if (!rollnovalue.match(numbers)) {
    rollno.focus();
    alert('please enter rollno in this format: COEP23456');
    i=0;
  }

  if (!rollno.length > 9) {
    rollno.focus();
    alert('please enter rollno in this format: COEP23456');
    i=0;
  }
let history=JSON.parse(localStorage.getItem("Submarks"));
 
 if(history==null){
   alert("please enter subject and marks")
   i=0;
 }
    
if(i==1){
  myfunction();
  window.location.href="grade.html";

  
}
else{
  
  return false;
}
  
}
let studentinfo=[];
function myfunction() {
  
  
var a = document.form1.txtname.value;
  var e = document.form1.txtrollno.value;
  var c=document.form1.txtfame.value;
  let marks=JSON.parse(localStorage.getItem("Submarks"))
  let info={
    name:a,
    rollno:e,
    class:c,
    subject:marks,
    
    

}
studentinfo.push(info);
var studenthistory=JSON.parse(localStorage.getItem("Submarks"));


if(studenthistory!=null){
let newarr = Object.entries(studenthistory);
////console.log(arr);
newarr.push(studentinfo)
localStorage.setItem("details",JSON.stringify(studentinfo));
}else{
//arr.push(submarks);
localStorage.setItem("details",JSON.stringify(studentinfo));
}


document.getElementById("name").value="";
document.getElementById("rollno").value="";
document.getElementById("class").value="";


}


var information = [];
var insert = 0;

var room = 1;
/*For adding subject in  new row*/
function duplicate() {
  var marks = document.getElementById('marks1').value;
  var subject = document.getElementById('sub1').value;

  if (marks === '') {
    alert('please enter marks');
    return false;
  }

  if (marks.length > 2) {
    alert('please enter only 2 digits');
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
  var selectedmarks=document.getElementById("outofmarks");
  var opt=selectedmarks.value;
  if(opt=="50"){
    if(marks>50){
      alert("please enter marks inside 50");
      return false;
    }
  }

  if(opt=="100"){
    if(marks>100){
      alert("please enter marks inside 50");
      return false;
    }
  }

  localStorage.setItem("outof",opt);
  let submarks={
    subject:subject,
    marks:marks,
    opt:opt
  }

 //// var existing = localStorage.getItem('Submarks');

//existing = existing ?JSON.parse(existing) : [];
 //console.log(typeof existing);
 
 //let arr = Object.keys(existing);
//console.log(arr)
 
    
  
 information.push(submarks);
 console.log(information);
  
var drophistory=JSON.parse(localStorage.getItem("Submarks"));
if(drophistory!=null){
let arr = Object.entries(drophistory);
////console.log(arr);
arr.push(information)
localStorage.setItem("Submarks",JSON.stringify(information));
}else{
//arr.push(submarks);
localStorage.setItem("Submarks",JSON.stringify(information));
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
    '&nbsp;Out of '+opt+' &nbsp;&nbsp;' +
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
var newopt=0;
function deletefromrow(o) {
  var p = o.parentNode.parentNode;
  console.log(p);
  var subname = p.getElementsByTagName('div')[0].innerHTML;

  //Get the reference of the Table.
  var table = document.getElementById('tbl');
 

 
 var dataarray=JSON.parse(localStorage.getItem("Submarks"));
   
  let  delrow = p.children[0].children[0].value;

 console.log(dataarray);
 var removeindex=dataarray.map(function(item){ return item.subject;}).indexOf(delrow);
// console.log(removeindex);
if(removeindex>-1){
  

dataarray.splice(removeindex,1);
}
 //console.log(dataarray);


 localStorage.setItem("Submarks",JSON.stringify(dataarray));

 p.parentNode.removeChild(p);

 alert("Your item has been deleted successfully")
 






/* var i=dataarray[0].subject.indexOf(delrow);
  //console.log(i);
  if(i>-1){
    dataarray.splice(i,1);
  }
  localStorage.setItem("Submarks",JSON.stringify(dataarray));

*/
 



}


/*Calculating sum*/
/*function calcsum(markslast) {
    sum = parseFloat(sum) + parseFloat(markslast);
    var txt1 = eval(parseFloat(sum));
  
    document.getElementById('total').innerHTML = txt1;

    var selectedmarks=document.getElementById("outofmarks");
    var opt=selectedmarks.value;

     newopt=parseInt(opt)+newopt;
    console.log(newopt);
   document.getElementById('outof').innerHTML=newopt;
  // var txt2 = eval(parseFloat(txt1 * opt) / ((room - 1) * 100));
  var txt2 = eval(parseFloat((txt1*100) /newopt));

  //Select out of 100 oor 50 not mix ;
  
    document.getElementById('percent').innerHTML = txt2.toFixed(2) + '%';
    
    switch (true) {
      case txt2 > 75:
        document.getElementById('grade').innerHTML = 'Pass with Distinction';
        break;
      case txt2 > 60 && txt2 < 75:
        document.getElementById('grade').innerHTML = 'Pass with first class';
        break;
      case txt2 > 35 && txt2 < 60:
        document.getElementById('grade').innerHTML = 'Pass';
        break;
  
      case txt2 < 35:
        document.getElementById('grade').innerHTML = 'Fail';
        break;
    }
  }
 */
  /*For displaying report card in table */
 /*function updatetable(lastchild, markslast) {
    var parent = document.getElementById('tbl');
    var childdiv = document.createElement('tr'); // create child div on the fly
  
    childdiv.innerHTML =
      '' +
      
      '</td> ' +
      '<td width="135" height="30">' +
      '<font face="arial" id="subjectname">' +
      lastchild +
      '</font>' +
      '</td>' +
      '<td>' +
      '<font face="arial" id="account">' +
      markslast +
      '</font>' +
      '</td>';

    parent.appendChild(childdiv);
    if (markslast < 35) {
      childdiv.style.background = 'red';
    }
    console.log(parent);
   // calcsum(markslast);
  }*/
 
  
  

/*

var deletecount = 0;

function deleterow(o) {
 
  var row = o.parentNode.parentNode;
  var subname = row.getElementsByTagName('td')[0].innerHTML;

  //Get the reference of the Table.
  var table = document.getElementById('tbl');

  //Delete the Table row using it's Index.
  table.deleteRow(row.rowIndex);
  deletecount++;

  //console.log(row.children[1].children[0].value);
  let delrow = row.children[1].children[0].value;

  let diffvalue = parseInt(sum) - parseInt(delrow);
  console.log(diffvalue);
  sum=diffvalue;
  

  document.getElementById('total').innerHTML = diffvalue;

  
  var selectedmarks=document.getElementById("outofmarks");
  var opt=selectedmarks.value;
  var txt2 = eval(
    parseFloat(diffvalue * 100) / ((room - 1 - deletecount) * opt));
  document.getElementById('percent').innerHTML = txt2.toFixed(2) + '%';

  switch (true) {
    case txt2 > 75:
      document.getElementById('grade').innerHTML = 'Pass with Distinction';
      break;
    case txt2 > 60 && txt2 < 75:
      document.getElementById('grade').innerHTML = 'Pass with first class';
      break;
    case txt2 > 35 && txt2 < 60:
      document.getElementById('grade').innerHTML = 'Pass';
      break;

    case txt2 < 35:
      document.getElementById('grade').innerHTML = 'Fail';
      break;
  }

  deletefromrow(o); //this is for deleting subject from form
}

*/

/*
let info={
    subject:subject,
    marks:marks,
    rollno:e
}
console.log(information);
var existing = localStorage.getItem('details');
// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ?JSON.parse(existing) : [];
// Add new data to localStorage Array
existing.push(info);
   
    
  // var drophistory = JSON.parse(localStorage.getItem("details"));
    //let arr = Object.entries(drophistory);
////console.log(arr);
//information.push(arr)
  
    localStorage.setItem('details',JSON.stringify(existing));
    */
/* let display=document.getElementById('tbl');
   var targeindex=p.rowIndex;
   console.log(targeindex);
   console.log(display)
   p.parentNode.removeChild(targeindex);
  
*/

//  delrow.deleteRow(0);

// console.log(p);
/*function duplicate(){
    var row=document.getElementById("clonerow");
    var table=document.getElementById("tbl2");
    var clone=row.cloneNode(true);
    clone.id="newId";
    table.appendChild(clone);
    var marks = document.getElementById('marks1').value;
    var subject = document.getElementById('sub1').value;
    console.log(subject);
    console.log(marks);
}
*/
/*let details={
    name:a,
    rollno:e,
    institute:c,
    batch:d,
    subject:information
}
*/

// let newinfo=JSON.parse(localStorage.getItem("information"));
//let subnew=localStorage.getItem("details");
