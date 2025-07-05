export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-white/60 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Wang Ye. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
