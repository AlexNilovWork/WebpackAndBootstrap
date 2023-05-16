import * as $ from 'jquery';
export default class BootstrapColorPalette {
  constructor(selector) {
    this.selector = selector;
    let pal = `<h2>Yes Yes</h2>`;
    $(this.selector).prepend(pal);
  }
}
