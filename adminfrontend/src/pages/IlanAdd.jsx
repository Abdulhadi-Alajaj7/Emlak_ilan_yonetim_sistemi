import { useState } from "react";
import { useDispatch } from "react-redux";
import { addIlan } from "../redux/ilanSlice";

function IlanAdd() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    baslik: "",
    aciklama: "",
    fiyat: "",
    sehir: "",
    ilce: "",
    ilanTuru: "satılık",
    emlakTipi: "Konut", // 🔥 حقل جديد
    metrekare: "",      // 🔥 حقل جديد
    odaSayisi: "",      // 🔥 حقل جديد
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- IMAGE SELECT
  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  // ---------------- SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      images.forEach((img) => {
        data.append("resimler", img); // تأكد أن الاسم "resimler" مطابق للباكيند
      });

      await dispatch(addIlan(data)).unwrap();

      alert("İlan başarıyla eklendi ✅");

      // تفريغ الفورم بعد النجاح
      setForm({
        baslik: "",
        aciklama: "",
        fiyat: "",
        sehir: "",
        ilce: "",
        ilanTuru: "satılık",
        emlakTipi: "Konut",
        metrekare: "",
        odaSayisi: "",
      });

      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Hata oluştu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-3">Yeni İlan Ekle</h3>

      <form onSubmit={handleSubmit} className="card p-3">
        <input
          className="form-control mb-2"
          name="baslik"
          placeholder="Başlık"
          value={form.baslik}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="aciklama"
          placeholder="Açıklama"
          value={form.aciklama}
          onChange={handleChange}
        />

        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control mb-2"
              name="fiyat"
              placeholder="Fiyat"
              type="number"
              value={form.fiyat}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control mb-2"
              name="metrekare"
              placeholder="Metrekare (m²)"
              type="number"
              value={form.metrekare}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control mb-2"
              name="sehir"
              placeholder="Şehir"
              value={form.sehir}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control mb-2"
              name="ilce"
              placeholder="İlçe"
              value={form.ilce}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <select
              className="form-control mb-2"
              name="ilanTuru"
              value={form.ilanTuru}
              onChange={handleChange}
            >
              <option value="satılık">Satılık</option>
              <option value="kiralık">Kiralık</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-control mb-2"
              name="emlakTipi"
              value={form.emlakTipi}
              onChange={handleChange}
            >
              <option value="Konut">Konut</option>
              <option value="İşyeri">İşyeri</option>
              <option value="Arsa">Arsa</option>
              <option value="Bina">Bina</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              className="form-control mb-2"
              name="odaSayisi"
              placeholder="Oda Sayısı (3+1)"
              value={form.odaSayisi}
              onChange={handleChange}
              disabled={form.emlakTipi === "Arsa"} // لو أرض، قفل حقل الغرف
            />
          </div>
        </div>

        <input
          className="form-control mb-3"
          type="file"
          multiple
          onChange={handleImages}
        />

        {/* PREVIEW */}
        <div className="d-flex gap-2 flex-wrap mb-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              width="80"
              height="80"
              style={{ objectFit: "cover", borderRadius: "6px" }}
            />
          ))}
        </div>

        <button className="btn btn-danger w-100" disabled={loading}>
          {loading ? "Yükleniyor..." : "İlanı Kaydet"}
        </button>
      </form>
    </div>
  );
}

export default IlanAdd;