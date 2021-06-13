let arr = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 0];
let ars = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 0];

let n = Math.floor(Math.random() * 6);
n += 5;
for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 100);
    ars[i] = arr[i];
    document.getElementById("bx1").innerHTML += arr[i] + " ";
}
let last = -1;
let k = -1;
let cur = 0;
function go() {
    let par = document.getElementById("in");
    let lst = document.createElement('ul');
    lst.setAttribute("class", "inn");
    for (let i = 0; i < n; i++) {
        let rw = document.createElement('li');
        rw.setAttribute("class", "sd");
        let nd = "id";
        nd += last;
        nd += i;
        //console.log(nd);
        rw.setAttribute("id", nd);
        rw.innerHTML = arr[i];
        if (i < last) rw.classList.add("et");
        else rw.classList.add("st");
        lst.appendChild(rw);
    }
    par.appendChild(lst);
    par.scrollBy(0, par.scrollHeight);
}
function ele(a, b) {
    let hiii = "id";
    hiii += a;
    hiii += b;
    let elm = document.getElementById(hiii);
    return elm;
}
function swap(a, b) {
    let id1 = ele(last, a);
    let id2 = ele(last, b);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    id1.innerHTML = arr[a];
    id2.innerHTML = arr[b];
}
function run() {

    if (last == n) {
        clearInterval(timei);
    }
    else if (k == -1) {
        if (last > -1)
            ele(last, last).classList.remove("ping");
        last++;
        go();
        cur = last;
        ele(last, cur).classList.add("ping");
        k = last;
        ele(last, k).classList.add("ring");
        k++
    }
    else if (k == n) {
        ele(last, k - 1).classList.remove("ring");
        k = -1;
        swap(cur, last);
        ele(last, cur).classList.remove("ping");
        ele(last, last).classList.add("ping");
    }
    else {
        ele(last, k - 1).classList.remove("ring");
        ele(last, k).classList.add("ring");
        if (arr[k] < arr[cur]) {
            ele(last, cur).classList.remove("ping");
            ele(last, k).classList.add("ping");
            cur = k;
        }
        k++;
    }
}
//done after this
let timei = setInterval(run, 420);
let btn1 = document.getElementById("b1");
btn1.onclick = function () {
    if (btn1.classList.contains("tire")) {
        btn1.classList.remove("tire");
        btn1.innerHTML = "stop";
        timei = setInterval(run, 400);
    }
    else {
        btn1.classList.add("tire");
        btn1.innerHTML = "resume";
        clearInterval(timei);
    }
}
function funct() {
    window.open("./index.html", "_parent");
}
document.getElementById("b2").onclick = function () {
    clearInterval(timei);
    if (btn1.classList.contains("tire")) {
        btn1.classList.remove("tire");
        btn1.innerHTML = "stop";
    }
    for (let i = 0; i < n; i++) {
        arr[i] = ars[i];
    }
    document.getElementById("in").innerHTML = "";
    last = -1;
    k = -1;
    timei = setInterval(run, 400);
}