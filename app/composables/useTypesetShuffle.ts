import { TYPESET_FONTS } from "~/utils/typeset/fonts";
import type { TypesetLockableParam, TypesetSearchParams } from "~/utils/typeset/params";
import {
  TYPESET_FLOWS,
  TYPESET_LEADINGS,
  TYPESET_MEASURES,
  TYPESET_SIZES,
} from "~/utils/typeset/params";

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function useTypesetShuffle() {
  const { locks } = useTypesetLocks();
  const { setParams, resetParams } = useTypesetSearchParams();

  /**
   * Randomize the type design (fonts + size/measure/rhythm). Leaves `item` (the specimen) alone;
   * locked params keep their current value.
   */
  function shuffle() {
    const bodyFonts = TYPESET_FONTS.filter((font) => font.type !== "mono").map((font) => font.id);
    const monoFonts = TYPESET_FONTS.filter((font) => font.type === "mono").map((font) => font.id);

    const candidates: Record<TypesetLockableParam, string> = {
      body: randomItem(bodyFonts),
      heading: randomItem(["inherit", ...bodyFonts]),
      mono: randomItem(monoFonts),
      scale: randomItem(TYPESET_SIZES).value,
      measure: randomItem(TYPESET_MEASURES).value,
      leading: randomItem(TYPESET_LEADINGS).value,
      flow: randomItem(TYPESET_FLOWS).value,
    };

    // Locked params are simply left out of the update, so they keep whatever
    // value they currently hold.
    const next: Partial<TypesetSearchParams> = {};
    for (const key of Object.keys(candidates) as TypesetLockableParam[]) {
      if (!locks.value.includes(key)) {
        next[key] = candidates[key] as never;
      }
    }

    setParams(next);
  }

  return { shuffle, reset: resetParams };
}
