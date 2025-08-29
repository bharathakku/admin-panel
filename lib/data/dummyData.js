// Comprehensive dummy data for delivery app admin panel

export const orders = [
  {
    id: 'ORD-001234',
    customer: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    pickup: 'HSR Layout, Bangalore',
    pickupAddress: '100ft Road, HSR Layout Sector 2, Bangalore 560102',
    drop: 'MG Road, Bangalore',
    dropAddress: 'MG Road Metro Station, Brigade Road, Bangalore 560001',
    driver: 'Deepak Singh',
    driverId: 'DRV-001',
    driverPhone: '+91 87654 32109',
    vehicle: 'Bike',
    status: 'In Transit',
    amount: 245,
    amountFormatted: '₹245',
    distance: '8.5 km',
    duration: '25 min',
    time: '2 min ago',
    orderTime: '2024-08-29T10:30:00Z',
    pickupTime: '2024-08-29T10:45:00Z',
    estimatedDelivery: '2024-08-29T11:10:00Z',
    paymentMethod: 'UPI',
    orderType: 'Food',
    priority: 'Normal'
  },
  {
    id: 'ORD-001235',
    customer: 'Priya Patel',
    customerPhone: '+91 98765 43211',
    pickup: 'Koramangala, Bangalore',
    pickupAddress: '5th Block, Koramangala, Bangalore 560095',
    drop: 'Whitefield, Bangalore',
    dropAddress: 'ITPL Main Road, Whitefield, Bangalore 560066',
    driver: 'Amit Kumar',
    driverId: 'DRV-002',
    driverPhone: '+91 87654 32108',
    vehicle: 'Mini Truck',
    status: 'Assigned',
    amount: 380,
    amountFormatted: '₹380',
    distance: '15.2 km',
    duration: '45 min',
    time: '5 min ago',
    orderTime: '2024-08-29T10:25:00Z',
    pickupTime: null,
    estimatedDelivery: '2024-08-29T11:30:00Z',
    paymentMethod: 'Card',
    orderType: 'Package',
    priority: 'High'
  },
  {
    id: 'ORD-001236',
    customer: 'Karthik Reddy',
    customerPhone: '+91 98765 43212',
    pickup: 'Indiranagar, Bangalore',
    pickupAddress: '12th Main Road, Indiranagar, Bangalore 560038',
    drop: 'Electronic City, Bangalore',
    dropAddress: 'Phase 1, Electronic City, Bangalore 560100',
    driver: 'Suresh Babu',
    driverId: 'DRV-003',
    driverPhone: '+91 87654 32107',
    vehicle: 'Van',
    status: 'Picked Up',
    amount: 450,
    amountFormatted: '₹450',
    distance: '22.8 km',
    duration: '60 min',
    time: '8 min ago',
    orderTime: '2024-08-29T10:15:00Z',
    pickupTime: '2024-08-29T10:35:00Z',
    estimatedDelivery: '2024-08-29T11:45:00Z',
    paymentMethod: 'Cash',
    orderType: 'Grocery',
    priority: 'Normal'
  },
  {
    id: 'ORD-001237',
    customer: 'Neha Gupta',
    customerPhone: '+91 98765 43213',
    pickup: 'JP Nagar, Bangalore',
    pickupAddress: '7th Phase, JP Nagar, Bangalore 560078',
    drop: 'Marathahalli, Bangalore',
    dropAddress: 'Marathahalli Bridge, Bangalore 560037',
    driver: 'Rajesh M',
    driverId: 'DRV-004',
    driverPhone: '+91 87654 32106',
    vehicle: 'Bike',
    status: 'Delivered',
    amount: 320,
    amountFormatted: '₹320',
    distance: '18.5 km',
    duration: '40 min',
    time: '12 min ago',
    orderTime: '2024-08-29T09:45:00Z',
    pickupTime: '2024-08-29T10:05:00Z',
    estimatedDelivery: '2024-08-29T10:50:00Z',
    deliveryTime: '2024-08-29T10:48:00Z',
    paymentMethod: 'UPI',
    orderType: 'Medicine',
    priority: 'Urgent'
  }
];

export const customers = [
  {
    id: 'CUST-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'HSR Layout, Bangalore',
    totalOrders: 45,
    totalSpent: 12450,
    avgRating: 4.7,
    joinDate: '2023-01-15',
    status: 'Active',
    lastOrder: '2024-08-29T10:30:00Z',
    preferredPayment: 'UPI'
  },
  {
    id: 'CUST-002',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 98765 43211',
    location: 'Koramangala, Bangalore',
    totalOrders: 23,
    totalSpent: 8900,
    avgRating: 4.5,
    joinDate: '2023-03-22',
    status: 'Active',
    lastOrder: '2024-08-29T10:25:00Z',
    preferredPayment: 'Card'
  },
  {
    id: 'CUST-003',
    name: 'Karthik Reddy',
    email: 'karthik.reddy@email.com',
    phone: '+91 98765 43212',
    location: 'Indiranagar, Bangalore',
    totalOrders: 67,
    totalSpent: 19800,
    avgRating: 4.9,
    joinDate: '2022-11-08',
    status: 'VIP',
    lastOrder: '2024-08-29T10:15:00Z',
    preferredPayment: 'Cash'
  }
];

