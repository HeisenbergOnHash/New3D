import { useState } from 'react'
import { Download, Filter } from 'lucide-react'
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
  const { addToast } = useToast()

  const filtered = rows.filter((row) => row.type === tab)

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
        className="flex flex-wrap items-center justify-between gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-flex rounded-full bg-surface-elevated/80 p-1 text-[11px] text-text-secondary ring-1 ring-border-subtle/80">
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

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-secondary">
          <Filter className="h-3 w-3" />
          <span>Date filters &amp; quick ranges can plug in here.</span>
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
          <table className="min-w-full border-separate border-spacing-y-1 text-xs">
            <thead>
              <tr className="text-[11px] text-text-secondary">
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
                  <td className="rounded-l-xl bg-surface-elevated/80 px-2 py-2 font-mono text-[11px]">
                    {row.id}
                  </td>
                  <td className="bg-surface-elevated/80 px-2 py-2">
                    {row.date}
                    <span className="block text-[10px] text-text-secondary">{row.time}</span>
                  </td>
                  <td className="bg-surface-elevated/80 px-2 py-2">{row.counterparty}</td>
                  <td className="bg-surface-elevated/80 px-2 py-2">{row.amount}</td>
                  <td className="rounded-r-xl bg-surface-elevated/80 px-2 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
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

