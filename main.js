let billInput = document.querySelector(".bill-input input");
let billValue;
let tipPercent = 0;
let peopleNo;
let personTipSpan = document.querySelector(".result .person-tip");

let personTotalSpan = document.querySelector(".result .person-total");

let totalPay;
let totalTip;
let resetBtn = document.querySelector(".result .reset");
billInput.addEventListener("blur", () => {
  if (billInput.value !== "") {
    billValue = Number(billInput.value);
  } else {
    console.log(Error("empty is field"));
  }
  getValues();
});

//tip buttons
let tips = document.querySelectorAll("form .tips .tip-btn");
let customInput = document.querySelector(".tips .tip-btn#custom");
tips.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    tips.forEach((tip) => {
      tip.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target === customInput) {
      tipPercent = Number(customInput.value) / 100;
    } else {
      tipPercent = Number(e.target.dataset.percent) / 100;
    }

    getValues();
  });
});
customInput.addEventListener("input", () => {
  if (customInput.value !== "") {
    tipPercent = Number(customInput.value) / 100;
    getValues();
  }
});
let peopleDiv = document.querySelector("form .individuals");
let peopleInput = document.querySelector("form .individuals #total-ppl");

function getPeople() {
  let totalPeople = parseInt(peopleInput.value);
  if (totalPeople <= 0 || isNaN(totalPeople)) {
    if (!document.querySelector("form .individuals .error")) {
      let span = document.createElement("span");
      span.textContent = "Can't be zero";
      span.className = "error";
      peopleDiv.appendChild(span);
    }
  } else {
    if (document.querySelector("form .individuals .error")) {
      peopleDiv.removeChild(document.querySelector("form .individuals .error"));
    }
  }
  return totalPeople;
}

peopleInput.addEventListener("input", () => {
  peopleNo = getPeople();
  getValues();
});

function getValues() {
  if (billValue > 0 && tipPercent > 0 && peopleNo > 0) {
    totalTip = billValue * tipPercent;
    totalPay = totalTip + billValue;
    showResult();
  } else {
    return undefined;
  }
}
function showResult() {
  let personTip = totalTip / peopleNo;
  let personTotal = (totalTip + billValue) / peopleNo;
  personTipSpan.innerHTML = personTip.toFixed(2);
  personTotalSpan.innerHTML = personTotal.toFixed(2);
}

// reset
function clearFields() {
  resetBtn.addEventListener("click", () => {
    billInput.value = "";
    tips.forEach((tip) => {
      tip.classList.remove("active");
      customInput.value = "";

      tipPercent = 0;
    });

    peopleInput.value = "";
    peopleNo = 0;

    personTipSpan.innerHTML = "0.00";
    personTotalSpan.textContent = "0.00";
  });
  getValues();
}
clearFields();
