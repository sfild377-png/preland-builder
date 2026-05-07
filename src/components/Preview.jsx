import React from 'react';

const Preview = ({ data }) => {
  return (
    <div style={{ backgroundColor: data.styles.bgColor, minHeight: '100%', fontFamily: data.styles.fontFamily, paddingBottom: '2rem', color: '#1f2937' }}>
      <div style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#2563eb' }}>{data.brandName.toUpperCase()}</div>
      </div>

      <div style={{ width: '100%', height: '12rem', backgroundColor: '#f3f4f6', position: 'relative', overflow: 'hidden' }}>
        <img src={data.imageUrl || 'https://via.placeholder.com/300x200'} alt="Offer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ padding: '1.5rem' }}>
        {data.styles.showTimer && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⏳ Осталось: {data.styles.timerMinutes}:00
          </div>
        )}

        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 0.5rem 0' }}>{data.title}</h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>{data.subtitle}</p>

        {/* Инструкция */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '1.5rem' }}>
          {data.steps.map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', background: '#f9fafb', padding: '10px', borderRadius: '8px', fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 'bold', color: data.buttonColor, fontSize: '1.2rem', display: 'block' }}>{i + 1}</span>
              <b>{s.title}</b><br/><span style={{opacity: 0.7}}>{s.desc}</span>
            </div>
          ))}
        </div>

        {/* Платежки */}
        <div style={{ textAlign: 'center', margin: '1.5rem 0', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>
          {data.payments.join(' • ')}
        </div>

        <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{data.reviewName} ★★★★★</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', fontStyle: 'italic' }}>"{data.reviewText}"</div>
        </div>

        <a href={data.offerUrl} style={{ display: 'block', width: '100%', backgroundColor: data.buttonColor, color: 'white', textAlign: 'center', padding: '1rem', borderRadius: data.styles.buttonRadius, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', textTransform: 'uppercase', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          {data.buttonText}
        </a>
        
        <p style={{ textAlign: 'center', fontSize: '0.625rem', opacity: 0.6, marginTop: '1rem' }}>{data.footerText}</p>
      </div>
    </div>
  );
};

export default Preview;