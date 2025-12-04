import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'

type ChargeMode = 'fixed' | 'percentage'

interface ChargeTier {
  id: number
  minAmount: string
  maxAmount: string
  serviceProviderFixed: string
  serviceProviderPercentage: string
  userFixed: string
  userPercentage: string
  mode: ChargeMode
}

const payoutTiers: ChargeTier[] = [
  {
    id: 1,
    minAmount: '0.00',
    maxAmount: '1,000.00',
    serviceProviderFixed: '5.00',
    serviceProviderPercentage: '0.50',
    userFixed: '8.00',
    userPercentage: '0.75',
    mode: 'fixed',
  },
  {
    id: 2,
    minAmount: '1,000.01',
    maxAmount: '10,000.00',
    serviceProviderFixed: '7.50',
    serviceProviderPercentage: '0.40',
    userFixed: '10.00',
    userPercentage: '0.65',
    mode: 'fixed',
  },
]

const payinTiers: ChargeTier[] = [
  {
    id: 1,
    minAmount: '0.00',
    maxAmount: '1,000.00',
    serviceProviderFixed: '2.00',
    serviceProviderPercentage: '0.30',
    userFixed: '4.00',
    userPercentage: '0.50',
    mode: 'percentage',
  },
  {
    id: 2,
    minAmount: '1,000.01',
    maxAmount: '10,000.00',
    serviceProviderFixed: '3.00',
    serviceProviderPercentage: '0.25',
    userFixed: '5.00',
    userPercentage: '0.45',
    mode: 'percentage',
  },
]

