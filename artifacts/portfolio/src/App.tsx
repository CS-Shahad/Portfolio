import { lazy, Suspense, useLayoutEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

// Start every new page at the top (a URL hash like /#contact is handled by Home).
function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <Navbar />
        <Router />
      </WouterRouter>
    </MotionConfig>
  );
}

export default App;
