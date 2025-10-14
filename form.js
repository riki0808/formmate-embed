function setupIframe() {
  const iframe = document.getElementById('myIframe');
  const allowedOrigins = ['http://localhost:3006', 'https://formmate.io', 'https://www.formmate.io'];
  window.addEventListener('message', function(event) {
    try {
      if (!allowedOrigins.includes(event.origin)) return;
    } catch (error) {
      console.error('Error handling message event:', error);
    }

    try {
      if (event.source !== iframe.contentWindow) return;
    } catch (error) {
      console.error('Error parsing message data:', error);
    }
    const receivedData = event.data;
    if (receivedData && receivedData.height && !isNaN(receivedData.height) && receivedData.height > 0) {
      iframe.style.height = receivedData.height + 'px';
    }
    if (receivedData?.type === 'redirect' && receivedData.url) {
      const redirectUrl = new URL(receivedData.url);
      if(receivedData?.token){
        redirectUrl.searchParams.set('token', receivedData.token);
      }
      window.location.href = redirectUrl.toString();
    }
  }, false);
}