export function AdminCommercials() {
  const [payoutRows, setPayoutRows] = useState<ChargeTier[]>(payoutTiers)
  const [payinRows, setPayinRows] = useState<ChargeTier[]>(payinTiers)

  const renderTable = (
    tiers: ChargeTier[],
    onModeChange: (id: number, mode: ChargeMode) => void,
    onUpdate: (id: number, field: keyof ChargeTier, value: string) => void,
  ) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-1 text-sm md:text-base">
        <thead>
          <tr className="text-sm text-text-secondary md:text-base">
            <th className="pb-1 text-left font-medium">Min amount</th>
            <th className="pb-1 text-left font-medium">Max amount</th>
            <th className="pb-1 text-left font-medium">Mode</th>
            <th className="pb-1 text-left font-medium">SP charge</th>
            <th className="pb-1 text-left font-medium">User charge</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id} className="align-top">
              <td className="rounded-l-xl bg-surface-elevated/80 px-3 py-2 font-mono">
                <input
                  type="text"
                  value={tier.minAmount}
                  onChange={(e) => onUpdate(tier.id, 'minAmount', e.target.value)}
                  className="w-full bg-transparent text-xs text-text-primary outline-none md:text-sm"
                />
              </td>
              <td className="bg-surface-elevated/80 px-3 py-2 font-mono">
                <input
                  type="text"
                  value={tier.maxAmount}
                  onChange={(e) => onUpdate(tier.id, 'maxAmount', e.target.value)}
                  className="w-full bg-transparent text-xs text-text-primary outline-none md:text-sm"
                />
              </td>
              <td className="bg-surface-elevated/80 px-3 py-2">
                <div className="inline-flex rounded-full bg-surface/80 p-0.5 text-xs text-text-secondary ring-1 ring-border-subtle/80 md:text-sm">
                  <button
                    type="button"
                    onClick={() => onModeChange(tier.id, 'fixed')}
                    className={`rounded-full px-2.5 py-0.5 ${
                      tier.mode === 'fixed'
                        ? 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)]'
                        : 'text-text-secondary'
                    }`}
                  >
                    Fixed
                  </button>
                  <button
                    type="button"
                    onClick={() => onModeChange(tier.id, 'percentage')}
                    className={`rounded-full px-2.5 py-0.5 ${
                      tier.mode === 'percentage'
                        ? 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)]'
                        : 'text-text-secondary'
                    }`}
                  >
                    %
                  </button>
                </div>
              </td>
              <td className="bg-surface-elevated/80 px-3 py-2">
                {tier.mode === 'fixed' ? (
                  <div className="flex items-center gap-1 text-xs md:text-sm">
                    <span className="text-text-secondary">₹</span>
                    <input
                      type="text"
                      value={tier.serviceProviderFixed}
                      onChange={(e) => onUpdate(tier.id, 'serviceProviderFixed', e.target.value)}
                      className="w-20 bg-transparent text-xs text-text-primary outline-none md:w-24 md:text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs md:text-sm">
                    <input
                      type="text"
                      value={tier.serviceProviderPercentage}
                      onChange={(e) =>
                        onUpdate(tier.id, 'serviceProviderPercentage', e.target.value)
                      }
                      className="w-16 bg-transparent text-xs text-text-primary outline-none md:w-20 md:text-sm"
                    />
                    <span className="text-text-secondary">%</span>
                  </div>
                )}
              </td>
              <td className="rounded-r-xl bg-surface-elevated/80 px-3 py-2">
                {tier.mode === 'fixed' ? (
                  <div className="flex items-center gap-1 text-xs md:text-sm">
                    <span className="text-text-secondary">₹</span>
                    <input
                      type="text"
                      value={tier.userFixed}
                      onChange={(e) => onUpdate(tier.id, 'userFixed', e.target.value)}
                      className="w-20 bg-transparent text-xs text-text-primary outline-none md:w-24 md:text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs md:text-sm">
                    <input
                      type="text"
                      value={tier.userPercentage}
                      onChange={(e) => onUpdate(tier.id, 'userPercentage', e.target.value)}
                      className="w-16 bg-transparent text-xs text-text-primary outline-none md:w-20 md:text-sm"
                    />
                    <span className="text-text-secondary">%</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-4">
      <PageHeader
        title="Commercials"
        subtitle="Configure payout and pay‑in transaction charges by amount slabs. For each slab, choose either fixed or percentage‑based charges."
      />

      <Card
        title="Payout transaction charges"
        subtitle="Per-slab mode: choose Fixed or Percentage for each payout tier."
        right={
          <button
            type="button"
            onClick={() =>
              setPayoutRows((prev) => [
                ...prev,
                {
                  id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                  minAmount: '0.00',
                  maxAmount: '0.00',
                  serviceProviderFixed: '0.00',
                  serviceProviderPercentage: '0.00',
                  userFixed: '0.00',
                  userPercentage: '0.00',
                  mode: 'fixed',
                },
              ])
            }
            className="rounded-full bg-surface-elevated/80 px-3 py-1 text-xs font-medium text-text-secondary ring-1 ring-border-subtle/80 hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70 md:text-sm"
          >
            + Add payout slab
          </button>
        }
      >
        {renderTable(
          payoutRows,
          (id, mode) =>
            setPayoutRows((prev) => prev.map((row) => (row.id === id ? { ...row, mode } : row))),
          (id, field, value) =>
            setPayoutRows((prev) =>
              prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
            ),
        )}
      </Card>

      <Card
        title="Pay‑in transaction charges"
        subtitle="Per-slab mode: choose Fixed or Percentage for each pay‑in tier."
        right={
          <button
            type="button"
            onClick={() =>
              setPayinRows((prev) => [
                ...prev,
                {
                  id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                  minAmount: '0.00',
                  maxAmount: '0.00',
                  serviceProviderFixed: '0.00',
                  serviceProviderPercentage: '0.00',
                  userFixed: '0.00',
                  userPercentage: '0.00',
                  mode: 'fixed',
                },
              ])
            }
            className="rounded-full bg-surface-elevated/80 px-3 py-1 text-xs font-medium text-text-secondary ring-1 ring-border-subtle/80 hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70 md:text-sm"
          >
            + Add pay‑in slab
          </button>
        }
      >
        {renderTable(
          payinRows,
          (id, mode) =>
            setPayinRows((prev) => prev.map((row) => (row.id === id ? { ...row, mode } : row))),
          (id, field, value) =>
            setPayinRows((prev) =>
              prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
            ),
        )}
      </Card>
    </div>
  )
}


