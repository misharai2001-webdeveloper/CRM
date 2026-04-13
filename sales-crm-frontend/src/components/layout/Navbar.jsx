import "../../styles/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">

      {/* left spacer for hamburger on mobile */}
      <div className="nav-left"></div>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search here..." />
      </div>

    </div>
  );
}