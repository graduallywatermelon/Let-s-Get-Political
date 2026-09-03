export function buildBridge(pr, a, b) {
  const W = pr.width, H = pr.height;
  const x1 = a.right - pr.left + 10, y1 = a.top - pr.top + a.height * .42;
  const x2 = b.left - pr.left - 10, y2 = b.bottom - pr.top - b.height * .42;
  const steps = 5, dx = (x2 - x1) / steps;
  let d = `M${x1.toFixed(1)},${y1.toFixed(1)}`;
  const amp = Math.min(46, H * .09);
  for (let i = 1; i <= steps; i++) {
    const px = x1 + dx * i, mx = x1 + dx * (i - .5), s = (i % 2 ? 1 : -1) * amp;
    d += ` C${(mx - dx * .1).toFixed(1)},${(y1 + (y2 - y1) * (i - 1) / steps + s).toFixed(1)} `
      + `${(mx + dx * .1).toFixed(1)},${(y1 + (y2 - y1) * i / steps).toFixed(1)} `
      + `${px.toFixed(1)},${(y1 + (y2 - y1) * i / steps).toFixed(1)}`;
  }
  return { d, x1, y1, x2, y2, W, H };
}
