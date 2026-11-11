export const STATUSES = [
  { key: "created", label: "Label created" },
  { key: "picked_up", label: "Picked up" },
  { key: "in_transit", label: "In transit" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
  { key: "exception", label: "Exception" },
];

export const COURIERS = ["SwiftExpress", "LBC Express", "J&T Express", "Grab Express", "DHL"];

const d = (daysAgo, hour, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const seedShipments = [
  {
    id: "CT-100001",
    courier: "SwiftExpress",
    sender: "Mika Store",
    recipient: "Juan Dela Cruz",
    origin: "Quezon City",
    destination: "Cebu City",
    status: "in_transit",
    weightKg: 2.4,
    events: [
      { status: "created", location: "Quezon City", note: "Shipment label created", at: d(3, 9) },
      { status: "picked_up", location: "Quezon City", note: "Picked up by courier", at: d(3, 14, 30) },
      { status: "in_transit", location: "Manila Hub", note: "Arrived at sorting hub", at: d(2, 8, 15) },
    ],
  },
  {
    id: "CT-100002",
    courier: "LBC Express",
    sender: "TechHub PH",
    recipient: "Ana Reyes",
    origin: "Makati",
    destination: "Davao City",
    status: "out_for_delivery",
    weightKg: 0.8,
    events: [
      { status: "created", location: "Makati", note: "Shipment label created", at: d(4, 10) },
      { status: "picked_up", location: "Makati", note: "Picked up by courier", at: d(4, 15) },
      { status: "out_for_delivery", location: "Davao City", note: "Rider is on the way", at: d(0, 8, 30) },
    ],
  },
  {
    id: "CT-100003",
    courier: "J&T Express",
    sender: "Bookworm Shop",
    recipient: "Carlo Santos",
    origin: "Pasig",
    destination: "Baguio",
    status: "delivered",
    weightKg: 1.2,
    events: [
      { status: "created", location: "Pasig", note: "Shipment label created", at: d(6, 9) },
      { status: "in_transit", location: "Tarlac Hub", note: "Arrived at sorting hub", at: d(5, 11) },
      { status: "delivered", location: "Baguio", note: "Delivered, signed by recipient", at: d(4, 13, 20) },
    ],
  },
];
