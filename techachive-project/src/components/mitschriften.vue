<template>
  <div id="mitschriften">
    <h1>Mitschriften</h1>
    <div class="folders-container">
      <!-- Ordner 1 -->
      <div class="folder-container" @click="goToPage('/klasse1')">
        <div class="folder">
          <div class="folder-back" :style="folderStyle('#1e6a9d')">
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="folder-front" :style="folderStyle('#369bde')"></div>
            <div class="folder-front folder-front-right" :style="folderStyle('#369bde')"></div>
          </div>
        </div>
        <p class="folder-label">Klasse 1</p>
      </div>

      <!-- Ordner 2 -->
      <div class="folder-container" @click="goToPage('/klasse2')">
        <div class="folder">
          <div class="folder-back" :style="folderStyle('#9d1e6a')">
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="folder-front" :style="folderStyle('#de369b')"></div>
            <div class="folder-front folder-front-right" :style="folderStyle('#de369b')"></div>
          </div>
        </div>
        <p class="folder-label">Klasse 2</p>
      </div>

      <!-- Ordner 3 -->
      <div class="folder-container" @click="goToPage('/klasse3')">
        <div class="folder">
          <div class="folder-back" :style="folderStyle('#6a9d1e')">
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="folder-front" :style="folderStyle('#9bde36')"></div>
            <div class="folder-front folder-front-right" :style="folderStyle('#9bde36')"></div>
          </div>
        </div>
        <p class="folder-label">Klasse 3</p>
      </div>

      <!-- Ordner 4 -->
      <div class="folder-container" @click="goToPage('/klasse4')">
        <div class="folder">
          <div class="folder-back" :style="folderStyle('#9d6a1e')">
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="folder-front" :style="folderStyle('#de9b36')"></div>
            <div class="folder-front folder-front-right" :style="folderStyle('#de9b36')"></div>
          </div>
        </div>
        <p class="folder-label">Klasse 4</p>
      </div>

      <!-- Ordner 5 -->
      <div class="folder-container" @click="goToPage('/klasse5')">
        <div class="folder">
          <div class="folder-back" :style="folderStyle('#1e9d6a')">
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="paper"></div>
            <div class="folder-front" :style="folderStyle('#36de9b')"></div>
            <div class="folder-front folder-front-right" :style="folderStyle('#36de9b')"></div>
          </div>
        </div>
        <p class="folder-label">Klasse 5</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mitschriften',
  methods: {
    goToPage(route) {
      // Hier können Sie die Navigation zu einer anderen Seite implementieren
      alert(`Navigiere zu: ${route}`);
      // Beispiel: this.$router.push(route);
    },
    folderStyle(color) {
      return {
        backgroundColor: color,
        boxShadow: `0 0 30px ${color}`, // Leuchteffekt mit der gleichen Farbe
      };
    },
  },
};
</script>

<style scoped>
/* Globale Styles */
body {
  background-color: black;
  margin: 0;
  padding: 0;
  font-family: "Arial", sans-serif;
}

#mitschriften {
  text-align: center;
  padding: 20px;
  min-height: 100vh; /* Volle Höhe der Seite */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertikal zentrieren */
  align-items: center; /* Horizontal zentrieren */
  background-color: black; /* Schwarzer Hintergrund */
  color: white; /* Weiße Schrift */
}

h1 {
  font-size: 3rem; /* Größere Schrift */
  margin-bottom: 40px; /* Mehr Abstand zum Inhalt */
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); /* Leuchteffekt für die Überschrift */
}

.folders-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 80px; /* Größerer Abstand zwischen den Ordnern */
  margin-top: 20px;
}

.folder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.folder {
  position: relative;
  transition: all 0.3s ease-in-out; /* Sanftere Animation */
  transform-style: preserve-3d; /* 3D-Effekt aktivieren */
}

.folder-back {
  position: relative;
  height: 180px; /* Größere Ordner */
  width: 220px; /* Größere Ordner */
  border-radius: 0 8px 8px 8px;
  z-index: 1;
  transform: translateZ(20px); /* 3D-Effekt */
}

.folder-back::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 30px;
  height: 10px;
  border-radius: 4px 4px 0 0;
  background-color: inherit;
  transform: translateZ(20px); /* 3D-Effekt */
}

.paper {
  position: absolute;
  bottom: 0;
  left: 50%;
  border-radius: 4px 4px 0 0;
  background-color: #e7eff5;
  transform: translateX(-50%) translateZ(10px); /* 3D-Effekt */
  box-shadow: rgba(0, 0, 0, 0.16) 2px 0px 2px, rgba(0, 0, 0, 0.23) 2px 0px 2px;
  transition: all 0.4s ease-in-out; /* Sanftere Animation */
  z-index: 0; /* Papiere immer im Hintergrund */
}

.paper:nth-child(1) {
  height: 120px; /* Größere Papiere */
  width: 120px; /* Größere Papiere */
  z-index: 0; /* Papiere immer im Hintergrund */
}

.paper:nth-child(2) {
  height: 115px; /* Größere Papiere */
  width: 130px; /* Größere Papiere */
  z-index: 0; /* Papiere immer im Hintergrund */
}

.paper:nth-child(3) {
  height: 110px; /* Größere Papiere */
  width: 140px; /* Größere Papiere */
  z-index: 0; /* Papiere immer im Hintergrund */
}

.folder-front {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 180px; /* Größere Ordner */
  width: 220px; /* Größere Ordner */
  border-radius: 8px;
  transform-origin: bottom;
  z-index: 4; /* Ordnerfront immer im Vordergrund */
  transition: all 0.3s ease-in-out; /* Sanftere Animation */
  transform: translateZ(30px); /* 3D-Effekt */
}

.folder-front-right {
  z-index: 4; /* Ordnerfront immer im Vordergrund */
  transform: translateZ(30px); /* 3D-Effekt */
}

.folder:hover {
  transform: translateY(-8px) rotateX(10deg) rotateY(10deg); /* Sanftere 3D-Animation */
}

.folder:hover .paper {
  transform: translateY(-12px) translateX(-50%) translateZ(10px); /* Sanftere 3D-Animation */
}

.folder:hover .folder-front {
  transform: skew(15deg) scaleY(0.6) translateZ(30px); /* Sanftere 3D-Animation */
}

.folder:hover .folder-front-right {
  transform: skew(-15deg) scaleY(0.6) translateZ(30px); /* Sanftere 3D-Animation */
}

.folder-label {
  margin-top: 20px; /* Mehr Abstand zum Ordner */
  font-size: 1.5rem; /* Größere Schrift */
  font-weight: bold;
  color: white; /* Weiße Schrift */
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8); /* Stärkerer Leuchteffekt für den Text */
}
</style>