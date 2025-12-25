document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Login successful
      localStorage.setItem("isLoggedIn", "true");
      alert("Login Successful!");
      window.location.href = "index.html"; // redirect homepage
    } else {
      alert(data.message || "Login Failed");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
});
