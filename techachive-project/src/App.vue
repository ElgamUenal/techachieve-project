<template>
  <div id="app">
    <!-- Navigationsleiste -->
    <nav>
      <div class="menu">
        <p class="website_name">TechAchieve</p>
        <div class="menu_links">
          <router-link to="/" class="link">Home</router-link>
          <router-link to="/Nachhilfe" class="link">Nachhilfe</router-link>
          <router-link to="/mitschriften" class="link">Mitschriften</router-link>
          <router-link to="/contacts" class="link">About</router-link>
          <router-link to="/faecher" class="link">faecher</router-link>

        </div>
      </div>
    </nav>

    <!-- Routenkomponenten werden hier angezeigt -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Globale Styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f1f1f1;
}

#app {
  text-align: center;
}

/* Navigationsleiste */
nav {
  background-color: #333;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.website_name {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-right: 40px; 
}

.menu_links {
  display: flex;
  gap: 20px;
}


.link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.link:hover {
  color: #ff9d87;
}

.router-link-exact-active {
  color: #ff9d87;
  border-bottom: 2px solid #ff9d87;
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu {
    flex-direction: column;
    align-items: flex-start;
  }

  .menu_links {
    margin-top: 10px;
    gap: 15px;
  }

  .link {
    font-size: 14px;
  }
}
</style>