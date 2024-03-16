<template>
    <div class="login-modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span> <!-- Schließen-Schaltfläche hinzugefügt -->
        <h2 v-if="!registering">Anmelden</h2>
        <h2 v-else>Registrieren</h2>
        <form @submit.prevent="registerOrLogin" v-if="registering">
          <input type="text" v-model="username" placeholder="Benutzername" required>
          <input type="email" v-model="email" placeholder="E-Mail" required>
          <input type="password" v-model="password" placeholder="Passwort" required>
          <button type="submit">Registrieren</button>
        </form>
        <form @submit.prevent="registerOrLogin" v-else>
          <input type="text" v-model="username" placeholder="Benutzername" required>
          <input type="password" v-model="password" placeholder="Passwort" required>
          <button type="submit">Anmelden</button>
        </form>
        <div class="register-link">
          <span v-if="!registering">Noch kein Konto? </span>
          <button @click="switchMode" v-if="!registering">Hier registrieren</button>
          <a @click="switchMode" v-else>Jetzt anmelden</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        registering: false // Zustand, um zwischen Anmelden und Registrieren zu wechseln
      };
    },
    methods: {
      async registerOrLogin() {
        try {
          if (this.registering) {
            // Registrieren
            axios.post('http://localhost:8000/register', {
                username: this.username,
                 email: this.email,
                 password: this.password
                    });
            // Hier könntest du z.B. eine Meldung anzeigen, dass die Registrierung erfolgreich war
          } else {
            // Anmelden
            // Implementiere die Anmeldefunktionalität hier
            console.log('Anmeldung mit Benutzername:', this.username, 'und Passwort:', this.password);
          }
        } catch (error) {
          console.error('Fehler beim Registrieren/Anmelden:', error);
          // Hier könntest du eine Fehlermeldung anzeigen
        }
      },
      switchMode() {
        this.registering = !this.registering;
      },
      closeModal() {
        this.$emit('close'); // Schließen-Ereignis auslösen
      }
    }
  }
  </script>

<style scoped>
.login-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid #007bff; /* Rahmenumrandung hinzufügen */
}

.modal-content {
  text-align: center;
}

input[type="text"],
input[type="password"],
input[type="email"],
button {
  display: block;
  margin: 10px auto;
  width: 200px;
  padding: 8px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 10px;
}
</style>
