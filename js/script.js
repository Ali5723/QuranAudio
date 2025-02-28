function createListItem(url, name, index) {
  let list = document.getElementById("list");
  let listItem = document.createElement("li");
  listItem.className = "listItem";

  let container = document.createElement("div");

  let playButton = document.createElement("button");
  playButton.className = "listItemPlayButton";
  playButton.setAttribute("data-url", `https://qurango.net/radio/${url}`);
  playButton.addEventListener("click", function () {
    playButtonClick(this);
  });

  let pauseButton = document.createElement("button");
  pauseButton.className = "listItemPauseButton hide";
  pauseButton.addEventListener("click", function () {
    pauseButtonClick(this);
  });

  let paragraph = document.createElement("p");
  paragraph.className = "listItemReader";
  paragraph.textContent = name;

  let hr = document.createElement("hr");

  listItem.setAttribute("data-index", index);
  container.setAttribute("data-index", index);
  playButton.setAttribute("data-index", index);
  pauseButton.setAttribute("data-index", index);
  paragraph.setAttribute("data-index", index);

  container.appendChild(pauseButton);
  container.appendChild(playButton);
  container.appendChild(paragraph);
  listItem.appendChild(container);
  listItem.appendChild(hr);
  list.appendChild(listItem);
}

function createAllListItem() {
  fetch("./assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.urls.length; i++) {
        createListItem(data.urls[i], data.names[i], i + 1);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function playAudio(audioSrc) {
  let audio = document.getElementById("audio");
  audio.src = audioSrc;
  audio.play();
}
function pauseAudio() {
  let audio = document.getElementById("audio");
  audio.pause();
}

function upperLi(i) {
  let upperLi = document.getElementById("upperLi");
  let thisListItem = document.querySelectorAll(
    `li.listItem[data-index="${i}"]`
  )[0];
  let thisContainer = document.querySelectorAll(`div[data-index="${i}"]`)[0];
  upperLi.classList.remove("hide");
  thisListItem.classList.add("hide");
  upperLi.insertBefore(thisContainer, upperLi.firstChild);
}
function lowerLi(i) {
  let upperLi = document.getElementById("upperLi");
  let thisListItem = document.querySelectorAll(
    `li.listItem[data-index="${i}"]`
  )[0];
  let thisContainer = document.querySelectorAll(`div[data-index="${i}"]`)[0];
  upperLi.classList.add("hide");
  thisListItem.classList.remove("hide");
  thisListItem.insertBefore(thisContainer, thisListItem.firstChild);
}

function playButtonClick(thisPlayButton) {
  for (let index = 1; index <= 153; index++) {
    pauseButtonClick(
      document.querySelectorAll(
        `button.listItemPauseButton[data-index="${index}"]`
      )[0]
    );
  }

  playAudio(thisPlayButton.getAttribute("data-url"));
  thisPlayButton.setAttribute("class", "listItemPlayButton hide");
  let i = thisPlayButton.getAttribute("data-index");
  let thisPauseButton = document.querySelectorAll(
    `button.listItemPauseButton[data-index="${i}"]`
  )[0];
  thisPauseButton.classList.remove("hide");
  thisPlayButton.classList.add("hide");

  upperLi(i);
}
function pauseButtonClick(thisPauseButton) {
  pauseAudio();
  thisPauseButton.setAttribute("class", "listItemPauseButton hide");
  let i = thisPauseButton.getAttribute("data-index");
  let thisPlayButton = document.querySelectorAll(
    `button.listItemPlayButton[data-index="${i}"]`
  )[0];
  thisPlayButton.classList.remove("hide");
  thisPauseButton.classList.add("hide");

  lowerLi(i);
}

function searchInput() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toUpperCase();
  let list = document.getElementById("list");
  let listItems = list.getElementsByTagName("li");

  for (let i = 1; i <= listItems.length; i++) {
    let paragraph = listItems[i].getElementsByTagName("p")[0];

    let textValue = paragraph.textContent || paragraph.innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      listItems[i].style.display = "";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

function showCredits() {
  alert(
    `Credits: Developed by Ali Amen.
Credits: The idea for this website is inspired by the Quran Station Extension, developed by Mohamed Abusrea.`
  );
}
