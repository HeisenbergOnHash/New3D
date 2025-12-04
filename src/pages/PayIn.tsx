import { QrCode, RefreshCw, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

export function PayIn() {
  const { addToast } = useToast()

  const handleShowExisting = () => {
    addToast('Existing static QR will be shown here (mock).', 'info')
  }

  const handleGenerate = () => {
    addToast('New dynamic QR generation flow can be plugged in here.', 'success')
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pay‑in"
        subtitle="Manage QR codes and BBPS pay‑ins that top up your kuberanpay wallet."
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-elevated/80 px-3 py-1 text-[11px] text-text-secondary ring-1 ring-border-subtle/80">
            <Wallet className="h-3 w-3" />
            Wallet top‑ups
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
          title="Pay‑in QR management"
          subtitle="Issue and rotate static or dynamic QR codes for collections."
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md text-[11px]">
              <p>
                Use static QR for always‑on collections at your outlets, or dynamic QR for
                invoice‑linked and one‑time payments. kuberanpay keeps both in sync with your
                wallet.
              </p>
              <p className="mt-2 text-[10px] text-text-secondary">
                BBPS and UPI QR support mean your merchants can accept payments across a wide range
                of billers and banks.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  iconLeft={<QrCode className="h-3 w-3" />}
                  onClick={handleShowExisting}
                >
                  Show existing QR
                </Button>
                <Button
                  size="sm"
                  iconLeft={<RefreshCw className="h-3 w-3" />}
                  onClick={handleGenerate}
                >
                  Generate QR
                </Button>
              </div>
              <span className="text-[10px] text-text-secondary">
                You can rotate QR codes safely without disrupting settlement flows.
              </span>
            </div>
          </div>
        </Card>

        <Card
          title="Recent pay‑ins"
          subtitle="Sample entries showing how BBPS and QR top up your wallet."
        >
          <ul className="space-y-2 text-[11px]">
            <li className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5">
              <div>
                <p className="font-medium text-text-primary">BBPS – Electricity</p>
                <p className="text-[10px] text-text-secondary">Store 05 • Today • 10:22 AM</p>
              </div>
              <p className="font-semibold text-emerald-300">+ ₹1,980</p>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-surface-elevated/80 px-2 py-1.5">
              <div>
                <p className="font-medium text-text-primary">Dynamic QR – Food court</p>
                <p className="text-[10px] text-text-secondary">Mall hub • Yesterday • 08:17 PM</p>
              </div>
              <p className="font-semibold text-emerald-300">+ ₹3,200</p>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  )
}

