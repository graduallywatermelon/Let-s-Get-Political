export default function Guides() {
  return (
    <div className="guides">
      {Array.from({ length: 10 }, (_, i) => <i key={i} />)}
    </div>
  );
}
