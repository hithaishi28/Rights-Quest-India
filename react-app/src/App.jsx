import React, { useMemo, useState } from "react";
import { AuthForm } from "./components/AuthForm.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Home } from "./components/Home.jsx";
import { VideoModal } from "./components/VideoModal.jsx";
import { modules, videos } from "./data/modules.js";

// Main React app controller. In Firebase mode, replace local user state with
// onAuthStateChanged(auth, ...) and Firestore progress documents.
export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("signup");
  const [authError, setAuthError] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0].id);
  const [activeVideo, setActiveVideo] = useState(null);

  const selectedModule = useMemo(
    () => modules.find((module) => module.id === selectedModuleId) || modules[0],
    [selectedModuleId]
  );

  function signup(form) {
    setAuthError("");
    if (form.password !== form.confirmPassword) {
      setAuthError("Passwords Do Not Match");
      return;
    }
    if (users.some((user) => user.email === form.email.toLowerCase())) {
      setAuthError("Email Already Registered");
      return;
    }
    const user = {
      name: form.name,
      age: Number(form.age),
      email: form.email.toLowerCase(),
      password: form.password,
      points: 0,
      badges: [],
      completedChapters: [],
      quizScores: {}
    };
    setUsers([...users, user]);
    setCurrentUser(user);
  }

  function login(form) {
    setAuthError("");
    const user = users.find((item) => item.email === form.email.toLowerCase());
    if (!user) {
      setAuthError("User Not Found");
      return;
    }
    if (user.password !== form.password) {
      setAuthError("Incorrect Password");
      return;
    }
    setCurrentUser(user);
  }

  function updateUser(nextUser) {
    setCurrentUser(nextUser);
    setUsers(users.map((user) => (user.email === nextUser.email ? nextUser : user)));
  }

  function completeModule(module) {
    if (currentUser.completedChapters.includes(module.id)) return;
    const nextUser = {
      ...currentUser,
      points: currentUser.points + module.points,
      badges: [...new Set([...currentUser.badges, module.badge])],
      completedChapters: [...currentUser.completedChapters, module.id]
    };
    updateUser(nextUser);
  }

  return (
    <>
      {!currentUser ? (
        <>
          <Home modules={modules} videos={videos} onOpenVideo={setActiveVideo} />
          <AuthForm
            mode={authMode}
            error={authError}
            onSwitch={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
            onSubmit={authMode === "signup" ? signup : login}
          />
        </>
      ) : (
        <Dashboard
          user={currentUser}
          modules={modules}
          videos={videos}
          selectedModule={selectedModule}
          onSelectModule={setSelectedModuleId}
          onCompleteModule={completeModule}
          onOpenVideo={setActiveVideo}
          onLogout={() => setCurrentUser(null)}
        />
      )}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
