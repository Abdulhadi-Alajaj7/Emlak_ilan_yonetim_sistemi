import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { girisYap } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import loginBg from "../images/loginBg.jpg";

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

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="mail" className="text-white">mail</label>
                <input
                  className="form-control rounded-pill "
                  type="email"
                  placeholder="email"
                  id="mail"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="sifre" className="text-white">şifre</label>
                <input
                  className="form-control rounded-pill"
                  type="password"
                  placeholder="şifre"
                  id="sifre"
                  required
                  onChange={(e) => setSifre(e.target.value)}
                />
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
