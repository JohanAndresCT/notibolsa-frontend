import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-emerald-400" />
          <h1 className="text-white">NotiBolsa</h1>
        </div>
        <p className="text-slate-300 text-sm md:text-base">
          Análisis de noticias y mercado financiero
        </p>
      </div>
    </header>
  );
}
