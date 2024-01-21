const url = "https://jsonplaceholder.typicode.com/users";

//fetch
const fetchUserData = async function () {
  const apiUrl = url;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(
      "Si è verificato un errore durante la richiesta:",
      error.message
    );
    throw error;
  }
};

const applyFilters = function () {
  //getElement buttons and input + aggiunta dei listener
  const nameFilterMode = document.getElementById("nameFilterMode");
  nameFilterMode.addEventListener("change", applyFilters);
  const usernameFilterMode = document.getElementById("usernameFilterMode");
  usernameFilterMode.addEventListener("change", applyFilters);
  const emailFilterMode = document.getElementById("emailFilterMode");
  emailFilterMode.addEventListener("change", applyFilters);
  
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", applyFilters);
  
  //getElement container
  const tableContainer = document.getElementById("tableContainer");

  fetchUserData()
    .then((userData) => {
      let filteredData = userData;

      // Applica i filtri
      if (nameFilterMode.checked) {
        const searchValue = searchInput.value.toLowerCase();
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes(searchValue)
        );
      }

      if (usernameFilterMode.checked) {
        const searchValue = searchInput.value.toLowerCase();
        filteredData = filteredData.filter((user) =>
          user.username.toLowerCase().includes(searchValue)
        );
      }

      if (emailFilterMode.checked) {
        const searchValue = searchInput.value.toLowerCase();
        filteredData = filteredData.filter((user) =>
          user.email.toLowerCase().includes(searchValue)
        );
      }

      // Visualizza i risultati
      createTable(filteredData, tableContainer);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error.message);
    });
};

const createTable = function (userData, container) {
  // Rimuovi eventuali risultati precedenti
  container.innerHTML = "";

  let tableHTML = `<table class="table table-striped w-100">`;

  tableHTML += `<tr>`;
  const headers = ["Nome", "Username", "Email"];
  headers.forEach((headerText) => {
    tableHTML += `<th class="fs-5 text-danger">${headerText}</th>`;
  });
  tableHTML += `</tr>`;

  userData.forEach((user) => {
    tableHTML += `<tr>`;
    const data = [user.name, user.username, user.email];
    data.forEach((cellData) => {
      tableHTML += `<td class="fs-5">${cellData}</td>`;
    });
    tableHTML += `</tr>`;
  });

  tableHTML += `</table>`;

  // Aggiunta della tabella al contenitore
  tableContainer.innerHTML = tableHTML;
};

// Chiamata iniziale per visualizzare tutti i dati
applyFilters();
