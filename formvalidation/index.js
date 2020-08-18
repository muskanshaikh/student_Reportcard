const form = document.getElementById('form');
const name = document.getElementById('name');
const rollno = document.getElementById('rollno');
const letters=/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
var numbers=/^[A-Za-z]{4}\d{5}$/;
form.addEventListener('submit', e => {
	e.preventDefault();
	
    if(checkInputs()){
        myfunction();
    };
});

function myfunction(){
  var a = document.form1.txtname.value;
 document.getElementById("newname").innerHTML=a;
 var e = document.form1.txtrollno.value;
 document.getElementById("rno").innerHTML=e;
 var b = document.form1.txtfame.value;
 document.getElementById("fname").innerHTML = b;

 var c = document.form1.txtinstitute.value;
 
 document.getElementById("inst_name").innerHTML = c;
 var d = document.form1.txtbatch.value;
 document.getElementById("batch").innerHTML = d;
 var y = document.form1.txtyear.value;
 document.getElementById("year").innerHTML = y;

}
var sum=0;
function calcsum(markslast){
  
   sum=parseFloat(sum) + parseFloat(markslast);
   var txt1 = eval(parseFloat(sum));
    
   document.getElementById("total").innerHTML = txt1;
   
   var txt2 =eval(parseFloat(txt1*100)/((room-1)*100));
   document.getElementById("percent").innerHTML = txt2.toFixed(2)+"%";
   
   
   switch(true)
   {
   
   case(txt2>75):
   document.getElementById("grade").innerHTML="Pass with Distinction";
   break;
   case(txt2>60&& txt2 < 75):
   document.getElementById("grade").innerHTML="Pass with first class";
   break;
   case(txt2>35 && txt2<60):
   document.getElementById("grade").innerHTML="Pass";
   break;
   
   case(txt2<35):
   document.getElementById("grade").innerHTML="Fail";
   break;
   }
  
        
}
var i=1
function updatetable(lastchild,markslast){
    var parent= document.getElementById('tbl');
    var childdiv = document.createElement("tr"); // create child div on the fly
    
    childdiv.innerHTML = '' +' <td width="135">'+'Subj'+i+'</td> '+'<td width="135" height="30">'+'<font face="arial" id="subjectname">'+lastchild+'</font>'+'</td>'+'<td>'+'<font face="arial" id="account">'+markslast+'</font>'+'</td>';
    i++;
    parent.appendChild(childdiv);
    if(markslast<35){
    childdiv.style.background="red";    
    }
    console.log(parent);
    calcsum(markslast);

   
}
function updatemarks(room){
    let sub1=document.getElementsByClassName("removeclass"+room)[0];
let child=sub1.children[0];
let lastchild=child.children[0].value;
let markschild=sub1.children[1];
let markslast=markschild.children[0].value;

updatetable(lastchild,markslast);



}
 

function checkInputs() {
	// trim to remove the whitespaces
	const nameValue = name.value.trim();
    const rollnovalue = rollno.value.trim();

  
    
   

    
    if(nameValue === '') {
        alert("name cannot be blank");
        name.focus();
        return false;
    }
    
    if(!nameValue.match(letters) ){
       
        alert("Please enter alphanumeric characters only");
        return false;
    }
    if(rollnovalue === '') {
        alert("rollno cannot be blank");
        rollno.focus();
        return false;
    } 
    if(!rollnovalue.match(numbers)){
        alert("please enter rollno in this format: COEP23456");
        return false;
    }
    
 return true;
    
}


var information=[];
var insert=0;
var room = 1;
function duplicate(){
    var marks = document.getElementById('marks1').value;
    var subject = document.getElementById('sub1').value;

    if(marks===""){
        alert("please enter marks")
        return false;
    }
    if(!subject.match(letters)){
alert("please enter correct subject name")
return false;
    }
    var a = document.form1.txtname.value;
    var e = document.form1.txtrollno.value;
    
    room++;
   
    var parentDiv = document.getElementById('tbl2');
    var childDiv = document.createElement("tr"); // create child div on the fly
    childDiv.setAttribute("class", "removeclass"+room);
    childDiv.innerHTML = '' +' <td width="140" id="subname" >'+'<input type="text" placeholder="enter subject name" id="sub1"  disabled="disabled" value="'+subject+'"/>'+'</td>'+'<td id="marks">'+'<input type="text" name="txtaccount" maxlength="2" size="10" id="marks1" placeholder="marks" disabled="disabled" value="'+marks+'"/>'+
    '&nbsp;Out of 100 &nbsp;&nbsp;'+
    '<button type="button" name="reset" onclick="deleterow(this)" id="add">'+'Delete'+'</button>'+'</td>';
    insert++;
    parentDiv.appendChild(childDiv);

  
let obj={
    subject:subject,
    marks:marks
}
information.push(obj);

updatemarks(room);
document.getElementById("marks1").value="";
document.getElementById("sub1").value="";




}


var deletecount=0;


function deleterow(o){
  // var p=o.parentNode.parentNode;
    //p.parentNode.removeChild(p);
   
    //var tbl = document.getElementById('tbl');
    //tbl.deleteRow(o.parentNode.parentNode.rowIndex);
    var row = o.parentNode.parentNode;
    var name = row.getElementsByTagName("td")[0].innerHTML;
    if (confirm("Do you want to delete: " + name)) {

        //Get the reference of the Table.
        var table = document.getElementById("tbl");

        //Delete the Table row using it's Index.
        table.deleteRow(row.rowIndex);
        deletecount++;
    }
    
  
 let sumvalue=document.querySelectorAll('input[name="txtaccount"]')[1].value;
 
calcvalue=sum-sumvalue;
console.log(calcvalue);
 newgrade(calcvalue);

    
 deletefromrow(o);//this is for deleting subject from form 
 


} 

function newgrade(calcvalue){
  
  
    var txt1 = eval(parseFloat(calcvalue));
    document.getElementById("total").innerHTML = calcvalue;
    
    var txt2 =eval(parseFloat(txt1*100)/((room-1-deletecount)*100));
    document.getElementById("percent").innerHTML = txt2.toFixed(2)+"%";
    
    
    switch(true)
    {
    
    case(txt2>75):
    document.getElementById("grade").innerHTML="Pass with Distinction";
    break;
    case(txt2>60&& txt2 < 75):
    document.getElementById("grade").innerHTML="Pass with first class";
    break;
    case(txt2>35 && txt2<60):
    document.getElementById("grade").innerHTML="Pass";
    break;
    
    case(txt2<35):
    document.getElementById("grade").innerHTML="Fail";
    break;
    }
   
         
 }

function deletefromrow(o){
    var p=o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

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