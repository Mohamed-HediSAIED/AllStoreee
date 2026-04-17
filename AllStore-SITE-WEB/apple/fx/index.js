/**
 * FxStage — reserved for future WebGL scenes.
 *
 * The first iteration loaded Three.js + an ambient iridescent mesh, but user
 * feedback was to remove the animated background. No page currently mounts a
 * scene (no [data-fx-scene] attribute anywhere), so this module no-ops.
 *
 * Kept in place so pages can opt in later without adding a new <script> tag.
 * If you want to re-enable WebGL scenes:
 *   1. Restore the FxStage singleton from git history (commit d8fc9b4).
 *   2. Add data-fx-scene="ambient-mesh" to <main> or <body>.
 *   3. Re-add apple/fx/scenes/ambient-mesh.js from git history.
 */
export default null;
