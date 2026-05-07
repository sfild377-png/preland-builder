import React, { useState, useEffect } from 'react'; // Добавили useEffect
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


function App() {
  const [currentTemplate, setCurrentTemplate] = useState('casino');

  // Начальные данные (те же самые)
  const initialTemplates = {
    casino: {
      brandName: "VULKAN",
      title: "Бонус 100% + 50 FS!",
      subtitle: "Моментальные выплаты и честная игра.",
      buttonText: "ЗАБРАТЬ БОНУС",
      buttonColor: "#ff4757",
      offerUrl: "https://example.com",
      imageUrl: "",
      features: ["Лицензионный софт", "Выплаты 24/7"],
      reviewName: "Алексей П.",
      reviewText: "Выплатили за 15 минут!",
      footerText: "18+ | Играйте ответственно",
      steps: [
        { title: "Регистрация", desc: "Заполните форму" },
        { title: "Депозит", desc: "Пополните от 500₽" },
        { title: "Бонус", desc: "Получите деньги" }
      ],
      payments: ["Visa", "MasterCard", "Piastrix", "Bitcoin"],
      styles: { fontFamily: "'Roboto', sans-serif", bgColor: "#ffffff", buttonRadius: "12px", showTimer: true, timerMinutes: 10 }
    },
    betting: { 
      brandName: "BET WIN", 
      title: "Фрибет 5000₽!", 
      subtitle: "Ставь без риска.",
      buttonText: "ПОЛУЧИТЬ",
      buttonColor: "#2ecc71",
      offerUrl: "https://example.com",
      imageUrl: "",
      features: ["Высокие кэфы", "Быстрая рег."],
      reviewName: "Олег",
      reviewText: "Норм сайт.",
      footerText: "18+",
      steps: [{ title: "Регистрация", desc: "Заполни" }, { title: "Ставка", desc: "Сделай ставку" }, { title: "Вывод", desc: "Забирай" }],
      payments: ["Visa", "SBP", "Qiwi"],
      styles: { fontFamily: "'Roboto', sans-serif", bgColor: "#ffffff", buttonRadius: "12px", showTimer: false, timerMinutes: 5 }
    },
    crypto: { 
      brandName: "CRYPTO EX", 
      title: "Бонус $100!", 
      subtitle: "Начни торговлю.",
      buttonText: "СТАРТ",
      buttonColor: "#f39c12",
      offerUrl: "https://example.com",
      imageUrl: "",
      features: ["Безопасность", "P2P"],
      reviewName: "Макс",
      reviewText: "Крипта топ.",
      footerText: "18+",
      steps: [{ title: "Аккаунт", desc: "Создай" }, { title: "Депозит", desc: "Внеси" }, { title: "Торговля", desc: "Начни" }],
      payments: ["BTC", "USDT", "ETH", "LTC"],
      styles: { fontFamily: "'Roboto', sans-serif", bgColor: "#ffffff", buttonRadius: "12px", showTimer: true, timerMinutes: 15 }
    }
  };

  // 1. Инициализация состояния с проверкой LocalStorage
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('prelandBuilderData');
    return savedData ? JSON.parse(savedData) : initialTemplates;
  });

  // 2. Автосохранение при любом изменении data
  useEffect(() => {
    localStorage.setItem('prelandBuilderData', JSON.stringify(data));
  }, [data]);

  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [currentTemplate]: { ...prev[currentTemplate], [field]: value }
    }));
  };

  const handleStyleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [currentTemplate]: {
        ...prev[currentTemplate],
        styles: { ...prev[currentTemplate].styles, [field]: value }
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleChange('imageUrl', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const activeData = data[currentTemplate];

  const downloadZIP = async () => {
    const zip = new JSZip();
    
    const cssContent = `
      body { margin: 0; padding: 0; font-family: ${activeData.styles.fontFamily}; background-color: #f3f4f6; }
      .container { max-width: 480px; margin: 0 auto; background: ${activeData.styles.bgColor}; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
      .header { padding: 1rem; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); }
      .logo { font-weight: bold; font-size: 1.5rem; color: #2563eb; }
      .hero { position: relative; height: 200px; overflow: hidden; }
      .hero img { width: 100%; height: 100%; object-fit: cover; }
      .content { padding: 1.5rem; }
      h1 { font-size: 1.75rem; line-height: 1.2; margin: 0 0 1rem 0; color: #111; }
      p { color: #4b5563; line-height: 1.6; margin-bottom: 1.5rem; }
      .features li { padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; list-style: none; }
      .features li:before { content: "✅"; margin-right: 10px; }
      .timer-box { background: #fee2e2; color: #991b1b; padding: 0.75rem; border-radius: 8px; text-align: center; font-weight: bold; margin-bottom: 1.5rem; border: 1px dashed #ef4444; }
      .steps { display: flex; justify-content: space-between; margin-bottom: 2rem; gap: 10px; }
      .step-item { flex: 1; text-align: center; background: #f9fafb; padding: 10px; border-radius: 8px; font-size: 0.8rem; }
      .step-num { font-weight: bold; color: ${activeData.buttonColor}; font-size: 1.2rem; display: block; margin-bottom: 5px; }
      .payments { display: flex; justify-content: center; gap: 15px; margin: 2rem 0; opacity: 0.6; filter: grayscale(100%); }
      .review { background: #f9fafb; padding: 1rem; border-radius: 12px; border: 1px solid #eee; margin-bottom: 2rem; }
      .btn { display: block; width: 100%; background: ${activeData.buttonColor}; color: white; text-align: center; padding: 1.2rem 0; border-radius: ${activeData.styles.buttonRadius}; text-decoration: none; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 0 10px 20px rgba(0,0,0,0.15); border: none; cursor: pointer; }
      .footer { text-align: center; font-size: 0.7rem; color: #9ca3af; margin-top: 1.5rem; padding-bottom: 2rem;}
    `;

    const jsContent = `
      function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          display.textContent = minutes + ":" + seconds;
          if (--timer < 0) { timer = duration; }
        }, 1000);
      }
      window.onload = function () {
        var fiveMinutes = 60 * ${activeData.styles.timerMinutes}, display = document.querySelector('#timer');
        if(display) startTimer(fiveMinutes, display);
      };
    `;

    const fontName = activeData.styles.fontFamily.split(',')[0].replace(/'/g, '').trim();
    const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${activeData.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header"><div class="logo">${activeData.brandName}</div></div>
        <div class="hero"><img src="${activeData.imageUrl || 'placeholder.jpg'}" alt="Offer"></div>
        <div class="content">
            ${activeData.styles.showTimer ? `<div class="timer-box">⏳ Осталось: <span id="timer">${activeData.styles.timerMinutes}:00</span></div>` : ''}
            <h1>${activeData.title}</h1>
            <p>${activeData.subtitle}</p>
            
            <ul class="features">
                ${activeData.features.map(f => `<li>${f}</li>`).join('')}
            </ul>

            <div class="steps">
                ${activeData.steps.map((s, i) => `
                    <div class="step-item">
                        <span class="step-num">${i + 1}</span>
                        <b>${s.title}</b><br>${s.desc}
                    </div>
                `).join('')}
            </div>

            <div class="payments">
                ${activeData.payments.map(p => `<span>${p}</span>`).join(' • ')}
            </div>

            <div class="review">
                <div style="font-weight:bold; margin-bottom:5px;">${activeData.reviewName} ★★★★★</div>
                <div style="font-style:italic; color:#666;">"${activeData.reviewText}"</div>
            </div>

            <a href="${activeData.offerUrl}" class="btn">${activeData.buttonText}</a>
            <div class="footer">
    ${activeData.footerText} <br> 
    <span style="opacity: 0.5; font-size: 0.6rem;">Created with <a href="https://danil-preland.vercel.app" target="_blank" style="color: inherit; text-decoration: none;">Danil Builder</a></span>
</div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
    `;

    zip.file("index.html", htmlContent);
    zip.file("style.css", cssContent);
    zip.file("script.js", jsContent);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${currentTemplate}_landing.zip`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }} className="main-container">
      
      <div className="sidebar-panel" style={{ width: '350px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>🛠 Preland Builder</h1>
          <div style={{ display: 'flex', gap: '0.5rem', background: '#e5e7eb', padding: '0.25rem', borderRadius: '0.5rem' }}>
            {['casino', 'betting', 'crypto'].map(t => (
              <button key={t} onClick={() => setCurrentTemplate(t)} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', backgroundColor: currentTemplate === t ? 'white' : 'transparent', boxShadow: currentTemplate === t ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: currentTemplate === t ? '#2563eb' : '#6b7280' }}>
                {t === 'casino' ? '🎰 Казино' : t === 'betting' ? '⚽ Ставки' : '₿ Крипта'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <Sidebar 
            data={activeData} 
            onChange={handleChange} 
            onStyleChange={handleStyleChange} 
            onImageUpload={handleImageUpload} 
          />
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <button onClick={downloadZIP} style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Скачать ZIP (Готовый сайт)</button>
        </div>
      </div>

      <div className="preview-area" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#e5e7eb' }}>
        <div style={{ position: 'relative', width: '375px', height: '667px', backgroundColor: 'black', borderRadius: '3rem', border: '8px solid #1f2937', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', backgroundColor: 'black', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>
          <div style={{ width: '100%', height: '100%', backgroundColor: activeData.styles.bgColor, overflowY: 'auto' }}>
            <Preview data={activeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;