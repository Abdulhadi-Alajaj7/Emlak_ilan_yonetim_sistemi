import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import loginBg from "../images/loginBg.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Bir hata oluştu");
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
          <div>
            <h2 className="text-center text-white">Şifremi Unuttum</h2>
            <p className="text-center text-white-50 mt-2" style={{ fontSize: "0.9rem" }}>
              Kayıtlı e-posta adresinizi girin, sıfırlama linki gönderelim.
            </p>
          </div>

          <div className="row mt-4">
            <div className="col">
              <div className="wave-group">
                <input 
                  required 
                  type="email" 
                  className="input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ '--index': 0 }}>E</span>
                  <span className="label-char" style={{ '--index': 1 }}>-</span>
                  <span className="label-char" style={{ '--index': 2 }}>p</span>
                  <span className="label-char" style={{ '--index': 3 }}>o</span>
                  <span className="label-char" style={{ '--index': 4 }}>s</span>
                  <span className="label-char" style={{ '--index': 5 }}>t</span>
                  <span className="label-char" style={{ '--index': 6 }}>a</span>
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-danger rounded-pill"
              style={{ width: "170px" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "yükleniyor..." : "gönder"}
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
          <div className="alert alert-success mt-4 text-center rounded-3 shadow" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4 text-center rounded-3 shadow" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
