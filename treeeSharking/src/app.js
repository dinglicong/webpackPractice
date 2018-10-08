import base from './css/base.css';

var app = document.getElementById('app');
app.innerHTML = '<div class="' + base.box +'">asdf</div>';

// import { a } from './common/util';
// console.log(a());

import * as uitl from './common/util';
console.log(uitl.a());
