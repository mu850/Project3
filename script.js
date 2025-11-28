let tempOutput = null;

let daily = JSON.parse(localStorage.getItem("daily")) || [];
let ledger = JSON.parse(localStorage.getItem("ledger")) || [];

function calculate() {
    let name = document.getElementById("name").value;
    let w = +document.getElementById("weight").value;
    let adv = +document.getElementById("advance").value;
    let rate = +document.getElementById("rate").value;

    let noClean = document.getElementById("noClean").checked;
    let noCut = document.getElementById("noCut").checked;
    let billFlour = document.getElementById("billFlour").checked;

    let cut = noCut ? 0 : w * 0.05;
    let clean = noClean ? 0 : w * 1.25;
    let grind = w * 3;

    let totalKg = w - cut - adv;

    let bill = billFlour ? 0 : (totalKg * rate);

    tempOutput = {
        name, w, cut, clean, grind, adv,
        totalKg, bill,
        date: new Date().toLocaleString()
    };

    document.getElementById("output").innerHTML = `
        نام: ${name}<br>
        وزن: ${w} کلو<br>
        کٹوتی: ${cut.toFixed(2)} کلو<br>
        صفائی خرچ: ${clean.toFixed(2)} روپے<br>
        پسائی خرچ: ${grind.toFixed(2)} روپے<br>
        کسٹمر کو ملنے والا آٹا: ${totalKg.toFixed(2)} کلو<br>
        کل بل: ${bill.toFixed(2)} روپے
    `;

    document.getElementById("buttons").classList.remove("hidden");
}

function confirmRecord() {
    daily.push(tempOutput);
    localStorage.setItem("daily", JSON.stringify(daily));
    alert("ریکارڈ محفوظ ہوگیا");
}

function saveLedger() {
    ledger.push(tempOutput);
    localStorage.setItem("ledger", JSON.stringify(ledger));
    alert("کھاتے میں شامل ہوگیا");
}

function deleteOutput() {
    document.getElementById("output").innerHTML = "";
    document.getElementById("buttons").classList.add("hidden");
}

function showRecords() {
    let box = document.getElementById("records");
    box.innerHTML = "";

    daily.forEach(r => {
        box.innerHTML += `
        <div class="box">
            <b>${r.name}</b><br>
            وزن: ${r.w} کلو<br>
            بل: ${r.bill} روپے<br>
            ${r.date}
        </div>
        `;
    });
}
