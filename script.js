
function hitung() {
  const nama = document.getElementById("namaPelanggan").value;
  const tanggal = document.getElementById("tanggal").value;
  const beratKotor = parseFloat(document.getElementById("beratKotor").value);
  const jumlahKotak = parseInt(document.getElementById("jumlahKotak").value);
  const beratPerKotak = parseFloat(document.getElementById("beratPerKotak").value);
  const hargaPerKg = parseFloat(document.getElementById("hargaPerKg").value);

  const totalBeratKotak = jumlahKotak * beratPerKotak;
  const beratBersih = beratKotor - totalBeratKotak;
  const totalHarga = beratBersih * hargaPerKg;

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
    <h3>Invoice</h3>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Tanggal:</strong> ${tanggal}</p>
    <p><strong>Berat Kotor:</strong> ${beratKotor.toFixed(2)} kg</p>
    <p><strong>Total Kotak:</strong> ${jumlahKotak} x ${beratPerKotak}kg = ${totalBeratKotak}kg</p>
    <p><strong>Berat Bersih:</strong> ${beratBersih.toFixed(2)} kg</p>
    <p><strong>Harga per kg:</strong> Rp${hargaPerKg.toLocaleString()}</p>
    <p><strong>Total Harga:</strong> Rp${totalHarga.toLocaleString()}</p>
  `;

  const transaksi = {
    nama,
    tanggal,
    beratKotor,
    jumlahKotak,
    beratPerKotak,
    hargaPerKg,
    totalHarga,
    beratBersih
  };

  simpanRiwayat(transaksi);
  tampilkanRiwayat();
}

function simpanRiwayat(data) {
  const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
  riwayat.unshift(data);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
}

function tampilkanRiwayat() {
  const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
  const list = document.getElementById("riwayatList");
  list.innerHTML = "";
  riwayat.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.tanggal} - ${item.nama} - ${item.beratBersih.toFixed(2)}kg - Rp${item.totalHarga.toLocaleString()}
      <button onclick="hapusRiwayat(${index})" style="float:right;">Hapus</button>
    `;
    list.appendChild(li);
  });
}

function hapusRiwayat(index) {
  const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
  riwayat.splice(index, 1);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
  tampilkanRiwayat();
}

function downloadJPG() {
  html2canvas(document.querySelector(".output-area")).then(canvas => {
    const link = document.createElement("a");
    link.download = "invoice.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
}

window.onload = tampilkanRiwayat;
