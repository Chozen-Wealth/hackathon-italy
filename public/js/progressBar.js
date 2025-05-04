export function setProgress(actual, needed, i) {
  let element = document.querySelectorAll(".progress-bar")[i];
  let percent = Math.round((actual / needed) * 100);
  if (percent > 100) {
    percent = 100;
  }
  element.style.width = percent + "%";
  element.nextElementSibling.textContent = `${actual}€ / ${needed} €`;
  if (percent < 30) {
    element.style.backgroundColor = "#ff5252";
  } else if (percent < 70) {
    element.style.backgroundColor = "#ffb74d";
  } else {
    element.style.backgroundColor = "#4CAF50";
  }
}

