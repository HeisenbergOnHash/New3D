export type UserCapability = 'payout' | 'payin' | 'cardPayin' | 'bbps'

export interface AdminUserSummary {
  id: string
  username: string
  phone: string
  kycStatus: 'pending' | 'approved' | 'rejected'
  walletBalance: string
  capabilities: Record<UserCapability, boolean>
}

export interface PendingUserRequest {
  id: string
  name: string
  phone: string
  business: string
  requestedAt: string
}

export interface AvailableBank {
  id: string
  bankName: string
  accountNumber: string
  ifsc: string
  type: 'collection' | 'settlement'
  status: 'active' | 'inactive'
}

export interface PayInRequest {
  id: string
  userId: string
  channel: 'BBPS' | 'QR' | 'CARD'
  amount: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export const mockAdminWallet = {
  balance: '₹4,50,000',
  reserved: '₹70,000',
  settlementsToday: '₹1,25,300',
}

export const mockAdminUsers: AdminUserSummary[] = [
  {
    id: 'U001',
    username: 'store01',
    phone: '9876543210',
    kycStatus: 'approved',
    walletBalance: '₹65,000',
    capabilities: {
      payout: true,
      payin: true,
      cardPayin: true,
      bbps: true,
    },
  },
  {
    id: 'U002',
    username: 'store02',
    phone: '9876500001',
    kycStatus: 'pending',
    walletBalance: '₹8,200',
    capabilities: {
      payout: false,
      payin: true,
      cardPayin: false,
      bbps: true,
    },
  },
  {
    id: 'U003',
    username: 'agent-west',
    phone: '9000000003',
    kycStatus: 'approved',
    walletBalance: '₹22,900',
    capabilities: {
      payout: true,
      payin: true,
      cardPayin: false,
      bbps: false,
    },
  },
]

export const mockPendingRequests: PendingUserRequest[] = [
  {
    id: 'REQ-101',
    name: 'Sharma Payments',
    phone: '9898989898',
    business: 'Utility & DTH collections',
    requestedAt: 'Today • 09:12 AM',
  },
  {
    id: 'REQ-102',
    name: 'Metro Grocers',
    phone: '9822001100',
    business: 'Offline retail QR & BBPS',
    requestedAt: 'Yesterday • 06:41 PM',
  },
]

export const mockAvailableBanks: AvailableBank[] = [
  {
    id: 'BANK01',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXXXX3902',
    ifsc: 'HDFC0003902',
    type: 'collection',
    status: 'active',
  },
  {
    id: 'BANK02',
    bankName: 'ICICI Bank',
    accountNumber: 'XXXXXX2210',
    ifsc: 'ICIC0002210',
    type: 'settlement',
    status: 'active',
  },
  {
    id: 'BANK03',
    bankName: 'State Bank of India',
    accountNumber: 'XXXXXX1044',
    ifsc: 'SBIN0001044',
    type: 'collection',
    status: 'inactive',
  },
]

export const mockPayInRequests: PayInRequest[] = [
  {
    id: 'PIN-9001',
    userId: 'store01',
    channel: 'BBPS',
    amount: '₹1,980',
    status: 'completed',
    createdAt: 'Today • 10:22 AM',
  },
  {
    id: 'PIN-9002',
    userId: 'store02',
    channel: 'QR',
    amount: '₹3,200',
    status: 'pending',
    createdAt: 'Today • 09:41 AM',
  },
  {
    id: 'PIN-9003',
    userId: 'agent-west',
    channel: 'CARD',
    amount: '₹7,500',
    status: 'failed',
    createdAt: 'Yesterday • 06:15 PM',
  },
]



