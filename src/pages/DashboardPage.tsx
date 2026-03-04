import React, { useMemo, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useChatStore } from '../store/useChatStore';

const DashboardPage: React.FC = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
    conversations,
    currentConversation,
    selectConversation,
    createNewConversation,
  } = useChatStore();

  const [period, setPeriod] = useState('Últimos 7 dias');
  const [market, setMarket] = useState('PNT');
  const [target, setTarget] = useState('Ind 4+');

  const summary = useMemo(
    () => ({
      share_pct: { value: 20.1, delta_pp_vs_prev_period: 0.6, rank: 2, gap_to_3rd_pp: 1.9 },
      rating_points: { value: 4.8, delta_points: 0.2 },
      sellout_pct: { value: 87.0, delta_pp: -3.0 },
      vacancy_pct: { value: 13.0, delta_pp: 3.0 },
      ad_revenue_net_brl: { mtd: 38200000, delta_pct_vs_budget: -2.5, delta_pct_vs_ly: 6.2 },
      yield_ecpm_brl: { value: 74.5, delta_pct: 1.8 },
      contribution_margin_pct: { value: 21.4, delta_pp: 0.9 },
    }),
    []
  );

  const marketShare = useMemo(
    () => [
      { broadcaster: 'Globo', share: 40.2, color: '#2563eb' },
      { broadcaster: 'SBT', share: 20.1, color: '#16a34a' },
      { broadcaster: 'Record', share: 18.2, color: '#9333ea' },
      { broadcaster: 'Band', share: 12.0, color: '#f59e0b' },
      { broadcaster: 'RedeTV!', share: 9.5, color: '#ef4444' },
    ],
    []
  );

  const weeklyTrend = useMemo(
    () => [
      { week: 'W04', Globo: 41.0, SBT: 19.4, Record: 18.0, Band: 12.3, RedeTV: 9.3 },
      { week: 'W05', Globo: 40.6, SBT: 19.7, Record: 18.1, Band: 12.0, RedeTV: 9.6 },
      { week: 'W06', Globo: 40.4, SBT: 19.8, Record: 18.3, Band: 11.8, RedeTV: 9.7 },
      { week: 'W07', Globo: 40.1, SBT: 20.0, Record: 18.2, Band: 12.1, RedeTV: 9.6 },
      { week: 'W08', Globo: 39.8, SBT: 20.1, Record: 18.4, Band: 12.0, RedeTV: 9.7 },
      { week: 'W09', Globo: 40.0, SBT: 20.2, Record: 18.1, Band: 12.1, RedeTV: 9.6 },
      { week: 'W10', Globo: 40.3, SBT: 20.1, Record: 18.0, Band: 12.2, RedeTV: 9.4 },
      { week: 'W11', Globo: 40.2, SBT: 20.1, Record: 18.2, Band: 12.0, RedeTV: 9.5 },
    ],
    []
  );

  const dayparts = useMemo(
    () => [
      { daypart: 'Manhã', SBT: { share: 18.5, points: 3.2 }, Globo: { share: 38.0, points: 6.6 }, Record: { share: 19.0, points: 3.3 }, Band: { share: 13.0, points: 2.3 }, RedeTV: { share: 11.5, points: 2.0 } },
      { daypart: 'Tarde', SBT: { share: 21.2, points: 4.1 }, Globo: { share: 39.5, points: 7.6 }, Record: { share: 17.0, points: 3.3 }, Band: { share: 12.3, points: 2.4 }, RedeTV: { share: 10.0, points: 1.9 } },
      { daypart: 'Prime Time', SBT: { share: 20.8, points: 6.0 }, Globo: { share: 41.0, points: 11.8 }, Record: { share: 18.0, points: 5.2 }, Band: { share: 11.2, points: 3.2 }, RedeTV: { share: 9.0, points: 2.6 } },
    ],
    []
  );

  const inventory = useMemo(
    () => [
      { daypart: 'Manhã', available_seconds: 7200, sold_seconds: 6120, unsold_seconds: 1080, sellout_pct: 85.0 },
      { daypart: 'Tarde', available_seconds: 8400, sold_seconds: 7560, unsold_seconds: 840, sellout_pct: 90.0 },
      { daypart: 'Prime Time', available_seconds: 9000, sold_seconds: 8100, unsold_seconds: 900, sellout_pct: 90.0 },
    ],
    []
  );

  const advertisers = useMemo(
    () => [
      { advertiser: 'Anunciante A', revenue_brl: 4200000, delta_pct_vs_prev: 5.1 },
      { advertiser: 'Anunciante B', revenue_brl: 3100000, delta_pct_vs_prev: -2.2 },
      { advertiser: 'Anunciante C', revenue_brl: 2800000, delta_pct_vs_prev: 1.0 },
    ],
    []
  );

  const programMargin = useMemo(
    () => [
      { program: 'Jornal 1', slot: 'Noite', revenue_brl: 6800000, cost_brl: 4100000, margin_pct: 39.7 },
      { program: 'Variedades', slot: 'Tarde', revenue_brl: 5200000, cost_brl: 3600000, margin_pct: 30.8 },
      { program: 'Reality', slot: 'Prime Time', revenue_brl: 9100000, cost_brl: 7800000, margin_pct: 14.3 },
    ],
    []
  );

  const alerts = useMemo(
    () => [
      { text: 'Prime em PNT caiu 0,3pp vs semana passada', level: 'médio' },
      { text: 'Vacância acima de 12% na Manhã nas próximas 2 semanas', level: 'alto' },
      { text: 'Pacing MTD -2,5% vs meta', level: 'médio' },
    ],
    []
  );

  const fmtPct = (v: number) => `${v.toFixed(1)}%`;
  const fmtBRL = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        conversations={conversations}
        onConversationSelect={selectConversation}
        onNewChat={createNewConversation}
        currentConversationId={currentConversation?.id}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          externalLink="https://openai.com/blog"
          externalLinkText="Link Externo"
          isSidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">Dashboard Gerencial — SBT</h2>
              <div className="ml-auto flex items-center gap-2">
                <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 28 dias</option>
                  <option>Mês atual</option>
                  <option>Custom</option>
                </select>
                <select value={market} onChange={(e) => setMarket(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                  <option>PNT</option>
                  <option>GSP</option>
                  <option>GRJ</option>
                </select>
                <select value={target} onChange={(e) => setTarget(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                  <option>Ind 4+</option>
                  <option>HH</option>
                  <option>A18-49</option>
                  <option>A25-54</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard tone="emerald" title="Share" main={fmtPct(summary.share_pct.value)} sub={`Δ ${summary.share_pct.delta_pp_vs_prev_period.toFixed(1)}pp vs período anterior`} />
              <KpiCard tone="sky" title="Pontos (média)" main={summary.rating_points.value.toFixed(1)} sub={`Δ ${summary.rating_points.delta_points.toFixed(1)} pts`} />
              <KpiCard tone="violet" title="Ranking" main={`#${summary.share_pct.rank}`} sub={`Gap para 3º: ${summary.share_pct.gap_to_3rd_pp.toFixed(1)}pp`} />
              <KpiCard tone="amber" title="Sell-out" main={fmtPct(summary.sellout_pct.value)} sub={`Vacância ${fmtPct(summary.vacancy_pct.value)}`} />
              <KpiCard tone="cyan" title="Receita líquida (MTD)" main={fmtBRL(summary.ad_revenue_net_brl.mtd)} sub={`Pacing: ${summary.ad_revenue_net_brl.delta_pct_vs_budget.toFixed(1)}% vs meta`} />
              <KpiCard tone="indigo" title="Yield eCPM" main={fmtBRL(summary.yield_ecpm_brl.value)} sub={`Δ ${summary.yield_ecpm_brl.delta_pct.toFixed(1)}%`} />
              <KpiCard tone="rose" title="Margem de contribuição" main={fmtPct(summary.contribution_margin_pct.value)} sub={`Δ ${summary.contribution_margin_pct.delta_pp.toFixed(1)}pp`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-sky-200 bg-sky-50/30 hover:bg-sky-100/40 active:bg-sky-100 transition-colors shadow-sm p-4 lg:col-span-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Market share</h3>
                  <span className="text-xs text-gray-500">{market} • {target}</span>
                </div>
                <div className="space-y-3">
                  {marketShare.map((m) => (
                    <div key={m.broadcaster}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{m.broadcaster}</span>
                        <span className="text-gray-900 font-medium">{m.share.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${m.share}%`, backgroundColor: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/30 hover:bg-indigo-100/40 active:bg-indigo-100 transition-colors shadow-sm p-4 lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Trend semanal — Share</h3>
                  <span className="text-xs text-gray-500">{period}</span>
                </div>
                <MiniLineChart data={weeklyTrend} />
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/30 hover:bg-cyan-100/40 active:bg-cyan-100 transition-colors shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Daypart — Share e Pontos</h3>
                <span className="text-xs text-gray-500">{market} • {target}</span>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-gray-600">
                    <tr>
                      <th className="text-left py-2 pr-4">Daypart</th>
                      <th className="text-left py-2 pr-4">SBT</th>
                      <th className="text-left py-2 pr-4">Globo</th>
                      <th className="text-left py-2 pr-4">Record</th>
                      <th className="text-left py-2 pr-4">Band</th>
                      <th className="text-left py-2 pr-4">RedeTV!</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {dayparts.map((d) => (
                      <tr key={d.daypart} className="border-t">
                        <td className="py-2 pr-4 font-medium">{d.daypart}</td>
                        <td className="py-2 pr-4">{d.SBT.share.toFixed(1)}% • {d.SBT.points.toFixed(1)} pts</td>
                        <td className="py-2 pr-4">{d.Globo.share.toFixed(1)}% • {d.Globo.points.toFixed(1)} pts</td>
                        <td className="py-2 pr-4">{d.Record.share.toFixed(1)}% • {d.Record.points.toFixed(1)} pts</td>
                        <td className="py-2 pr-4">{d.Band.share.toFixed(1)}% • {d.Band.points.toFixed(1)} pts</td>
                        <td className="py-2 pr-4">{d.RedeTV.share.toFixed(1)}% • {d.RedeTV.points.toFixed(1)} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 hover:bg-emerald-100/40 active:bg-emerald-100 transition-colors shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Inventário: Vendido vs Vacância</h3>
                  <span className="text-xs text-gray-500">{period}</span>
                </div>
                <div className="space-y-3">
                  {inventory.map((row) => {
                    const soldPct = (row.sold_seconds / row.available_seconds) * 100;
                    const unsoldPct = 100 - soldPct;
                    return (
                      <div key={row.daypart}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{row.daypart}</span>
                          <span className="text-gray-900 font-medium">{soldPct.toFixed(0)}% vendido</span>
                        </div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-green-500" style={{ width: `${soldPct}%` }} />
                          <div className="h-full bg-gray-300" style={{ width: `${unsoldPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50/30 hover:bg-fuchsia-100/40 active:bg-fuchsia-100 transition-colors shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Top Anunciantes</h3>
                  <span className="text-xs text-gray-500">{period}</span>
                </div>
                <div className="overflow-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-gray-600">
                      <tr>
                        <th className="text-left py-2 pr-4">Anunciante</th>
                        <th className="text-left py-2 pr-4">Receita</th>
                        <th className="text-left py-2 pr-4">Δ vs período</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800">
                      {advertisers.map((a) => (
                        <tr key={a.advertiser} className="border-t">
                          <td className="py-2 pr-4">{a.advertiser}</td>
                          <td className="py-2 pr-4">{fmtBRL(a.revenue_brl)}</td>
                          <td className={`py-2 pr-4 ${a.delta_pct_vs_prev >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {a.delta_pct_vs_prev.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/30 hover:bg-amber-100/40 active:bg-amber-100 transition-colors shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Margem por Programa</h3>
                  <span className="text-xs text-gray-500">{period}</span>
                </div>
                <div className="overflow-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-gray-600">
                      <tr>
                        <th className="text-left py-2 pr-4">Programa</th>
                        <th className="text-left py-2 pr-4">Slot</th>
                        <th className="text-left py-2 pr-4">Receita</th>
                        <th className="text-left py-2 pr-4">Custo</th>
                        <th className="text-left py-2 pr-4">Margem</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800">
                      {programMargin.map((p) => (
                        <tr key={p.program} className="border-t">
                          <td className="py-2 pr-4">{p.program}</td>
                          <td className="py-2 pr-4">{p.slot}</td>
                          <td className="py-2 pr-4">{fmtBRL(p.revenue_brl)}</td>
                          <td className="py-2 pr-4">{fmtBRL(p.cost_brl)}</td>
                          <td className="py-2 pr-4">{fmtPct(p.margin_pct)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50/30 hover:bg-rose-100/40 active:bg-rose-100 transition-colors shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Alertas</h3>
                  <span className="text-xs text-gray-500">{period}</span>
                </div>
                <ul className="space-y-2">
                  {alerts.map((a, i) => (
                    <li key={i} className="flex items-center justify-between rounded-md border border-rose-100 bg-rose-50/60 hover:bg-rose-100/60 active:bg-rose-100 transition-colors px-3 py-2">
                      <span className="text-sm text-gray-800">{a.text}</span>
                      <span className={`text-xs font-medium ${a.level === 'alto' ? 'text-red-600' : 'text-yellow-600'}`}>{a.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

type TrendPoint = { week: string; Globo: number; SBT: number; Record: number; Band: number; RedeTV: number };

const MiniLineChart = ({ data }: { data: TrendPoint[] }) => {
  const width = 600;
  const height = 180;
  const padding = 24;
  const xs = data.map((_, i) => i);
  const maxY = Math.max(...data.flatMap((d) => [d.Globo, d.SBT, d.Record, d.Band, d.RedeTV]));
  const minY = Math.min(...data.flatMap((d) => [d.Globo, d.SBT, d.Record, d.Band, d.RedeTV]));
  const xScale = (i: number) => padding + (i * (width - padding * 2)) / (data.length - 1);
  const yScale = (v: number) => height - padding - ((v - minY) * (height - padding * 2)) / (maxY - minY || 1);
  const series = [
    { key: 'Globo' as const, color: '#2563eb' },
    { key: 'SBT' as const, color: '#16a34a' },
    { key: 'Record' as const, color: '#9333ea' },
    { key: 'Band' as const, color: '#f59e0b' },
    { key: 'RedeTV' as const, color: '#ef4444' },
  ];
  const pathFor = (key: keyof TrendPoint) =>
    xs.map((i, idx) => `${idx === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale((data[i] as any)[key])}`).join(' ');
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44">
        <rect x="0" y="0" width={width} height={height} fill="white" />
        {series.map((s) => (
          <path key={s.key as string} d={pathFor(s.key as any)} fill="none" stroke={s.color} strokeWidth={2} />
        ))}
      </svg>
      <div className="flex flex-wrap gap-3 mt-2">
        {series.map((s) => (
          <div key={s.key as string} className="flex items-center gap-2 text-xs text-gray-700">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.key}
          </div>
        ))}
      </div>
    </div>
  );
};

const toneMap: Record<string, { border: string; bg: string; hover: string; active: string }> = {
  emerald: { border: 'border-emerald-200', bg: 'bg-emerald-50/40', hover: 'hover:bg-emerald-100/50', active: 'active:bg-emerald-100' },
  sky: { border: 'border-sky-200', bg: 'bg-sky-50/40', hover: 'hover:bg-sky-100/50', active: 'active:bg-sky-100' },
  violet: { border: 'border-violet-200', bg: 'bg-violet-50/40', hover: 'hover:bg-violet-100/50', active: 'active:bg-violet-100' },
  amber: { border: 'border-amber-200', bg: 'bg-amber-50/40', hover: 'hover:bg-amber-100/50', active: 'active:bg-amber-100' },
  cyan: { border: 'border-cyan-200', bg: 'bg-cyan-50/40', hover: 'hover:bg-cyan-100/50', active: 'active:bg-cyan-100' },
  indigo: { border: 'border-indigo-200', bg: 'bg-indigo-50/40', hover: 'hover:bg-indigo-100/50', active: 'active:bg-indigo-100' },
  rose: { border: 'border-rose-200', bg: 'bg-rose-50/40', hover: 'hover:bg-rose-100/50', active: 'active:bg-rose-100' },
};

const KpiCard = ({ title, main, sub, tone = 'emerald' }: { title: string; main: string; sub?: string; tone?: keyof typeof toneMap }) => {
  const t = toneMap[tone] || toneMap.emerald;
  return (
    <div className={`rounded-2xl border ${t.border} ${t.bg} ${t.hover} ${t.active} transition-colors shadow-sm p-4`}>
      <div className="text-xs text-gray-600">{title}</div>
      <div className="text-2xl font-semibold text-gray-900 mt-1">{main}</div>
      {sub ? <div className="text-xs text-gray-600 mt-1">{sub}</div> : null}
    </div>
  );
};
