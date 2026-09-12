export default function Pill({ tone = 'mute', children }) {
  return <span className={'pill pill-' + tone}>{children}</span>;
}
