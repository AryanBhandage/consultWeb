import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div data-testid="page-not-found" className="section py-32 text-center">
      <div className="font-mono text-xs tracking-widest text-ink-600 uppercase">Error 404</div>
      <h1 className="mt-6 font-display text-6xl md:text-7xl font-bold tracking-tighter">
        Signal <span className="text-volt">lost</span>.
      </h1>
      <p className="mt-6 text-ink-700 max-w-xl mx-auto">
        The page you are looking for is not on this node. Let us reroute you back to the control tower.
      </p>
      <Link to="/" className="btn-primary mt-10 inline-flex">Back to home</Link>
    </div>
  );
}
