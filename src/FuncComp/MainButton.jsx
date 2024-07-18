import { useNavigate } from "react-router-dom";

export default function MainButton({ textToBtn, navigateTo, style, children }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(navigateTo);
  };

  return (
    <button className="main-button" onClick={handleNavigation} style={style}>
      {children}
      {textToBtn}
    </button>
  );
}
