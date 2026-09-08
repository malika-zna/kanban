"use client"

import useFormData from "../hook/useFormData";

export default function CancelButton() {
  const { handleSetOpen } = useFormData();

  return (
    <button className="justify-center flex flex-1 bg-black/10 hover:bg-black hover:text-white duration-200 cursor-pointer rounded-lg p-3 py-2"
      onClick={handleSetOpen}>
        {/* PENTING: karena ini ada di dalam parent yang juga punya event handler onclick, terjadi event propagation. state berubah 2 kali (karena klik di button ini dan karena klik di background/parent). akhirnya karena kondisi sebelum dan sesdah sama saja, tidak dirender ulang. solusinya stop prpagation */}
        {/* UPDATE: stop propagation harus ditaruh di kotak fungsionalnya (misal form) karena tadi, event propagation. jadi saat klik di form kotaknya menutup karena event nya naik ke parent */}
      <p className="w-fit">
        Batal
      </p>
    </button>
  );
}