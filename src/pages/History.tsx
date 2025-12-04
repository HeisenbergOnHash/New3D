import { useState } from 'react'
import { Download, Filter, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useToast } from '../context/ToastContext'
import { exportToXLSX } from '../utils/export'

type HistoryTab = 'payout' | 'payin'

const rows = [
  {
    id: 'TXN001',
    type: 'payout',
    date: '2025-12-04',
    time: '11:04 AM',
    counterparty: 'Vendor Payout',
    amount: '₹12,500',
    status: 'success',
  },
  {
    id: 'TXN002',
    type: 'payin',
    date: '2025-12-04',
    time: '10:22 AM',
    counterparty: 'BBPS – Electricity',
    amount: '₹1,980',
    status: 'success',
  },
  {
    id: 'TXN003',
    type: 'payin',
    date: '2025-12-03',
    time: '08:17 PM',
    counterparty: 'Dynamic QR – Store 07',
    amount: '₹3,200',
    status: 'pending',
  },
]

export function History() {
  const [tab, setTab] = useState<HistoryTab>('payout')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const { addToast } = useToast()

  const filtered = rows.filter((row) => {
    if (row.type !== tab) return false

    const rowDate = new Date(row.date)
    if (fromDate) {
      const start = new Date(fromDate)
      if (rowDate < start) return false
    }
    if (toDate) {
      const end = new Date(toDate)
      end.setHours(23, 59, 59, 999)
      if (rowDate > end) return false
    }
    return true
  })

  const handleExport = () => {
    if (!filtered.length) {
      addToast('No rows to export for the selected filter.', 'info')
      return
    }
    const data = filtered.map((row) => ({
      'Txn ID': row.id,
      Type: row.type,
      Date: row.date,
      Time: row.time,
      Counterparty: row.counterparty,
      Amount: row.amount,
      Status: row.status,
    }))
    exportToXLSX(data, `kuberanpay-${tab}-history.xlsx`)
    addToast(`Exported ${filtered.length} ${tab} records to XLSX.`, 'success')
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Transaction history"
        subtitle="View and export payouts and pay‑ins across BBPS, QR and bank rails."
        right={
          <Button
            size="sm"
            variant="secondary"
            onClick={handleExport}
            iconLeft={<Download className="h-3 w-3" />}
          >
            Export XLSX
          </Button>
        }
      />

      <motion.div
        className="flex flex-wrap items-center justify-between gap-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-flex rounded-full bg-surface-elevated/80 p-1.5 text-sm text-text-secondary ring-1 ring-border-subtle/80">
          <button
            type="button"
            onClick={() => setTab('payout')}
            className={`rounded-full px-3 py-1 ${
              tab === 'payout'
                ? 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)]'
                : 'text-text-secondary'
            }`}
          >
            Payout
          </button>
          <button
            type="button"
            onClick={() => setTab('payin')}
            className={`rounded-full px-3 py-1 ${
              tab === 'payin'
                ? 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)]'
                : 'text-text-secondary'
            }`}
          >
            Pay‑in
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary md:text-base">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-elevated/80 px-3 py-1.5 ring-1 ring-border-subtle/80">
            <Calendar className="h-4 w-4" />
            <span className="hidden text-xs uppercase tracking-[0.18em] text-text-secondary md:inline">
              Date range
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-text-secondary">From</span>
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-8 rounded-lg bg-surface-elevated/80 px-2 text-xs text-text-primary outline-none ring-1 ring-border-subtle/80 focus:ring-primary/60 md:text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-text-secondary">To</span>
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="h-8 rounded-lg bg-surface-elevated/80 px-2 text-xs text-text-primary outline-none ring-1 ring-border-subtle/80 focus:ring-primary/60 md:text-sm"
              />
            </label>
            {(fromDate || toDate) && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('')
                  setToDate('')
                }}
                className="inline-flex items-center gap-1 rounded-full bg-surface-elevated/80 px-3 py-1 text-xs text-text-secondary ring-1 ring-border-subtle/80 hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70 md:text-sm"
              >
                <Filter className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <Card
        title={tab === 'payout' ? 'Payout history' : 'Pay‑in history'}
        subtitle={
          tab === 'payout'
            ? 'Outgoing transfers and instant payouts from your kuberanpay wallet.'
            : 'Incoming BBPS and QR collections settling into your wallet.'
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-sm md:text-base">
            <thead>
              <tr className="text-sm text-text-secondary md:text-base">
                <th className="pb-1 text-left font-medium">Txn ID</th>
                <th className="pb-1 text-left font-medium">Date</th>
                <th className="pb-1 text-left font-medium">Counterparty</th>
                <th className="pb-1 text-left font-medium">Amount</th>
                <th className="pb-1 text-left font-medium">Status</th>
              </tr>
            </thead>
              <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="rounded-l-xl bg-surface-elevated/80 px-3 py-2 font-mono text-sm md:text-base">
                    {row.id}
                  </td>
                  <td className="bg-surface-elevated/80 px-3 py-2">
                    {row.date}
                    <span className="block text-xs text-text-secondary">{row.time}</span>
                  </td>
                  <td className="bg-surface-elevated/80 px-3 py-2">{row.counterparty}</td>
                  <td className="bg-surface-elevated/80 px-3 py-2">{row.amount}</td>
                  <td className="rounded-r-xl bg-surface-elevated/80 px-3 py-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        row.status === 'success'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : row.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'bg-rose-500/10 text-rose-300'
                      }`}
                    >
                      {row.status === 'success'
                        ? 'Success'
                        : row.status === 'pending'
                        ? 'Pending'
                        : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

