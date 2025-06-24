const supabaseUrl = 'https://dltswviyluqthcphpydn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...'; // (sudah kamu berikan)
const table = 'riwayat_invoice';

async function hitungInvoice() {
  const nama = document.getElementById('namaPelanggan').value;
  const tanggal = document.getElementById('tanggal').value;
  const berat = parseFloat(document.getElementById('beratTotal').value);
  const jumlahKotak = parseInt(document.getElementById('jumlahKotak').value);
  const beratKotak = parseFloat(document.getElementById('beratPerKotak').value);
  const harga = parseInt(document.getElementById('hargaPerKg').value);

  const totalBeratKotak = jumlahKotak * beratKotak;
  const bersih = berat - totalBeratKotak;
  const totalHarga = bersih * harga;

  const hasil = `
    <h3>Invoice</h3>
    <p>Nama Pelanggan: ${nama}</p>
    <p>Tanggal: ${tanggal}</p>
    <p>Berat Kotor: ${berat} kg</p>
    <p>Jumlah Kotak: ${jumlahKotak} (total ${totalBeratKotak} kg)</p>
    <p>Berat Bersih: ${bersih.toFixed(2)} kg</p>
    <p>Harga per kg: Rp ${harga.toLocaleString()}</p>
    <h4>Total: Rp ${totalHarga.toLocaleString()}</h4>
  `;

  document.getElementById('hasil').innerHTML = hasil;
}

async function simpanRiwayat() {
  const nama = document.getElementById('namaPelanggan').value;
  const tanggal = document.getElementById('tanggal').value;
  const berat = parseFloat(document.getElementById('beratTotal').value);
  const jumlahKotak = parseInt(document.getElementById('jumlahKotak').value);
  const beratKotak = parseFloat(document.getElementById('beratPerKotak').value);
  const harga = parseInt(document.getElementById('hargaPerKg').value);

  const bersih = berat - jumlahKotak * beratKotak;
  const total = bersih * harga;

  const { data, error } = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      nama, tanggal, berat, jumlah_kotak: jumlahKotak,
      berat_per_kotak: beratKotak, harga_per_kg: harga,
      total_harga: total
    })
  });

  if (!error) tampilkanRiwayat();
}

async function tampilkanRiwayat() {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, {
    headers: {
      'apikey': supabaseKey,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();

  const container = document.getElementById('riwayatTransaksi');
  container.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'riwayat-item';
    div.innerHTML = `
      <strong>${item.tanggal}</strong> - ${item.nama} <br/>
      Berat: ${item.berat} kg (kotak ${item.jumlah_kotak} x ${item.berat_per_kotak}kg) <br/>
      Total: Rp ${item.total_harga.toLocaleString()}
    `;
    container.appendChild(div);
  });
}

function unduhJPG() {
  const elemen = document.getElementById('hasil');
  html2canvas(elemen).then(canvas => {
    const link = document.createElement('a');
    link.download = 'invoice.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
}

window.onload = tampilkanRiwayat;
