export type TransactionStatus = 'success' | 'pending' | 'failed' | 'processing'

export type HistoryType = 'payout' | 'payin'

export interface Transaction {
  id: string
  type: HistoryType
  createdAt: string
  amount: number
  fee: number
  status: TransactionStatus
  counterparty: string
  reference: string
}

export interface WalletEntry {
  id: string
  createdAt: string
  type: 'credit' | 'debit'
  amount: number
  balanceAfter: number
  narration: string
}


