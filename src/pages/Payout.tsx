import { useState } from 'react'
import { ArrowRightLeft, Download, UploadCloud } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

type Mode = 'single' | 'bulk'

export function Payout() {
  const [mode, setMode] = useState<Mode>('single')
  const { addToast } = useToast()

  const handleSingleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    addToast('Mock payout initiated. Receipt modal can plug in here.', 'success')
  }

  const handleTemplateDownload = () => {
    addToast('Bulk payout template download triggered (mock).', 'info')
  }

  const handleBulkUpload = () => {
    addToast('Bulk payout file upload and validation will be wired here.', 'info')
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Transfer funds"
        subtitle="Move money from your kuberanpay wallet via single or bulk payouts."
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated/80 px-4 py-1.5 text-sm text-text-secondary ring-1 ring-border-subtle/80">
            <ArrowRightLeft className="h-4 w-4" />
            UPI / IMPS / NEFT supported
          </span>
        }
      />

      <motion.div
        className="inline-flex rounded-full bg-surface-elevated/80 p-1.5 text-sm text-text-secondary ring-1 ring-border-subtle/80 md:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <button
          type="button"
          onClick={() => setMode('single')}
          className={`rounded-full px-4 py-1.5 ${
            mode === 'single'
              ? 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)]'
              : 'text-text-secondary'
          }`}
        >
          Single payout
        </button>
        <button
          type="button"
          onClick={() => setMode('bulk')}
          className={`rounded-full px-4 py-1.5 ${
            mode === 'bulk'
              ? 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)]'
              : 'text-text-secondary'
          }`}
        >
          Bulk payout
        </button>
      </motion.div>

      {mode === 'single' ? (
        <Card
          title="Bank transfer details"
          subtitle="Send a single payout to a beneficiary account."
        >
          <form onSubmit={handleSingleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary md:text-base">
                Beneficiary name
              </label>
              <input
                required
                className="h-10 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-3 text-sm text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1 md:text-base"
                placeholder="Acme Vendor Pvt. Ltd."
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary md:text-base">
                Account number
              </label>
              <input
                required
                className="h-10 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-3 text-sm text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1 md:text-base"
                placeholder="0000 0000 0000"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary md:text-base">
                IFSC code
              </label>
              <input
                required
                className="h-10 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-3 text-sm text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1 md:text-base"
                placeholder="HDFC0001234"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary md:text-base">
                Amount
              </label>
              <input
                required
                type="number"
                min={1}
                className="h-10 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-3 text-sm text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1 md:text-base"
                placeholder="₹10,000"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary md:text-base">
                Narration / purpose
              </label>
              <input
                className="h-10 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-3 text-sm text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1 md:text-base"
                placeholder="Vendor settlement / salary / refund"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" iconRight={<ArrowRightLeft className="h-3 w-3" />}>
                Initiate payout
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card
          title="Bulk payout upload"
          subtitle="Use a CSV / XLSX file to send payouts to multiple beneficiaries."
          right={
            <Button
              size="sm"
              variant="secondary"
              iconLeft={<Download className="h-3 w-3" />}
              onClick={handleTemplateDownload}
            >
              Download template
            </Button>
          }
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md text-sm md:text-base">
              <p>
                Your file should contain beneficiary name, account number, IFSC, amount and
                narration. kuberanpay will validate each row before sending payouts.
              </p>
              <p className="mt-3 text-xs text-text-secondary md:text-sm">
                Tip: keep batches focused by business purpose to simplify reconciliation.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <Button
                variant="secondary"
                size="sm"
                iconLeft={<UploadCloud className="h-4 w-4" />}
                onClick={handleBulkUpload}
              >
                Upload payout file
              </Button>
              <span className="text-xs text-text-secondary md:text-sm">Max 5,000 rows per file.</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

