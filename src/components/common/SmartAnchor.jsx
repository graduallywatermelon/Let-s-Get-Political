import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function SmartAnchor({ to, href, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();
  if (to) return <Link to={to} {...rest}>{children}</Link>;
  const isHash = href && href.startsWith('#');
  const go = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || !isHash) return;
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { hash: href } });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return <a href={href} onClick={go} {...rest}>{children}</a>;
}
