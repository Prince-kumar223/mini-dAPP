import { useState } from 'react';
import { Activity, ShieldCheck, Sparkles } from 'lucide-react';
import WalletConnect from './components/WalletConnect';
import CreateFeedback from './components/CreateFeedback';
import GetFeedback from './components/GetFeedback';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = (pubKey) => {
    if (pubKey) {
      setIsConnected(true);
      setWalletAddress(pubKey);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04050d] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_24%)]" />
        <div className="absolute -left-16 top-12 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-float-slow" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-float-medium" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl animate-float-slow [animation-delay:-5s]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Stellar Soroban dApp
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Decentralized Feedback System
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Submit and fetch anonymous feedback through a polished wallet-first interface designed for calm, high-clarity Web3 flows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-400/12 p-2 text-cyan-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Wallet</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {isConnected ? 'Connected' : 'Awaiting connection'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-violet-400/12 p-2 text-violet-300">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Network</p>
                  <p className="mt-1 text-sm font-medium text-white">Stellar Testnet</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="space-y-6">
            <WalletConnect onConnect={handleConnect} />
            <CreateFeedback isConnected={isConnected} walletAddress={walletAddress} />
          </div>

          <div>
            <GetFeedback />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
