import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, BadgeCheck, Ban, RotateCcw, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Toggle } from '../components/ui/Toggle'
import { mockAdminUsers, type AdminUserSummary, type UserCapability } from '../constants/admin'
import { useToast } from '../context/ToastContext'

export function ManageUsers() {
  const [users, setUsers] = useState<AdminUserSummary[]>(mockAdminUsers)
  const { addToast } = useToast()

  const toggleCapability = (userId: string, capability: UserCapability, next: boolean) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, capabilities: { ...u.capabilities, [capability]: next } } : u,
      ),
    )
    addToast(
      `${capability.toUpperCase()} ${next ? 'enabled' : 'disabled'} for ${userId} (mock only).`,
      'info',
    )
  }

  const handleCredit = (userId: string) => {
    addToast(`Credit flow for ${userId} would open here (mock).`, 'info')
  }

  const handleDebit = (userId: string) => {
    addToast(`Debit flow for ${userId} would open here (mock).`, 'info')
  }

  const handleChargeback = (userId: string) => {
    addToast(`Chargeback / reversal flow for ${userId} would open here (mock).`, 'info')
  }

  const getKycChipClasses = (status: AdminUserSummary['kycStatus']) => {
    if (status === 'approved') return 'bg-emerald-500/10 text-emerald-300'
    if (status === 'pending') return 'bg-amber-500/10 text-amber-300'
    return 'bg-rose-500/10 text-rose-300'
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="User management"
        subtitle="Approve accounts and control access to payouts, pay‑ins, card pay‑ins and BBPS."
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated/80 px-4 py-1.5 text-sm text-text-secondary ring-1 ring-border-subtle/80">
            <Shield className="h-4 w-4" />
            Capability controls
          </span>
        }
      />

      <motion.div
        variants={{ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          title="User grid"
          subtitle="Each row represents a merchant or agent. Toggle capabilities to instantly restrict or grant access."
        >
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-y-1 text-sm md:text-base">
              <thead>
                <tr className="text-sm text-text-secondary md:text-base">
                  <th className="pb-1 text-left font-medium">User</th>
                  <th className="pb-1 text-left font-medium">KYC</th>
                  <th className="pb-1 text-left font-medium">Wallet</th>
                  <th className="pb-1 text-left font-medium">Payout</th>
                  <th className="pb-1 text-left font-medium">Pay‑in</th>
                  <th className="pb-1 text-left font-medium">Card pay‑in</th>
                  <th className="pb-1 text-left font-medium">BBPS</th>
                  <th className="pb-1 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="align-top">
                    <td className="rounded-l-xl bg-surface-elevated/80 px-3 py-2">
                      <p className="font-medium text-text-primary">{user.username}</p>
                      <p className="text-xs text-text-secondary md:text-sm">
                        {user.id} • {user.phone}
                      </p>
                    </td>
                    <td className="bg-surface-elevated/80 px-3 py-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getKycChipClasses(
                          user.kycStatus,
                        )}`}
                      >
                        {user.kycStatus === 'approved' && <BadgeCheck className="h-3 w-3" />}
                        {user.kycStatus === 'rejected' && <Ban className="h-3 w-3" />}
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="bg-surface-elevated/80 px-3 py-2">{user.walletBalance}</td>
                    <td className="bg-surface-elevated/80 px-3 py-2 text-center">
                      <Toggle
                        checked={user.capabilities.payout}
                        onChange={(next) => toggleCapability(user.id, 'payout', next)}
                        className="justify-center"
                      />
                    </td>
                    <td className="bg-surface-elevated/80 px-3 py-2 text-center">
                      <Toggle
                        checked={user.capabilities.payin}
                        onChange={(next) => toggleCapability(user.id, 'payin', next)}
                        className="justify-center"
                      />
                    </td>
                    <td className="bg-surface-elevated/80 px-3 py-2 text-center">
                      <Toggle
                        checked={user.capabilities.cardPayin}
                        onChange={(next) => toggleCapability(user.id, 'cardPayin', next)}
                        className="justify-center"
                      />
                    </td>
                    <td className="bg-surface-elevated/80 px-3 py-2 text-center">
                      <Toggle
                        checked={user.capabilities.bbps}
                        onChange={(next) => toggleCapability(user.id, 'bbps', next)}
                        className="justify-center"
                      />
                    </td>
                    <td className="rounded-r-xl bg-surface-elevated/80 px-3 py-2.5">
                      <div className="flex flex-wrap gap-1.5 text-xs md:text-sm">
                        <button
                          type="button"
                          onClick={() => handleCredit(user.id)}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                        >
                          <ArrowDownRight className="h-3.5 w-3.5" />
                          Credit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDebit(user.id)}
                          className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          Debit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChargeback(user.id)}
                          className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-2.5 py-1 text-xs font-medium text-text-secondary"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Chargeback
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-2 md:hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl bg-surface-elevated/80 px-4 py-4 text-sm text-text-secondary"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-medium text-text-primary">{user.username}</p>
                    <p className="text-xs text-text-secondary md:text-sm">
                      {user.id} • {user.phone}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary md:text-sm">
                      Wallet: <span className="font-semibold">{user.walletBalance}</span>
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getKycChipClasses(
                      user.kycStatus,
                    )}`}
                  >
                    {user.kycStatus === 'approved' && <BadgeCheck className="h-3.5 w-3.5" />}
                    {user.kycStatus === 'rejected' && <Ban className="h-3.5 w-3.5" />}
                    {user.kycStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Toggle
                    label="Payout"
                    checked={user.capabilities.payout}
                    onChange={(next) => toggleCapability(user.id, 'payout', next)}
                    className="w-full justify-between"
                  />
                  <Toggle
                    label="Pay‑in"
                    checked={user.capabilities.payin}
                    onChange={(next) => toggleCapability(user.id, 'payin', next)}
                    className="w-full justify-between"
                  />
                  <Toggle
                    label="Card pay‑in"
                    checked={user.capabilities.cardPayin}
                    onChange={(next) => toggleCapability(user.id, 'cardPayin', next)}
                    className="w-full justify-between"
                  />
                  <Toggle
                    label="BBPS"
                    checked={user.capabilities.bbps}
                    onChange={(next) => toggleCapability(user.id, 'bbps', next)}
                    className="w-full justify-between"
                  />
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5 text-xs md:text-sm">
                  <button
                    type="button"
                    onClick={() => handleCredit(user.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                  >
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    Credit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDebit(user.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChargeback(user.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-2.5 py-1 text-xs font-medium text-text-secondary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Chargeback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

