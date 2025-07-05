export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-navy-900 dark:to-navy-800">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-gold-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
