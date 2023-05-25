import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
//import BootstrapColorPalette from './js/bscolpal';
import BootstrapColorPalette from 'color-palette-for-users';
import './styles/style.scss';
const myPal1 = new BootstrapColorPalette({
  "selector" : "#example1",
  "func": ChangeVar,
  "type": "var"
});
const myPal2 = new BootstrapColorPalette({
  "selector" : "#example2",
  "func": ChangeRGB,
  "type": "rgb"
});
const myPal3 = new BootstrapColorPalette({
  "selector" : "#example3",
  "func": ChangeBg,
  "type": "bg"
});
const myPal4 = new BootstrapColorPalette({
  "selector" : "#example4",
  "func": ChangeText,
  "type": "text"
});
const myPal5 = new BootstrapColorPalette({
  "selector" : "#example5",
  "func": ChangeBtn,
  "type": "btn",
});
const myPal6 = new BootstrapColorPalette({
  "selector" : "#example6",
  "func": ChangeBorder,
  "type": "border"
});
const myPal7 = new BootstrapColorPalette({
  "selector" : "#example7",
  "func": ChangeRGBA,
  "type": "rgba"
});
const myPal8 = new BootstrapColorPalette({
  "selector" : "#example8",
  "type": "main",
  "func": ChangeMain
});
function ChangeVar(col){
  $('#changed1').css({"background-color" : 'var('+col+')'});
  $('.return1').text(col);
}
function ChangeRGB(col){
  $('#changed2').css({'background-color' : 'rgb(var('+col+'))'});
  $('.return2').text(col);
}
function ChangeBg(col){
  var elClass;
  if ($('#changed3').attr('class')){
    elClass = $('#changed3').attr('class').split(' ');
    var arrCol = [
      "bg-primary",
      "bg-secondary",
      "bg-success",
      "bg-danger",
      "bg-warning",
      "bg-info",
      "bg-light",
      "bg-dark",
      "bg-body-secondary",
      "bg-body-tertiary",
      "bg-body",
      "bg-black",
      "bg-white",
      "bg-transparent"
    ];
    var bgCl;
    for (let i = 0; i < elClass.length; i++) {
      if (arrCol.indexOf(elClass[i]) !== -1){
         bgCl = elClass[i];
         break;
      }
    }
    if (bgCl) $('#changed3').removeClass(bgCl);
  }
  $('#changed3').addClass(col);
  $('.return3').text(col);
}
function ChangeText(col){
  var elClass;
    if ($('#changed4').attr('class')){
    elClass = $('#changed4').attr('class').split(' ');
    var arrCol = [
      "text-primary",
      "text-secondary",
      "text-success",
      "text-danger",
      "text-warning",
      "text-info",
      "text-light",
      "text-dark",
      "text-body",
      "text-muted",
      "text-white",
      "text-black"
    ];
    var bgCl;
    for (let i = 0; i < elClass.length; i++) {
      if (arrCol.indexOf(elClass[i]) !== -1){
         bgCl = elClass[i];
         break;
      }
    }
    if (bgCl) $('#changed4').removeClass(bgCl);
  }
  $('#changed4').addClass(col);
  $('.return4').text(col);
}
function ChangeBtn(col){
  var elClass;
    if ($('#changed5').attr('class')){
    elClass = $('#changed5').attr('class').split(' ');
    var arrCol = [
      "btn-primary",
      "btn-secondary",
      "btn-success",
      "btn-danger",
      "btn-warning",
      "btn-info",
      "btn-light",
      "btn-dark",
      "btn-link",
      "btn-outline-primary",
      "btn-outline-secondary",
      "btn-outline-success",
      "btn-outline-danger",
      "btn-outline-warning",
      "btn-outline-info",
      "btn-outline-light",
      "btn-outline-dark"
    ];
    var bgCl;
    for (let i = 0; i < elClass.length; i++) {
      if (arrCol.indexOf(elClass[i]) !== -1){
         bgCl = elClass[i];
         break;
      }
    }
    if (bgCl) $('#changed5').removeClass(bgCl);
  }
  $('#changed5').addClass(col);
  $('.return5').text(col);
}
function ChangeBorder(col){
  var elClass;
    if ($('#changed6').attr('class')){
    elClass = $('#changed6').attr('class').split(' ');
    var arrCol = [
      "border-primary",
      "border-secondary",
      "border-success",
      "border-danger",
      "border-warning",
      "border-info",
      "border-light",
      "border-dark"
    ];
    var bgCl;
    for (let i = 0; i < elClass.length; i++) {
      if (arrCol.indexOf(elClass[i]) !== -1){
         bgCl = elClass[i];
         break;
      }
    }
    if (bgCl) $('#changed6').removeClass(bgCl);
  }
  $('#changed6').addClass(col);
  $('.return6').text(col);
}
function ChangeRGBA(col){
  $('.return7').text(JSON.stringify(col,null,2));
  $('#changed7').css({"background" : `rgba(var(${col.color}),${col.opacity})`});
}
function ChangeMain(arr){
  for (var i = 0; i < arr.length; i++) {
    getClassByName(':root').style.setProperty(arr[i].color, arr[i].value);
  }
}
function getClassByName(className) {
  for (var ssNum in document.styleSheets)
    for (var ruleNum in document.styleSheets[ssNum].cssRules)
      if (document.styleSheets[ssNum].cssRules[ruleNum].selectorText)
        if (document.styleSheets[ssNum].cssRules[ruleNum].selectorText.indexOf(className) == 0)
          return document.styleSheets[ssNum].cssRules[ruleNum];
}
