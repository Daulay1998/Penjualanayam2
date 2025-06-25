function hitung() {
  const nama = document.getElementById("namaPelanggan").value;
  const tanggal = document.getElementById("tanggal").value;
  const totalBerat = parseFloat(document.getElementById("totalBerat").value);
  const jumlahKotak = parseInt(document.getElementById("jumlahKotak").value);
  const beratKotak = parseFloat(document.getElementById("beratKotak").value);
  const hargaPerKg = parseFloat(document.getElementById("hargaPerKg").value);

  const beratKotakTotal = jumlahKotak * beratKotak;
  const beratBersih = totalBerat - beratKotakTotal;
  const totalHarga = beratBersih * hargaPerKg;

  const hasil = `
    <h3>Invoice</h3>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Tanggal:</strong> ${tanggal}</p>
    <p><strong>Berat Kotor:</strong> ${totalBerat.toFixed(2)} kg</p>
    <p><strong>Jumlah Kotak:</strong> ${jumlahKotak} x ${beratKotak.toFixed(2)} kg = ${beratKotakTotal.toFixed(2)} kg</p>
    <p><strong>Berat Bersih:</strong> ${beratBersih.toFixed(2)} kg</p>
    <p><strong>Harga per kg:</strong> Rp ${hargaPerKg.toLocaleString("id-ID")}</p>
    <h3>Total: Rp ${totalHarga.toLocaleString("id-ID")}</h3>
  `;

  document.getElementById("hasil").innerHTML = hasil;
}

function simpan() {
  const riwayat = localStorage.getItem("riwayat") || "[]";
  const data = {
    nama: document.getElementById("namaPelanggan").value,
    tanggal: document.getElementById("tanggal").value,
    totalBerat: document.getElementById("totalBerat").value,
    jumlahKotak: document.getElementById("jumlahKotak").value,
    beratKotak: document.getElementById("beratKotak").value,
    hargaPerKg: document.getElementById("hargaPerKg").value,
    waktu: new Date().toISOString()
  };
  const dataRiwayat = JSON.parse(riwayat);
  dataRiwayat.push(data);
  localStorage.setItem("riwayat", JSON.stringify(dataRiwayat));
  tampilRiwayat();
}

function tampilRiwayat() {
  const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
  const el = document.getElementById("riwayat");
  el.innerHTML = "";
  riwayat.forEach((item, index) => {
    el.innerHTML += `
      <div style="border-bottom:1px solid #ccc; margin-bottom:10px;">
        <strong>${item.tanggal} - ${item.nama}</strong><br/>
        Berat Kotor: ${item.totalBerat}kg - Kotak: ${item.jumlahKotak} x ${item.beratKotak}kg<br/>
        Harga: Rp ${item.hargaPerKg}<br/>
        <button onclick="hapus(${index})">Hapus</button>
      </div>
    `;
  });
}

function hapus(index) {
  const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
  riwayat.splice(index, 1);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
  tampilRiwayat();
}

function unduh() {
  const hasil = document.getElementById("hasil");
  html2canvas(hasil).then(canvas => {
    const link = document.createElement("a");
    link.download = `invoice-${Date.now()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
}

// Tampilkan saat pertama kali
tampilRiwayat();
