import { useState, useEffect } from 'react';

const greetings = ["Hoşgeldin", "Welcome", "أهلاً وسهلاً", "Bienvenido", "Bienvenue"];

const WelcomeAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Scroll engelleme
    document.body.style.overflow = 'hidden';

    // Metinleri sırayla daha yavaş ve premium hissiyatla değiştir
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(textInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400); // 400ms her kelime için daha okunabilir

    // 2.4 saniye sonra TikTok swipe-up efekti ile çıkış animasyonunu başlat
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = 'unset';
    }, 2400);

    // Animasyon bittikten sonra DOM'dan tamamen kaldır (2.4s + 0.8s)
    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => {
      clearInterval(textInterval);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`welcome-overlay ${isExiting ? 'welcome-exiting' : 'welcome-entering'}`}>
      <div className="welcome-text-container d-flex align-items-center gap-3">
        <div className="welcome-dot"></div>
        <h1 
          className="welcome-text m-0" 
          key={textIndex} 
          style={{ animation: "fadeText 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {greetings[textIndex]}
        </h1>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
