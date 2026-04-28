import { Fingerprint, MessageSquare } from 'lucide-react';

const FeedbackDisplay = ({ id, text }) => {
  return (
    <div className="animate-fade-up mt-5 overflow-hidden rounded-[26px] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-slate-950/40 to-violet-500/10 p-5 shadow-[0_20px_50px_rgba(8,47,73,0.22)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
          <Fingerprint className="h-3.5 w-3.5" />
          Feedback ID
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-sm font-semibold text-white">
          {id}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
        <MessageSquare className="h-4 w-4 text-violet-300" />
        <span>Feedback Display</span>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-100 sm:text-base">{text}</p>
    </div>
  );
};

export default FeedbackDisplay;
