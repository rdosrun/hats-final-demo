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



/*function start_scan(){
    console.log("DOM loaded");
      const videoElement = document.getElementById('barcode-scanner');
      const resultElement = document.getElementById('result');
    console.log(videoElement);

      // Initialize Quagga
      Quagga.init({
        inputStream: {
          type: "LiveStream",
          target: videoElement, // The video element
          constraints: {
            facingMode: "environment" // Use the back camera
          }
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"]
        }
      }, (err) => {
        if (err) {
          console.error(err);
          resultElement.innerText = "Error initializing barcode scanner.";
          return;
        }
        Quagga.start();
      });

      // Listen for barcode detection
      Quagga.onDetected((data) => {
        const code = data.codeResult.code;
        resultElement.innerText = `Barcode Detected: ${code}`;
        Quagga.stop(); // Stop scanning once a barcode is detected
      });
}*/

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

