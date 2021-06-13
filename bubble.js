let arr = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 0];
let ars = [12, 15, 1, 43, 25, 11, 31, 2, 7, 34, 0];

let n = Math.floor(Math.random() * 6);
n += 5;
for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 500);
    ars[i] = arr[i];
    document.getElementById("bx1").innerHTML += arr[i] + " ";
}
let last = n;
let k = -1;
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
        if (i < last) rw.classList.add("st");
        else rw.classList.add("et");
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
function swap(k) {
    let id1 = ele(last, k - 1);
    let id2 = ele(last, k);
    let temp = arr[k];
    arr[k] = arr[k - 1];
    arr[k - 1] = temp;
    id1.innerHTML = arr[k - 1];
    id2.innerHTML = arr[k];
}
function run() {
    if (last == -1) {
        clearInterval(timei);
    }
    else if (k == -1) {
        go();
        k++;
    }
    else if (k === last) {
        if (k > 1) {
            let rem = ele(last, k - 2);
            rem.classList.remove("ring", "ping");
        }
        if (k > 0) {
            let rem = ele(last, k - 1);
            rem.classList.remove("ring");
        }
        k = -1;
        last--;
    }
    else {

        if (k > 1) {
            let rem = ele(last, k - 2);
            rem.classList.remove("ring", "ping");
        }
        let cre = ele(last, k);
        if (!cre.classList.contains("ring"))
            cre.classList.add("ring");
        else {
            let pre = ele(last, k - 1);
            if (k < 1 || arr[k - 1] <= arr[k]) {
                if (cre.classList.contains("ping")) {

                    cre.classList.remove("ping");
                    pre.classList.remove("ping");
                }
                else k++;
            }
            else {
                if (cre.classList.contains("ping")) {
                    swap(k);
                }
                else {
                    cre.classList.add("ping");
                    pre.classList.add("ping");
                }
            }
        }
    }
}
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
    window.open("http://127.0.0.1:5500/index.html", "_parent");
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
    last = n;
    k = -1;
    timei = setInterval(run, 400);
}