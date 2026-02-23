import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1>Home Page</h1>;
}

function AdminLogin() {
  return <h1>Admin Login Page</h1>;
}

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/admin-login" style={{ marginLeft: "20px" }}>
          Admin
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}