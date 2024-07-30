document.addEventListener("DOMContentLoaded", () => {
  loadTripsFromLocalStorage();

  const locationInput = document.getElementById("location");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const submitButton = document.getElementById("submit");

  const validateForm = () => {
    const location = locationInput.value.trim();
    const startDate = startDateInput.value.trim();
    const endDate = endDateInput.value.trim();

    if (location && startDate && endDate) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  };

  locationInput.addEventListener("input", validateForm);
  startDateInput.addEventListener("input", validateForm);
  endDateInput.addEventListener("input", validateForm);

  validateForm();
});

export const handleSubmit = async (event) => {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  try {
    const response = await fetch("http://localhost:8000/addTrip", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, startDate, endDate }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const trip = await response.json();
    console.log(trip);
    displayTrip(trip);
    saveTripToLocalStorage(trip);
  } catch (error) {
    console.error("Error adding trip:", error.message);
    alert(
      "The location you just selected is currently unavailable, please choose another location."
    );
  }
};

function displayTrip(trip) {
  const tripContainer = document.getElementById("trip-container");

  const tripCard = document.createElement("div");
  tripCard.classList.add("trip-card");

  tripCard.innerHTML = `
      <button class="remove-button">×</button>

      <h3 class="trip-card-info trip-title">${trip.location} (${trip.countryName})</h3>
      <img class="trip-card-info" src="${trip.image}" alt="${trip.location}">
      <p class="trip-card-info start-date">Start Date: ${trip.startDate}</p>
      <p class="trip-card-info end-date">End Date: ${trip.endDate}</p>
      <p class="trip-card-info weather">Weather: ${trip.weather.description}, ${trip.weather.temperature}°C</p>
  `;

  const removeButton = tripCard.querySelector(".remove-button");
  removeButton.addEventListener("click", (event) => removeTrip(event, trip.startDate));

  tripContainer.appendChild(tripCard);
}

// Add trips to Local storage
function saveTripToLocalStorage(trip) {
  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.push(trip);
  localStorage.setItem("trips", JSON.stringify(trips));
}

// Get trips from Local storage and display trips on UI
function loadTripsFromLocalStorage() {
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.forEach((trip) => {
    displayTrip(trip);
  });
}

function removeTrip(event, startDate) {
  const tripCard = event.target.parentElement;
  tripCard.remove();

  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips = trips.filter((trip) => trip.startDate !== startDate);
  localStorage.setItem("trips", JSON.stringify(trips));
}
