   document.addEventListener("DOMContentLoaded", () => {
    });

function start_scan(){
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

