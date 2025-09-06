export const dataSourceConfig = {
  mode: "mock", // 'mock' | 'api'
  mockFile: () => import("../mock/drivers.json"),
  api: {
    url: "https://randomuser.me/api/?results=20", 
    method: "GET",
    transform: (resp) =>
      resp.results.map((u, i) => ({
        id: i + 1,
        driverName: `${u.name.first} ${u.name.last}`,
        status: Math.random() > 0.5 ? "Active" : "Inactive",
        location: u.location.city,
        date: u.registered.date,
      })),
  },
};