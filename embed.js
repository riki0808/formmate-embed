const params = new URLSearchParams(window.location.search);
const token = params.get('token') || null;

if (token) {
  const container = document.createElement('div');
  container.className = 'formmate-container';
  document.body.appendChild(container);
  
  const wrap = document.createElement('div');
  wrap.className = 'formmate-wrap';
  container.appendChild(wrap);
  
  const iframe = document.createElement('iframe');
  iframe.src = `http://localhost:3006/app/embed/thanks?token=${encodeURIComponent(token)}`;
  iframe.className = 'formmate-iframe';
  wrap.appendChild(iframe);
  
  const button = document.createElement('button');
  button.className = 'formmate-close';
  button.innerText = '×';
  button.setAttribute('aria-label', '閉じる');
  wrap.appendChild(button);

  document.body.style.overflow = 'hidden';
  
  iframe.onload = () => {
    button.addEventListener('click', () => {
      iframe.contentWindow?.postMessage({ action: 'formmate-close' }, '*')
      button.remove();
    })
  };
  
  let messageHandled = false;
  const allowedOrigins = ['http://localhost:3006', 'https://formmate.io', 'https://www.formmate.io'];
  window.addEventListener('message', function(event) {
    if (messageHandled) return;
    if (allowedOrigins.includes(event.origin)) {
      if (event.data?.action === 'remove') {
        messageHandled = true;
        container.remove();
        button.remove();
        document.body.style.overflow = '';
      }
    }
  }, false);
  
  const style = document.createElement('style');
  style.innerHTML = `
    .formmate-container {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .formmate-wrap {
      position: relative;
      border-radius: 18px;
      width: 1200px;
      height: 600px;
      /* max-height: 1000px; */
      /* max-height: 90vh; */
      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      transition: transform 0.3s ease-in-out;
    }
    .formmate-iframe {
      width: 100%;
      height: 100%;
      border-radius: 18px;
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
    }
    .formmate-close {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: #fff;
      border: none;
      font-size: 24px;
      font-weight: bold;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    }
    @media (max-width: 1200px) {
      .formmate-wrap {
        width: 992px;
      }
    }
    @media (max-width: 992px) {
      .formmate-wrap {
        width: 767px;
      }
    }
    @media (max-width: 767px) {
      .formmate-wrap {
        width: 576px;
      }
    }
    @media (max-width: 576px) {
      .formmate-wrap {
        width: 95%;
      }
    }
  `;
  
  document.head.appendChild(style);
}
