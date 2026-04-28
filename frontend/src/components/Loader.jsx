import { LoaderCircle } from 'lucide-react';

const Loader = ({ message }) => {
  return (
    <div className="animate-fade-up mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 shadow-inner shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <LoaderCircle className="h-5 w-5 animate-spin text-cyan-300" />
        {message && <p className="text-sm text-slate-300">{message}</p>}
      </div>
    </div>
  );
};

export default Loader;
