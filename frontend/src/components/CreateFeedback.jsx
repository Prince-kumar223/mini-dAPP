import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  MessageSquarePlus,
  Sparkles,
} from 'lucide-react';
import Loader from './Loader';
import { createFeedbackEntry } from '../lib/feedbackStore';

const CreateFeedback = ({ isConnected }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessId(null);

    if (!isConnected) {
      setError('Please connect your wallet first.');
      return;
    }

    if (!feedbackText.trim()) {
      setError('Feedback cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      // Real contract call logic would go here:
      // import { Contract, xdr } from '@stellar/stellar-sdk';
      // import { signTransaction } from '@stellar/freighter-api';
      // const contract = new Contract(CONTRACT_ID);
      // const tx = ... build transaction to call `create_feedback` ...
      // const signedTx = await signTransaction(tx.toXDR(), "TESTNET");
      // await submitTransaction(signedTx);

      await new Promise((resolve) => setTimeout(resolve, 900));
      const generatedId = createFeedbackEntry(feedbackText.trim());

      setSuccessId(generatedId);
      setFeedbackText('');
    } catch (err) {
      setError('Transaction failed. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
            <MessageSquarePlus className="h-3.5 w-3.5" />
            Submit Feedback
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Create a new feedback entry</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
            Draft your message, trigger wallet approval, and receive a generated feedback ID after confirmation.
          </p>
        </div>

        <div className="hidden rounded-2xl bg-white/5 p-3 text-violet-300 shadow-inner shadow-black/20 sm:block">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your feedback here..."
          className="min-h-32 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/20 outline-none transition duration-200 focus:border-cyan-400/40 focus:bg-black/30 focus:ring-4 focus:ring-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-60"
          rows="3"
          disabled={loading}
        />

        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
          <span>{isConnected ? 'Wallet connected. Ready for submission.' : 'Connect your wallet before submitting.'}</span>
          <span>{feedbackText.trim().length} chars</span>
        </div>

        {error && (
          <div className="animate-fade-up flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
            <p>{error}</p>
          </div>
        )}

        {successId && (
          <div className="animate-fade-up rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-50 shadow-[0_16px_40px_rgba(16,185,129,0.12)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <div>
                  <p className="font-medium text-white">Feedback created successfully.</p>
                  <p className="mt-1 text-emerald-100/80">
                    Your submission is ready to be referenced with the generated ID below.
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
                ID {successId}
              </span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !feedbackText.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-[0_18px_38px_rgba(79,70,229,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(45,212,191,0.28)] active:scale-[0.99] disabled:cursor-not-allowed disabled:from-slate-700 disabled:via-slate-700 disabled:to-slate-600 disabled:text-slate-400 disabled:shadow-none"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <MessageSquarePlus className="h-4 w-4" />
              Create Feedback
            </>
          )}
        </button>
      </form>

      {loading && <Loader message="Waiting for wallet approval and network confirmation..." />}
    </section>
  );
};

export default CreateFeedback;
