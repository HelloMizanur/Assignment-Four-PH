let jobInterviewArray = [];
let jobRejectedArray = [];

const totalJobs = document.getElementById("total-jobs");
const interviewJobs = document.getElementById("interview-jobs");
const rejectedJobs = document.getElementById("rejected-jobs");
const availableJobs = document.getElementById("available-jobs");
const availableJobsPage = document.getElementById("available-jobs-page");

const allJobsCards = document.getElementById("all-jobs-cards");
const allInterviewCards = document.getElementById("all-interview-cards");
const allRejectedCards = document.getElementById("all-rejected-cards");
const noJobsCards = document.getElementById("nojobs-cards");

const filterButtonsContainer = document.getElementById("filter-buttons");
const buttons = filterButtonsContainer.querySelectorAll("button");

// set up counter
setAlljobCount();

function setAlljobCount() {
  totalJobs.innerText = allJobsCards.children.length;
  availableJobs.innerText = allJobsCards.children.length;
  interviewJobs.innerText = jobInterviewArray.length;
  rejectedJobs.innerText = jobRejectedArray.length;
}

// Event handler for all button
function handleActions(event) {
  const target = event.target;

  // when clik to interview button
  if (target.innerText.toLowerCase() === "interview") {
    const parent = target.parentNode.parentNode;
    const jobTitle = parent.querySelector(".font-black").innerText;
    const jobTag = parent.querySelector(".text-gray-300").innerText;
    const jobLocation = parent.querySelector(".text-gray-400").innerText;
    const jobSummary = parent.querySelector(".text-gray-500").innerText;

    const cardInfo = {
      jobTitle,
      jobTag,
      jobLocation,
      jobStatus: "Interview",
      jobSummary,
    };

    const isExist = jobInterviewArray.find(
      (item) => item.jobTitle === jobTitle,
    );
    if (!isExist) jobInterviewArray.push(cardInfo);
    jobRejectedArray = jobRejectedArray.filter(
      (item) => item.jobTitle !== jobTitle,
    );

    updateMainCardStatus(jobTitle, "Interview", "btn-success", "btn-error");
  }

  // When click to reject button
  else if (target.innerText.toLowerCase() === "rejected") {
    const parent = target.parentNode.parentNode;
    const jobTitle = parent.querySelector(".font-black").innerText;
    const jobTag = parent.querySelector(".text-gray-300").innerText;
    const jobLocation = parent.querySelector(".text-gray-400").innerText;
    const jobSummary = parent.querySelector(".text-gray-500").innerText;

    const cardInfo = {
      jobTitle,
      jobTag,
      jobLocation,
      jobStatus: "Rejected",
      jobSummary,
    };

    const isExist = jobRejectedArray.find((item) => item.jobTitle === jobTitle);
    if (!isExist) jobRejectedArray.push(cardInfo);
    jobInterviewArray = jobInterviewArray.filter(
      (item) => item.jobTitle !== jobTitle,
    );

    updateMainCardStatus(jobTitle, "Rejected", "btn-error", "btn-success");
  }

  // when click to delete button
  else if (target.classList.contains("fa-trash-can")) {
    const parent = target.parentNode.parentNode;
    const jobTitle = parent.querySelector(".font-black").innerText;

    const cards = allJobsCards.children;
    for (let card of cards) {
      if (card.querySelector(".font-black").innerText === jobTitle) {
        card.remove();
        break;
      }
    }

    jobInterviewArray = jobInterviewArray.filter(
      (item) => item.jobTitle !== jobTitle,
    );
    jobRejectedArray = jobRejectedArray.filter(
      (item) => item.jobTitle !== jobTitle,
    );
  }

  renderLists();
  setAlljobCount();
}

// ui update for card
function updateMainCardStatus(title, statusText, addClass, removeClass) {
  const cards = allJobsCards.children;
  for (let card of cards) {
    if (card.querySelector(".font-black").innerText === title) {
      const btn = card.querySelector(".btn-soft, .btn-outline");
      btn.innerText = statusText;
      btn.classList.remove("btn-soft", removeClass);
      btn.classList.add(addClass, "btn-outline");
    }
  }
}

// to show the list
function renderLists() {
  allInterviewCards.innerHTML = "";
  allRejectedCards.innerHTML = "";

  jobInterviewArray.forEach((item) => {
    allInterviewCards.appendChild(createElement(item));
  });

  jobRejectedArray.forEach((item) => {
    allRejectedCards.appendChild(createElement(item));
  });

  const activeBtn =
    filterButtonsContainer.querySelector(".btn-primary").innerText;

  if (activeBtn === "Interview") {
    availableJobsPage.innerText = jobInterviewArray.length;
  } else if (activeBtn === "Rejected") {
    availableJobsPage.innerText = jobRejectedArray.length;
  }

  noJobs(activeBtn);
}

// Event listenr set up
allJobsCards.addEventListener("click", handleActions);
allInterviewCards.addEventListener("click", handleActions);
allRejectedCards.addEventListener("click", handleActions);

// filter button
filterButtonsContainer.addEventListener("click", (event) => {
  const clickedButton = event.target;
  if (clickedButton.tagName !== "BUTTON") return;

  buttons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-soft");
  });
  clickedButton.classList.add("btn-primary");
  clickedButton.classList.remove("btn-soft");

  allJobsCards.classList.add("hidden");
  allInterviewCards.classList.add("hidden");
  allRejectedCards.classList.add("hidden");
  noJobsCards.classList.add("hidden");

  const pageCountText = availableJobsPage.parentElement;

  if (clickedButton.innerText === "Interview") {
    allInterviewCards.classList.remove("hidden");
    pageCountText.classList.remove("hidden");
    availableJobsPage.innerText = jobInterviewArray.length;
    renderLists();
  } else if (clickedButton.innerText === "Rejected") {
    allRejectedCards.classList.remove("hidden");
    pageCountText.classList.remove("hidden");
    availableJobsPage.innerText = jobRejectedArray.length;
    renderLists();
  } else {
    allJobsCards.classList.remove("hidden");
    pageCountText.classList.add("hidden");
  }

  noJobs(clickedButton.innerText);
  setAlljobCount();
});

// no jobs page function
function noJobs(filterType) {
  let count = 0;
  if (filterType === "All") count = allJobsCards.children.length;
  else if (filterType === "Interview") count = jobInterviewArray.length;
  else if (filterType === "Rejected") count = jobRejectedArray.length;

  if (count < 1) {
    noJobsCards.classList.remove("hidden");
  } else {
    noJobsCards.classList.add("hidden");
  }
}

function createElement(item) {
  const div = document.createElement("div");
  div.classList = `flex justify-between border-2 border-gray-200 rounded-xl shadow p-3`;

  let statusClass =
    item.jobStatus === "Interview" ? "btn-success" : "btn-error";

  div.innerHTML = `<div class="space-y-5">
                <div>
                  <h1 class="font-black">${item.jobTitle}</h1>
                  <p class="text-gray-300">${item.jobTag}</p>
                </div>
                <h1 class="text-gray-400">${item.jobLocation}</h1>
                <button class="btn btn-outline ${statusClass}">${item.jobStatus}</button>
                <p class="text-gray-500">${item.jobSummary}</p>
                <div>
                  <button class="btn btn-outline btn-success">interview</button>
                  <button class="btn btn-outline btn-error">Rejected</button>
                </div>
              </div>
              <div>
                <i class="fa-solid fa-trash-can cursor-pointer"></i>
              </div>`;
  return div;
}
