export function groupByYear(items) {
  const map = {};
  for (const it of items) {
    const y = Number(it.date);
    if (!map[y]) map[y] = [];
    map[y].push(it);
  }
  return map;
}

export function totalsByYear(items) {
  const byYear = groupByYear(items);
  const res = [];
  for (const y of Object.keys(byYear).sort()) {
    const twh = byYear[y].reduce((sum, it) => sum + Number(it.generation_twh || 0), 0);
    res.push({ year: Number(y), twh });
  }
  return res;
}

export function topSeriesByShare(items, n = 5) {
  const totals = {};
  const counts = {};
  for (const it of items) {
    const s = String(it.series);
    totals[s] = (totals[s] || 0) + Number(it.share_of_generation_pct || 0);
    counts[s] = (counts[s] || 0) + 1;
  }
  const avg = Object.entries(totals).map(([series, sum]) => ({ series, avg: sum / (counts[series] || 1) }));
  avg.sort((a, b) => b.avg - a.avg);
  return avg.slice(0, n).map((x) => x.series);
}

export function buildStackData(items, seriesTop) {
  const byYear = groupByYear(items);
  const years = Object.keys(byYear).sort();
  const stacks = seriesTop.map(() => []);
  const idx = new Map(seriesTop.map((s, i) => [s, i]));
  for (const y of years) {
    const list = byYear[y];
    const accum = {};
    for (const it of list) {
      const i = idx.get(String(it.series));
      if (i === undefined) continue;
      accum[i] = (accum[i] || 0) + Number(it.share_of_generation_pct || 0);
    }
    for (let i = 0; i < stacks.length; i++) {
      stacks[i].push({ year: Number(y), share: accum[i] ? accum[i] : 0 });
    }
  }
  return stacks;
}

export function pieDataForYear(list = []) {
  const res = [];
  for (const it of list) {
    res.push({ series: String(it.series), value: Number(it.share_of_generation_pct || 0) });
  }
  res.sort((a, b) => b.value - a.value);
  return res.slice(0, 7);
}

export function trendStats(series) {
  if (!series.length) return { min: 0, max: 0, avg: 0 };
  let min = Infinity, max = -Infinity, sum = 0;
  for (const it of series) {
    min = Math.min(min, it.twh);
    max = Math.max(max, it.twh);
    sum += it.twh;
  }
  return { min, max, avg: sum / series.length };
}
