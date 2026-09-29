let currentPage = 1;

function go(page) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById("p" + page).classList.add("active");

  currentPage = page;

  const bar = document.getElementById("bar");
  if (bar) {
    bar.style.width = ((page - 1) / 4 * 100) + "%";
  }
}


// YES BUTTON
function yes() {
  go(4);

  // Don't allow choosing a date in the past
  const dateInput = document.getElementById("dateChoice");

  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}


// NO BUTTON RUNS AWAY 😏
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

function moveNoButton() {
  const maxX = Math.max(20, window.innerWidth - noBtn.offsetWidth - 20);
  const maxY = Math.max(20, window.innerHeight - noBtn.offsetHeight - 20);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  // Make YES button bigger
  const currentSize =
    parseFloat(getComputedStyle(yesBtn).fontSize) || 18;

  yesBtn.style.fontSize =
    Math.min(currentSize + 3, 42) + "px";
}

if (noBtn) {
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    moveNoButton();
  });
  noBtn.addEventListener("click", function(e) {
    e.preventDefault();
    moveNoButton();
  });
}


// CONFIRM DATE
async function confirmDate() {
  const date = document.getElementById("dateChoice").value;
  const place = document.getElementById("placeChoice").value.trim();
  const time = document.getElementById("timeChoice").value;

  const error = document.getElementById("formError");
  const button = document.getElementById("confirmBtn");

  error.textContent = "";

  if (!date || !place || !time) {
    error.textContent =
      "Please choose the date, place and time ❤️";
    return;
  }

  button.disabled = true;
  button.textContent = "Saving... ❤️";

  try {
    const { error: saveError } =
      await supabaseClient
        .from("date_responses")
        .insert({
          response: "YES",
          selected_date: date,
          selected_place: place,
          selected_time: time
        });

    if (saveError) {
      console.error(saveError);
      throw saveError;
    }

    // Show selected details
    document.getElementById("finalDate").textContent =
      formatDate(date);

    document.getElementById("finalPlace").textContent =
      place;

    document.getElementById("finalTime").textContent =
      formatTime(time);

    document.getElementById("status").textContent =
      "Saved successfully ❤️";

    go(5);

  } catch (err) {
    console.error(err);

    error.textContent =
      "Something went wrong while saving. Please try again ❤️";

    button.disabled = false;
    button.textContent = "Confirm Date ❤️";
  }
}


// FORMAT DATE
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


// FORMAT TIME
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes));

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}
