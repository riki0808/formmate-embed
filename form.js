function setupIframe() {
  const iframe = document.getElementById('myIframe');
  console.log('iframe',iframe)
  const allowedOrigins = ['http://localhost:3006', 'https://formmate.io', 'https://www.formmate.io'];
  window.addEventListener('message', function(event) {
    try {
      if (!allowedOrigins.includes(event.origin)) return;
      console.log('ここきた？')
    } catch (error) {
      console.error('Error handling message event:', error);
    }

    try {
      if (event.source !== iframe.contentWindow) return;
      console.log('ここきた？2')
    } catch (error) {
      console.error('Error parsing message data:', error);
    }
    const receivedData = event.data;
    console.log('receivedData',receivedData)
    if (receivedData && receivedData.height && !isNaN(receivedData.height) && receivedData.height > 0) {
      console.log('ここきた？3')
      iframe.style.height = receivedData.height + 'px';
    }
    if (receivedData?.type === 'redirect' && receivedData.url) {
      const redirectUrl = new URL(receivedData.url);
      console.log('redirectUrl',redirectUrl)
      if(receivedData?.token){
        redirectUrl.searchParams.set('token', receivedData.token);
      }
      window.location.href = redirectUrl.toString();
    }
  }, false);
}