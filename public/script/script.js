document.addEventListener("DOMContentLoaded", () => {

    });
    window.onload = function() {
    if (sessionStorage.getItem('msalLoggedIn')) {
   console.log("Logged in");
    //   document.getElementById('login-section').style.display = 'none';
     // document.getElementById('private-links').style.display = 'block';
    }
  };
  const msalConfig = {
    auth: {
      clientId: '95e880e8-e54d-4d01-a26c-052cff7e9592', // Replace with your application ID
      authority: 'https://login.microsoftonline.com/6ba30675-1170-422f-89c3-0a43af4a4534', // Replace with your tenant ID
      redirectUri: window.location.origin
    }
  };

  const msalInstance = new msal.PublicClientApplication(msalConfig);

   //this one gets called when sign in happens
  async function signIn() {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ['User.Read']
      });
      sessionStorage.setItem('msalLoggedIn', true);
      document.getElementById('cart').style.display = 'block';
    } catch (error) {
      console.error(error);
    }
  }

  async function signOut() {
    await msalInstance.logoutPopup();
    sessionStorage.removeItem('msalLoggedIn');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('logout-section').style.display = 'none';
    document.getElementById('private-links').style.display = 'none';
  }

   function toggleCheckboxContainer() {
  const checkboxContainer = document.getElementById('checkbox-container');
  checkboxContainer.classList.toggle('active');
}

async function fetchProfile() {
    try {
        const response = await fetch('/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const profile = await response.json();
        console.log('Profile:', profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


function hideDiv(event) {
    const parentElement = event.target.parentElement;
    if (parentElement) {
        parentElement.style.display = 'none';
    }
}

