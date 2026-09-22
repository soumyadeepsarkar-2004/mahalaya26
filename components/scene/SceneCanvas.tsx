"use client";

import React from "react";
import { SceneBackground } from "./SceneBackground";
import { SceneAtmosphere } from "./SceneAtmosphere";

export const SceneCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 select-none overflow-hidden">
      <SceneBackground />
      <SceneAtmosphere />
    </div>
  );
};
