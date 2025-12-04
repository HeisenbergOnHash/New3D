import { ArrowDownRight, ArrowUpRight, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { mockAdminWallet, mockAdminUsers, mockPendingRequests } from '../constants/admin'

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

export function AdminDashboard() {
  const approvedUsers = mockAdminUsers.filter((u) => u.kycStatus === 'approved').length

  return (
    <div className="space-y-4">
      <PageHeader
        title="Admin dashboard"
        subtitle="Master wallet, merchant network and onboarding pipeline at a glance."
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated/80 px-4 py-1.5 text-sm text-text-secondary ring-1 ring-border-subtle/80">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Admin mode • kuberanpay
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
        <div className="glass-card flex items-start justify-between p-5 text-sm text-text-secondary md:text-base">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-text-secondary">
              Master wallet balance
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">{mockAdminWallet.balance}</p>
            <p className="mt-2 text-sm text-text-secondary md:text-base">
              Reserved float: <span className="font-medium">{mockAdminWallet.reserved}</span>
            </p>
          </div>
          <div className="rounded-full bg-surface-elevated/80 p-2">
            <ArrowDownRight className="h-4 w-4 text-emerald-400" />
          </div>
        </div>
        <div className="glass-card flex items-start justify-between p-5 text-sm text-text-secondary md:text-base">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-text-secondary">
              Today&apos;s settlements
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">
              {mockAdminWallet.settlementsToday}
            </p>
            <p className="mt-2 text-sm text-text-secondary md:text-base">
              Net across BBPS, QR and payouts for T+0 settlement.
            </p>
          </div>
          <div className="rounded-full bg-surface-elevated/80 p-2">
            <ArrowUpRight className="h-4 w-4 text-sky-400" />
          </div>
        </div>
        <div className="glass-card flex items-start justify-between p-5 text-sm text-text-secondary md:text-base">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-text-secondary">
              Active merchants
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">{approvedUsers}</p>
            <p className="mt-2 text-sm text-text-secondary md:text-base">
              Approved users with at least one capability enabled.
            </p>
          </div>
          <div className="rounded-full bg-surface-elevated/80 p-2">
            <Users className="h-4 w-4 text-violet-300" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.65, delay: 0.05, ease: 'easeOut' }}
      >
        <Card
          title="Pending account creation requests"
          subtitle="Approve merchants and agents before enabling payouts and BBPS."
        >
          {mockPendingRequests.length === 0 ? (
            <p className="text-sm text-text-secondary md:text-base">No pending requests right now.</p>
          ) : (
            <ul className="space-y-2 text-sm md:text-base">
              {mockPendingRequests.map((req) => (
                <li
                  key={req.id}
                  className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5"
                >
                  <div>
                    <p className="font-medium text-text-primary">
                      {req.name}{' '}
                      <span className="text-xs text-text-secondary md:text-sm">({req.phone})</span>
                    </p>
                    <p className="text-xs text-text-secondary md:text-sm">
                      {req.business} • {req.requestedAt}
                    </p>
                  </div>
                  <div className="flex gap-1 text-xs md:text-sm">
                    <button className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                      Approve
                    </button>
                    <button className="rounded-full bg-rose-500/10 px-2 py-0.5 text-rose-300">
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Capability overview"
          subtitle="How many users can access payouts, pay‑ins, card pay‑ins and BBPS."
        >
          <ul className="space-y-1.5 text-sm md:text-base">
            <li className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5">
              <span>Payout enabled</span>
              <span className="font-semibold text-emerald-300">
                {mockAdminUsers.filter((u) => u.capabilities.payout).length}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5">
              <span>Pay‑in enabled</span>
              <span className="font-semibold text-emerald-300">
                {mockAdminUsers.filter((u) => u.capabilities.payin).length}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5">
              <span>Card pay‑in enabled</span>
              <span className="font-semibold text-emerald-300">
                {mockAdminUsers.filter((u) => u.capabilities.cardPayin).length}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5">
              <span>BBPS enabled</span>
              <span className="font-semibold text-emerald-300">
                {mockAdminUsers.filter((u) => u.capabilities.bbps).length}
              </span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  )
}

