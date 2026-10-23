const day = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const seedData = {
  users: [
    { id: 'u-chairman', name: 'Chairman Raj', role: 'chairman', phone: '9000000001', projectId: null },
    { id: 'u-md', name: 'MD Kumar', role: 'md', phone: '9000000002', projectId: null },
    { id: 'u-manager', name: 'Manager Selvam', role: 'site_manager', phone: '9000000003', projectId: 'p1' },
    { id: 'u-engineer', name: 'Engineer Ravi', role: 'site_engineer', phone: '9000000004', projectId: 'p1' },
    { id: 'u-engineer2', name: 'Engineer Meena', role: 'site_engineer', phone: '9000000005', projectId: 'p2' },
  ],
  projects: [
    { id: 'p1', name: 'Anna Nagar Apartments', location: 'Chennai', startDate: day(-60), endDate: day(90) },
    { id: 'p2', name: 'Coimbatore Bridge', location: 'Coimbatore', startDate: day(-120), endDate: day(-5) },
    { id: 'p3', name: 'Madurai Road Work', location: 'Madurai', startDate: day(-10), endDate: day(120) },
  ],
  tasks: [
    { id: 't1', projectId: 'p1', title: 'Foundation concrete', priority: 'High', weight: 40, startDate: day(-50), deadline: day(-10), status: 'in_progress', completion: 90, assignedTo: 'u-engineer' },
    { id: 't2', projectId: 'p1', title: 'Brick work - Block A', priority: 'Medium', weight: 35, startDate: day(-20), deadline: day(30), status: 'in_progress', completion: 30, assignedTo: 'u-engineer' },
    { id: 't3', projectId: 'p1', title: 'Electrical conduit', priority: 'Low', weight: 25, startDate: day(5), deadline: day(50), status: 'assigned', completion: 0, assignedTo: 'u-engineer' },
    { id: 't4', projectId: 'p2', title: 'Pier construction', priority: 'High', weight: 60, startDate: day(-100), deadline: day(-20), status: 'in_progress', completion: 80, assignedTo: 'u-engineer2' },
    { id: 't5', projectId: 'p2', title: 'Deck slab', priority: 'High', weight: 40, startDate: day(-30), deadline: day(-5), status: 'in_progress', completion: 50, assignedTo: 'u-engineer2' },
    { id: 't6', projectId: 'p3', title: 'Earthwork', priority: 'Medium', weight: 100, startDate: day(-10), deadline: day(40), status: 'pending', completion: 20, assignedTo: null },
  ],
  reports: [
    { id: 'r1', taskId: 't2', projectId: 'p1', engineerId: 'u-engineer', date: day(0), percent: 40, workers: 12, note: 'Brick work completed up to the 2nd floor.', hasPhoto: true, status: 'pending' },
  ],
  materialRequests: [
    { id: 'm1', projectId: 'p1', requestedBy: 'u-engineer', material: 'Cement', quantity: 200, unit: 'bags', date: day(0), status: 'pending' },
  ],
  issues: [
    { id: 'i1', projectId: 'p1', reportedBy: 'u-engineer', text: 'Rain stopped concrete work for 2 hours.', severity: 'High', date: day(-1), status: 'open' },
  ],
};