export const drivers = [
  {
    id: 'DRV-001',
    name: 'Deepak Singh',
    email: 'deepak.singh@email.com',
    phone: '+91 87654 32109',
    vehicleType: 'Bike',
    vehicleNumber: 'KA-01-HH-1234',
    licenseNumber: 'KL123456789',
    status: 'Online',
    location: 'HSR Layout',
    currentZone: 'Koramangala',
    rating: 4.8,
    totalDeliveries: 1245,
    totalEarnings: 45600,
    joinDate: '2023-01-20',
    isVerified: true,
    lastActive: '2024-08-29T11:30:00Z'
  },
  {
    id: 'DRV-002',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 87654 32108',
    vehicleType: 'Mini Truck',
    vehicleNumber: 'KA-01-BB-5678',
    licenseNumber: 'KL123456790',
    status: 'Busy',
    location: 'Koramangala',
    currentZone: 'Whitefield',
    rating: 4.6,
    totalDeliveries: 890,
    totalEarnings: 38900,
    joinDate: '2023-02-14',
    isVerified: true,
    lastActive: '2024-08-29T11:25:00Z'
  },
  {
    id: 'DRV-003',
    name: 'Suresh Babu',
    email: 'suresh.babu@email.com',
    phone: '+91 87654 32107',
    vehicleType: 'Van',
    vehicleNumber: 'KA-01-CC-9012',
    licenseNumber: 'KL123456791',
    status: 'Online',
    location: 'Indiranagar',
    currentZone: 'Electronic City',
    rating: 4.9,
    totalDeliveries: 2100,
    totalEarnings: 67800,
    joinDate: '2022-08-10',
    isVerified: true,
    lastActive: '2024-08-29T11:20:00Z'
  }
];

export const partners = [
  {
    id: 'PART-001',
    name: 'Tasty Bites Restaurant',
    email: 'orders@tastybites.com',
    phone: '+91 80 1234 5678',
    address: 'HSR Layout, Bangalore',
    category: 'Restaurant',
    cuisine: 'North Indian',
    rating: 4.5,
    totalOrders: 1250,
    revenue: 125000,
    commission: 15,
    status: 'Active',
    joinDate: '2023-01-10',
    isVerified: true,
    preparationTime: '25 min'
  },
  {
    id: 'PART-002',
    name: 'Fresh Grocery Store',
    email: 'support@freshgrocery.com',
    phone: '+91 80 2345 6789',
    address: 'Koramangala, Bangalore',
    category: 'Grocery',
    cuisine: null,
    rating: 4.3,
    totalOrders: 890,
    revenue: 98000,
    commission: 12,
    status: 'Active',
    joinDate: '2023-02-20',
    isVerified: true,
    preparationTime: '15 min'
  },
  {
    id: 'PART-003',
    name: 'MedPlus Pharmacy',
    email: 'orders@medplus.com',
    phone: '+91 80 3456 7890',
    address: 'Indiranagar, Bangalore',
    category: 'Pharmacy',
    cuisine: null,
    rating: 4.7,
    totalOrders: 2100,
    revenue: 210000,
    commission: 8,
    status: 'Active',
    joinDate: '2022-12-05',
    isVerified: true,
    preparationTime: '10 min'
  }
];

export const payments = [
  {
    id: 'PAY-001234',
    orderId: 'ORD-001234',
    customer: 'Rahul Sharma',
    amount: 245,
    method: 'UPI',
    status: 'Completed',
    transactionId: 'TXN123456789',
    gateway: 'Razorpay',
    fee: 6.13,
    netAmount: 238.87,
    timestamp: '2024-08-29T10:35:00Z'
  },
  {
    id: 'PAY-001235',
    orderId: 'ORD-001235',
    customer: 'Priya Patel',
    amount: 380,
    method: 'Card',
    status: 'Pending',
    transactionId: 'TXN123456790',
    gateway: 'Stripe',
    fee: 11.40,
    netAmount: 368.60,
    timestamp: '2024-08-29T10:25:00Z'
  }
];

