

function startScan() {
        const video = document.getElementById('video');
        let stream;

        // Access the user's camera
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then((mediaStream) => {
                stream = mediaStream;
                video.srcObject = stream;
                initializeQuagga();
            })
            .catch((err) => {
                console.error('Error accessing the camera: ', err);
                alert('Unable to access camera. Please check permissions or try a different device.');
            });

}

        function initializeQuagga() {
            Quagga.init({
                inputStream: {
                    type: 'LiveStream',
                    target: video, // Use the video element as the input stream
                    constraints: {
                        facingMode: 'environment',
                    }
                },
                decoder: {
                    readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader'],
                }
            }, (err) => {
                if (err) {
                    console.error('Quagga initialization failed: ', err);
                    return;
                }
                Quagga.start();
            });

            Quagga.onDetected((data) => {
                console.log('Barcode detected: ', data.codeResult.code);
                alert(`Barcode detected: ${data.codeResult.code}`);
                stopScanner();
            });
        }

        function stopScanner() {
            Quagga.stop();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
