import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { Prompt } from './Prompt'

const JOAO_ASCII = [
  '     ██╗ ██████╗  █████╗  ██████╗ ',
  '     ██║██╔═══██╗██╔══██╗██╔═══██╗',
  '     ██║██║   ██║███████║██║   ██║',
  '██   ██║██║   ██║██╔══██║██║   ██║',
  '╚█████╔╝╚██████╔╝██║  ██║╚██████╔╝',
  ' ╚════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ',
].join('\n')

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export function IdentityBanner() {
  const { lang, t } = useLanguage()

  return (
    <motion.section
      aria-labelledby="whoami-banner"
      className="@container px-4 pt-6 pb-4 sm:px-6 sm:pt-10 md:px-8"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
      }}
    >
      <motion.div variants={fade}>
        <Prompt command="whoami" className="text-xs text-muted sm:text-sm" />
      </motion.div>

      <div className="mt-10 space-y-5 sm:mt-14">
        <motion.pre
          aria-hidden="true"
          variants={fade}
          className="overflow-hidden whitespace-pre font-mono leading-none text-accent/90 [font-size:clamp(0.45rem,2.4cqi,0.75rem)]"
        >
          {JOAO_ASCII}
        </motion.pre>

        <motion.div variants={fade} className="space-y-2">
          <h1
            id="whoami-banner"
            className="text-2xl font-medium tracking-tight text-fg sm:text-3xl md:text-4xl"
          >
            {t.hero.name}
          </h1>
          <p className="text-sm text-accent sm:text-base">{t.hero.role}</p>
        </motion.div>

        <motion.p
          variants={fade}
          className="max-w-xl text-sm leading-relaxed text-muted sm:text-[0.95rem]"
        >
          {t.hero.tagline}
        </motion.p>
      </div>

      <motion.p variants={fade} className="mt-16 text-sm text-muted sm:mt-20">
        {lang === 'pt' ? 'digite ' : 'type '}
        <span className="text-command">help</span>
        {lang === 'pt' ? ' para explorar' : ' to explore'}
      </motion.p>
    </motion.section>
  )
}
