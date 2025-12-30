
import { Search } from 'lucide-react';

const CC_INDICES = [
  "CC-MAIN-2008-2009", "CC-MAIN-2009-2010",
  "CC-MAIN-2012", "CC-MAIN-2013-20", "CC-MAIN-2013-48",
  "CC-MAIN-2014-10", "CC-MAIN-2014-15", "CC-MAIN-2014-23",
  "CC-MAIN-2014-35", "CC-MAIN-2014-41", "CC-MAIN-2014-42",
  "CC-MAIN-2014-49", "CC-MAIN-2014-52",
  "CC-MAIN-2015-06", "CC-MAIN-2015-11", "CC-MAIN-2015-14",
  "CC-MAIN-2015-18", "CC-MAIN-2015-22", "CC-MAIN-2015-27",
  "CC-MAIN-2015-35", "CC-MAIN-2015-40", "CC-MAIN-2015-48",
  "CC-MAIN-2016-07", "CC-MAIN-2016-18", "CC-MAIN-2016-22",
  "CC-MAIN-2016-26", "CC-MAIN-2016-30", "CC-MAIN-2016-36",
  "CC-MAIN-2016-40", "CC-MAIN-2016-44", "CC-MAIN-2016-50",
  "CC-MAIN-2017-04", "CC-MAIN-2017-09", "CC-MAIN-2017-13",
  "CC-MAIN-2017-17", "CC-MAIN-2017-22", "CC-MAIN-2017-26",
  "CC-MAIN-2017-30", "CC-MAIN-2017-34", "CC-MAIN-2017-39",
  "CC-MAIN-2017-43", "CC-MAIN-2017-47", "CC-MAIN-2017-51",
  "CC-MAIN-2018-05", "CC-MAIN-2018-09", "CC-MAIN-2018-13",
  "CC-MAIN-2018-17", "CC-MAIN-2018-22", "CC-MAIN-2018-26",
  "CC-MAIN-2018-30", "CC-MAIN-2018-34", "CC-MAIN-2018-39",
  "CC-MAIN-2018-43", "CC-MAIN-2018-47", "CC-MAIN-2018-51",
  "CC-MAIN-2019-04", "CC-MAIN-2019-09", "CC-MAIN-2019-13",
  "CC-MAIN-2019-18", "CC-MAIN-2019-22", "CC-MAIN-2019-26",
  "CC-MAIN-2019-30", "CC-MAIN-2019-35", "CC-MAIN-2019-39",
  "CC-MAIN-2019-43", "CC-MAIN-2019-47", "CC-MAIN-2019-51",
  "CC-MAIN-2020-05", "CC-MAIN-2020-10", "CC-MAIN-2020-16",
  "CC-MAIN-2020-24", "CC-MAIN-2020-29", "CC-MAIN-2020-34",
  "CC-MAIN-2020-40", "CC-MAIN-2020-45", "CC-MAIN-2020-50",
  "CC-MAIN-2021-04", "CC-MAIN-2021-10", "CC-MAIN-2021-17",
  "CC-MAIN-2021-21", "CC-MAIN-2021-25", "CC-MAIN-2021-31",
  "CC-MAIN-2021-39", "CC-MAIN-2021-43", "CC-MAIN-2021-49",
  "CC-MAIN-2022-05", "CC-MAIN-2022-21", "CC-MAIN-2022-27",
  "CC-MAIN-2022-33", "CC-MAIN-2022-40", "CC-MAIN-2022-49",
  "CC-MAIN-2023-06", "CC-MAIN-2023-14", "CC-MAIN-2023-23",
  "CC-MAIN-2023-40", "CC-MAIN-2023-50",
  "CC-MAIN-2024-10", "CC-MAIN-2024-18", "CC-MAIN-2024-22",
  "CC-MAIN-2024-26", "CC-MAIN-2024-30", "CC-MAIN-2024-33",
  "CC-MAIN-2024-38", "CC-MAIN-2024-42", "CC-MAIN-2024-46",
  "CC-MAIN-2024-51",
  "CC-MAIN-2025-05", "CC-MAIN-2025-08", "CC-MAIN-2025-13",
  "CC-MAIN-2025-18", "CC-MAIN-2025-21", "CC-MAIN-2025-26",
  "CC-MAIN-2025-30", "CC-MAIN-2025-33", "CC-MAIN-2025-38",
  "CC-MAIN-2025-43", "CC-MAIN-2025-47", "CC-MAIN-2025-51"
];

interface SearchPanelProps {
  term: string;
  keyword: string;
  crawlId: string;
  start: string;
  end: string;
  onTermChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onCrawlIdChange: (value: string) => void;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}


export function SearchPanel({
  term,
  keyword,
  crawlId,
  start,
  end,
  onTermChange,
  onKeywordChange,
  onCrawlIdChange,
  onStartChange,
  onEndChange,
  onAnalyze,
  loading
}: SearchPanelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-slate-800 mb-6">Panel de Búsqueda</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label htmlFor="term" className="block text-sm text-slate-700 mb-2">
              Término (dominio)
            </label>
            <input
              id="term"
              type="text"
              value={term}
              onChange={(e) => onTermChange(e.target.value)}
              placeholder="univalle.edu.co"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="keyword" className="block text-sm text-slate-700 mb-2">
              Palabra clave
            </label>
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              placeholder="biblioteca"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="crawlId" className="block text-sm text-slate-700 mb-2">
              Crawl ID
            </label>
            <select
              id="crawlId"
              value={crawlId}
              onChange={(e) => onCrawlIdChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              disabled={loading}
            >
              <option value="">Selecciona un Crawl ID</option>
              {CC_INDICES.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="start" className="block text-sm text-slate-700 mb-2">
              Fecha inicio
            </label>
            <input
              id="start"
              type="date"
              value={start}
              onChange={(e) => onStartChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="end" className="block text-sm text-slate-700 mb-2">
              Fecha fin
            </label>
            <input
              id="end"
              type="date"
              value={end}
              onChange={(e) => onEndChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Analizar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
