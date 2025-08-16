import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";

// Public / User imports
import Silk from "./components/user-components/react-bits/Silk";
import ScrollVelocity from "./components/user-components/react-bits/ScrollVelocity";
import TrueFocus from "./components/user-components/react-bits/TrueFocus";
import Navbar from "./components/user-components/Navbar";
import Trapezoid from "./components/user-components/Trapezoid";
import AboutMe from "./components/user-components/AboutMe";
import Resume from "./components/user-components/Resume";
import Certificates from "./components/user-components/Certificates";
import Contact from "./components/user-components/Contact";
import Projects from "./components/user-components/Projects"
import "./App.css";

// Admin imports
import AdminOps from "./components/admin-components/AdminOps";
import AdminLogin from "./components/admin-components/AdminLogin";
import AdminDashboard from "./components/admin-components/AdminDashboard";

import ResumeOpsSelection from "./components/admin-components/ResumeOpsSelection";
import AddResume from "./components/admin-components/AddResume";
import UpdateResume from "./components/admin-components/UpdateResume";
import GetResumes from "./components/admin-components/GetResumes";
import DeleteResume from "./components/admin-components/DeleteResume";

import ProjectOpsSelection from "./components/admin-components/ProjectOpsSelection";
import AddProject from "./components/admin-components/AddProject";
import GetProjects from "./components/admin-components/GetProjects";
import UpdateProject from "./components/admin-components/UpdateProject";
import DeleteProject from "./components/admin-components/DeleteProject";

import CertificateOpsSelection from "./components/admin-components/CertificateOpsSelection";
import AddCertificate from "./components/admin-components/AddCertificate";
import GetCertificates from "./components/admin-components/GetCertificates";
import UpdateCertificate from "./components/admin-components/UpdateCertificate";
import DeleteCertificate from "./components/admin-components/DeleteCertificate";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            <div className="App">
              <div className="background-container">
                <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={50} />
              </div>

              <Navbar />

              <div className="content">
                <Trapezoid />
                <ScrollVelocity
                  scrollContainerRef={null}
                  texts={[
                    "CODING   -   SOFTWARE",
                    "ARTIFICIAL INTELLIGENCE",
                    "MACHINE LEARNING   -   WEB DEVELOPMENT",
                  ]}
                  velocity={100}
                  className="scroll-velocity"
                  numCopies={6}
                  velocityMapping={{ input: [0, 1000], output: [0, 5] }}
                  parallaxClassName="parallax"
                  scrollerClassName="scroller"
                />
                <AboutMe />
                <Projects />
                <TrueFocus
                  sentence="MY RESUME"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="white"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                />
                
                <Resume />
                <Certificates />
                <Contact />
              </div>
            </div>
          }
        />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard (protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Future protected admin routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <div>Admin subpage (to be implemented)</div>
            </ProtectedRoute>
          }
        />

        <Route path="/admin/admin-ops" element={<ProtectedRoute><AdminOps /></ProtectedRoute>}/>

        <Route path="/admin/resume-ops/ops" element={<ResumeOpsSelection />} />

        <Route path="/admin/resume-ops/add-new" element={<AddResume />} />

        <Route path="/admin/resume-ops/update/:id" element={<UpdateResume />} />

        <Route path="/admin/resume-ops/get-resumes" element={<GetResumes />} />
        
        <Route path="/admin/resume-ops/delete/:id" element={<DeleteResume />} />

        <Route path="/admin/project-ops/ops" element={<ProjectOpsSelection />} />

        <Route path="/admin/project-ops/add-new" element={<AddProject />} />

        <Route path="/admin/project-ops/get-projects" element={<GetProjects />} />

        <Route path="/admin/project-ops/update/:id" element={<UpdateProject />} />

        <Route path="/admin/project-ops/delete/:id" element={<DeleteProject />} />

        <Route path="/admin/certificate-ops/ops" element={<CertificateOpsSelection />} />

        <Route path="/admin/certificate-ops/add-new" element={<AddCertificate />} />

        <Route path="/admin/certificate-ops/get-certificates" element={<GetCertificates />} />

        <Route path="/admin/certificate-ops/update/:id" element={<UpdateCertificate />} />

        <Route path="/admin/certificate-ops/delete/:id" element={<DeleteCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
