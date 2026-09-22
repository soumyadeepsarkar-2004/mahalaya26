import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { Header } from "@/components/ui/Header";
import { FestivalMeta } from "@/components/festival/FestivalMeta";
import { FestivalTimeline } from "@/components/festival/FestivalTimeline";
import { AmbientPlayer } from "@/components/audio/AmbientPlayer";
import { MobileSheets } from "@/components/ui/MobileSheets";
import { SwipeGesture } from "@/components/interactions/SwipeGesture";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
      <SwipeGesture>
        {/* Background Visual Layer */}
        <SceneCanvas />

        {/* Persistent Navigation Header */}
        <Header />

        {/* Festival Editorial Narrative */}
        <FestivalMeta />

        {/* Central / Bottom Timeline */}
        <FestivalTimeline />

        {/* Unified Puja Radio (Desktop Card + Mobile Dock) */}
        <AmbientPlayer />

        {/* Mobile Drawer Sheets */}
        <MobileSheets />
      </SwipeGesture>
    </main>
  );
}
