import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const AnimatedText = ({ text }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.p
      className="text-white text-center italic font-serif leading-tight px-4 text-sm md:text-base"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block mr-1">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default function BirthdayApp() {
  const [step, setStep] = useState('start'); 
  const audioRef = useRef(null);

  const messages = [
    "Happy Birthday to the man who stole my heart from miles away! 🎂",
    "You are my favorite person, my best friend, and my whole world. ❤️",
    "Distance is temporary, but my love for you is permanent. ✨",
    "I love the way you make me smile even through a screen. 😊",
    "To the world, you are one person. To me, you are the world. 🌎",
    "I’m so proud of the man you are becoming every single day. 🦁",
    "Thank you for choosing me to be your partner in life. 💍",
    "I can't wait for the day we never have to say 'goodbye' again. ✈️",
    "Your voice is my favorite sound, and your name is my favorite word. 🗣️",
    "Even on my worst days, thinking of you makes everything better. 🌟",
    "I fell in love with your soul before I could even touch your skin. 🤝",
    "Distance means so little when you mean so much to me. 📏",
    "You're not just my boyfriend; you're my home. 🏠",
    "I wish I could be there to kiss you on your special day. 💋",
    "Counting down the seconds until our next reunion. ⏳",
    "You make my heart skip a beat every time I see your face. 💓",
    "Thank you for loving me as much as I love you. 🌹",
    "I love every single detail about you. 🥰",
    "You are the best thing that ever happened to me. 🎁",
    "I love you more than words can ever express. Always yours. Forever."
  ];

  const handleStart = () => {
    setStep('letter');
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio blocked"));
    }
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff']
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div 
            key="cover"
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="cursor-pointer flex flex-col items-center p-12 border border-pink-500/20 rounded-[40px] bg-pink-500/5 shadow-[0_0_50px_rgba(236,72,153,0.1)]"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Heart className="text-pink-500 fill-pink-500 w-16 h-16 mb-6" />
              </motion.div>
              <h1 className="text-2xl font-bold tracking-[0.3em] uppercase italic text-pink-200 text-center">
                Click for a surprise
              </h1>
              <p className="mt-4 text-gray-500 text-xs uppercase tracking-widest">Turn your sound on 🔊</p>
            </motion.div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div 
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 bg-black text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl space-y-8"
            >
              <div className="space-y-6 text-pink-100 font-serif text-lg md:text-xl leading-relaxed italic">
                <p className="text-pink-400 font-bold tracking-widest uppercase text-sm mb-4">Before you continue...</p>
                <p>I am so sorry for being confused about the date... I think I was just too excited to celebrate you today. ❤️</p>
                <p>I know that things haven't always been easy between us lately. I know we've had our problems, and sometimes we both feel unsure about our feelings...</p>
                <p className="text-pink-300 font-bold">But I want you to know this:</p>
                <p>Despite the distance and the doubts, I hope with all my heart that we can stay together for the rest of our lives. You mean so much to me, and I love seeing your face every single day.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setStep('gallery')}
                className="mt-10 px-10 py-4 bg-pink-600 rounded-full text-white font-bold tracking-widest uppercase text-xs shadow-lg shadow-pink-900/20"
              >
                Open your gift ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {step === 'gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            <header className="h-[40vh] flex flex-col items-center justify-center text-center p-4">
               <h2 className="text-4xl md:text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 uppercase tracking-tighter">
                 Happy Birthday My Love ❤️
               </h2>
               <p className="text-gray-500 mt-4 text-xs tracking-[0.3em] uppercase italic">Hover each photo to see how I feel about you</p>
            </header>

            <section className="px-4 md:px-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden group border border-white/5 bg-white/5"
                >
                  <img 
                    src={`/${i + 1}.jpeg`} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm group-hover:brightness-[0.3]" 
                    alt="Him" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                     <div className="text-center">
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500 mx-auto mb-3" />
                        <AnimatedText text={msg} />
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </section>

            <footer className="mt-32 text-center border-t border-white/5 pt-10 px-4">
              <p className="text-pink-500 italic text-lg mb-2">You are my only one.</p>
              <p className="text-[9px] text-gray-700 tracking-[0.5em] uppercase">Made with love by Imane • 2026</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}