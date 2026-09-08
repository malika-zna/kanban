"use client"

export default function SaveButton() {
  return (
    <button type="submit" className="justify-center flex flex-1 bg-black/10 rounded-lg p-3 py-2"
      >
      {/* PENTING: karena ini ada di dalam parent yang juga punya event handler onclick, terjadi event propagation. state berubah 2 kali (karena klik di button ini dan karena klik di background/parent). akhirnya karena kondisi sebelum dan sesdah sama saja, tidak dirender ulang. solusinya stop prpagation */}
      {/* UPDATE: stop propagation harus ditaruh di kotak fungsionalnya (misal form) karena tadi, event propagation. jadi saat klik di form kotaknya menutup karena event nya naik ke parent */}
      <p className="w-fit">
        Simpan
      </p>
    </button>
  );
}

