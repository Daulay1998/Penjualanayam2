
document.getElementById('invoice-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const date = document.getElementById('transaction-date').value;
  const gross = parseFloat(document.getElementById('gross-weight').value);
  const box = parseFloat(document.getElementById('box-weight').value);
  const price = parseFloat(document.getElementById('price').value);

  const net = gross - box;
  const total = net * price;

  document.getElementById('result').innerHTML = `
    <strong>Nama:</strong> ${name}<br>
    <strong>Tanggal:</strong> ${date}<br>
    <strong>Berat Kotor:</strong> ${gross} kg<br>
    <strong>Berat Kotak:</strong> ${box} kg<br>
    <strong>Berat Bersih:</strong> ${net.toFixed(2)} kg<br>
    <strong>Harga per kg:</strong> Rp ${price.toLocaleString()}<br>
    <strong>Total Bayar:</strong> <h2>Rp ${total.toLocaleString()}</h2>
  `;
});
