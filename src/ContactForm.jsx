import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEB3FORMS_KEY, CONTACT_EMAIL } from "./config.js";
import { PROJECT_TYPES } from "./data.js";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!emailRe.test(v.email.trim())) e.email = "Enter a valid email, like name@company.com.";
  if (v.message.trim().length < 10) e.message = "Tell me a bit more (at least 10 characters).";
  return e;
}

function Field({ id, label, error, children, filled }) {
  return (
    <div className={`field ${filled ? "is-filled" : ""} ${error ? "has-error" : ""}`}>
      {children}
      <label htmlFor={id}>{label}</label>
      <span className="field-line" aria-hidden="true" />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            className="field-error"
            role="alert"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", type: PROJECT_TYPES[0], message: "", botcheck: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error
  const [errMsg, setErrMsg] = useState("");
  const errors = validate(v);
  const show = (k) => (touched[k] ? errors[k] : undefined);
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function onSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) {
      const first = ["name", "email", "message"].find((k) => errors[k]);
      document.getElementById(first)?.focus();
      return;
    }
    if (v.botcheck) return; // honeypot

    const subject = `Portfolio enquiry: ${v.type}`;
    if (WEB3FORMS_KEY) {
      setStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: v.name,
            name: v.name,
            email: v.email,
            project_type: v.type,
            message: v.message,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Request failed");
        setStatus("sent");
      } catch (err) {
        setErrMsg(err.message || "Network error");
        setStatus("error");
      }
    } else if (CONTACT_EMAIL) {
      const body = `${v.message}\n\n— ${v.name} (${v.email})`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    } else {
      setErrMsg("The form is not connected yet. Add a Web3Forms key or an email in src/config.js.");
      setStatus("error");
    }
  }

  function reset() {
    setV({ name: "", email: "", type: PROJECT_TYPES[0], message: "", botcheck: "" });
    setTouched({});
    setStatus("idle");
  }

  if (status === "sent" || status === "mailto") {
    return (
      <motion.div className="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status">
        <svg viewBox="0 0 52 52" width="72" height="72" aria-hidden="true">
          <motion.circle cx="26" cy="26" r="23" fill="none" stroke="var(--lamp)" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <motion.path d="M15 27l8 8 15-17" fill="none" stroke="var(--lamp)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5 }} />
        </svg>
        <h3>{status === "sent" ? "Message sent" : "Your mail app is open"}</h3>
        <p>
          {status === "sent"
            ? `Thanks, ${v.name.split(" ")[0]}. I'll reply to ${v.email} soon.`
            : "Press send in your mail app to deliver the message."}
        </p>
        <button type="button" className="btn btn-ghost" onClick={reset}>Send another message</button>
      </motion.div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label>Leave empty<input tabIndex={-1} autoComplete="off" value={v.botcheck} onChange={set("botcheck")} /></label>
      </div>

      <Field id="name" label="Your name" error={show("name")} filled={!!v.name}>
        <input id="name" name="name" autoComplete="name" value={v.name} onChange={set("name")} onBlur={blur("name")}
          aria-invalid={!!show("name")} aria-describedby={show("name") ? "name-err" : undefined} placeholder=" " />
      </Field>

      <Field id="email" label="Email address" error={show("email")} filled={!!v.email}>
        <input id="email" name="email" type="email" autoComplete="email" value={v.email} onChange={set("email")} onBlur={blur("email")}
          aria-invalid={!!show("email")} aria-describedby={show("email") ? "email-err" : undefined} placeholder=" " />
      </Field>

      <fieldset className="types">
        <legend>What do you need?</legend>
        <div className="chips">
          {PROJECT_TYPES.map((t) => (
            <label key={t} className={`chip ${v.type === t ? "on" : ""}`}>
              <input type="radio" name="type" value={t} checked={v.type === t} onChange={set("type")} />
              {v.type === t && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
              <span className="chip-text">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="message" label="Your message" error={show("message")} filled={!!v.message}>
        <textarea id="message" name="message" rows={4} value={v.message} onChange={set("message")} onBlur={blur("message")}
          aria-invalid={!!show("message")} aria-describedby={show("message") ? "message-err" : undefined} placeholder=" " />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.p className="form-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            Couldn't send: {errMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button type="submit" className="btn btn-lamp" disabled={status === "sending"} whileTap={{ scale: 0.97 }}>
        {status === "sending" ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : "Send message"}
      </motion.button>
    </form>
  );
}
