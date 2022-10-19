// DOM

const searchElem = document.getElementById("SearchBar");
const submitButton = document.querySelector(".submit");

const ipAddressElem = document.getElementById("value1");
const locationElem = document.getElementById("value2");
const timezoneElem = document.getElementById("value3");
const ispElem = document.getElementById("value4");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = searchElem.value;
  console.log(searchElem.value);
  fetchData(value);
});

const fetchData = async (datas) => {
  await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_g84gLje8Ybwb9ofscpiwNpbdavLty&ipAddress=${datas}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ipAddressElem.innerHTML = data.ip;
      locationElem.innerHTML = `${data.location.region}, ${data.location.country}, ${data.as.asn}`;
      timezoneElem.innerHTML = data.location.timezone;
      ispElem.innerHTML = data.isp;

      const mapper = new L.map("Map", {
        center: [data.location.lat, data.location.lng],
        zoom: 13,
      });

      L.tileLayer(
        "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=YH6lhpxSIN8sVJ9Kpyjj",
        {
          attribution:
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
          maxZoom: 15,
        }
      ).addTo(mapper);

      var navigateIcon = L.icon({
        iconUrl: "./images/icon-location.svg",

        iconSize: [38, 45], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      });

      L.marker([data.location.lat, data.location.lng], {
        icon: navigateIcon,
      }).addTo(mapper);
    });
};

// mapper.addLayer(layer);
