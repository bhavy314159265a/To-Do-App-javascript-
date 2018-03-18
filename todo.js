 window.addEventListener('load',bindEvents);
 var data = (localStorage.getItem('arr'))?JSON.parse(localStorage.getItem('arr')):[];
 var del = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><g><polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5 "/></g></svg>';
 var done = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><path d="M901.9,118.4c-8.3-6.8-20.6-5.5-27.3,2.8l-466,570.5L107.8,446c-8.3-6.8-20.6-5.5-27.3,2.8l-66.1,81c-6.8,8.3-5.5,20.6,2.8,27.3l312.1,254.9c1,1.3,2.1,2.5,3.4,3.6l81,66.1c8.3,6.8,20.6,5.5,27.3-2.8l544.8-667c6.8-8.3,5.5-20.6-2.8-27.3L901.9,118.4z"/></g></svg>';

function bindEvents(){
    document.getElementById('btn').addEventListener('click',add);
    document.getElementById('val').addEventListener('keydown',function(e){
        // console.log(e.code=='Enter');
        if (e.code=='Enter'){
            add();
        }
    });
    renderItems();
 }
function add(){
    var text = document.getElementById('val').value;
    if (text) {
        show(text);
        data.push(text);
        console.log(data);
        // console.log(localStorage.arr);
        document.getElementById('val').value='';
        addToLocalStorage();
    }
}
function renderItems(){
    for(var i = 0; i <data.length; i++){
        var text = data[i];
        show(text);
    }
}
function addToLocalStorage(){
    localStorage.setItem('arr',JSON.stringify(data));
}
function removeItem(e){
    //console.log(this.parentNode.parentNode);
    var li = this.parentNode.parentNode;
    var ul = li.parentNode;
    var value = li.innerText;
    console.log(value);
    data.splice(data.indexOf(value),1);
    ul.removeChild(li);
    addToLocalStorage();
}

function taskCompleted(e){
    //console.log(this.parentNode.parentNode);
    var li=this.parentNode.parentNode;
    
    var isStruck = (li.style.getPropertyValue("text-decoration") == "line-through");
    if(isStruck){
        li.style.setProperty("text-decoration", "none");
    }
    else{
        li.style.setProperty("text-decoration", "line-through");
    }
    // console.log(li.childNode);
}

function show(e){
    var ul = document.getElementById('todo');
    var list = document.createElement('li');
    list.innerHTML = e;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = del;

    remove.addEventListener('click',removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = done;
    complete.addEventListener('click',taskCompleted);

    buttons.appendChild(remove);
    buttons.appendChild(complete);

    list.appendChild(buttons);

    ul.appendChild(list);
}