/* Background rotation is cosmetic only; it never changes saved progress. */
(function () {
 'use strict';
 const names = ["Sunrise Crossing", "Lanternwood Trail", "Highland Keep", "Snowfall Pass", "Seabreeze Watch", "Golden Valley", "Moonlit Harbor", "Canyon Crossing", "Willow Lake", "Autumn Viaduct", "Winter Caravan", "Desert Gateway", "Market Square", "The City Gates", "Fishing Village", "The Dungeon Approach"];
 function sceneAt(now) {
  // Civil calendar days keep the 6am/6pm boundaries stable across DST.
  let day = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000;
  const hour = now.getHours();
  if (hour < 6) day--;
  const slot = day * 2 + (hour < 6 || hour >= 18 ? 1 : 0);
  const index = ((slot % names.length) + names.length) % names.length;
  return { index, name: names[index], src: 'assets/scenes/scene-' + String(index + 1).padStart(2, '0') + '.webp' };
 }
 function refresh() {
  const stage = document.getElementById('pixelstage');
  if (!stage) return;
  const scene = sceneAt(new Date());
  if (stage.dataset.scene !== String(scene.index)) {
   stage.style.backgroundImage = 'url("' + scene.src + '")';
   stage.dataset.scene = String(scene.index);
  }
  const caption = stage.querySelector('.pixel-stage-caption');
  if (caption) caption.textContent = scene.name;
 }
 window.QuestScenes = { sceneAt, refresh };
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh);
 else refresh();
 setInterval(refresh, 1000); // Check the clock without re-rendering the hero.
 window.addEventListener('focus', refresh);
 window.addEventListener('pageshow', refresh);
 document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
})();
