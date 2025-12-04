import { ArrowDownRight, ArrowUpRight, Clock, History } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

export function Dashboard() {
  const { balance } = useAuth()

  const cards = [
    {
      label: 'Total payouts',
      value: '₹3,45,200',
      meta: 'Last 30 days',
      icon: <ArrowUpRight className="h-4 w-4 text-emerald-400" />,
    },
    {
      label: 'Total collections',
      value: '₹4,12,980',
      meta: 'Including BBPS utility bills',
      icon: <ArrowDownRight className="h-4 w-4 text-sky-400" />,
    },
    {
      label: 'Pending actions',
      value: '7',
      meta: 'Payouts & pay‑in confirmations',
      icon: <Clock className="h-4 w-4 text-amber-300" />,
    },
  ]

  const walletRows = [
    {
      id: '1',
      type: 'credit',
      amount: '₹15,000',
      balanceAfter: '₹65,000',
      narration: 'BBPS electricity bill settlements',
      at: 'Today • 11:04 AM',
    },
    {
      id: '2',
      type: 'debit',
      amount: '₹5,200',
      balanceAfter: '₹50,000',
      narration: 'Instant payouts to vendors',
      at: 'Today • 09:31 AM',
    },
    {
      id: '3',
      type: 'credit',
      amount: '₹22,400',
      balanceAfter: '₹55,200',
      narration: 'Merchant QR collections (dynamic)',
      at: 'Yesterday • 08:17 PM',
    },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dashboard Overview"
        subtitle={`Available balance: ${balance ? `₹${balance}` : '₹0.00'}`}
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated/80 px-4 py-1.5 text-sm text-text-secondary ring-1 ring-border-subtle/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live • BBPS, QR & payouts are online
          </span>
        }
      />

      <motion.div
        className="grid gap-4 md:grid-cols-3"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass-card flex items-start justify-between p-5 text-sm text-text-secondary md:text-base"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-text-secondary">
                {card.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">{card.value}</p>
              <p className="mt-2 text-sm text-text-secondary md:text-base">{card.meta}</p>
            </div>
            <div className="rounded-full bg-surface-elevated/80 p-2 shadow-sm">{card.icon}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
      >
        <Card
          title="Wallet history"
          subtitle="Recent credits and debits across BBPS, QR and payout rails"
          right={
            <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
              <History className="h-4 w-4" />
              Last 3 entries
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-1.5 text-sm md:text-base">
              <thead>
                <tr className="text-sm text-text-secondary md:text-base">
                  <th className="pb-2 text-left font-medium">Type</th>
                  <th className="pb-2 text-left font-medium">Amount</th>
                  <th className="pb-2 text-left font-medium">Balance after</th>
                  <th className="pb-2 text-left font-medium">Narration</th>
                  <th className="pb-2 text-left font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {walletRows.map((row) => (
                  <tr key={row.id} className="align-top">
                    <td className="rounded-l-xl bg-surface-elevated/80 px-3 py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          row.type === 'credit'
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : 'bg-rose-500/10 text-rose-300'
                        }`}
                      >
                        {row.type === 'credit' ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td className="bg-surface-elevated/80 px-3 py-2.5 font-medium">{row.amount}</td>
                    <td className="bg-surface-elevated/80 px-3 py-2.5 font-medium">{row.balanceAfter}</td>
                    <td className="bg-surface-elevated/80 px-3 py-2.5">{row.narration}</td>
                    <td className="rounded-r-xl bg-surface-elevated/80 px-3 py-2.5 text-text-secondary">
                      {row.at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}



