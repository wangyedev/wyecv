import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function MainContent() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-br from-slate-50 to-white dark:from-navy-900 dark:to-navy-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Introduction */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 dark:text-white leading-tight">
            Hello, I'm <span className="highlight">Wang Ye</span>
            <br />
            I'm a <span className="highlight">Full Stack Developer</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
            A full-stack engineer specializing in AI-powered applications and
            the React ecosystem. I create intelligent, scalable solutions that
            bridge cutting-edge AI with robust web development.
          </p>

          <p className="text-lg text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
            Currently building AI agents, MCP integrations, and LLM-powered
            applications. I help businesses automate workflows and enhance user
            experiences through intelligent systems.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10">
          <div className="flex justify-center space-x-8">
            <a
              href="https://github.com/wangyedev"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/wangyecv/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:wangyecv@gmail.com" className="social-link">
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
