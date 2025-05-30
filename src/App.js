import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import Navigation, { Footer } from './components/Navigation';
import WelcomePage from './pages/WelcomePage';
import PostsPage from './pages/PostsPage';
import ChatPage from './pages/ChatPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';
import AcademicPage from './pages/AcademicPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation - Fixed at top */}
        <Navigation />
        
        {/* Main Content - Flexible growing space */}
        <main className="flex-grow-1">
          <Container className="my-4">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/academic" element={<AcademicPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </main>
        
        {/* Footer - Fixed at bottom */}
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              style: {
                background: '#ff4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;