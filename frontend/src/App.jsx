import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import BrowseSkills from './pages/BrowseSkills';
import Profile from './pages/Profile';
import AddSkill from './pages/AddSkill';
import CreateRequest from './pages/CreateRequest';
import GenericListView from './pages/GenericListView';
import Analytics from './pages/Analytics';

// Stub pages for routes that aren't fully implemented yet
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-bold text-slate-400 border border-slate-700 p-8 rounded-2xl glass-panel">
      {title} Page - Coming Soon
    </h1>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30 flex flex-col">
          {/* Dynamic Background */}
          <div className="fixed inset-0 z-[-1] bg-bg-dark">
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          </div>

          <Navbar />

          <main className="flex-grow w-full h-full relative z-0">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth isLogin={true} />} />
              <Route path="/register" element={<Auth isLogin={false} />} />
              <Route path="/browse" element={<BrowseSkills />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/add-skill" element={<ProtectedRoute allowedRoles={['Provider', 'Both']}><AddSkill /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><GenericListView type="requests" /></ProtectedRoute>} />
              <Route path="/assignments" element={<ProtectedRoute allowedRoles={['Provider', 'Both', 'Admin']}><GenericListView type="assignments" /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute allowedRoles={['Admin']}><Analytics /></ProtectedRoute>} />

              {/* Catch-all */}
              <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
            </Routes>
          </main>

          <footer className="border-t border-white/10 mt-auto py-8 text-center text-slate-500 text-sm glass-panel bg-slate-900/50 backdrop-blur-md">
            <p>© 2026 Campus Skill Exchange. All rights reserved.</p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
