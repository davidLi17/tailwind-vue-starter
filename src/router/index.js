import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/subtitle",
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("../views/Events.vue"),
  },
  {
    path: "/accordion",
    name: "Accordion",
    component: () => import("../views/Accordion.vue"),
  },
  {
    path: "/carousel",
    name: "Carousel",
    component: () => import("../views/Carousel.vue"),
  },
  {
    path: "/collapse",
    name: "Collapse",
    component: () => import("../views/Collapse.vue"),
  },
  {
    path: "/dial",
    name: "Dial",
    component: () => import("../views/Dial.vue"),
  },
  {
    path: "/dismiss",
    name: "Dismiss",
    component: () => import("../views/Dismiss.vue"),
  },
  {
    path: "/drawer",
    name: "Drawer",
    component: () => import("../views/Drawer.vue"),
  },
  {
    path: "/dropdown",
    name: "Dropdown",
    component: () => import("../views/Dropdown.vue"),
  },
  {
    path: "/popover",
    name: "Popover",
    component: () => import("../views/Popover.vue"),
  },
  {
    path: "/tabs",
    name: "Tabs",
    component: () => import("../views/Tabs.vue"),
  },
  {
    path: "/tooltip",
    name: "Tooltip",
    component: () => import("../views/Tooltip.vue"),
  },
  {
    path: "/modal",
    name: "Modal",
    component: () => import("../views/Modal.vue"),
  },
  {
    path: "/input-counter",
    name: "InputCounter",
    component: () => import("../views/InputCounter.vue"),
  },
  {
    path: "/datepicker",
    name: "Datepicker",
    component: () => import("../views/Datepicker.vue"),
  },
  {
    path: "/subtitle",
    name: "Subtitle",
    component: () => import("../views/Subtitle.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