export const analytics = {
  revenue: {
    today: 124850,
    yesterday: 118900,
    thisWeek: 785600,
    lastWeek: 742300,
    thisMonth: 2456000,
    lastMonth: 2234000
  },
  orders: {
    today: 1247,
    yesterday: 1156,
    thisWeek: 8765,
    lastWeek: 8234,
    thisMonth: 35678,
    lastMonth: 32456
  },
  drivers: {
    total: 328,
    online: 245,
    busy: 56,
    offline: 27
  },
  customers: {
    total: 15678,
    active: 8934,
    new: 234
  },
  zones: {
    total: 12,
    active: 10,
    coverage: 85.5
  }
};

export const deliverySettings = {
  general: {
    companyName: 'DeliveryPro',
    businessType: 'Multi-Service Delivery',
    logo: '/logo.png',
    appName: 'DeliveryPro',
    tagline: 'Fast, Reliable, Everywhere',
    timeZone: 'Asia/Kolkata',
    currency: 'INR',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24-hour'
  },
  operational: {
    operatingHours: {
      enabled: true,
      start: '06:00',
      end: '23:00',
      is24x7: false
    },
    deliveryRadius: 50, // km
    maxOrdersPerDriver: 5,
    estimatedDeliveryTime: 30, // minutes
    automaticAssignment: true,
    allowScheduledDelivery: true,
    requireSignature: false,
    allowContactlessDelivery: true
  },
  pricing: {
    baseFare: 40,
    perKm: 8,
    perMinute: 1.5,
    minimumFare: 60,
    maximumFare: 1000,
    surgeMultiplier: {
      enabled: true,
      maxMultiplier: 2.5,
      peakHours: ['08:00-10:00', '18:00-21:00']
    },
    cancellationFee: {
      enabled: true,
      beforeAssignment: 0,
      afterAssignment: 20,
      afterPickup: 50
    }
  },
  features: {
    realTimeTracking: true,
    pushNotifications: true,
    smsNotifications: true,
    emailNotifications: true,
    ratingSystem: true,
    loyaltyProgram: true,
    referralProgram: true,
    multiLanguage: false,
    darkMode: true,
    analytics: true
  },
  integrations: {
    paymentGateways: ['Razorpay', 'Stripe', 'PayU'],
    mapProvider: 'Google Maps',
    smsProvider: 'Twilio',
    emailProvider: 'SendGrid',
    pushProvider: 'Firebase FCM'
  }
};

export const vehicleTypes = [
  {
    id: 1,
    type: 'Bike',
    capacity: '15 kg',
    maxDistance: '20 km',
    baseSpeed: '35 km/h',
    nightAllowed: true,
    status: 'Active',
    icon: '🏍️',
    description: 'Fast delivery for small packages'
  },
  {
    id: 2,
    type: 'Mini Truck',
    capacity: '1000 kg',
    maxDistance: '30 km',
    baseSpeed: '28 km/h',
    nightAllowed: true,
    status: 'Active',
    icon: '🚛',
    description: 'Medium-sized deliveries'
  },
  {
    id: 3,
    type: 'Van',
    capacity: '500 kg',
    maxDistance: '25 km',
    baseSpeed: '30 km/h',
    nightAllowed: false,
    status: 'Active',
    icon: '🚐',
    description: 'Bulk deliveries and furniture'
  },
  {
    id: 4,
    type: 'Tempo',
    capacity: '2000 kg',
    maxDistance: '40 km',
    baseSpeed: '25 km/h',
    nightAllowed: true,
    status: 'Active',
    icon: '🚚',
    description: 'Large item deliveries'
  },
  {
    id: 5,
    type: 'Truck',
    capacity: '5000 kg',
    maxDistance: '100 km',
    baseSpeed: '40 km/h',
    nightAllowed: true,
    status: 'Inactive',
    icon: '🚛',
    description: 'Heavy goods transportation'
  }
];

