import React from 'react';

const Sidebar = ({ data, onChange, onStyleChange, onImageUpload }) => {
  const sectionTitleStyle = { fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', marginTop: '1.5rem' };
  const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' };
  const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' };

  return (
    <div>
      {/* Бренд и Картинка */}
      <div style={{ marginTop: 0 }}>
        <label style={labelStyle}>Название бренда</label>
        <input type="text" value={data.brandName} onChange={(e) => onChange('brandName', e.target.value)} style={inputStyle} />
      </div>
      <div>
        <h3 style={sectionTitleStyle}>Главное изображение</h3>
        <label style={{ display: 'block', padding: '1rem', border: '2px dashed #d1d5db', borderRadius: '0.5rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f9fafb', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>📂 Загрузить фото</span>
          <input type="file" accept="image/*" onChange={onImageUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Основной контент */}
      <div>
        <h3 style={sectionTitleStyle}>Тексты</h3>
        <input type="text" placeholder="Заголовок" value={data.title} onChange={(e) => onChange('title', e.target.value)} style={{...inputStyle, marginBottom: '0.5rem'}} />
        <textarea placeholder="Подзаголовок" value={data.subtitle} onChange={(e) => onChange('subtitle', e.target.value)} rows="2" style={{...inputStyle, marginBottom: '0.5rem', resize: 'vertical'}} />
      </div>

      {/* Инструкция (Шаги) */}
      <div>
        <h3 style={sectionTitleStyle}>Инструкция (Шаг 1)</h3>
        <input type="text" placeholder="Заголовок шага" value={data.steps[0].title} onChange={(e) => {
          const newSteps = [...data.steps]; newSteps[0].title = e.target.value; onChange('steps', newSteps);
        }} style={{...inputStyle, marginBottom: '0.5rem'}} />
        <input type="text" placeholder="Описание" value={data.steps[0].desc} onChange={(e) => {
          const newSteps = [...data.steps]; newSteps[0].desc = e.target.value; onChange('steps', newSteps);
        }} style={inputStyle} />
      </div>

      {/* Платежные системы */}
      <div>
        <h3 style={sectionTitleStyle}>Платежные системы (через запятую)</h3>
        <input type="text" value={data.payments.join(', ')} onChange={(e) => onChange('payments', e.target.value.split(', '))} style={inputStyle} />
      </div>

      {/* Таймер и Стили */}
      <div>
        <h3 style={sectionTitleStyle}>Настройки</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input type="checkbox" checked={data.styles.showTimer} onChange={(e) => onStyleChange('showTimer', e.target.checked)} style={{ marginRight: '0.5rem' }} />
          <span style={{ fontSize: '0.875rem' }}>Таймер</span>
        </div>
        <select value={data.styles.fontFamily} onChange={(e) => onStyleChange('fontFamily', e.target.value)} style={inputStyle}>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Montserrat', sans-serif">Montserrat</option>
        </select>
      </div>

      {/* Кнопка и Ссылка */}
      <div>
        <h3 style={sectionTitleStyle}>Кнопка</h3>
        <input type="text" value={data.buttonText} onChange={(e) => onChange('buttonText', e.target.value)} style={{...inputStyle, marginBottom: '0.5rem'}} />
        <input type="text" value={data.offerUrl} onChange={(e) => onChange('offerUrl', e.target.value)} style={{...inputStyle, marginBottom: '0.5rem', color: '#2563eb'}} />
        <input type="color" value={data.buttonColor} onChange={(e) => onChange('buttonColor', e.target.value)} style={{ height: '2.5rem', width: '100%', border: 'none' }} />
      </div>
    </div>
  );
};

export default Sidebar;