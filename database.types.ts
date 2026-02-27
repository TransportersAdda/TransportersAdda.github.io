export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          role: 'Admin' | 'Vendor' | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          role?: 'Admin' | 'Vendor' | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'Admin' | 'Vendor' | null
          phone?: string | null
          created_at?: string
        }
      }
      fleet_owners: {
        Row: {
          id: string
          owner_name: string
          pan_card: string
          verified: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          owner_name: string
          pan_card: string
          verified?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          owner_name?: string
          pan_card?: string
          verified?: boolean | null
          created_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          owner_id: string | null
          truck_number: string
          type: string | null
          capacity: number | null
          created_at: string
        }
        Insert: {
          id?: string
          owner_id?: string | null
          truck_number: string
          type?: string | null
          capacity?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string | null
          truck_number?: string
          type?: string | null
          capacity?: number | null
          created_at?: string
        }
      }
      loads: {
        Row: {
          id: string
          origin: string
          destination: string
          material: string | null
          target_price: number | null
          status: 'Open' | 'Booked' | 'Completed' | 'Cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          origin: string
          destination: string
          material?: string | null
          target_price?: number | null
          status?: 'Open' | 'Booked' | 'Completed' | 'Cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          origin?: string
          destination?: string
          material?: string | null
          target_price?: number | null
          status?: 'Open' | 'Booked' | 'Completed' | 'Cancelled'
          created_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          load_id: string
          vendor_id: string
          amount: number
          driver_name: string | null
          driver_phone: string | null
          status: 'Pending' | 'Accepted' | 'Rejected'
          created_at: string
        }
        Insert: {
          id?: string
          load_id: string
          vendor_id: string
          amount: number
          driver_name?: string | null
          driver_phone?: string | null
          status?: 'Pending' | 'Accepted' | 'Rejected'
          created_at?: string
        }
        Update: {
          id?: string
          load_id?: string
          vendor_id?: string
          amount?: number
          driver_name?: string | null
          driver_phone?: string | null
          status?: 'Pending' | 'Accepted' | 'Rejected'
          created_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          bid_id: string
          status: 'In-Transit' | 'Delivered' | 'Closed'
          advance_paid: number | null
          balance_paid: number | null
          start_date: string
          delivery_date: string | null
        }
        Insert: {
          id?: string
          bid_id: string
          status?: 'In-Transit' | 'Delivered' | 'Closed'
          advance_paid?: number | null
          balance_paid?: number | null
          start_date?: string
          delivery_date?: string | null
        }
        Update: {
          id?: string
          bid_id?: string
          status?: 'In-Transit' | 'Delivered' | 'Closed'
          advance_paid?: number | null
          balance_paid?: number | null
          start_date?: string
          delivery_date?: string | null
        }
      }
      docs: {
        Row: {
          id: string
          trip_id: string
          type: 'RC' | 'DL' | 'LR' | 'POD'
          file_url: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          type: 'RC' | 'DL' | 'LR' | 'POD'
          file_url: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          type?: 'RC' | 'DL' | 'LR' | 'POD'
          file_url?: string
          uploaded_at?: string
        }
      }
    }
  }
}
