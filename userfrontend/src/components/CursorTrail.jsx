import { useEffect } from 'react';

const CursorTrail = () => {
  useEffect(() => {
    // Sadece masaüstü cihazlarda çalışsın (mobil performansını etkilememesi için)
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const createDot = (x, y, color) => {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.backgroundColor = color; // Dinamik renk
      
      document.body.appendChild(dot);

      // CSS animasyonu bitince (0.8s) elementi DOM'dan temizle
      setTimeout(() => {
        dot.remove();
      }, 800);
    };

    const handleMouseMove = (e) => {
      // İki nokta arasındaki mesafeyi ölç 
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      
      // Mesafeyi 3px'e düşürdük, adeta bir çizgi çekecek kadar yoğunlaşacak
      if (dist > 3) { 
        lastX = e.clientX;
        lastY = e.clientY;
        
        if (!isDrawing) {
          requestAnimationFrame(() => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            // Temaya göre ana nota rengi (Dark: Mavi, Light: Kırmızı)
            let dotColor = isDark ? '#0d6efd' : '#dc3545';
            
            // Eğer butonların veya renkli arka planların üzerine gelirse rengi siyaha çevir
            if (e.target && e.target.closest) {
              const isOverPrimaryArea = e.target.closest('.btn, .btn-primary, .btn-danger, .bg-primary-custom, .text-primary-custom, .icon');
              if (isOverPrimaryArea) {
                dotColor = '#000000'; // Özel renkli alanlarda siyah nota üret
              }
            }

            createDot(e.clientX, e.clientY, dotColor);
            isDrawing = false;
          });
          isDrawing = true;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null; // Sadece arka planda mantık çalıştıran bileşen
};

export default CursorTrail;
