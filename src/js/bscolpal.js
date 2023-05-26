import * as $ from 'jquery';
export default class BootstrapColorPalette {
  constructor(obj = {}) {
    this.dev = obj.dev || true;
    if (!obj.selector && this.dev) return console.log("BootstrapColorPalette : Не выбран DOM эллемент");
    if (!$(obj.selector) && this.dev) return console.log("BootstrapColorPalette : DOM Эллемента не существует");
    this.selector = obj.selector;
    this.type = obj.type || "var";
    this.func = obj.func || function(result){
      if(this.dev) console.log(result);
    }
    this.auto = obj.auto || true;
    this.size = obj.size || 24;
    this.palette = obj.palette;
    this.select = obj.select || '--bs-body-bg-rgb';
    if (typeof this.type === "object" || this.type === "rgba" || this.type === "main") {
      if (this.type.type === "rgba" || this.type === "rgba"){
        this.type = {
          "type" : obj.type || "rgba",
          "title" : obj.type.title || "Opacity",
          "min" : obj.type.min || 0,
          "max" : obj.type.max || 1,
          "value" : obj.type.value || 1
        };
      }
      if (this.type.type === "main" || this.type === "main"){
        class ColorVar {
          constructor(obj = {}) {
            this.name = obj.name || "Color";
            this.color = obj.color || "--none";
            this.type = obj.type || "";
            this.value = obj.value || "#000000"
            this.value = this.getValue();
          }
          getValue(){
            var value;
            let root = document.querySelector(':root');

            if ($(':root').css(this.color)) {
              value = getComputedStyle(root).getPropertyValue(this.color).replace(" ","");
            }
            else {
              if (this.value) value = this.value;
              else value = "#000000";
            }
              if (validHexColor(value)){
                value = validHexColor(value);
                this.type = 'hex';
              }
              else if (validRGBColor(value)){
                value = validRGBColor(value);
                this.type = 'rgb';
              }
              else {
                value = "#000000";
                this.type = 'hex';
              }
            if (!$(':root').css(this.color)) {
              getClassByName(':root').style.setProperty(this.color, value);
              //document.styleSheets[0].insertRule(`:root{${this.color}: ${value}}`,0);
            }
            return value;
          }
        }
        class MainColorPalette {
          constructor(obj = {}) {
            this.type =  obj.type || "main";
            this.itemSize = this.itemSize || {
              "min": 80,
              "max": 120
            };
            this.font = obj.font || 14;
            if (obj.vars){
              for (let i = 0; i < obj.vars.length; i++) {
                obj.vars[i] = new ColorVar({
                  "name" : obj.vars[i].name || "Color",
                  "color": obj.vars[i].color || "--none",
                  "value": obj.vars[i].value || "#000000"
                });
              }
            }
            this.vars = obj.vars || [
              new ColorVar({
                "name" : "Body background",
                "color" : "--bs-body-bg-rgb"
              }),
              new ColorVar({
                "name" : "Body text",
                "color" : "--bs-body-color-rgb"
              }),
              new ColorVar({
                "name" : "Primary",
                "color" : "--bs-primary-rgb"
              }),
              new ColorVar({
                "name" : "Secondary",
                "color" : "--bs-secondary-rgb"
              }),
              new ColorVar({
                "name" : "Success",
                "color" : "--bs-success-rgb"
              }),
              new ColorVar({
                "name" : "Info",
                "color" : "--bs-info-rgb"
              }),
              new ColorVar({
                "name" : "Warning",
                "color" : "--bs-warning-rgb"
              }),
              new ColorVar({
                "name" : "Danger",
                "color" : "--bs-danger-rgb"
              }),
              new ColorVar({
                "name" : "Light",
                "color" : "--bs-light-rgb"
              }),
              new ColorVar({
                "name" : "Dark",
                "color" : "--bs-dark-rgb"
              })
            ];
          }
        }
        this.type = new MainColorPalette(obj.type);
      }
    }
    if (this.auto) this.init();
  }
  init(th = this){
    var result;
    $(th.selector + ' .bcp .bcp-item').off('.bcp');
    if (typeof th.type == "string" || th.type.type !== "main"){
      var arr = [];
      var palette = '<div class = "bcp d-flex flex-wrap">';
      if (!th.palette){
        if (typeof th.type === "string"){
          switch (th.type) {
            case "bg":
              arr = [
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
            break;
            case "text":
              arr = [
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
            break;
            case "btn":
              arr = [
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
            break;
            case "border":
              arr = [
                "border-primary",
                "border-secondary",
                "border-success",
                "border-danger",
                "border-warning",
                "border-info",
                "border-light",
                "border-dark"
              ];
            break;
            case "var":
              arr = [
                "--bs-blue",
                "--bs-indigo",
                "--bs-purple",
                "--bs-pink",
                "--bs-red",
                "--bs-orange",
                "--bs-yellow",
                "--bs-green",
                "--bs-teal",
                "--bs-cyan",
                "--bs-black",
                "--bs-white",
                "--bs-gray",
                "--bs-gray-dark",
                "--bs-gray-100",
                "--bs-gray-200",
                "--bs-gray-300",
                "--bs-gray-400",
                "--bs-gray-500",
                "--bs-gray-600",
                "--bs-gray-700",
                "--bs-gray-800",
                "--bs-gray-900",
                "--bs-primary",
                "--bs-secondary",
                "--bs-success",
                "--bs-info",
                "--bs-warning",
                "--bs-danger",
                "--bs-light",
                "--bs-dark",
                "--bs-link-color",
                "--bs-link-hover-color",
                "--bs-code-color",
                "--bs-highlight-bg",
                "--bs-border-color",
                "--bs-body-bg",
                "--bs-body-color"
              ];
            break;
            case "rgb":
              arr = [
                "--bs-primary-rgb",
                "--bs-secondary-rgb",
                "--bs-success-rgb",
                "--bs-info-rgb",
                "--bs-warning-rgb",
                "--bs-danger-rgb",
                "--bs-light-rgb",
                "--bs-dark-rgb",
                "--bs-white-rgb",
                "--bs-black-rgb",
                "--bs-body-color-rgb",
                "--bs-body-bg-rgb",
              ];
            break;
          }
        }
        else{
          arr = [
            "--bs-primary-rgb",
            "--bs-secondary-rgb",
            "--bs-success-rgb",
            "--bs-info-rgb",
            "--bs-warning-rgb",
            "--bs-danger-rgb",
            "--bs-light-rgb",
            "--bs-dark-rgb",
            "--bs-white-rgb",
            "--bs-black-rgb",
            "--bs-body-color-rgb",
            "--bs-body-bg-rgb",
          ];
        }
      }
      else arr = th.palette;
      palette += th.render(arr);
      palette += `</div>`;
      $(th.selector).prepend(palette);
      $(th.selector + ' .bcp .bcp-item').on('click.bcp', function(e){
        if (typeof th.type !== "object"){
          result = $(this).attr("value");
        }
        else if(th.type.type == "rgba") {
          th.select = $(this).attr("value");
          result = {
            "color" : th.select,
            "opacity" : th.type.value
          };
        }
        th.func(result);
      });
      if (typeof th.type === "object" && th.type.type == "rgba"){
        $(th.selector + ' input').on('input.bcp',function(e){
          $(th.selector + ' input').not(this).val($(this).val());
          th.type.value = $(this).val();
          result = {
            "color" : th.select,
            "opacity" : th.type.value
          };
          th.func(result);
        });
      }
    }
    else {
      $(th.selector).prepend(th.renderMain(th.type));
      $(th.selector + ' .mc-input').on('change.bcp',function(e){
        if (th.type.vars[$(this).attr('data-pos')].type == "hex"){
          if (validHexColor($(this).val())){
            $(this).val(validHexColor($(this).val()));
          }
          else $(this).val("#000000");
          $(this).prev('.open-main-color').css({"background" : $(this).val()});
          $(this).prev('.open-main-color').attr('data-val',$(this).val());
        }
        else {
          if (validRGBColor($(this).val())){
            $(this).val(validRGBColor($(this).val()));
          }
          else if (validHexColor($(this).val())){
            $(this).val(hexToRGB(validHexColor($(this).val())));
          }
          else $(this).val("0,0,0");

          $(this).prev().css({"background" : `rgb(${$(this).val()})`});
          $(this).prev('.open-main-color').attr('data-val',$(this).val());
        }
        th.type.vars[$(this).attr("data-pos")].value = $(this).val();
        result = th.type.vars;
        th.func(result);
      });

      $(th.selector + ' .open-main-color').on('click.bcp',function(e){
        var val;
        if (th.type.vars[$(this).attr('data-pos')].type == "hex") val = hexToHSL($(this).attr('data-val'));
        else val = RGBToHSL($(this).attr('data-val')) ;
        const inpObj = {
          "pos" : $(this).attr('data-pos'),
          "val" : val
        }
        $(th.selector + ' #main-color-inputs').empty();
        $(th.selector + ' #main-color-inputs').prepend(th.addMainInputs(inpObj));
        $(th.selector + ' #main-color-inputs input').off('input.bcp');
        $(th.selector + ' #main-color-inputs input').on('input.bcp',function(e){
          let h = $(th.selector + ' #bcp-hue-inp').val(),
              s = $(th.selector + ' #bcp-saturation-inp').val(),
              l = $(th.selector + ' #bcp-lightness-inp').val(),
              pos = $(this).attr("data-pos");
          $(th.selector + ' #bcp-color-box').css({"background" : `hsl(${h},${s}%,${l}%)`});

          let resultColor;
          if (th.type.vars[$(this).attr('data-pos')].type == "hex") resultColor = HSLToHex(h,s,l);
          else resultColor = HSLToRGB(h,s,l);
            $(th.selector + ' #col-value').text(resultColor);
            $(th.selector + ' .mc-input[data-pos="'+pos+'"]').val(resultColor);
            $(th.selector + ' .mc-input[data-pos="'+pos+'"]').change();
            th.type.vars[pos].value = HSLToRGB(h,s,l);
            $(th.selector + ' .open-main-color[data-pos="'+pos+'"]').attr('data-val',resultColor);
        });
        $(th.selector + ' #col-value').text($(this).attr('data-val'));
      });
    }
  }
  addMainInputs(obj, th = this){
    function addGradientInput(val, pos){

      try {
        document.styleSheets[0].insertRule(`.inp-grad.form-range::-moz-range-track { background: linear-gradient(90deg,hsl(0, 100%, 50%),hsl(60, 100%, 50%),hsl(120, 100%, 50%),hsl(180, 100%, 50%),hsl(240, 100%, 50%),hsl(300, 100%, 50%),hsl(300, 100%, 50%)) }`,document.styleSheets[0].length);
      }
      catch(e){
        document.styleSheets[0].insertRule(`.inp-grad.form-range::-webkit-slider-runnable-track { background: linear-gradient(90deg,hsl(0, 100%, 50%),hsl(60, 100%, 50%),hsl(120, 100%, 50%),hsl(180, 100%, 50%),hsl(240, 100%, 50%),hsl(300, 100%, 50%),hsl(300, 100%, 50%)) }`,document.styleSheets[0].length);
      }
      document.styleSheets[0].insertRule(".inp-grad.form-range { transform: rotate(90deg); position: absolute; width: 198px; top: 86px; left: -66px }",document.styleSheets[0].length);
      let inp = `<input id="bcp-hue-inp" type="range" class="inp-grad form-range" data-pos="${pos}" min="0" max="360" step="1" value="${val}">`;
      return inp;
    }

    let inputs =`<div class="d-flex">
        <div style="width: 150px;">
          <div id="bcp-color-box" class="rounded" style="width: 150px; height: 150px; background: hsl(${obj.val.h},${obj.val.s}%,${obj.val.l}%)  ; box-shadow: rgba(0, 0, 0, 0.55) 2px 3px 4px inset !important;"></div>
          <div class="mt-2" style="font-size: 12px">
            <label for="bcp-saturation-inp" class="form-label mb-1">Saturation</label>
            <input type="range" class="form-range" id="bcp-saturation-inp" data-pos="${obj.pos}" min="0" max="100" step="1" value="${obj.val.s}">
          </div>
          <div class="mt-2" style="font-size: 12px">
            <label for="bcp-lightness-inp" class="form-label mb-1">Lightness</label>
            <input type="range" class="form-range" id="bcp-lightness-inp" data-pos="${obj.pos}" min="0" max="100" step="1" value="${obj.val.l}">
          </div>
        </div>
        <div class="position-relative" style="width: 50px">
          ${addGradientInput(obj.val.h,obj.pos)}
        </div>
      </div>`;
    return inputs;
  }
  renderMain(main, th = this){
    function colorBtn(type,val,pos,th = this){
        let input = '';
        if (type === "hex"){
          input +=`<button type="button" class="btn shadow my-2 open-main-color" data-bs-toggle="modal" data-bs-target="#main-color" data-pos="${pos}" data-val="${val}" style="padding: 50% 0; width: 100%; background: ${val};"></button>`;
        }
        else if (type === "rgb"){
          input +=`<button type="button" class="btn shadow my-2 open-main-color" data-bs-toggle="modal" data-bs-target="#main-color" data-pos="${pos}" data-val="${val}" style="padding: 50% 0; width: 100%; background: rgb(${val});"></button>`;
        }
        return input;
    }
    var palette = `<div class = "bcp d-flex flex-wrap">`;
    for (let i = 0; i < main.vars.length; i++) {
      palette += `<div class="m-2" style="min-width: ${main.itemSize.min}px; max-width: ${main.itemSize.max}px">
          <span style="font-size: ${main.font}px">${main.vars[i].name}</span>
          ${colorBtn(main.vars[i].type, main.vars[i].value,i,main.vars[i].color)}
          <input type="text" data-pos="${i}" data-color="${main.vars[i].color}" class="mc-input form-control shadow" value="${main.vars[i].value}" style="font-size: ${main.font}px"></input>
        </div>`;
    }
    palette += `</div>
        <div class="modal fade" id="main-color" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mainColor-btnLabel" aria-hidden="true">
          <div class="modal-dialog" style="width: max-content;">
            <div class="modal-content bg-dark text-light" style="width: max-content;">
              <div class="modal-header border-0">
                <h5 class="m-0" id="col-value"></h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div id="main-color-inputs" class="modal-body border-0">
              </div>
            </div>
          </div>
        </div>`;
    return palette;
  }
  render(arr,th = this){
    var pal = ``;
    var dark = '';
    var color = '';
    for (let i = 0; i < arr.length; i++){
      if (th.type == "bg"){
        pal += `<div class = "bcp-item p-1 m-1 shadow border rounded-2 ${arr[i]}"
        value = "${arr[i]}" style="width: ${th.size}px; height: ${th.size}px;"></div>`;
      }
      if (th.type == "text"){
        if (i == 4 || i == 6 || i == 10) dark = 'bg-dark';
        else dark = "";
        pal += `<div class = "bcp-item p-2 m-1 shadow border ${arr[i]} ${dark}"
        value = "${arr[i]}"
        style = "cursor: pointer;">Text</div>`;
      }
      if (th.type == "btn") {
        pal +=`<button type="button" class="bcp-item btn btn-sm ${arr[i]} m-1" value="${arr[i]}">Button</button>`;
      }
      if (th.type == "border"){
        pal += `<div class = "bcp-item p-1 m-1 border ${arr[i]}"
        value = "${arr[i]}" style="width: ${th.size}px; height: ${th.size}px;"></div>`;
      }
      if (th.type == "var" || th.type == "rgb" || typeof th.type === "object"){
        if (arr[i].includes('rgb')) color = `rgb(var(${arr[i]})) !important`;
        else color = `var(${arr[i]}) !important`;
        pal += `<div class = "bcp-item p-1 m-1 shadow border rounded-2"
        value = "${arr[i]}" style="width: ${th.size}px; height: ${th.size}px; background: ${color}"></div>`;
      }
    }
    if (typeof th.type == "object" && th.type.type == "rgba") {
      pal += `</div><div class="input-group mb-2">
          <div class="d-flex align-items-center justify-content-between w-100">
            <span>${th.type.title}</span>
            <input type="number" name="opacity-inp" class="form-control m-2" min="${th.type.min}" max="${th.type.max}" step="0.01" value="${th.type.value}" style="width: 80px">
          </div>
        <input type="range" class="form-range" name="opacity" min="${th.type.min}" max="${th.type.max}" step="0.01" value="${th.type.value}"></div></div>`;
      }
    return pal;
  }
}
function hexToHSL(H) {
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  }
  else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return {
    "h" : h,
    "s" : s,
    "l" : l
  }
}
function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  return "#" + r + g + b;
}
function RGBToHSL(rgb) {
  rgb = rgb.split(",");
  for (let R in rgb) {
    let r = rgb[R];
    if (r.indexOf("%") > -1)
      rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
  }
  let r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return {
      "h" : h,
      "s" : s,
      "l" : l
    }
}
function HSLToRGB(h,s,l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      }
      else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      }
      else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      }
      else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      }
      else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      }
      else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return r+', '+g+', '+b;
}
function validRGBColor(val){
  let result = val;
  if (result.includes(',')) result = result.replace(/\s/g,'');
  else {
    result = result.replace(/  +/g,' ');
    result = result.replace(/\s/g,',');
  }
  let reg1 = /^([0-9]|([1-9][0-9])|([1][0-9][0-9])|([2][0-1][0-9])|([2][0-4][0-9])|([2][5][0-5]))\,([0-9]|([1-9][0-9])|([1][0-9][0-9])|([2][0-1][0-9])|([2][0-4][0-9])|([2][5][0-5]))\,([0-9]|([1-9][0-9])|([1][0-9][0-9])|([2][0-1][0-9])|([2][0-4][0-9])|([2][5][0-5]))$/i;
  if (reg1.test(result)) return result;
  else return result = false;
}
function validHexColor(val){
  let result = val;
  let reg1 = /\#([a-f0-9]){6}/i,
      reg2 = /\#([a-f0-9]){3}/i,
      reg3 = /([a-f0-9]){6}/i,
      reg4 = /([a-f0-9]){3}/i;
  if(reg1.test(result) && result.length === 7) return result;
  if(reg2.test(result) && result.length === 4) {
    var arr = result.split(''),
        res = '#';
    for (let i = 1; i < arr.length; i++) {
      res += arr[i]+arr[i];
    }
    return result = res;
  }
  if (result.length === 6 && reg3.test(result)) {
    val  = "#" + result;
    return result;
  }
  if (result.length === 3 && reg4.test(result)) {
    var arr = result.split(''),
        res = '#';
    for (let i = 0; i < arr.length; i++) {
      res += arr[i]+arr[i];
    }
    return result = res;
  }
  return result = false;
}
function hexToRGB(h) {
  let r = 0, g = 0, b = 0;
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return +r + "," + +g + "," + +b;
}
function getClassByName(className) {
  for (var ssNum in document.styleSheets)
    for (var ruleNum in document.styleSheets[ssNum].cssRules)
      if (document.styleSheets[ssNum].cssRules[ruleNum].selectorText)
        if (document.styleSheets[ssNum].cssRules[ruleNum].selectorText.indexOf(className) == 0)
          return document.styleSheets[ssNum].cssRules[ruleNum];
}
