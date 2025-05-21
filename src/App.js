// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import DimossLandingPage from './components/LandingPage';
// import Preloader from './Preloader';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import './App.css';
// function AppContent() {
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   useEffect(() => {
//     const isLandingPage = location.pathname === '/';
//     if (isLandingPage) {
//       setLoading(true);
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 15000);
//       return () => clearTimeout(timer);
//     } else {
//       setLoading(false);
//     }
//   }, [location.pathname]);
//   return (
//     <>
//       {loading && <Preloader />}
//       <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
//       <Routes>
//         <Route path="/" element={<DimossLandingPage />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }
// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }
// export default App;