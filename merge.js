let ars = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 23];
let arp = [];
let art = [];
let n = Math.floor(Math.random() * 6);
n += 5;
if (n == 5) document.getElementById("in").style.width = "450px";
if (n == 6) document.getElementById("in").style.width = "550px";
if (n == 7) document.getElementById("in").style.width = "650px";
if (n == 8) document.getElementById("in").style.width = "750px";
if (n == 9) document.getElementById("in").style.width = "850px";
if (n == 10) document.getElementById("in").style.width = "950px";

for (let i = 0; i < n; i++) {
    ars[i] = Math.floor(Math.random() * 500);
    document.getElementById("bx1").innerHTML += ars[i] + " ";
}
art = ars;
let levl = 0;
let k = 0, clr = 0;
let arr;
let indx, l, r;
let curid;
function makeli(a, b, c) {
    let rw = document.createElement('li');
    rw.setAttribute("class", "sd");
    let nd = "id";
    nd += a;
    nd += b;
    //console.log(nd);
    rw.setAttribute("id", nd);
    rw.innerHTML = c;
    return rw;
}
function initialise() {
    document.getElementById("in").innerHTML = "";
    let lst = document.createElement('ul');
    lst.setAttribute("class", "inn");
    level = 0;
    k = 0;
    arr = [];
    arp = [];
    for (let i = 0; i < n; i++) {
        let temp = [];
        temp.push(i);
        temp.push(i);
        arr.push(temp);
        let rw = makeli(level, i, ars[i]);
        if (k % 2) rw.classList.add("et");
        else rw.classList.add("st");
        k++;
        lst.appendChild(rw);
    }
    document.getElementById("in").appendChild(lst);
    indx = -2;
    k = -1;
    l = -1;
    r = -1;
    clr = 0;
}

function go() {
    let par = document.getElementById("in");
    let lst = document.createElement('ul');
    lst.setAttribute("class", "inn");
    curid = "l";
    curid += level;
    lst.setAttribute("id", curid);
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

function run() {
    if (arr[0][1] == n - 1) {
        clearInterval(timei);
    }
    else if (k == -1) {
        level++;
        go();
        k++;
    }
    else {
        if (k == n) {
            l = -1;
            r = -1;
            k = -1;
            clr = 0;
            let temp = [];
            let j = 0;
            while (1) {
                if (arr[j][1] == n - 1) {
                    let tmp = [];
                    tmp.push(arr[j][0]);
                    tmp.push(arr[j][1]);
                    temp.push(tmp);
                    break;
                }
                else if (arr[j + 1][1] == n - 1) {
                    let tmp = [];
                    tmp.push(arr[j][0]);
                    tmp.push(arr[j + 1][1]);
                    temp.push(tmp);
                    break;
                }
                else {
                    let tmp = [];
                    tmp.push(arr[j][0]);
                    tmp.push(arr[j + 1][1]);
                    temp.push(tmp);
                    j += 2;
                }
            }
            arr = temp;
            ars = arp;
            arp = [];
            indx = -2;
        }
        else if (l == -1 && r == -1) {
            clr = 1 - clr;
            indx += 2;
            if (arr[indx][1] == n - 1) {
                l = arr[indx][0];
                ele(level - 1, l).classList.add("ping");
            }
            else {
                l = arr[indx][0];
                r = arr[indx + 1][0];
                ele(level - 1, l).classList.add("ping");
                ele(level - 1, r).classList.add("ping");
            }
        }
        else if (l == -1 || ars[l] > ars[r]) {
            ele(level - 1, r).classList.remove("ping");
            let rw = makeli(level, k, ars[r]);
            if (clr) rw.classList.add("et");
            else rw.classList.add("st");
            document.getElementById(curid).appendChild(rw);
            arp.push(ars[r]);
            r++;
            if (r > arr[indx + 1][1]) r = -1;
            else {
                ele(level - 1, r).classList.add("ping");
            }

            k++;
        }
        else {
            ele(level - 1, l).classList.remove("ping");
            let rw = makeli(level, k, ars[l]);
            if (clr) rw.classList.add("et");
            else rw.classList.add("st");
            document.getElementById(curid).appendChild(rw);
            arp.push(ars[l]);
            l++;
            if (l > arr[indx][1]) l = -1;
            else {
                ele(level - 1, l).classList.add("ping");
            }
            k++
        }
    }
}
//done after this
initialise();
let timei = setInterval(run, 420);
let btn1 = document.getElementById("b1");
btn1.onclick = function () {
    if (btn1.classList.contains("tire")) {
        btn1.classList.remove("tire");
        btn1.innerHTML = "stop";
        timei = setInterval(run, 420);
    }
    else {
        btn1.classList.add("tire");
        btn1.innerHTML = "resume";
        clearInterval(timei);
    }
}
function funct() {
    window.open("http://127.0.0.1:5500/index.html", "_parent");
}
document.getElementById("b2").onclick = function () {

    clearInterval(timei);
    ars = art;
    if (btn1.classList.contains("tire")) {
        btn1.classList.remove("tire");
        btn1.innerHTML = "stop";
    }
    initialise();
    timei = setInterval(run, 420);
}