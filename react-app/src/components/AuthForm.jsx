import React, { useState } from "react";

// Login/signup form with exact validation messages required by the project.
export function AuthForm({ mode, error, onSwitch, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function submit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <section className="screen" id="auth">
      <form className="auth-card auth-portal" onSubmit={submit}>
        <h2>{mode === "signup" ? "Create Student Account 🌟" : "Login 🔐"}</h2>
        {mode === "signup" && (
          <>
            <label className="field">Student Name <input required value={form.name} onChange={(e) => update("name", e.target.value)} /></label>
            <label className="field">Age <input required min="6" max="16" type="number" value={form.age} onChange={(e) => update("age", e.target.value)} /></label>
          </>
        )}
        <label className="field">Email <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
        <label className="field">Password <input required type="password" value={form.password} onChange={(e) => update("password", e.target.value)} /></label>
        {mode === "signup" && (
          <label className="field">Confirm Password <input required type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} /></label>
        )}
        <p className="auth-message">{error}</p>
        <button className="pill-button primary" type="submit">{mode === "signup" ? "Sign Up" : "Login"}</button>
        <button className="pill-button ghost" type="button" onClick={onSwitch}>{mode === "signup" ? "Already have account?" : "Need sign up?"}</button>
      </form>
    </section>
  );
}
