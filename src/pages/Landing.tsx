import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { KuberaIcon } from '../components/branding/KuberaIcon'

export function Landing() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'stats', 'services', 'features', 'bbps']
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 140
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  }

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'stats', label: 'Stats' },
    { id: 'services', label: 'Services' },
    { id: 'features', label: 'Features' },
    { id: 'bbps', label: 'BBPS & QR' },
  ]

  return (
    <div className="relative min-h-screen bg-background text-text-primary">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.24), transparent 55%), radial-gradient(circle at 100% 100%, rgba(167,139,250,0.28), transparent 55%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-40 h-72 w-72 rounded-full bg-gradient-accent blur-3xl opacity-40"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* Top marketing navbar */}
        <motion.header
          className="sticky top-0 z-50 border-b border-border-subtle/60 bg-background/90 backdrop-blur"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-[var(--shadow-soft)]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <KuberaIcon size={24} />
              </motion.div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary">
                  kuberanpay
                </p>
                <p className="text-sm font-semibold text-text-primary/90">
                  Full‑stack online banking &amp; utility payments
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-sky-50 shadow-[var(--shadow-soft)] transition-all duration-300 hover:brightness-110 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:inline-flex items-center"
              >
                Login
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-full bg-surface-elevated/80 p-2.5 text-text-secondary ring-1 ring-border-subtle/80 transition hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70 md:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border-subtle/60 bg-surface-elevated/95 backdrop-blur-xl md:hidden"
              >
                <div className="mx-auto max-w-7xl px-4 py-4 space-y-2">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                        activeSection === link.id
                          ? 'bg-primary/20 text-primary'
                          : 'text-text-secondary hover:bg-surface-elevated/70 hover:text-text-primary'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                  <Link
                    to="/login"
                    className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-primary px-4 py-3 text-sm font-semibold text-sky-50 shadow-[var(--shadow-soft)] transition hover:brightness-110"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="px-4 py-6 md:px-10 md:py-8">

        {/* Hero */}
        <main className="flex flex-1 flex-col gap-12 pb-10 pt-4 md:gap-16 md:pb-12">
          <section
            id="home"
            className="flex min-h-[calc(100vh-96px)] flex-col items-start gap-8 scroll-mt-36 md:flex-row md:items-center md:gap-10"
          >
            <motion.div
              className="max-w-xl space-y-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface-elevated/70 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.2em] text-text-secondary"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Reimagining money movement for modern teams
              </motion.div>

              <div className="space-y-5">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
                  Orchestrate{' '}
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
                    Pay‑Ins, Payouts &amp; Utility Bills
                  </span>{' '}
                  from a single command center.
                </h1>
                <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                  kuberanpay brings together business banking, collections, disbursements and bill
                  payments into one secure platform, so you can power merchants and agents without
                  stitching together multiple portals.
                </p>
              </div>

              <ul className="grid gap-2 text-sm text-text-secondary md:text-base">
                <li>• Full‑stack online banking solutions for every business need</li>
                <li>• Bharat Bill Payment System (BBPS) ready utility bill stack</li>
                <li>• Static &amp; dynamic QR rails for merchant collections</li>
                <li>• Instant payouts to bank accounts &amp; wallets with realtime status</li>
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-sky-50 shadow-[var(--shadow-medium)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Launch kuberanpay
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <p className="text-xs text-text-secondary md:text-sm">
                  Free onboarding for new users. Secure &amp; reliable technology platform.
                </p>
              </div>
            </motion.div>

            <motion.section
              className="mt-6 w-full max-w-md md:mt-0 md:ml-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="grid gap-4">
                <motion.div
                  className="glass-card relative overflow-hidden px-4 py-4"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    Merchant network at scale
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-50">
                    10K+ merchants
                    <span className="block text-sm font-normal text-text-secondary">
                      powering utility &amp; banking services
                    </span>
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-text-secondary">
                    <p>
                      High‑volume processing
                      <br />
                      <span className="font-semibold text-emerald-400">L+ transactions</span>
                    </p>
                    <p>
                      24×7 support
                      <br />
                      <span className="font-semibold text-sky-400">on‑site &amp; remote</span>
                    </p>
                    <p>
                      Banking &amp; digital partners
                      <br />
                      <span className="font-semibold text-violet-300">Multi‑rail connectivity</span>
                    </p>
                    <p>
                      Secure platform
                      <br />
                      <span className="font-semibold text-cyan-300">
                        Dedicated internal security team
                      </span>
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <motion.div
                    className="glass-card px-4 py-4"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 230, damping: 20 }}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                      Utility hub
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      Electricity, water, gas, DTH &amp; mobile recharges from one portal.
                    </p>
                  </motion.div>
                  <motion.div
                    className="glass-card px-4 py-4"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 230, damping: 20 }}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                      Business banking
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      Pay‑ins, payouts, reconciliation and reporting for modern merchants.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </section>

          {/* Stats / overview section */}
          <motion.section
            id="stats"
            className="space-y-4 rounded-2xl border border-border-subtle/60 bg-surface-elevated/70 p-4 shadow-[var(--shadow-soft)] scroll-mt-36"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                  Payment infrastructure trusted at scale
                </h2>
                <p className="text-sm text-text-secondary">
                  Redundant banking partners, realtime observability and a secure, utility first
                  stack for merchants.
                </p>
              </div>
            </div>
            <div className="grid gap-3 text-sm md:grid-cols-4">
              <motion.div
                className="glass-card border-none bg-surface/70 p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Merchants
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-50">10K+</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Retail, lending, gaming and local businesses run their bill payments on kuberanpay.
                </p>
              </motion.div>
              <motion.div
                className="glass-card border-none bg-surface/70 p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Monthly volume
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-50">Crores+</p>
                <p className="mt-1 text-sm text-text-secondary">
                  High‑throughput processing across pay‑ins, payouts and utility bill rails.
                </p>
              </motion.div>
              <motion.div
                className="glass-card border-none bg-surface/70 p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Success rate
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-50">99.9%</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Multi‑bank redundancy with proactive risk and failure routing controls.
                </p>
              </motion.div>
              <motion.div
                className="glass-card border-none bg-surface/70 p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Support
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-50">24×7</p>
                <p className="mt-1 text-sm text-text-secondary">
                  On‑site and remote teams to keep your merchants, outlets and agents live.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Services section inspired by utility services */}
          <motion.section
            id="services"
            className="space-y-4 scroll-mt-36"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                  Solutions for every business need
                </h2>
                <p className="text-sm text-text-secondary">
                  Power up your business with full‑stack online banking and utility bill solutions.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm md:grid-cols-3">
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Any bills
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Unified bill payment</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Accept and pay electricity, water, gas and post‑paid bills from a single dashboard.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  DTH &amp; mobile
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Recharge engine</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Recharge any DTH or mobile operator—Airtel, Sun TV and more—on the same rails.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Merchants &amp; agents
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Distribution network</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Onboard merchants and field agents for cash‑in, cash‑out and assisted payments.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4 md:col-span-3"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 230, damping: 24 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  BBPS &amp; instant payouts
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Rail‑level connectivity</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Plug into Bharat Bill Payment System (BBPS) for compliant bill payments while
                  routing instant payouts via IMPS / UPI to bank accounts and wallets.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Features / reassurance section */}
          <motion.section
            id="features"
            className="space-y-4 scroll-mt-36"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                  Utility services, support &amp; security baked in
                </h2>
                <p className="text-sm text-text-secondary">
                  Built for high‑volume merchants who need reliable tech, free onboarding and
                  round‑the‑clock support.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm md:grid-cols-3">
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Free onboarding
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">No setup fee</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Any new user can join kuberanpay at zero onboarding cost and start using the
                  portal instantly.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  24×7 help &amp; support
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">On‑site &amp; remote</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Dedicated support teams ensure your merchants stay productive at all times.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Secure &amp; reliable
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Enterprise‑grade stack</p>
                <p className="mt-1 text-sm text-text-secondary">
                  A hardened technology platform with internal security teams protecting your data.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4 md:col-span-3"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 230, damping: 24 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Merchant QR rails
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Static &amp; dynamic QR support</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Issue static QR codes for always‑on collections, or dynamic QR for one‑time,
                  invoice and BBPS‑backed flows across your merchant network.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* BBPS & QR details section */}
          <motion.section
            id="bbps"
            className="space-y-4 scroll-mt-36"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-50 md:text-xl">BBPS, QR &amp; payouts in sync</h2>
                <p className="text-sm text-text-secondary">
                  Combine Bharat Bill Payment System coverage, QR‑based collections and instant
                  payouts so merchants see a single, unified view of their money.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm md:grid-cols-3">
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Bharat Bill Payment System
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Regulated bill rails</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Route bill payments via BBPS for electricity, water, gas, broadband and more while
                  keeping merchant journeys simple.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Instant payouts
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Funds out in seconds</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Push payouts via IMPS / UPI to bank accounts and wallets with realtime status and
                  clear audit trails for ops teams.
                </p>
              </motion.div>
              <motion.div
                className="glass-card p-4"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 230, damping: 20 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  QR orchestration
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">Static &amp; dynamic QR</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Issue and manage QR codes across outlets—from static storefront QR to dynamic,
                  per‑transaction QR with auto‑recon.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Simple footer */}
          <footer className="mt-6 border-t border-border-subtle/60 pt-4 text-sm text-text-secondary">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <p className="text-base font-semibold text-text-primary">kuberanpay</p>
                <p className="mt-1 max-w-md">
                  Orchestrate pay‑ins, payouts and utility bill payments with absolute control.
                  Unified payment infrastructure for modern businesses and agent networks.
                </p>
              </div>
              <div className="space-y-1 text-right md:text-left">
                <p>Email: support@kuberanpay.com</p>
                <p>Made for merchants across India.</p>
              </div>
            </div>
          </footer>
        </main>
        </div>
      </div>
    </div>
  )
}

