import React from "react";
import { useSelector } from "react-redux";
import AddQuestion from "./Recruiter/AddQuestion";
import AddInterview from "./Recruiter/AddInterview";
import GetInterview from "./Recruiter/GetInterview";
import GetQuestion from "./Recruiter/GetQuestion";
import ViewSubmission from "./Recruiter/ViewSubmission";
import StartTest from "./Candidate/StartTest";
import logo from "../../public/Logo.png?.url";
import Footer from "../Components/Footer";

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <div className="text-center mt-20 text-gray-600">Loading user...</div>;

  return (
    <div className="bg-white flex flex-col">
      {user.role === "Recruiter" && (
        <nav className="hidden md:flex fixed top-0 left-0 w-full items-center justify-between p-3 bg-white/90 backdrop-blur shadow-sm z-50">
          <h1 className="text-2xl font-bold">CodeSieve</h1>
          <ul className="flex flex-row">
            <li><a href="#home1" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Home</a></li>
            <li><a href="#addquestion" className="px-4 py-2 text-lg font-medium hover:text-blue-300">AddQuestion</a></li>
            <li><a href="#interview" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Interview</a></li>
            <li><a href="#getquestion" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Questions</a></li>
            <li><a href="#submissions" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Candidate</a></li>
            <li><a href="/" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Logout</a></li>
          </ul>
        </nav>
      )}

      {user.role === "Recruiter" && (
        <section id="home1" className="flex flex-col lg:flex-row items-center justify-between py-28 md:py-36 w-full" style={{ background: "linear-gradient(90deg, #4facfe, #00f2fe)" }}>
          <div className="lg:w-1/2 space-y-4 md:space-y-6 text-white px-4 md:px-6">
            <h2 className="text-2xl md:text-4xl font-bold leading-snug">Welcome, {user.name}</h2>
            <p className="text-base md:text-lg">Manage coding interviews, track submissions, and evaluate candidates efficiently with CodeSieve's all-in-one recruiter dashboard.</p>
          </div>
          <div className="lg:w-1/2 mt-8 md:mt-10 lg:mt-0 flex justify-center px-4 md:px-6">
            <img src={logo} alt="Logo" className="h-36 md:h-56" />
          </div>
        </section>
      )}

      {user.role === "Recruiter" ? (
        <>
          <section id="addquestion" className="flex flex-col lg:flex-row items-start justify-between py-14 w-full px-4 md:px-6">
            <div className="lg:w-1/2"><AddQuestion /></div>
            <div className="lg:w-1/2 space-y-3 lg:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold">Add Questions</h3>
              <p className="text-gray-700 text-sm md:text-base">Create coding questions with descriptions, starter code, and test cases.</p>
            </div>
          </section>

          <section id="getquestion" className="flex flex-col lg:flex-row items-start justify-between py-14 w-full px-4 md:px-6" style={{ background: "linear-gradient(90deg, #6dd5ed, #2193b0)" }}>
            <div className="lg:w-1/2 space-y-3 lg:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold text-white">All Questions</h3>
              <p className="text-white text-sm md:text-base">Browse coding questions in a scrollable panel. Review details, starter code, and test cases for consistency.</p>
            </div>
            <div className="lg:w-1/2 mt-6 md:mt-0"><GetQuestion /></div>
          </section>

          <section id="interview" className="flex flex-col lg:flex-row items-start justify-between py-14 w-full px-4 md:px-6">
            <div className="lg:w-1/2"><AddInterview /></div>
            <div className="lg:w-1/2 space-y-3 lg:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold">Schedule Interviews</h3>
              <p className="text-gray-700 text-sm md:text-base">Schedule interviews by selecting candidates, assigning coding questions, and setting deadlines.</p>
            </div>
          </section>

          <section className="flex flex-col lg:flex-row items-start justify-between py-14 w-full px-4 md:px-6" style={{ background: "linear-gradient(90deg, #6dd5ed, #2193b0)" }}>
            <div className="lg:w-1/2 space-y-3 lg:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold text-white">View Scheduled Interviews</h3>
              <p className="text-white text-sm md:text-base">See all scheduled interviews at a glance. Track deadlines and durations efficiently.</p>
            </div>
            <div className="lg:w-1/2 mt-6 md:mt-0"><GetInterview /></div>
          </section>

          <section id="submissions" className="flex flex-col lg:flex-row items-start justify-between py-14 w-full px-4 md:px-6">
            <div className="lg:w-1/2"><ViewSubmission /></div>
            <div className="lg:w-1/2 space-y-3 lg:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold">Candidate Submissions</h3>
              <p className="text-gray-700 text-sm md:text-base">Review candidate submissions in a scrollable panel. Check status, scores, and timestamps.</p>
            </div>
          </section>
        </>
      ) : (
        <>
          <nav className="hidden md:flex fixed top-0 left-0 w-full items-center justify-between p-3 bg-white/90 backdrop-blur shadow-sm z-50">
            <h1 className="text-2xl font-bold">CodeSieve</h1>
            <ul className="flex flex-row">
              <li><a href="#home1" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Home</a></li>
              <li><a href="#interview" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Interview</a></li>
              <li><a href="/" className="px-4 py-2 text-lg font-medium hover:text-blue-300">Logout</a></li>
            </ul>
          </nav>

          <section id="home1" className="flex flex-col lg:flex-row items-center justify-between py-28 md:py-36 w-full" style={{ background: "linear-gradient(90deg, #4facfe, #00f2fe)" }}>
            <div className="lg:w-1/2 space-y-4 text-white px-4 md:px-6">
              <h2 className="text-2xl md:text-4xl font-bold leading-snug">Welcome, {user.name}</h2>
              <p className="text-base md:text-lg">Practice coding challenges, attempt interviews, and showcase your skills through CodeSieve.</p>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center px-4 md:px-6">
              <img src={logo} alt="Logo" className="h-36 md:h-56" />
            </div>
          </section>

          <section id="interview" className="flex flex-col lg:flex-row items-start justify-between py-14 w-full px-4 md:px-6">
            <div className="lg:w-1/2 space-y-3 lg:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold">Technical Round</h3>
              <p className="text-sm md:text-base">Get ready to test your coding skills. Begin your assigned coding tests and track your progress with CodeSieve.</p>
            </div>
            <div className="lg:w-1/2 mt-6 md:mt-0"><StartTest /></div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
}
