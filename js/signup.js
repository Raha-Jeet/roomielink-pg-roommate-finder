document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Signup successful
      localStorage.setItem("isLoggedIn", "true");
      alert("Signup Successful!");
      window.location.href = "index.html"; // redirect homepage
    } else {
      alert(data.message || "Signup Failed");
    }
  } catch (err) {
    console.error("Signup error:", err);
  }
});
