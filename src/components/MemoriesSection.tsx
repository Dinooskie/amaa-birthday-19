import { motion } from 'motion/react';
import { config } from '../config';

export function MemoriesSection() {
  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h2 className="text-3xl md:text-4xl font-bold text-romantic-600 font-heading mb-4">
            Our Little Memories
          </h2>
          <div className="w-24 h-1 bg-romantic-300 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-16">
          {config.memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-romantic-500/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img
                      src={memory.image}
                      alt={memory.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-75 md:h-100 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 font-heading">
                    {memory.title}
                  </h3>
                  <p className="text-lg text-slate-600 italic">
                    "{memory.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
