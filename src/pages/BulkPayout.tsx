import { Download, FileSpreadsheet, ListChecks } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

const mockBatches = [
  {
    id: 'BATCH-2025-12-04-01',
    createdAt: 'Today • 11:15 AM',
    rows: 120,
    succeeded: 118,
    failed: 2,
  },
  {
    id: 'BATCH-2025-12-03-02',
    createdAt: 'Yesterday • 06:05 PM',
    rows: 340,
    succeeded: 337,
    failed: 3,
  },
]

export function BulkPayout() {
  const { addToast } = useToast()

  const handleTemplate = () => {
    addToast('Bulk payout template download triggered (mock).', 'info')
  }

  const handleUpload = () => {
    addToast('Bulk payout file upload and validation will be wired here.', 'info')
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Bulk payout"
        subtitle="Upload a single file to trigger payouts for hundreds or thousands of beneficiaries."
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-elevated/80 px-3 py-1 text-[11px] text-text-secondary ring-1 ring-border-subtle/80">
            <FileSpreadsheet className="h-3 w-3" />
            CSV / XLSX supported
          </span>
        }
      />

      <motion.div
        className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          title="Upload bulk payout file"
          subtitle="Your file should contain beneficiary name, account, IFSC, amount and narration."
          right={
            <Button
              size="sm"
              variant="secondary"
              iconLeft={<Download className="h-3 w-3" />}
              onClick={handleTemplate}
            >
              Download template
            </Button>
          }
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md text-[11px]">
              <p>
                kuberanpay validates each row for account format, IFSC, duplicate detection and
                available wallet balance before sending payouts to the bank.
              </p>
              <p className="mt-2 text-[10px] text-text-secondary">
                You can group rows by business purpose (salary, vendor, refund) to simplify
                approvals and reconciliation.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <Button
                size="sm"
                variant="secondary"
                iconLeft={<FileSpreadsheet className="h-3 w-3" />}
                onClick={handleUpload}
              >
                Upload payout file
              </Button>
              <span className="text-[10px] text-text-secondary">
                Max 5,000 rows per file • Larger volumes can be split across batches.
              </span>
            </div>
          </div>
        </Card>

        <Card
          title="Recent bulk batches"
          subtitle="Illustrative history of previously uploaded payout batches."
          right={
            <span className="inline-flex items-center gap-1 text-[11px] text-text-secondary">
              <ListChecks className="h-3 w-3" />
              Validation summary
            </span>
          }
        >
          <ul className="space-y-2 text-[11px]">
            {mockBatches.map((batch) => (
              <li
                key={batch.id}
                className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5"
              >
                <div>
                  <p className="font-medium text-text-primary">{batch.id}</p>
                  <p className="text-[10px] text-text-secondary">{batch.createdAt}</p>
                </div>
                <div className="text-right text-[10px] text-text-secondary">
                  <p>
                    Rows: <span className="font-semibold text-text-primary">{batch.rows}</span>
                  </p>
                  <p>
                    Succeeded:{' '}
                    <span className="font-semibold text-emerald-300">{batch.succeeded}</span> •
                    Failed:{' '}
                    <span className="font-semibold text-amber-300">
                      {batch.failed}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  )
}

