export function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-400 py-6 mt-12">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <p className="text-sm">
          Proyecto académico – NotiBolsa © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
