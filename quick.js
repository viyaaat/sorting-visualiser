let arr = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 0];
let ars = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 0];
let hash = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let n = Math.floor(Math.random() * 6);
n += 5;
for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 500);
    ars[i] = arr[i];
    document.getElementById("bx1").innerHTML += arr[i] + " ";
}
let stack;
let level;
let tot, low, high, cur, crt;
function intialise() {
    document.getElementById("in").innerHTML = "";
    hash = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    level = -1;
    tot = 0;
    low = high = cur = crt = -1;
    stack = [];
    stack.push([0, n - 1]);
}

function go() {
    let par = document.getElementById("in");
    let lst = document.createElement('ul');
    lst.setAttribute("class", "inn");
    for (let i = 0; i < n; i++) {
        let rw = document.createElement('li');
        rw.setAttribute("class", "sd");
        let nd = "id";
        nd += level;
        nd += i;
        //console.log(nd);
        rw.setAttribute("id", nd);
        rw.innerHTML = arr[i];
        if (hash[i]) rw.classList.add("et");
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
    let id1 = ele(level, a);
    let id2 = ele(level, b);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    id1.innerHTML = arr[a];
    id2.innerHTML = arr[b];
}
function run() {
    if (tot == n) {
        clearInterval(timei);
    }
    if (cur == -1) {
        let temp = stack.pop();
        low = temp[0];
        high = temp[1];
        if (low <= high) {
            level++;
            go();
            ele(level, high).classList.add("et");
            if (high == low) {
                hash[low] = 1;
                tot++;
            }
            else {
                cur = crt = low;
                ele(level, cur).classList.add("ring");
                ele(level, crt).classList.add("ping");
            }
        }
    }
    else if (cur == high) {
        swap(cur, crt);
        hash[crt] = 1;
        tot++;
        ele(level, cur).classList.remove("et");
        ele(level, cur).classList.remove("ring");
        ele(level, crt).classList.remove("ping");
        ele(level, crt).classList.add("et");
        stack.push([crt + 1, high]);
        stack.push([low, crt - 1]);
        cur = -1;
    }
    else {
        if (arr[cur] <= arr[high]) {
            if (ele(level, cur).classList.contains("ping")) {
                swap(crt, cur);
                ele(level, cur).classList.remove("ping");
                ele(level, cur).classList.remove("ring");
                ele(level, crt).classList.remove("ping");
                crt++;
                cur++;
                ele(level, cur).classList.add("ring");
                ele(level, crt).classList.add("ping");

            }
            else {
                ele(level, cur).classList.add("ping");
            }
        }
        else {
            ele(level, cur).classList.remove("ring");
            cur++;
            ele(level, cur).classList.add("ring");

        }
    }

}
//done after this
intialise();
let timei = setInterval(run, 400);
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
    intialise();
    timei = setInterval(run, 400);
}