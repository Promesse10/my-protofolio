import React, { useEffect, useRef } from 'react';

const ShootingStars = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class ShootingStar {
      constructor(isLongLine = false, color = isDarkMode ? 'white' : 'black') {
        this.isLongLine = isLongLine;
        this.color = color;
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = this.isLongLine ? (Math.random() < 0.5 ? 0 : canvas.height) : Math.random() * canvas.height;
        this.length = this.isLongLine ? Math.max(canvas.width, canvas.height) : Math.random() * 80 + 10;
        this.speed = this.isLongLine ? 0.5 : Math.random() * 10 + 5;
        this.angle = this.isLongLine ? Math.atan2(canvas.height / 2 - this.y, canvas.width / 2 - this.x) : Math.random() * Math.PI * 2;
        this.opacity = 0;
        this.fadeIn = true;
        this.width = this.isLongLine ? 3 : Math.random() * 2 + 1;
        this.glowSize = this.isLongLine ? 10 : 5;
        this.active = this.isLongLine;
      }

      update() {
        if (!this.active) return;

        if (this.fadeIn) {
          this.opacity += 0.01;
          if (this.opacity >= 1) {
            this.fadeIn = false;
          }
        } else {
          this.opacity -= 0.01;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.opacity <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
        ctx.stroke();

        ctx.shadowBlur = this.glowSize;
        ctx.shadowColor = this.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    const stars = [];
    const longLines = [
      new ShootingStar(true, isDarkMode ? 'white' : 'black'),
      new ShootingStar(true, isDarkMode ? 'white' : 'black'),
      new ShootingStar(true, '#00a2e3'),
      new ShootingStar(true, '#00a2e3')
    ];
    const totalStars = 20;

    for (let i = 0; i < totalStars; i++) {
      stars.push(new ShootingStar());
    }

    let lastLongLineToggle = 0;
    let lastSmallLineToggle = 0;
    const longLineInterval = 120000;
    const smallLineInterval = 120000;

    function animate(currentTime) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentTime - lastLongLineToggle > longLineInterval) {
        longLines.forEach(line => {
          line.fadeIn = !line.fadeIn;
          if (line.fadeIn) {
            line.reset();
          }
        });
        lastLongLineToggle = currentTime;
      }

      if (currentTime - lastSmallLineToggle > smallLineInterval) {
        stars.forEach(star => {
          star.active = !star.active;
          if (star.active) {
            star.reset();
          }
        });
        lastSmallLineToggle = currentTime;
      }

      longLines.forEach(line => {
        line.update();
        line.draw();
      });

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    }

    animate(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

export default ShootingStars;

