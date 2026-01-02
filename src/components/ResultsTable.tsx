import type { DataPoint } from "../App";

interface ResultsTableProps {
  data: DataPoint[];
  newsCount?: number;
  linesCount?: number;
  urls?: string[];
}

export function ResultsTable({
  data,
  newsCount = 0,
  linesCount = 0,
  urls = [],
}: ResultsTableProps) {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="overflow-x-auto">
      <div className="max-h-[500px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-slate-700 border-b border-slate-200">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-sm text-slate-700 border-b border-slate-200">
                COLCAP
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.date}
                className={`hover:bg-slate-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <td className="px-6 py-3 text-sm text-slate-700 border-b border-slate-100">
                  {formatDate(row.date)}
                </td>
                <td className="px-6 py-3 text-sm text-slate-900 text-right border-b border-slate-100">
                  <span className="inline-flex items-center justify-center min-w-[60px] px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                    {row.colcap.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Resumen y URLs */}
      <div className="mt-4 text-sm text-slate-700">
        <div className="mb-2">
          <strong>Total de URLs mostradas:</strong> {urls.length}
        </div>
        <div className="mb-2">
          <strong>Total de noticias recibidas:</strong> {linesCount}
        </div>
        <div className="mb-2">
          <strong>URLs encontradas ({urls.length}):</strong>
          <ul className="list-disc ml-6 mt-1">
            {urls.map((url, idx) => (
              <li key={url + idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2 text-slate-500 text-center">
          Mostrando {data.length} registros
        </div>
      </div>
    </div>
  );
}
