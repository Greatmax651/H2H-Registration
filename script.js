// ===== REGISTER FUNCTION =====
function register() {
  const player = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    guardian: document.getElementById("guardian").value,
    age: document.getElementById("age").value,
    height: document.getElementById("height").value,
    wing: document.getElementById("wing").value,
    jersey: document.getElementById("jersey").value
  };

  if (!player.phone || !player.name) {
    alert("Name and phone number are required!");
    return;
  }

  localStorage.setItem(player.phone, JSON.stringify(player));
  alert("Registration successful!");
  window.location.href = "index.html";
}

// ===== LOGIN FUNCTION =====
function login() {
  const phone = document.getElementById("loginPhone").value;
  const playerData = localStorage.getItem(phone);

  if (playerData) {
    const player = JSON.parse(playerData);
    alert(
      "Welcome to H2H FA\n\n" +
      "Name: " + player.name + "\n" +
      "Age: " + player.age + "\n" +
      "Wing: " + player.wing + "\n" +
      "Jersey: " + player.jersey
    );
  } else {
    alert("Player not found. Please register.");
  }
}

// ===== ADMIN FUNCTIONS =====
function loadPlayers() {
  const container = document.getElementById("players");
  container.innerHTML = "";

  if (localStorage.length === 0) {
    container.innerHTML = "<p>No players registered yet.</p>";
    return;
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const player = JSON.parse(localStorage.getItem(key));

    container.innerHTML += `
      <hr>
      <p><strong>Name:</strong> ${player.name}</p>
      <p><strong>Phone:</strong> ${player.phone}</p>
      <p><strong>Guardian:</strong> ${player.guardian}</p>
      <p><strong>Age:</strong> ${player.age}</p>
      <p><strong>Height:</strong> ${player.height}</p>
      <p><strong>Wing:</strong> ${player.wing}</p>
      <p><strong>Jersey:</strong> ${player.jersey}</p>
      <button onclick="deletePlayer('${player.phone}')">Delete</button>
    `;
  }
}

function deletePlayer(phone) {
  if (confirm("Are you sure you want to delete this player?")) {
    localStorage.removeItem(phone);
    loadPlayers();
  }
}
