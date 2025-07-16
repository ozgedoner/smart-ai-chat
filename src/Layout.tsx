import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow px-6 py-4 flex gap-6">
        <Link to="/" className="font-semibold hover:underline">🧠 Smart Chat</Link>
        <Link to="/ai-vs-ai" className="font-semibold hover:underline">🤖 AI vs AI</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
