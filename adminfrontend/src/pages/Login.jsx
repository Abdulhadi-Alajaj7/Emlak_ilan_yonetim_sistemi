import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { girisYap } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import loginBg from "../images/loginBg.png";

function Login() {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, yukleniyor, hata } = useSelector((state) => state.auth);

  // -------------------------- GİRİŞ  BUTONA BASILDIĞINDA ÇALIŞAN FONKSİYON 
  const girisFonksiyon = (e) => {
    e.preventDefault();
    dispatch(girisYap({ email, sifre }));
  };

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin]);

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="container align-content-center vh-100 "
        style={{ width: "400px" }}
      >
        <form onSubmit={girisFonksiyon}>
          <div>
            <h2 className="text-center text-white">Giriş yap</h2>
          </div>

          <div className="row mt-4">
            <div className="col">
              <div className="wave-group">
                <input required type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
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

          <div className="row mt-3">
            <div className="col">
              <div className="wave-group">
                <input required type="password" className="input" value={sifre} onChange={(e) => setSifre(e.target.value)} />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ '--index': 0 }}>Ş</span>
                  <span className="label-char" style={{ '--index': 1 }}>i</span>
                  <span className="label-char" style={{ '--index': 2 }}>f</span>
                  <span className="label-char" style={{ '--index': 3 }}>r</span>
                  <span className="label-char" style={{ '--index': 4 }}>e</span>
                </label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-danger mt-3 rounded-pill"
              style={{ width: "170px" }}
              type="submit"
            >
              {yukleniyor ? "yükleniyor..." : "giriş yap"}
            </button>
          </div>
        </form>

        {hata && (
          <div className="alert alert-warning mt-3 " role="alert">
            <p>{hata}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
