
document.getElementById('invoice-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const date = document.getElementById('transaction-date').value;
  const gross = parseFloat(document.getElementById('gross-weight').value);
  const box = parseFloat(document.getElementById('box-weight').value);
  const price = parseFloat(document.getElementById('price').value);

  const net = gross - box;
  const total = net * price;

  const resultHTML = `
    <div id="invoice-content">
      <strong>Nama:</strong> ${name}<br>
      <strong>Tanggal:</strong> ${date}<br>
      <strong>Berat Kotor:</strong> ${gross} kg<br>
      <strong>Berat Kotak:</strong> ${box} kg<br>
      <strong>Berat Bersih:</strong> ${net.toFixed(2)} kg<br>
      <strong>Harga per kg:</strong> Rp ${price.toLocaleString()}<br>
      <strong>Total Bayar:</strong> <h2>Rp ${total.toLocaleString()}</h2>
    </div>
    <button id="download-jpg">Download JPG</button>
  `;

  document.getElementById('result').innerHTML = resultHTML;

  setTimeout(() => {
    document.getElementById('download-jpg').addEventListener('click', () => {
      html2canvas(document.getElementById('invoice-content')).then(canvas => {
        const link = document.createElement('a');
        link.download = `invoice-${name}-${date}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  }, 100);
});
