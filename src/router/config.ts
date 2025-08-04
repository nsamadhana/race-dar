const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/quiz"],
    exact: true,
    component: "Quiz",
  },
  {
    path: ["/result"],
    exact: true,
    component: "Result",
  },
];

export default routes;
