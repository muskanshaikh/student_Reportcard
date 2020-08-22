const form = document.getElementById('form');
const name = document.getElementById('name');
const rollno = document.getElementById('rollno');
const cls=document.getElementById('class');
const subject=document.getElementById('sub1');
const marks=document.getElementById('marks1');
const options=document.getElementById('outofmarks');
const letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
const numbers = /^[A-Za-z]{4}\d{5}$/;



window.addEventListener('load', () => {

    let detailsstudent=JSON.parse(localStorage.getItem("details"));
    console.log(detailsstudent[0].subject[0].marks);
    let sname=detailsstudent[0].name;
    let rno=detailsstudent[0].rollno;
    let cls=detailsstudent[0].class;
    let subject=detailsstudent[0].subject[0].subject;
    let marks=detailsstudent[0].subject[0].marks;
    console.log(rno);
    document.getElementById("newname").innerHTML=sname;
    document.getElementById("rno").innerHTML=rno;
    document.getElementById("fname").innerHTML=cls;
   // document.getElementById("rno").innerHTML=rno;
    
   updatetable()
  
   
     calcsum()       

})
var sum=0;
var newopt=0;

function calcsum() {
    let flag=1;
    let marks=JSON.parse(localStorage.getItem("Submarks"));
let outof;


    marks.map(item=>{
        
        markslast=item.marks;
        outof=item.opt;
        let out=JSON.parse(localStorage.getItem("outof"));
      
        if(markslast<35 && out==100){
          
            document.getElementById("grade").innerHTML="fail";
            document.getElementById('total').innerHTML = "----"; 
            document.getElementById('outof').innerHTML="----";
            document.getElementById('percent').innerHTML = "----";
            flag=0;
 return flag;
           
            
         }
         
         if(markslast<12 && out==50){
          document.getElementById("grade").innerHTML="fail";
          document.getElementById('total').innerHTML = "----"; 
          document.getElementById('outof').innerHTML="----";
          document.getElementById('percent').innerHTML = "----";
          flag=0;
return flag;
         }
   if(flag==1) {      

    sum = parseFloat(sum) + parseFloat(markslast);
    
    var txt1 = eval(parseFloat(sum));
  
    document.getElementById('total').innerHTML = txt1;

   

     newopt=parseInt(outof)+newopt;
    //console.log(newopt);
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
  
      case txt2 < 35 :
        document.getElementById('grade').innerHTML = 'Fail';
        break;
    }

        
        }
});
  }

  

  /*For displaying report card in table */
 function updatetable() {
     let marks=JSON.parse(localStorage.getItem("Submarks"));
let lastchild,markslast;
console.log(typeof marks);
console.log(marks);
marks.map(item=>{
    lastchild=item.subject;
    markslast=item.marks;

   //  for(let i=0;i<marks.length;i++){
   //   lastchild=marks[i].subject;
     // markslast=marks[i].marks;
     //}
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
    let out=JSON.parse(localStorage.getItem("outof"));
   if(markslast<35 && out==100 ){
       childdiv.style.background="red";
   }
   if(markslast<12 && out==50 ){
    childdiv.style.background="red";
}
   
    //console.log(parent);
   
});
  }

  
        
    




   
  

 