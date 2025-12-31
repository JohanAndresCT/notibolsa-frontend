
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DataPoint } from '../App';


interface ResultsChartProps {
  data: DataPoint[];
}

export function NoticiasChart({ data }: ResultsChartProps) {
  console.log('Render NoticiasChart', data);
  if (data.length === 1) {
    console.log('[NoticiasChart] Renderizando BarChart, data:', data);
    return (
      <div style={{ width: 400, height: 300, background: '#fff', border: '1px solid #000' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis domain={[0, data[0].news * 1.2 || 10]} tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'Noticias', angle: -90, position: 'insideLeft', fill: '#3b82f6' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }} labelStyle={{ color: '#1e293b' }} />
            <Bar dataKey="news" fill="#3b82f6" name="Noticias" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  if (data.length > 1) {
    console.log('[NoticiasChart] Renderizando LineChart, data:', data);
  }
  // Gráfico de líneas si hay más de un dato
  return (
    <div style={{ width: 400, height: 300, background: '#fff', border: '1px solid #000' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'Noticias', angle: -90, position: 'insideLeft', fill: '#3b82f6' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }} labelStyle={{ color: '#1e293b' }} />
          <Line type="monotone" dataKey="news" stroke="#3b82f6" strokeWidth={2} name="Noticias" dot={{ fill: '#3b82f6', r: 10 }} activeDot={{ r: 15 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ColcapChart({ data }: ResultsChartProps) {
  console.log('Render ColcapChart', data);
  if (data.length === 0) {
    console.log('[ColcapChart] Sin datos para mostrar');
    // Mostrar mensaje si no hay datos
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
        No hay datos disponibles para COLCAP.
      </div>
    );
  }
  if (data.length === 1) {
    console.log('[ColcapChart] Renderizando BarChart, data:', data);
    // Mostrar barra si solo hay un dato.
    return (
      <div style={{ width: 400, height: 300, background: '#fff', border: '1px solid #000' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis domain={[0, data[0].colcap * 1.2 || 10]} tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'COLCAP', angle: -90, position: 'insideLeft', fill: '#10b981' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }} labelStyle={{ color: '#1e293b' }} />
            <Bar dataKey="colcap" fill="#10b981" name="COLCAP" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  if (data.length > 1) {
    console.log('[ColcapChart] Renderizando LineChart, data:', data);
  }
    // Gráfico de líneas si hay más de un dato
    return (
      <div style={{ width: 400, height: 300, background: '#fff', border: '1px solid #000' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'COLCAP', angle: -90, position: 'insideLeft', fill: '#10b981' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }} labelStyle={{ color: '#1e293b' }} />
            <Line type="monotone" dataKey="colcap" stroke="#10b981" strokeWidth={2} name="COLCAP" dot={{ fill: '#10b981', r: 10 }} activeDot={{ r: 15 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
 }

