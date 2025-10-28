import { useNavigate } from 'react-router-dom';

export function BackButton({ className = '' }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`bg-yellow-500 text-black flex items-center px-3 justify-center rounded hover:bg-yellow-700 transition ${className}`}
    >
      ← Back
    </button>
  );
}