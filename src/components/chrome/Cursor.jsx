import { useCursor } from '../../hooks/useCursor';

export default function Cursor() {
  useCursor();
  return (
    <div id="cursor">
      <span className="cl"></span>
    </div>
  );
}
