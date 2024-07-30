import { handleSubmit } from "../src/client/js/main";

describe("Test the function handleSubmit", () => {
  test("The function handleSubmit() should be defined ", () => {
    expect(handleSubmit).toBeDefined();
  });
});

describe("Test the fucntion handleSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="trip-form">
        <input type="text" id="location" value="Tokyo">
        <input type="date" id="start-date" value="2024-07-28">
        <input type="date" id="end-date" value="2024-07-29">
        <button id="submit" type="submit">Add Trip</button>
      </form>
      <div id="trip-container"></div>
    `;
  });

  it("should add trip card to trip container", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            location: "Tokyo",
            countryName: "Japan",
            startDate: "2024-07-28",
            endDate: "2024-07-29",
            weather: { description: "Sunny", temperature: 25 },
            image: "https://via.placeholder.com/400",
          }),
      })
    );
    global.fetch = mockFetch;

    const form = document.getElementById("trip-form");
    form.addEventListener("submit", handleSubmit);

    form.dispatchEvent(new Event("submit"));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tripContainer = document.getElementById("trip-container");
    const tripCard = tripContainer.querySelector(".trip-card");

    expect(tripCard).not.toBeNull();
    expect(tripCard.querySelector(".trip-title").textContent).toBe("Tokyo (Japan)");
    expect(tripCard.querySelector(".start-date").textContent).toBe("Start Date: 2024-07-28");
    expect(tripCard.querySelector(".end-date").textContent).toBe("End Date: 2024-07-29");
    expect(tripCard.querySelector(".weather").textContent).toBe("Weather: Sunny, 25°C");
  });
});
