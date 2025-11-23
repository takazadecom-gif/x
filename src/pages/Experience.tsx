import { useTheme } from '../ThemeContext';

function Experience() {
  const { isDark } = useTheme();

  return (
    <section className="min-h-screen pt-20 pb-20 relative z-10">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className={`text-5xl font-bold mb-12 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          experience<span className="text-cyan-400">_</span>
        </h2>
        <div className="space-y-6">
          <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-2xl hover:transition-all transition-all duration-300 ${
            isDark
              ? 'bg-white/3 border-white/10 hover:bg-white/5'
              : 'bg-gray-800/3 border-gray-800/20 hover:bg-gray-800/5'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Takazade</h3>
            <p className="text-cyan-400 mb-4">Founder & Builder</p>
            <p className={`leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I designed and built Turkey's first talent-exchange platform from scratch. No funding, no team. I handled the product, logic, and launch myself. The platform allows users to trade skills the same way they would trade any real resource.
            </p>
          </div>
          <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-2xl hover:transition-all transition-all duration-300 ${
            isDark
              ? 'bg-white/3 border-white/10 hover:bg-white/5'
              : 'bg-gray-800/3 border-gray-800/20 hover:bg-gray-800/5'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>AI Automation Projects</h3>
            <p className="text-cyan-400 mb-4">Independent Developer</p>
            <p className={`leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I develop n8n-based automation systems for e-commerce brands. These include order flow automation, customer communication workflows, data processing pipelines, and backend operation tools. Every project focuses on the same goal: reducing manual workload and speeding up daily operations.
            </p>
          </div>
          <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-2xl hover:transition-all transition-all duration-300 ${
            isDark
              ? 'bg-white/3 border-white/10 hover:bg-white/5'
              : 'bg-gray-800/3 border-gray-800/20 hover:bg-gray-800/5'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Product Development</h3>
            <p className="text-cyan-400 mb-4">Hands-on, Multi-role Approach</p>
            <p className={`leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I take products from idea to live version. I handle design, logic, prototyping, iteration, and deployment myself. My workflow is simple: build fast, test immediately, improve continuously, ship again.
            </p>
          </div>
          <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-2xl hover:transition-all transition-all duration-300 ${
            isDark
              ? 'bg-white/3 border-white/10 hover:bg-white/5'
              : 'bg-gray-800/3 border-gray-800/20 hover:bg-gray-800/5'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Neuroscience Research</h3>
            <p className="text-cyan-400 mb-4">Independent Researcher</p>
            <p className={`leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I study how artificial intelligence affects human decision-making speed and cognitive workflows. My recent work focuses on how AI-assisted tasks change our mental load, attention patterns, and the way the brain handles problem-solving when part of the process is automated.
              I publish early-stage research, explore experimental ideas, and analyze how human reasoning adapts when supported by AI systems. My current interest is the impact of AI-assisted decision-making on prefrontal processing speed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Experience;