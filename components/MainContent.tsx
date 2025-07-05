import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function MainContent() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-br from-slate-50 to-white dark:from-navy-900 dark:to-navy-800 transition-colors duration-300"
      role="main"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Introduction */}
        <section className="space-y-8" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-light text-slate-900 dark:text-white leading-tight"
          >
            Hello, I'm <span className="highlight">Wang Ye</span>
            <br />
            I'm a <span className="highlight">Full Stack Developer</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
            Senior Software Engineer at{" "}
            <a
              href="https://www.redhat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="wavy-underline text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
            >
              Red Hat
            </a>{" "}
            with 5 years of full-stack development experience. I specialize in
            AI-powered applications and modern web technologies.
          </p>

          <p className="text-lg text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
            Currently building AI agents, MCP integrations, and LLM-powered
            applications. I help businesses automate workflows and enhance user
            experiences through intelligent systems.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="mt-12" aria-labelledby="contact-cta">
          <h2 id="contact-cta" className="sr-only">
            Contact Information
          </h2>
          <a
            href="mailto:wangyecv@gmail.com"
            className="inline-flex items-center space-x-2 bg-gold-500 hover:bg-gold-600 text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            aria-label="Send email to Wang Ye at wangyecv@gmail.com"
          >
            <Mail size={18} aria-hidden="true" />
            <span>Get In Touch</span>
          </a>
        </section>

        {/* Social Links */}
        <section
          className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10"
          aria-labelledby="social-links"
        >
          <h2 id="social-links" className="sr-only">
            Social Media and Professional Profiles
          </h2>
          <nav
            className="flex justify-center space-x-8"
            aria-label="Social media links"
          >
            <a
              href="https://github.com/wangyedev"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit Wang Ye's GitHub profile"
            >
              <Github size={20} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/wangyecv/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit Wang Ye's LinkedIn profile"
            >
              <Linkedin size={20} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:wangyecv@gmail.com"
              className="social-link"
              aria-label="Send email to Wang Ye"
            >
              <Mail size={20} aria-hidden="true" />
              <span>Email</span>
            </a>
          </nav>
        </section>
      </div>
    </main>
  );
}
