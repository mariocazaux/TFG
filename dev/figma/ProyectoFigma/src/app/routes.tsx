import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { RoutesPage } from "./pages/RoutesPage";
import { Profile } from "./pages/Profile";
import { Landing } from "./pages/Landing";
import { Auth } from "./pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "events", Component: Events },
      { path: "routes", Component: RoutesPage },
      { path: "profile", Component: Profile },
    ],
  },
]);
