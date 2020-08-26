const name = document.getElementById('name');
const rollno = document.getElementById('rollno');

const subject = document.getElementById('sub1');
const marks = document.getElementById('marks1');
const options = document.getElementById('outofmarks');

window.addEventListener('load', () => {
  let detailsstudent = JSON.parse(localStorage.getItem('details'));
  console.log(detailsstudent[0].subject[0].marks);
  let sname = detailsstudent[0].name;
  let rno = detailsstudent[0].rollno;
  document.getElementById('newname').value = sname;
  document.getElementById('rno').value = rno;
  updatetable();
});

var sum = 0;

var newopt = 0;

var i = 0;
var flag=1;
/*For displaying report card in table */
function updatetable() {
  let marks = JSON.parse(localStorage.getItem('Submarks'));
  let lastchild, markslast;

  marks.map((item) => {
    lastchild = item.subject;
    markslast = item.marks;
    outof = item.opt;
    minvalue = item.minvalue;
    var parent = document.getElementById('tbl');
    var childdiv = document.createElement('tr'); // create child div on the fly

    childdiv.innerHTML =
      '' +
      '<td width="135" height="30" class="borderright">' +
      '<font face="arial" id="subjectid">' +
      i +
      '</font>' +
      '</td>' +
      '<td width="135" height="30" class="borderright">' +
      '<font face="arial" id="subjectname">' +
      lastchild +
      '</font>' +
      '</td>' +
      '<td>' +
      '<font face="arial" id="account">' +
      outof +
      '</font>' +
      '</td>' +
      '<td>' +
      '<font face="arial" id="total">' +
      minvalue +
      '</font>' +
      '</td>' +
      '<td>' +
      '<font face="arial" id="outof">' +
      markslast +
      '</font>' +
      ' </td>';

    parent.appendChild(childdiv);
    i++;
   
    sum = parseFloat(sum) + parseFloat(markslast);
    var txt1 = eval(parseFloat(sum));

    document.getElementById('granttotal').value = txt1;
    newopt = parseInt(outof) + newopt;

    document.getElementById('oboutof').value = newopt;

    if (markslast < minvalue) {
      childdiv.style.background = 'red';
      document.getElementById('grade').value = 'Fail ';

      document.getElementById('granttotal').value = txt1;
      document.getElementById('oboutof').value = newopt;
      document.getElementById('percent').value = '----';
      flag = 0;
      return false;
    }
    if (flag == 1) {
      var txt2 = eval(parseFloat((txt1 * 100) / newopt));
      document.getElementById('percent').value = txt2.toFixed(2) + '%';

      if (txt2 > 75) {
        document.getElementById('grade').value = 'Distinction';
        return;
      } else if (txt2 > 60 && txt2 < 75) {
        document.getElementById('grade').value = 'first class ';
        return;
      } else if (txt2 > 35 && txt2 < 60) {
        document.getElementById('grade').value = 'Pass ';
        return;
      } else {
        document.getElementById('grade').value = 'Fail ';
        return;
      }
    }
  });
}
