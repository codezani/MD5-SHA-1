// Web Crypto API helper for SHA family hashes
async function shaHash(message, algorithm) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// Main hash generator
async function generateHashes() {
  const text = document.getElementById('input').value.trim();
  const resultsDiv = document.getElementById('results');
  const statusDiv = document.getElementById('status');

  if (!text) {
    resultsDiv.innerHTML = '';
    statusDiv.textContent = '';
    return;
  }

  statusDiv.textContent = 'Calculating hashes...';

  try {
    const md5Hash = MD5(text);
    const sha1 = await shaHash(text, 'SHA-1');
    const sha256 = await shaHash(text, 'SHA-256');
    const sha512 = await shaHash(text, 'SHA-512');

    const html = `
      <div class="result">
        <h3>🔽 Lowercase Hashes</h3>
        
        <strong>MD5:</strong><br>
        <span class="hash-text">${md5Hash}</span><br>
        
        <strong>SHA-1:</strong><br>
        <span class="hash-text">${sha1}</span><br>
        
        <strong>SHA-256:</strong><br>
        <span class="hash-text">${sha256}</span><br>
        
        <strong>SHA-512:</strong><br>
        <span class="hash-text">${sha512}</span>
      </div>

      <div class="result">
        <h3>🔼 UPPERCASE Hashes</h3>
        
        <strong>MD5:</strong><br>
        <span class="hash-text">${md5Hash.toUpperCase()}</span><br>
        
        <strong>SHA-1:</strong><br>
        <span class="hash-text">${sha1.toUpperCase()}</span><br>
        
        <strong>SHA-256:</strong><br>
        <span class="hash-text">${sha256.toUpperCase()}</span><br>
        
        <strong>SHA-512:</strong><br>
        <span class="hash-text">${sha512.toUpperCase()}</span>
      </div>
    `;

    resultsDiv.innerHTML = html;
    statusDiv.textContent = `Calculated for ${text.length} characters`;

  } catch (e) {
    resultsDiv.innerHTML = `<p style="color:red; text-align:center;">Error calculating hashes: ${e.message}</p>`;
    statusDiv.textContent = '';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const debouncedGenerate = debounce(generateHashes, 280);

  input.addEventListener('input', debouncedGenerate);
  input.focus();
});