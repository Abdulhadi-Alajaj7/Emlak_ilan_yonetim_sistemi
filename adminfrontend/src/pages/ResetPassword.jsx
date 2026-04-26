import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import loginBg from "../images/loginBg.png";

function ResetPassword() {
  const { token } = useParams();
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (sifre !== sifreTekrar) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    if (sifre.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await api.post(`/auth/reset-password/${token}`, { sifre });
      setMessage(res.data.message);
      
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.error || "Geçersiz veya süresi dolmuş bağlantı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="container align-content-center vh-100" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-center text-white">Şifre Yenileme</h2>
            <p className="text-center text-white-50 mt-2" style={{ fontSize: "0.9rem" }}>
              Lütfen yeni şifrenizi belirleyin.
            </p>
          </div>

          {/* Yeni Şifre */}
          <div className="row mt-4">
            <div className="col">
              <div className="wave-group">
                <input 
                  required 
                  type="password" 
                  className="input" 
                  value={sifre} 
                  onChange={(e) => setSifre(e.target.value)} 
                />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ '--index': 0 }}>Y</span>
                  <span className="label-char" style={{ '--index': 1 }}>e</span>
                  <span className="label-char" style={{ '--index': 2 }}>n</span>
                  <span className="label-char" style={{ '--index': 3 }}>i</span>
                  <span className="label-char" style={{ '--index': 4 }}>&nbsp;</span>
                  <span className="label-char" style={{ '--index': 5 }}>Ş</span>
                  <span className="label-char" style={{ '--index': 6 }}>i</span>
                  <span className="label-char" style={{ '--index': 7 }}>f</span>
                  <span className="label-char" style={{ '--index': 8 }}>r</span>
                  <span className="label-char" style={{ '--index': 9 }}>e</span>
                </label>
              </div>
            </div>
          </div>

          {/* Şifre Tekrar */}
          <div className="row mt-3">
            <div className="col">
              <div className="wave-group">
                <input 
                  required 
                  type="password" 
                  className="input" 
                  value={sifreTekrar} 
                  onChange={(e) => setSifreTekrar(e.target.value)} 
                />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ '--index': 0 }}>Ş</span>
                  <span className="label-char" style={{ '--index': 1 }}>i</span>
                  <span className="label-char" style={{ '--index': 2 }}>f</span>
                  <span className="label-char" style={{ '--index': 3 }}>r</span>
                  <span className="label-char" style={{ '--index': 4 }}>e</span>
                  <span className="label-char" style={{ '--index': 5 }}>&nbsp;</span>
                  <span className="label-char" style={{ '--index': 6 }}>T</span>
                  <span className="label-char" style={{ '--index': 7 }}>e</span>
                  <span className="label-char" style={{ '--index': 8 }}>k</span>
                  <span className="label-char" style={{ '--index': 9 }}>r</span>
                  <span className="label-char" style={{ '--index': 10 }}>a</span>
                  <span className="label-char" style={{ '--index': 11 }}>r</span>
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-danger rounded-pill"
              style={{ width: "180px" }}
              type="submit"
              disabled={loading || !!message}
            >
              {loading ? "yükleniyor..." : "şifreyi güncelle"}
            </button>
            <br />
            <button
              type="button"
              className="btn btn-link text-white-50 mt-3"
              style={{ textDecoration: "none", fontSize: "0.9rem" }}
              onClick={() => navigate("/")}
            >
              Giriş Ekranına Dön
            </button>
          </div>
        </form>

        {message && (
          <div className="alert alert-success mt-4 text-center" role="alert">
            <p className="mb-0">{message}</p>
            <small>Giriş sayfasına yönlendiriliyorsunuz...</small>
          </div>
        )}

        {error && (
          <div className="alert alert-warning mt-4 text-center" role="alert">
            <p className="mb-0">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