export const zones = [
  {
    id: 1,
    name: 'Koramangala',
    city: 'Bengaluru',
    priority: 'High',
    status: 'Active',
    color: '#ef4444',
    area: '8.5 km²',
    activeDrivers: 45,
    avgDeliveryTime: 25,
    coordinates: [
      { lat: 12.9279, lng: 77.6271 },
      { lat: 12.9335, lng: 77.6356 },
      { lat: 12.9223, lng: 77.6398 },
      { lat: 12.9167, lng: 77.6313 }
    ]
  },
  {
    id: 2,
    name: 'Indiranagar',
    city: 'Bengaluru',
    priority: 'Medium',
    status: 'Active',
    color: '#3b82f6',
    area: '12.3 km²',
    activeDrivers: 32,
    avgDeliveryTime: 30,
    coordinates: [
      { lat: 12.9716, lng: 77.6412 },
      { lat: 12.9772, lng: 77.6498 },
      { lat: 12.9660, lng: 77.6540 },
      { lat: 12.9604, lng: 77.6454 }
    ]
  },
  {
    id: 3,
    name: 'Whitefield',
    city: 'Bengaluru',
    priority: 'Low',
    status: 'Active',
    color: '#22c55e',
    area: '15.7 km²',
    activeDrivers: 28,
    avgDeliveryTime: 35,
    coordinates: [
      { lat: 12.9698, lng: 77.7500 },
      { lat: 12.9854, lng: 77.7586 },
      { lat: 12.9542, lng: 77.7628 },
      { lat: 12.9486, lng: 77.7542 }
    ]
  },
  {
    id: 4,
    name: 'Gachibowli',
    city: 'Hyderabad',
    priority: 'Medium',
    status: 'Inactive',
    color: '#f59e0b',
    area: '18.2 km²',
    activeDrivers: 0,
    avgDeliveryTime: 0,
    coordinates: [
      { lat: 17.4400, lng: 78.3484 },
      { lat: 17.4489, lng: 78.3578 },
      { lat: 17.4356, lng: 78.3623 },
      { lat: 17.4267, lng: 78.3529 }
    ]
  }
];

export const reviews = [
  {
    id: 'REV-001',
    orderId: 'ORD-001234',
    customer: 'Rahul Sharma',
    driver: 'Deepak Singh',
    rating: 5,
    comment: 'Excellent service! Very fast delivery.',
    timestamp: '2024-08-29T10:50:00Z',
    type: 'Driver',
    helpful: 12
  },
  {
    id: 'REV-002',
    orderId: 'ORD-001235',
    customer: 'Priya Patel',
    partner: 'Tasty Bites Restaurant',
    rating: 4,
    comment: 'Good food quality, but packaging could be better.',
    timestamp: '2024-08-29T10:45:00Z',
    type: 'Partner',
    helpful: 8
  }
];

export const support = [
  {
    id: 'SUP-001',
    ticketId: 'TK-12345',
    customer: 'Rahul Sharma',
    subject: 'Order not delivered',
    category: 'Delivery Issue',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Support Agent 1',
    createdAt: '2024-08-29T09:30:00Z',
    updatedAt: '2024-08-29T10:15:00Z'
  },
  {
    id: 'SUP-002',
    ticketId: 'TK-12346',
    customer: 'Priya Patel',
    subject: 'Refund request',
    category: 'Payment',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Support Agent 2',
    createdAt: '2024-08-29T08:45:00Z',
    updatedAt: '2024-08-29T09:30:00Z'
  }
];

// Filter configurations for different pages
export const filterConfigs = {
  orders: [
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { value: 'Assigned', label: 'Assigned' },
        { value: 'Picked Up', label: 'Picked Up' },
        { value: 'In Transit', label: 'In Transit' },
        { value: 'Delivered', label: 'Delivered' },
        { value: 'Cancelled', label: 'Cancelled' }
      ]
    },
    {
      id: 'paymentMethod',
      label: 'Payment Method',
      type: 'select',
      options: [
        { value: 'UPI', label: 'UPI' },
        { value: 'Card', label: 'Card' },
        { value: 'Cash', label: 'Cash' }
      ]
    },
    {
      id: 'amount',
      label: 'Order Amount',
      type: 'range',
      min: 0,
      max: 2000,
      unit: '₹'
    },
    {
      id: 'orderDate',
      label: 'Order Date',
      type: 'daterange'
    }
  ],
  drivers: [
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { value: 'Online', label: 'Online' },
        { value: 'Busy', label: 'Busy' },
        { value: 'Offline', label: 'Offline' }
      ]
    },
    {
      id: 'vehicleType',
      label: 'Vehicle Type',
      type: 'select',
      options: [
        { value: 'Bike', label: 'Bike' },
        { value: 'Mini Truck', label: 'Mini Truck' },
        { value: 'Van', label: 'Van' },
        { value: 'Tempo', label: 'Tempo' }
      ]
    },
    {
      id: 'rating',
      label: 'Rating',
      type: 'range',
      min: 1,
      max: 5,
      unit: '★'
    }
  ]
};

// Search field configurations
export const searchConfigs = {
  orders: ['id', 'customer', 'pickup', 'drop', 'driver'],
  customers: ['name', 'email', 'phone', 'location'],
  drivers: ['name', 'email', 'phone', 'vehicleNumber', 'currentZone'],
  partners: ['name', 'email', 'phone', 'category', 'address'],
  payments: ['id', 'orderId', 'customer', 'transactionId']
};

export default {
  orders,
  customers,
  drivers,
  partners,
  payments,
  analytics,
  deliverySettings,
  vehicleTypes,
  zones,
  reviews,
  support,
  filterConfigs,
  searchConfigs
};
