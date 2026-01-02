import { useState } from "react";
import { Header } from "./components/Header";
import { SearchPanel } from "./components/SearchPanel";
import { NoticiasChart, ColcapChart } from "./components/ResultsChart";
import { ResultsTable } from "./components/ResultsTable";
import { Footer } from "./components/Footer";
import { Loader2 } from "lucide-react";

export interface DataPoint {
  date: string;
  news: number;
  colcap: number;
}

/// <reference types="vite/client" />
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [term, setTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const [crawlId, setCrawlId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState<DataPoint[]>([]);
  const [newsCount, setNewsCount] = useState(0);
  const [linesCount, setLinesCount] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!term.trim()) {
      setError("Por favor ingresa un término (dominio)");
      return;
    }
    if (!crawlId) {
      setError("Por favor selecciona un Crawl ID");
      return;
    }
    if (!start || !end) {
      setError("Por favor selecciona las fechas de inicio y fin");
      return;
    }

    setLoading(true);
    setError("");
    setData([]);

    try {
      const params = new URLSearchParams({
        term,
        keyword,
        index: crawlId,
        start,
        end,
      });

      console.log(
        "Enviando consulta al backend:",
        `${API_URL}/aggregate?${params}`,
      );
      const response = await fetch(`${API_URL}/aggregate?${params}`);
      console.log("Respuesta HTTP:", response.status, response.statusText);

      if (!response.ok) {
        console.error(
          "Error HTTP al obtener los datos:",
          response.status,
          response.statusText,
        );
        throw new Error("Error al obtener los datos");
      }

      const result = await response.json();
      console.log("Respuesta JSON del backend:", result);

      // --- Usar el array combinado del backend si existe ---
      let newsCount = 0;
      let linesCount = 0;
      let urls: string[] = [];
      let combined: DataPoint[] = [];

      if (Array.isArray(result.combined)) {
        combined = result.combined;
        newsCount =
          typeof result.commoncrawl?.count === "number"
            ? result.commoncrawl.count
            : combined.reduce((acc, item) => acc + (item.news || 0), 0);
        linesCount =
          typeof result.commoncrawl?.lines_count === "number"
            ? result.commoncrawl.lines_count
            : newsCount;
      } else {
        // Fallback: lógica anterior si el backend no entrega 'combined'
        let noticiasArr: { date: string; news: number }[] = [];
        if (result.commoncrawl?.date_ranges_counts) {
          noticiasArr = result.commoncrawl.date_ranges_counts.map(
            ([date, news]: [string, number]) => ({ date, news }),
          );
        }
        if (result.commoncrawl) {
          if (result.commoncrawl.matching_urls) {
            urls = Array.isArray(result.commoncrawl.matching_urls)
              ? result.commoncrawl.matching_urls
              : [];
            newsCount =
              typeof result.commoncrawl.count === "number"
                ? result.commoncrawl.count
                : urls.length;
            linesCount =
              typeof result.commoncrawl.lines_count === "number"
                ? result.commoncrawl.lines_count
                : newsCount;
          } else {
            newsCount =
              typeof result.commoncrawl.news_count === "number"
                ? result.commoncrawl.news_count
                : 0;
            linesCount =
              typeof result.commoncrawl.lines_count === "number"
                ? result.commoncrawl.lines_count
                : newsCount;
          }
        } else {
          if (result.matching_urls) {
            urls = Array.isArray(result.matching_urls)
              ? result.matching_urls
              : [];
            newsCount =
              typeof result.count === "number" ? result.count : urls.length;
            linesCount = newsCount;
          } else if (typeof result.news_count === "number") {
            newsCount = result.news_count;
            linesCount = newsCount;
          }
        }
        const colcapArr: { date: string; colcap: number }[] = Array.isArray(
          result.colcap,
        )
          ? result.colcap.map((item: { date: string; value: number }) => ({
              date: item.date,
              colcap: item.value,
            }))
          : [];
        const noticiasMap = new Map<string, number>(
          noticiasArr.map((item) => [item.date, item.news]),
        );
        const colcapMap = new Map<string, number>(
          colcapArr.map((item) => [item.date, item.colcap]),
        );
        const allDates = Array.from(
          new Set([
            ...noticiasArr.map((item) => item.date),
            ...colcapArr.map((item) => item.date),
          ]),
        ).sort();
        combined = allDates.map((date: string) => ({
          date,
          news: noticiasMap.get(date) ?? 0,
          colcap:
            typeof colcapMap.get(date) === "number" ? colcapMap.get(date)! : 0,
        }));
      }
      if (result.commoncrawl && result.commoncrawl.matching_urls) {
        urls = Array.isArray(result.commoncrawl.matching_urls)
          ? result.commoncrawl.matching_urls
          : [];
      }
      // Eliminada la simulación de dos puntos, solo se muestran datos reales
      console.log("Datos combinados para mostrar:", combined);
      setData(combined);
      setNewsCount(newsCount);
      setLinesCount(linesCount);
      setUrls(urls);
    } catch (err) {
      console.error("Error en la consulta:", err);
      setError("No se pudo conectar con el backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <SearchPanel
          term={term}
          keyword={keyword}
          crawlId={crawlId}
          start={start}
          end={end}
          onTermChange={setTerm}
          onKeywordChange={setKeyword}
          onCrawlIdChange={setCrawlId}
          onStartChange={setStart}
          onEndChange={setEnd}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600">Analizando datos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {data.length > 0 && !loading && (
          <>
            {/* <pre style={{background:'#f3f4f6', color:'#1e293b', padding:'8px', borderRadius:'6px', marginBottom:'12px'}}>{JSON.stringify(data, null, 2)}</pre> */}
            <div className="mt-12 space-y-8">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-slate-800 mb-6">Análisis Comparativo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div
                    style={{
                      display: "flex",
                      gap: "32px",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <h3 className="text-blue-700 mb-2">Noticias</h3>
                      <NoticiasChart data={data} linesCount={linesCount} />
                    </div>
                    <div>
                      <h3 className="text-emerald-700 mb-2">COLCAP</h3>
                      <ColcapChart data={data} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-slate-800 mb-6">Datos Detallados</h2>
                <ResultsTable
                  data={data}
                  newsCount={newsCount}
                  linesCount={linesCount}
                  urls={urls}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
