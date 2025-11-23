import { Mail, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../ThemeContext';

function Contact() {
  const { isDark } = useTheme();

  return (
    <section className="min-h-screen flex items-center justify-center py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-8 w-full">
        <h2 className={`text-5xl font-bold mb-12 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          contact<span className="text-cyan-400">_</span>
        </h2>

        <div className={`backdrop-blur-md border rounded-3xl p-12 shadow-2xl transition-all duration-300 ${
          isDark
            ? 'bg-white/3 border-white/10'
            : 'bg-gray-800/3 border-gray-800/20'
        }`}>
          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <Instagram className="text-cyan-400" size={24} />
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>instagram</p>
                <a
                  href="https://www.instagram.com/mehmetresitgul/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline text-lg"
                >
                  @mehmetresitgul
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-400">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.223-6.82-5.974 6.82h-3.31l7.732-8.835L2.882 2.25h6.822l4.79 6.335 5.486-6.335z"/>
              </svg>
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>x</p>
                <a
                  href="https://twitter.com/mresitcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline text-lg"
                >
                  @mresitcom
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <Linkedin className="text-cyan-400" size={24} />
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>linkedin</p>
                <a
                  href="https://linkedin.com/in/mehmetresitgul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline text-lg"
                >
                  mehmetresitgul
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <Mail className="text-cyan-400" size={24} />
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>email</p>
                <a
                  href="mailto:mehmetresitgul@outlook.com.tr"
                  className="text-cyan-400 hover:underline text-lg"
                >
                  mehmetresitgul@outlook.com.tr
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
