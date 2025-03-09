import { Game } from "../domain/game/game";
import { isSpeedLevel } from "../domain/game/game-loop/speed-level/speed-level";
import {
  isLoopStrategyName,
  LoopSchedulerFactory,
} from "../infrastructure/loop-scheduler/loop-scheduler.factory";
import {
  GridRendererFactory,
  isRenderStrategyName,
} from "../infrastructure/grid-renderer/grid-renderer.factory";
import { hydrateLabel } from "./hydrate-label";
import { hydrateInputChange } from "./hydrate-input-change";
import { hydrateSwitchInputChange } from "./hydrate-switch-input-change";

export function hydrateGameInterface(
  game: Game,
  gridRendererFactory: GridRendererFactory,
  loopSchedulerFactory: LoopSchedulerFactory,
): void {
  const playPauseButton = document.getElementById("play-pause-button");
  if (playPauseButton === null) {
    throw new Error("playPauseButton not found");
  }

  const togglePlayPause = () => {
    if (game.isPaused) {
      game.start();
      playPauseButton.textContent = "Pause";
    } else {
      game.stop();
      playPauseButton.textContent = "Play";
    }
  };
  playPauseButton.addEventListener("click", togglePlayPause);
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      togglePlayPause();
    }
  });

  hydrateLabel("fps", () => `${game.nbTicksLastSecond} fps`);

  hydrateInputChange(
    "speed-level",
    (speedLevel: string) => {
      if (isSpeedLevel(speedLevel)) {
        game.setSpeedLevel(speedLevel);
      }
    },
    game.speedLevel,
  );

  hydrateInputChange(
    "render-strategy-name",
    (renderStrategyName: string) => {
      if (isRenderStrategyName(renderStrategyName)) {
        game.setGridRenderer(gridRendererFactory.create(renderStrategyName));
      }
    },
    game.renderStrategyName,
  );

  hydrateInputChange(
    "loop-strategy-name",
    (loopStrategyName: string) => {
      if (isLoopStrategyName(loopStrategyName)) {
        game.setLoopScheduler(loopSchedulerFactory.create(loopStrategyName));
      }
    },
    game.loopSchedulerStrategyName,
  );

  hydrateSwitchInputChange(
    "supports-infected-state",
    () => {
      game.setSupportsInfectedState(!game.supportsInfectedState);
    },
    game.supportsInfectedState,
  );
}
