import 'css/admin.scss';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'Admin webpack';
    element.classList.add('hello', 'hello_div');
  
    return element;
  }
  
  document.body.appendChild(component());