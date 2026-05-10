const PORTRAIT = typeof window !== "undefined" && window.innerWidth < 640;
const GAME_WIDTH = PORTRAIT ? 405 : 1280;
const GAME_HEIGHT = 720;
const SERVER_URL = window.location.origin;

const mp = {
  socket: null,
  myId: null,
  lobbyCode: null,
  isHost: false,
  enabled: false,
  players: new Map(),
  lastSend: 0,
};
const WORLD_WIDTH = 4800;
const FLOOR_Y = 640;
const TOTAL_TEA = 10;
const JUMP_VELOCITY = -760;
const MAX_JUMPS = 2;
const RUN_FRAME_TOTAL = 25;
const JUMP_FRAME_TOTAL = 25;
const HALHOOLA_RUN_FRAME_TOTAL = 24;
const HALHOOLA_JUMP_FRAME_TOTAL = 24;
const AHMAR_ALWARD_RUN_FRAME_TOTAL = 24;
const AHMAR_ALWARD_JUMP_FRAME_TOTAL = 36;
const START_SPIN_FRAME_TOTAL = 10;
const LOLA_RUN_FRAME_TOTAL = 25;
const PLAYER_HEIGHT = 228;
const TEA_HEIGHT = 80;
const FLAG_X = 4700;
const LOLA_ESCAPE_DISTANCE = 2800;
const DORA_BOSS_HP = 6;
const BUILD_VERSION = "20260510a";
const BG_FAR_SPEED = 0.04;
const BG_MID_SPEED = 0.09;
const BG_NEAR_SPEED = 0.18;
const LEVEL_LABEL = "1 - 1";
const LOLA_STAGE_LABEL = "2 - 1";
const DORA_STAGE_LABEL = "3 - 1";
const HUD_DEPTH = 1000;
const CHARACTER_STORAGE_KEY = "oof-ah-selected-character";

const ASSETS = {
  background: "assets/background.png",
  lola_background: "assets/lola_background.png",
  lola_ground: "assets/lola_ground.png",
  dora_background: "assets/dora_background.png",
  dora_boss: "assets/dora_boss.png",
  hud_portrait: "assets/hud_portrait.png",
  halhoola_preview: "assets/halhoola_preview.png",
  ahmar_alward_preview: "assets/ahmar_alward_preview.png",
  souad_preview: "assets/souad_preview.png",
  player_idle: "assets/player_idle.png",
  ground: "assets/ground.png",
  platform: "assets/platform.png",
  tea: "assets/tea.png",
  obstacle: "assets/obstacle.png",
};

const CHARACTER_ASSET_SETS = {
  default: {
    idleKey: "player_idle",
    previewKey: "player_idle",
    runAnimKey: "player-run",
    jumpAnimKey: "player-jump",
    cryAnimKey: "player-cry",
    startSpinFrameKey: "start_spin_0",
    startSpinAnimKey: "start-spin",
  },
  halhoola: {
    idleKey: "halhoola_preview",
    previewKey: "halhoola_preview",
    runAnimKey: "halhoola-run",
    jumpAnimKey: "halhoola-jump",
    startSpinFrameKey: "halhoola_preview",
    startSpinAnimKey: null,
  },
  ahmar_alward: {
    idleKey: "ahmar_alward_preview",
    previewKey: "ahmar_alward_preview",
    runAnimKey: "ahmar-alward-run",
    jumpAnimKey: "ahmar-alward-jump",
    startSpinFrameKey: "ahmar_alward_preview",
    startSpinAnimKey: null,
  },
  souad: {
    idleKey: "souad_preview",
    previewKey: "souad_preview",
    runAnimKey: "souad-run",
    jumpAnimKey: "souad-jump",
    startSpinFrameKey: "souad_preview",
    startSpinAnimKey: null,
  },
};

const CHARACTER_OPTIONS = [
  {
    id: "ofah",
    name: "هاله",
    note: "الحالية",
    accentColor: 0xff4eb6,
    assetSetId: "default",
  },
  {
    id: "halhoola",
    name: "هلهوله",
    note: "جديدة",
    accentColor: 0xff5eb5,
    assetSetId: "halhoola",
  },
  {
    id: "ahmar-alward",
    name: "احمر الورد",
    note: "جديدة",
    accentColor: 0xff5748,
    assetSetId: "ahmar_alward",
  },
  {
    id: "souad",
    name: "سعاد",
    note: "جديدة",
    accentColor: 0xcab79a,
    assetSetId: "souad",
  },
];

const CHARACTER_BODY_PROFILES = {
  ofah: {
    widthRatio: 0.4,
    heightRatio: 0.88,
  },
  halhoola: {
    widthRatio: 0.28,
    heightRatio: 0.88,
  },
  "ahmar-alward": {
    widthRatio: 0.3,
    heightRatio: 0.88,
  },
  souad: {
    widthRatio: 0.47,
    heightRatio: 0.88,
  },
};

const RUN_FRAME_KEYS = Array.from({ length: RUN_FRAME_TOTAL }, (_, index) => ({
  key: `player_run_${index}`,
  path: `assets/player_run_${index}.png`,
}));

const JUMP_FRAME_KEYS = Array.from({ length: JUMP_FRAME_TOTAL }, (_, index) => ({
  key: `player_jump_${index}`,
  path: `assets/player_jump_${index}.png`,
}));

const START_SPIN_KEYS = Array.from({ length: START_SPIN_FRAME_TOTAL }, (_, index) => ({
  key: `start_spin_${index}`,
  path: `assets/start_spin_${index}.png`,
}));

const LOLA_RUN_KEYS = Array.from({ length: LOLA_RUN_FRAME_TOTAL }, (_, index) => ({
  key: `lola_run_${index}`,
  path: `assets/lola_run_${index}.png`,
}));

const HALHOOLA_RUN_KEYS = Array.from({ length: HALHOOLA_RUN_FRAME_TOTAL }, (_, index) => ({
  key: `halhoola_run_${index}`,
  path: `assets/halhoola_run_${index}.png?v=${BUILD_VERSION}`,
}));

const HALHOOLA_JUMP_KEYS = Array.from(
  { length: HALHOOLA_JUMP_FRAME_TOTAL },
  (_, index) => ({
    key: `halhoola_jump_${index}`,
    path: `assets/halhoola_jump_${index}.png?v=${BUILD_VERSION}`,
  })
);

const AHMAR_ALWARD_RUN_KEYS = Array.from({ length: AHMAR_ALWARD_RUN_FRAME_TOTAL }, (_, index) => ({
  key: `ahmar_alward_run_${index}`,
  path: `assets/ahmar_alward_run_${index}.png?v=${BUILD_VERSION}`,
}));

const SOUAD_RUN_KEYS = Array.from({ length: RUN_FRAME_TOTAL }, (_, index) => ({
  key: `souad_run_${index}`,
  path: `assets/souad_run_${index}.png?v=${BUILD_VERSION}`,
}));

const AHMAR_ALWARD_JUMP_KEYS = Array.from(
  { length: AHMAR_ALWARD_JUMP_FRAME_TOTAL },
  (_, index) => ({
    key: `ahmar_alward_jump_${index}`,
    path: `assets/ahmar_alward_jump_${index}.png?v=${BUILD_VERSION}`,
  })
);

const SOUAD_JUMP_KEYS = Array.from({ length: JUMP_FRAME_TOTAL }, (_, index) => ({
  key: `souad_jump_${index}`,
  path: `assets/souad_jump_${index}.png`,
}));

const GROUND_SEGMENTS = [
  { x: 0, y: FLOOR_Y, width: 460, height: 80 },
  { x: 600, y: FLOOR_Y, width: 440, height: 80 },
  { x: 1200, y: FLOOR_Y, width: 430, height: 80 },
  { x: 1770, y: FLOOR_Y, width: 470, height: 80 },
  { x: 2380, y: FLOOR_Y, width: 560, height: 80 },
  { x: 3110, y: FLOOR_Y, width: 420, height: 80 },
  { x: 3690, y: FLOOR_Y, width: 420, height: 80 },
  { x: 4270, y: FLOOR_Y, width: 500, height: 80 },
];

const FLOATING_PLATFORMS = [
  { x: 760, y: 520, width: 200, height: 48 },
  { x: 1350, y: 460, width: 180, height: 48 },
  { x: 1900, y: 500, width: 220, height: 48 },
  { x: 2260, y: 470, width: 220, height: 48 },
  { x: 2795, y: 360, width: 130, height: 48 },
  { x: 3230, y: 500, width: 210, height: 48 },
  { x: 3580, y: 430, width: 180, height: 48 },
  { x: 4020, y: 480, width: 220, height: 48 },
  { x: 4440, y: 390, width: 170, height: 48 },
];

const TEA_POSITIONS = [
  { x: 260, y: 580 },
  { x: 430, y: 580 },
  { x: 840, y: 470 },
  { x: 1360, y: 410 },
  { x: 1910, y: 450 },
  { x: 2470, y: 420 },
  { x: 3220, y: 580 },
  { x: 3650, y: 380 },
  { x: 4050, y: 580 },
  { x: 4520, y: 340 },
];

const OBSTACLE_POSITIONS = [
  // Keep traps centered on stable landing zones with clear run-up.
  { x: 860, y: FLOOR_Y + 8 },
  { x: 1490, y: FLOOR_Y + 8 },
  { x: 2120, y: FLOOR_Y + 8 },
  { x: 2660, y: FLOOR_Y + 8 },
  { x: 3940, y: FLOOR_Y + 8 },
];

function fitToHeight(gameObject, targetHeight) {
  const scale = targetHeight / gameObject.height;
  gameObject.setScale(scale);
  return gameObject;
}

function setPlayerTextureAtFixedHeight(player, textureKey, targetHeight, alignBodyFn) {
  if (!player || (!player.anims.isPlaying && player.texture.key === textureKey)) {
    return;
  }

  const footY = player.body ? player.body.bottom : player.y + player.displayHeight / 2;
  player.anims.stop();
  player.setTexture(textureKey);
  fitToHeight(player, targetHeight);
  player.y = footY - player.displayHeight / 2;
  if (alignBodyFn) {
    alignBodyFn();
  }
  if (player.body) {
    const bottomDelta = footY - player.body.bottom;
    if (Math.abs(bottomDelta) > 0.01) {
      player.y += bottomDelta;
      player.body.updateFromGameObject();
    }
  }
}

function playPlayerAnimationAtFixedHeight(player, animationKey, targetHeight, alignBodyFn) {
  if (!player) {
    return;
  }

  const isSameAnimation =
    player.anims.currentAnim?.key === animationKey &&
    player.anims.isPlaying;
  if (isSameAnimation) {
    return;
  }

  const footY = player.body ? player.body.bottom : player.y + player.displayHeight / 2;
  player.play(animationKey, true);
  fitToHeight(player, targetHeight);
  player.y = footY - player.displayHeight / 2;
  if (alignBodyFn) {
    alignBodyFn();
  }
  if (player.body) {
    const bottomDelta = footY - player.body.bottom;
    if (Math.abs(bottomDelta) > 0.01) {
      player.y += bottomDelta;
      player.body.updateFromGameObject();
    }
  }
}

function getCharacterBodyProfile(characterId) {
  return CHARACTER_BODY_PROFILES[characterId] ?? CHARACTER_BODY_PROFILES.ofah;
}

function getCharacterBodyWorldSize(characterId) {
  const { widthRatio, heightRatio } = getCharacterBodyProfile(characterId);
  return {
    bodyWidth: Math.round(PLAYER_HEIGHT * widthRatio),
    bodyHeight: Math.round(PLAYER_HEIGHT * heightRatio),
  };
}

function syncCharacterVisualToBody(player, visualPlayer) {
  if (!player?.body || !visualPlayer) {
    return;
  }

  visualPlayer.x = Math.round(player.body.center.x);
  visualPlayer.y = Math.round(player.body.bottom - visualPlayer.displayHeight / 2);
  visualPlayer.setFlipX(player.flipX);
}

function configureCharacterBody(player, characterId) {
  if (!player?.body) {
    return;
  }

  const { bodyWidth, bodyHeight } = getCharacterBodyWorldSize(characterId);
  if (
    player._characterBodyId === characterId &&
    player._characterBodyWidth === bodyWidth &&
    player._characterBodyHeight === bodyHeight
  ) {
    return;
  }

  const footY = player.body.bottom;

  player.setDisplaySize(bodyWidth, bodyHeight);
  player.y = footY - bodyHeight / 2;
  // Arcade bodies use unscaled source pixels here, then multiply by the
  // Game Object scale. Because the hidden body texture is 4x4, using the
  // texture size keeps the final world body equal to the display size.
  player.body.setSize(player.width, player.height, true);
  player.body.updateFromGameObject();
  player._characterBodyId = characterId;
  player._characterBodyWidth = bodyWidth;
  player._characterBodyHeight = bodyHeight;
}

function alignCharacterBodyToFeet(player, characterId, visualPlayer = null) {
  if (!player?.body) {
    return;
  }

  configureCharacterBody(player, characterId);

  if (visualPlayer) {
    syncCharacterVisualToBody(player, visualPlayer);
  }
}

function createGameplayCharacter(scene, x, footY, characterProfile, depth = 10) {
  const { bodyHeight } = getCharacterBodyWorldSize(characterProfile.character.id);
  const player = scene.physics.add.sprite(x, footY - bodyHeight / 2, "player_body");
  player.setVisible(false);
  alignCharacterBodyToFeet(player, characterProfile.character.id);

  const visual = scene.add.sprite(x, footY - PLAYER_HEIGHT / 2, characterProfile.idleKey);
  fitToHeight(visual, PLAYER_HEIGHT);
  visual.setDepth(depth);
  alignCharacterBodyToFeet(player, characterProfile.character.id, visual);

  return { player, visual };
}

function coverImage(gameObject, width, height) {
  const scale = Math.max(width / gameObject.width, height / gameObject.height);
  gameObject.setScale(scale);
  return gameObject;
}

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatHearts(current, max = 3) {
  return Array.from({ length: max }, (_, index) => (index < current ? "♥" : "♡")).join(" ");
}

const MUSIC_TRACKS = {
  menu: {
    bpm: 88,
    volume: 0.028,
    loopBeats: 8,
    layers: [
      {
        wave: "triangle",
        gain: 0.78,
        notes: [
          { beat: 0, dur: 1.8, note: 53 },
          { beat: 2, dur: 1.8, note: 57 },
          { beat: 4, dur: 1.8, note: 60 },
          { beat: 6, dur: 1.8, note: 57 },
        ],
      },
      {
        wave: "square",
        gain: 0.26,
        notes: [
          { beat: 0, dur: 0.55, note: 69 },
          { beat: 1, dur: 0.45, note: 72 },
          { beat: 2, dur: 0.55, note: 74 },
          { beat: 3, dur: 0.45, note: 72 },
          { beat: 4, dur: 0.55, note: 76 },
          { beat: 5, dur: 0.45, note: 74 },
          { beat: 6, dur: 0.55, note: 72 },
          { beat: 7, dur: 0.65, note: 69 },
        ],
      },
      {
        wave: "sine",
        gain: 0.16,
        notes: [
          { beat: 0, dur: 3.6, chord: [60, 64] },
          { beat: 4, dur: 3.6, chord: [62, 65] },
        ],
      },
    ],
  },
  stage1: {
    bpm: 106,
    volume: 0.026,
    loopBeats: 8,
    layers: [
      {
        wave: "triangle",
        gain: 0.84,
        notes: [
          { beat: 0, dur: 0.8, note: 48 },
          { beat: 1, dur: 0.8, note: 55 },
          { beat: 2, dur: 0.8, note: 52 },
          { beat: 3, dur: 0.8, note: 57 },
          { beat: 4, dur: 0.8, note: 48 },
          { beat: 5, dur: 0.8, note: 55 },
          { beat: 6, dur: 0.8, note: 52 },
          { beat: 7, dur: 0.8, note: 59 },
        ],
      },
      {
        wave: "square",
        gain: 0.28,
        notes: [
          { beat: 0, dur: 0.45, note: 72 },
          { beat: 0.5, dur: 0.35, note: 74 },
          { beat: 1, dur: 0.45, note: 76 },
          { beat: 1.5, dur: 0.35, note: 74 },
          { beat: 2, dur: 0.45, note: 72 },
          { beat: 2.5, dur: 0.35, note: 76 },
          { beat: 3, dur: 0.45, note: 79 },
          { beat: 3.5, dur: 0.35, note: 76 },
          { beat: 4, dur: 0.45, note: 72 },
          { beat: 4.5, dur: 0.35, note: 74 },
          { beat: 5, dur: 0.45, note: 76 },
          { beat: 5.5, dur: 0.35, note: 79 },
          { beat: 6, dur: 0.45, note: 81 },
          { beat: 7, dur: 0.7, note: 79 },
        ],
      },
      {
        wave: "sine",
        gain: 0.12,
        notes: [
          { beat: 0, dur: 1.8, chord: [60, 67] },
          { beat: 2, dur: 1.8, chord: [64, 69] },
          { beat: 4, dur: 1.8, chord: [60, 67] },
          { beat: 6, dur: 1.8, chord: [64, 71] },
        ],
      },
    ],
  },
  stage2: {
    bpm: 116,
    volume: 0.022,
    loopBeats: 8,
    layers: [
      {
        wave: "triangle",
        gain: 0.82,
        notes: [
          { beat: 0, dur: 0.9, note: 43 },
          { beat: 1, dur: 0.9, note: 43 },
          { beat: 2, dur: 0.9, note: 46 },
          { beat: 3, dur: 0.9, note: 43 },
          { beat: 4, dur: 0.9, note: 41 },
          { beat: 5, dur: 0.9, note: 43 },
          { beat: 6, dur: 0.9, note: 46 },
          { beat: 7, dur: 0.9, note: 48 },
        ],
      },
      {
        wave: "square",
        gain: 0.18,
        notes: [
          { beat: 0, dur: 0.25, note: 67 },
          { beat: 0.5, dur: 0.25, note: 70 },
          { beat: 1, dur: 0.25, note: 67 },
          { beat: 1.5, dur: 0.25, note: 70 },
          { beat: 2, dur: 0.25, note: 72 },
          { beat: 2.5, dur: 0.25, note: 70 },
          { beat: 3, dur: 0.25, note: 67 },
          { beat: 3.5, dur: 0.25, note: 70 },
          { beat: 4, dur: 0.25, note: 65 },
          { beat: 4.5, dur: 0.25, note: 68 },
          { beat: 5, dur: 0.25, note: 65 },
          { beat: 5.5, dur: 0.25, note: 68 },
          { beat: 6, dur: 0.25, note: 72 },
          { beat: 6.5, dur: 0.25, note: 70 },
          { beat: 7, dur: 0.35, note: 67 },
        ],
      },
      {
        wave: "sine",
        gain: 0.12,
        notes: [
          { beat: 0, dur: 3.8, chord: [55, 58] },
          { beat: 4, dur: 3.8, chord: [53, 57] },
        ],
      },
    ],
  },
  stage3: {
    bpm: 126,
    volume: 0.024,
    loopBeats: 8,
    layers: [
      {
        wave: "triangle",
        gain: 0.86,
        notes: [
          { beat: 0, dur: 0.8, note: 41 },
          { beat: 1, dur: 0.8, note: 44 },
          { beat: 2, dur: 0.8, note: 41 },
          { beat: 3, dur: 0.8, note: 46 },
          { beat: 4, dur: 0.8, note: 41 },
          { beat: 5, dur: 0.8, note: 44 },
          { beat: 6, dur: 0.8, note: 48 },
          { beat: 7, dur: 0.8, note: 46 },
        ],
      },
      {
        wave: "square",
        gain: 0.22,
        notes: [
          { beat: 0, dur: 0.22, note: 69 },
          { beat: 0.5, dur: 0.22, note: 72 },
          { beat: 1, dur: 0.22, note: 74 },
          { beat: 1.5, dur: 0.22, note: 72 },
          { beat: 2, dur: 0.22, note: 76 },
          { beat: 2.5, dur: 0.22, note: 74 },
          { beat: 3, dur: 0.22, note: 72 },
          { beat: 3.5, dur: 0.22, note: 69 },
          { beat: 4, dur: 0.22, note: 68 },
          { beat: 4.5, dur: 0.22, note: 72 },
          { beat: 5, dur: 0.22, note: 74 },
          { beat: 5.5, dur: 0.22, note: 76 },
          { beat: 6, dur: 0.22, note: 77 },
          { beat: 6.5, dur: 0.22, note: 76 },
          { beat: 7, dur: 0.3, note: 74 },
        ],
      },
      {
        wave: "sine",
        gain: 0.14,
        notes: [
          { beat: 0, dur: 1.9, chord: [53, 57] },
          { beat: 2, dur: 1.9, chord: [56, 60] },
          { beat: 4, dur: 1.9, chord: [53, 57] },
          { beat: 6, dur: 1.9, chord: [58, 62] },
        ],
      },
    ],
  },
};

function midiToFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function getMusicManager(scene) {
  if (!scene.game.__oofAhMusicManager) {
    scene.game.__oofAhMusicManager = {
      context: null,
      currentTrackKey: null,
      masterGain: null,
      scheduledNodes: new Set(),
      loopTimerId: null,
      unlockHandlers: null,
      isRunning: false,
    };
  }

  return scene.game.__oofAhMusicManager;
}

function clearMusicUnlockHandlers(manager) {
  if (!manager.unlockHandlers || typeof window === "undefined") {
    return;
  }

  const { handler, eventNames } = manager.unlockHandlers;
  eventNames.forEach((eventName) => {
    window.removeEventListener(eventName, handler);
  });
  manager.unlockHandlers = null;
}

function stopScheduledMusicNodes(manager) {
  manager.scheduledNodes.forEach(({ oscillator, gainNode }) => {
    try {
      oscillator.onended = null;
      oscillator.stop();
    } catch (error) {
      // Ignore nodes that already finished.
    }
    try {
      oscillator.disconnect();
      gainNode.disconnect();
    } catch (error) {
      // Ignore disconnect failures on already-removed nodes.
    }
  });
  manager.scheduledNodes.clear();
}

function stopMusicTrack(manager) {
  if (manager.loopTimerId) {
    clearTimeout(manager.loopTimerId);
    manager.loopTimerId = null;
  }

  clearMusicUnlockHandlers(manager);
  stopScheduledMusicNodes(manager);

  if (manager.masterGain) {
    try {
      const now = manager.context?.currentTime ?? 0;
      manager.masterGain.gain.cancelScheduledValues(now);
      manager.masterGain.gain.setTargetAtTime(0.0001, now, 0.05);
      manager.masterGain.disconnect();
    } catch (error) {
      // Ignore gain shutdown issues.
    }
  }

  manager.masterGain = null;
  manager.nextLoopStartTime = null;
  manager.isRunning = false;
}

function scheduleMusicNote(manager, track, layer, startTime, noteConfig) {
  const notes = noteConfig.chord ?? [noteConfig.note];
  const duration = (60 / track.bpm) * noteConfig.dur;
  const attackTime = Math.min(0.018, duration * 0.35);
  const releaseStart = startTime + Math.max(duration - 0.05, attackTime + 0.02);
  const gainValue = track.volume * layer.gain * (noteConfig.gain ?? 1);

  notes.forEach((note) => {
    const oscillator = manager.context.createOscillator();
    const gainNode = manager.context.createGain();

    oscillator.type = noteConfig.wave ?? layer.wave;
    oscillator.frequency.setValueAtTime(midiToFrequency(note), startTime);
    if (noteConfig.detune) {
      oscillator.detune.setValueAtTime(noteConfig.detune, startTime);
    }

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(gainValue, startTime + attackTime);
    gainNode.gain.setValueAtTime(gainValue, releaseStart);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(manager.masterGain);

    const nodeRecord = { oscillator, gainNode };
    manager.scheduledNodes.add(nodeRecord);
    oscillator.onended = () => {
      manager.scheduledNodes.delete(nodeRecord);
      try {
        oscillator.disconnect();
        gainNode.disconnect();
      } catch (error) {
        // Node already disconnected.
      }
    };

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02);
  });
}

function scheduleMusicLoop(manager) {
  if (!manager.context || !manager.isRunning) {
    return;
  }

  const track = MUSIC_TRACKS[manager.currentTrackKey];
  if (!track) {
    return;
  }

  const beatDuration = 60 / track.bpm;
  const loopDuration = beatDuration * track.loopBeats;
  const loopStartTime = Math.max(
    manager.context.currentTime + 0.04,
    manager.nextLoopStartTime ?? manager.context.currentTime + 0.04
  );
  manager.nextLoopStartTime = loopStartTime + loopDuration;

  track.layers.forEach((layer) => {
    layer.notes.forEach((noteConfig) => {
      const startTime = loopStartTime + noteConfig.beat * beatDuration;
      scheduleMusicNote(manager, track, layer, startTime, noteConfig);
    });
  });

  manager.loopTimerId = setTimeout(
    () => scheduleMusicLoop(manager),
    Math.max(180, (loopDuration - 0.18) * 1000)
  );
}

function startMusicTrack(manager) {
  if (!manager.context || manager.isRunning) {
    return;
  }

  const track = MUSIC_TRACKS[manager.currentTrackKey];
  if (!track) {
    return;
  }

  manager.masterGain = manager.context.createGain();
  manager.masterGain.gain.setValueAtTime(0.0001, manager.context.currentTime);
  manager.masterGain.gain.exponentialRampToValueAtTime(1, manager.context.currentTime + 0.2);
  manager.masterGain.connect(manager.context.destination);
  manager.nextLoopStartTime = null;
  manager.isRunning = true;
  scheduleMusicLoop(manager);
}

function armMusicUnlock(manager) {
  if (!manager.context || manager.unlockHandlers || typeof window === "undefined") {
    return;
  }

  const eventNames = ["pointerdown", "keydown", "touchstart"];
  const handler = () => {
    manager.context
      .resume()
      .then(() => {
        clearMusicUnlockHandlers(manager);
        if (!manager.isRunning) {
          startMusicTrack(manager);
        }
      })
      .catch(() => {});
  };

  eventNames.forEach((eventName) => {
    window.addEventListener(eventName, handler, { passive: true });
  });
  manager.unlockHandlers = { handler, eventNames };
}

function playSceneMusic(scene, trackKey) {
  const audioContext = scene.sound?.context;
  if (!audioContext || !MUSIC_TRACKS[trackKey]) {
    return;
  }

  const manager = getMusicManager(scene);
  manager.context = audioContext;

  if (manager.currentTrackKey === trackKey) {
    if (!manager.isRunning) {
      if (audioContext.state === "running") {
        startMusicTrack(manager);
      } else {
        armMusicUnlock(manager);
      }
    }
    return;
  }

  stopMusicTrack(manager);
  manager.currentTrackKey = trackKey;

  if (audioContext.state === "running") {
    startMusicTrack(manager);
  } else {
    armMusicUnlock(manager);
  }
}

function getCharacterOptionById(characterId) {
  return CHARACTER_OPTIONS.find(({ id }) => id === characterId) ?? CHARACTER_OPTIONS[0];
}

function loadSelectedCharacterId() {
  if (typeof window === "undefined") {
    return CHARACTER_OPTIONS[0].id;
  }

  try {
    const storedCharacterId = window.localStorage.getItem(CHARACTER_STORAGE_KEY);
    return getCharacterOptionById(storedCharacterId).id;
  } catch (error) {
    return CHARACTER_OPTIONS[0].id;
  }
}

function saveSelectedCharacterId(characterId) {
  const normalizedCharacterId = getCharacterOptionById(characterId).id;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CHARACTER_STORAGE_KEY, normalizedCharacterId);
    } catch (error) {
      // Ignore storage failures and continue with the in-memory selection.
    }
  }

  return normalizedCharacterId;
}

function getCharacterProfile(characterId = loadSelectedCharacterId()) {
  const character = getCharacterOptionById(characterId);
  const assetSet = {
    ...CHARACTER_ASSET_SETS.default,
    ...(CHARACTER_ASSET_SETS[character.assetSetId] ?? {}),
  };

  return {
    character,
    ...assetSet,
  };
}

function shouldUseMobileUi() {
  if (typeof window === "undefined") {
    return false;
  }

  const hasTouch =
    "ontouchstart" in window ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
  const hasCoarsePointer =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  return hasTouch && (hasCoarsePointer || window.innerWidth <= 1024);
}

let mobilePanelRefs;

function getMobilePanelRefs() {
  if (typeof document === "undefined") {
    return null;
  }

  if (!mobilePanelRefs) {
    mobilePanelRefs = {
      panel: document.getElementById("mobile-play-panel"),
      stageLabel: document.getElementById("mobile-stage-label"),
      stage: document.getElementById("mobile-stage"),
      timeLabel: document.getElementById("mobile-time-label"),
      time: document.getElementById("mobile-time"),
      cupsLabel: document.getElementById("mobile-cups-label"),
      cups: document.getElementById("mobile-cups"),
      healthLabel: document.getElementById("mobile-health-label"),
      health: document.getElementById("mobile-health"),
      missionTitle: document.getElementById("mobile-mission-title"),
      missionLabel: document.getElementById("mobile-mission-label"),
      missionCount: document.getElementById("mobile-mission-count"),
      missionFill: document.getElementById("mobile-mission-fill"),
      left: document.getElementById("mobile-left"),
      right: document.getElementById("mobile-right"),
      jump: document.getElementById("mobile-jump"),
      shoot: document.getElementById("mobile-shoot"),
    };
  }

  return mobilePanelRefs;
}

function setMobileUiBodyMode() {
  if (typeof document === "undefined") {
    return;
  }

  document.body.classList.toggle("mobile-ui-enabled", shouldUseMobileUi());
}

function setMobilePanelVisible(isVisible) {
  const refs = getMobilePanelRefs();
  if (!refs?.panel) {
    return;
  }

  refs.panel.classList.toggle("is-active", isVisible);
  refs.panel.setAttribute("aria-hidden", isVisible ? "false" : "true");
}

function setMobilePanelMode(mode = "platformer") {
  const refs = getMobilePanelRefs();
  if (!refs?.panel) {
    return;
  }

  refs.panel.classList.toggle("runner-mode", mode === "runner");
}

function bindInGameExitButton(scene) {
  const btn = document.getElementById("mobile-exit-game-btn");
  if (!btn) return;
  const handler = () => {
    setMobilePanelVisible(false);
    mp.enabled = false;
    scene.scene.start("start");
  };
  btn.addEventListener("pointerdown", handler);
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    btn.removeEventListener("pointerdown", handler);
  });

  // Desktop: ESC to exit
  scene.input.keyboard.once("keydown-ESC", () => {
    setMobilePanelVisible(false);
    mp.enabled = false;
    scene.scene.start("start");
  });
}

function updateMobilePanelData({
  stageLabel = "المرحلة",
  stageValue = LEVEL_LABEL,
  timeLabel = "الوقت",
  timeValue = "00:00",
  scoreLabel = "الأكواب",
  scoreValue = "0 / 10",
  healthLabel = "الصحة",
  healthValue = "♥ ♥ ♡",
  healthIsHearts = true,
  missionTitle = "المهمة",
  missionLabel = `اجمع ${TOTAL_TEA} أكواب`,
  missionCount = `0 / ${TOTAL_TEA}`,
  progressRatio = 0,
}) {
  const refs = getMobilePanelRefs();
  if (!refs?.panel) {
    return;
  }

  refs.stageLabel.textContent = stageLabel;
  refs.stage.textContent = stageValue;
  refs.timeLabel.textContent = timeLabel;
  refs.time.textContent = timeValue;
  refs.cupsLabel.textContent = scoreLabel;
  refs.cups.textContent = scoreValue;
  refs.healthLabel.textContent = healthLabel;
  refs.health.textContent = healthValue;
  refs.health.classList.toggle("mobile-card__value--hearts", healthIsHearts);
  refs.missionTitle.textContent = missionTitle;
  refs.missionLabel.textContent = missionLabel;
  refs.missionCount.textContent = missionCount;
  refs.missionFill.style.width = `${Math.max(0, Math.min(1, progressRatio)) * 100}%`;
}

function updateMobilePanelHud({ collectedTea, totalTea, elapsedSeconds }) {
  const progressRatio = Math.max(0, Math.min(1, collectedTea / totalTea));

  updateMobilePanelData({
    stageValue: LEVEL_LABEL,
    timeValue: formatClock(elapsedSeconds),
    scoreValue: `${collectedTea} / ${totalTea}`,
    healthValue: "♥ ♥ ♡",
    healthIsHearts: true,
    missionLabel: `اجمع ${totalTea} أكواب`,
    missionCount: `${collectedTea} / ${totalTea}`,
    progressRatio,
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", setMobileUiBodyMode);
  window.addEventListener("orientationchange", setMobileUiBodyMode);
  setMobileUiBodyMode();
}

function drawPlayerFallback(scene, key, pose) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  const bodyColor = 0xff8fb8;
  const shirtColor = pose.startsWith("cry") ? 0x90b9ff : 0x7ef7ff;
  const hairColor = 0x2d203f;

  g.fillStyle(bodyColor, 1);
  g.fillRect(14, 8, 20, 18);
  g.fillStyle(hairColor, 1);
  g.fillRect(10, 4, 28, 12);
  g.fillRect(8, 10, 8, 16);
  g.fillStyle(0xffffff, 1);
  g.fillRect(18, 14, 4, 4);
  g.fillRect(26, 14, 4, 4);
  g.fillStyle(0x1f1f1f, 1);
  g.fillRect(20, 15, 2, 2);
  g.fillRect(28, 15, 2, 2);

  if (pose === "cry0" || pose === "cry1") {
    g.fillStyle(0x65b5ff, 0.9);
    g.fillRect(18, 18, 2, pose === "cry0" ? 10 : 7);
    g.fillRect(28, 18, 2, pose === "cry0" ? 7 : 10);
  } else {
    g.fillStyle(0xff5e84, 1);
    g.fillRect(20, 22, 8, 2);
  }

  g.fillStyle(shirtColor, 1);
  g.fillRect(12, 26, 24, 20);
  g.fillStyle(0x1d1733, 1);

  if (pose === "jump") {
    g.fillRect(12, 46, 8, 12);
    g.fillRect(28, 46, 8, 12);
    g.fillRect(6, 30, 8, 10);
    g.fillRect(34, 28, 8, 10);
  } else if (pose === "run0") {
    g.fillRect(12, 46, 8, 12);
    g.fillRect(28, 44, 8, 14);
    g.fillRect(6, 28, 8, 12);
    g.fillRect(34, 30, 8, 10);
  } else if (pose === "run1") {
    g.fillRect(10, 44, 8, 14);
    g.fillRect(30, 46, 8, 12);
    g.fillRect(6, 30, 8, 10);
    g.fillRect(34, 28, 8, 12);
  } else if (pose === "run2") {
    g.fillRect(12, 45, 8, 13);
    g.fillRect(28, 45, 8, 13);
    g.fillRect(6, 29, 8, 11);
    g.fillRect(34, 29, 8, 11);
  } else if (pose === "run3") {
    g.fillRect(10, 46, 8, 12);
    g.fillRect(30, 44, 8, 14);
    g.fillRect(6, 28, 8, 12);
    g.fillRect(34, 30, 8, 10);
  } else {
    g.fillRect(14, 46, 8, 12);
    g.fillRect(26, 46, 8, 12);
    g.fillRect(8, 30, 8, 10);
    g.fillRect(32, 30, 8, 10);
  }

  g.generateTexture(key, 48, 64);
  g.destroy();
}

function drawPlatformFallback(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  if (key === "platform") {
    g.fillStyle(0x12090a, 1);
    g.fillRect(0, 0, 128, 48);
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const x = col * 32 + 2;
        const y = row * 24 + 2;
        g.fillStyle(0x2a1110, 1);
        g.fillRect(x, y, 28, 20);
        g.fillStyle(0x694025, 1);
        g.fillRect(x + 2, y + 2, 24, 16);
        g.fillStyle(0x8b5830, 1);
        g.fillRect(x + 2, y + 2, 24, 6);
        g.fillStyle(0x3b1f16, 1);
        g.fillRect(x + 2, y + 10, 24, 8);
      }
    }
    g.generateTexture(key, 128, 48);
  } else {
    g.fillStyle(0x4f3e86, 1);
    g.fillRect(0, 0, 128, 32);
    g.fillStyle(0xffcf6b, 1);
    g.fillRect(0, 0, 128, 8);
    g.fillStyle(0x251a45, 1);
    for (let x = 0; x < 128; x += 16) {
      g.fillRect(x, 12, 10, 6);
      g.fillRect(x + 6, 22, 8, 5);
    }
    g.generateTexture(key, 128, 32);
  }
  g.destroy();
}

function createLolaRunnerTextures(scene) {
  if (!scene.textures.exists("lola_ground")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x140709, 1);
    g.fillRect(0, 0, 256, 96);
    g.fillStyle(0x2b1014, 1);
    g.fillRect(0, 0, 256, 22);
    g.fillStyle(0x3b191d, 1);
    g.fillRect(0, 20, 256, 14);
    g.fillStyle(0x1d0d10, 1);
    for (let x = 0; x < 256; x += 32) {
      g.fillRect(x + 4, 10 + ((x / 32) % 2) * 2, 24, 8);
      g.fillRect(x + 2, 38 + ((x / 32) % 3) * 4, 28, 6);
      g.fillRect(x + 10, 58 + ((x / 32) % 2) * 5, 18, 5);
    }
    g.lineStyle(2, 0x5a242b, 0.95);
    g.beginPath();
    g.moveTo(12, 18);
    g.lineTo(34, 28);
    g.lineTo(50, 18);
    g.lineTo(76, 30);
    g.lineTo(100, 12);
    g.lineTo(132, 24);
    g.lineTo(164, 16);
    g.lineTo(186, 26);
    g.lineTo(214, 14);
    g.lineTo(244, 20);
    g.strokePath();
    g.fillStyle(0x070203, 1);
    g.fillRect(0, 72, 256, 24);
    g.fillStyle(0x6a1018, 0.2);
    g.fillRect(0, 70, 256, 8);
    g.generateTexture("lola_ground", 256, 96);
    g.destroy();
  }

  if (!scene.textures.exists("lola_platform")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x13080a, 1);
    g.fillRoundedRect(0, 8, 160, 36, 8);
    g.fillStyle(0x2a1114, 1);
    g.fillRoundedRect(6, 12, 148, 14, 6);
    g.fillStyle(0x5c2028, 0.55);
    g.fillRect(10, 28, 140, 5);
    g.lineStyle(2, 0x3b1519, 0.95);
    g.beginPath();
    g.moveTo(18, 18);
    g.lineTo(34, 28);
    g.lineTo(60, 16);
    g.lineTo(86, 30);
    g.lineTo(116, 18);
    g.lineTo(144, 26);
    g.strokePath();
    g.generateTexture("lola_platform", 160, 48);
    g.destroy();
  }

  if (!scene.textures.exists("lola_debris")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x12080a, 1);
    g.fillPoints(
      [
        new Phaser.Geom.Point(6, 18),
        new Phaser.Geom.Point(18, 4),
        new Phaser.Geom.Point(34, 8),
        new Phaser.Geom.Point(42, 24),
        new Phaser.Geom.Point(28, 40),
        new Phaser.Geom.Point(10, 36),
      ],
      true
    );
    g.fillStyle(0x4d1d22, 0.4);
    g.fillEllipse(24, 22, 20, 10);
    g.generateTexture("lola_debris", 48, 48);
    g.destroy();
  }

  if (!scene.textures.exists("lola_shadow")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x050102, 1);
    g.fillCircle(50, 24, 22);
    g.fillRect(24, 44, 52, 44);
    g.fillRect(30, 86, 12, 28);
    g.fillRect(58, 86, 12, 28);
    g.fillRect(12, 50, 12, 34);
    g.fillRect(76, 50, 12, 34);
    g.fillStyle(0xff2f43, 1);
    g.fillEllipse(40, 24, 10, 5);
    g.fillEllipse(60, 24, 10, 5);
    g.fillStyle(0xff6b77, 0.45);
    g.fillEllipse(40, 24, 16, 8);
    g.fillEllipse(60, 24, 16, 8);
    g.generateTexture("lola_shadow", 100, 116);
    g.destroy();
  }

  if (!scene.textures.exists("lola_exit")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x15060a, 1);
    g.fillRoundedRect(10, 20, 100, 132, 22);
    g.fillStyle(0x320b10, 1);
    g.fillRoundedRect(22, 32, 76, 108, 16);
    g.fillStyle(0x8f111d, 0.92);
    g.fillRoundedRect(30, 42, 60, 88, 14);
    g.fillStyle(0xff625f, 0.72);
    g.fillRoundedRect(38, 50, 44, 72, 12);
    g.lineStyle(5, 0xffb38a, 0.95);
    g.strokeRoundedRect(14, 24, 92, 124, 18);
    g.fillStyle(0x2b070b, 1);
    g.fillRect(48, 76, 8, 36);
    g.generateTexture("lola_exit", 120, 156);
    g.destroy();
  }
}

function createDoraBossTextures(scene) {
  if (!scene.textures.exists("dora_background")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillGradientStyle(0x08020b, 0x08020b, 0x2a0726, 0x2a0726, 1);
    g.fillRect(0, 0, 512, 288);
    g.fillStyle(0x180511, 1);
    g.fillRect(0, 188, 512, 100);
    g.fillStyle(0x4b102f, 0.45);
    g.fillCircle(256, 136, 100);
    g.fillStyle(0x080108, 0.7);
    g.fillRect(0, 240, 512, 48);
    g.generateTexture("dora_background", 512, 288);
    g.destroy();
  }

  if (!scene.textures.exists("dora_floor")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x110309, 1);
    g.fillRect(0, 0, 256, 120);
    g.fillStyle(0x2d0a16, 1);
    g.fillRect(0, 0, 256, 22);
    g.fillStyle(0x4f1530, 0.9);
    g.fillRect(0, 18, 256, 10);
    g.fillStyle(0x070104, 1);
    g.fillRect(0, 86, 256, 34);
    g.lineStyle(2, 0x61203a, 0.95);
    for (let x = 0; x < 256; x += 28) {
      g.beginPath();
      g.moveTo(x, 18);
      g.lineTo(x + 16, 38);
      g.lineTo(x + 6, 64);
      g.lineTo(x + 26, 82);
      g.strokePath();
    }
    g.generateTexture("dora_floor", 256, 120);
    g.destroy();
  }

  if (!scene.textures.exists("dora_wall")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x0e0410, 1);
    g.fillRect(0, 0, 80, 220);
    g.fillStyle(0x2a0d22, 1);
    g.fillRect(8, 12, 64, 196);
    g.fillStyle(0x5d183b, 0.4);
    g.fillRect(18, 26, 44, 18);
    g.fillRect(18, 82, 44, 18);
    g.fillRect(18, 138, 44, 18);
    g.fillRect(18, 174, 44, 14);
    g.generateTexture("dora_wall", 80, 220);
    g.destroy();
  }

  if (!scene.textures.exists("dora_core")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x2f0710, 1);
    g.fillCircle(22, 22, 22);
    g.fillStyle(0xb51126, 1);
    g.fillCircle(22, 22, 15);
    g.fillStyle(0xff7074, 0.95);
    g.fillCircle(22, 22, 7);
    g.generateTexture("dora_core", 44, 44);
    g.destroy();
  }

  if (!scene.textures.exists("dora_shockwave")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xff4761, 0.95);
    g.fillTriangle(4, 22, 30, 2, 56, 22);
    g.fillStyle(0xff9ca2, 0.82);
    g.fillTriangle(14, 22, 30, 8, 46, 22);
    g.generateTexture("dora_shockwave", 60, 24);
    g.destroy();
  }

  if (!scene.textures.exists("dora_bolt")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x3a0615, 1);
    g.fillRect(8, 0, 16, 56);
    g.fillStyle(0xff4b64, 1);
    g.fillRect(12, 4, 8, 48);
    g.fillStyle(0xffc6cd, 0.9);
    g.fillRect(14, 8, 4, 28);
    g.generateTexture("dora_bolt", 32, 56);
    g.destroy();
  }

  if (!scene.textures.exists("dora_marker")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.lineStyle(4, 0xff5475, 0.95);
    g.strokeRoundedRect(2, 2, 92, 18, 6);
    g.fillStyle(0xff5475, 0.2);
    g.fillRoundedRect(4, 4, 88, 14, 4);
    g.generateTexture("dora_marker", 96, 22);
    g.destroy();
  }

  if (!scene.textures.exists("player_bullet")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x00e8ff, 0.18);
    g.fillCircle(12, 12, 12);
    g.fillStyle(0x7ef7ff, 0.9);
    g.fillCircle(12, 12, 7);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(12, 12, 3);
    g.generateTexture("player_bullet", 24, 24);
    g.destroy();
  }

  if (!scene.textures.exists("dora_bullet")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x3a0615, 1);
    g.fillRoundedRect(0, 4, 48, 14, 5);
    g.fillStyle(0xff2f5a, 1);
    g.fillRoundedRect(2, 6, 44, 10, 4);
    g.fillStyle(0xff9fbb, 0.9);
    g.fillRoundedRect(6, 8, 28, 6, 3);
    g.generateTexture("dora_bullet", 48, 22);
    g.destroy();
  }

  if (!scene.textures.exists("dora_boss")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x16050d, 1);
    g.fillRoundedRect(44, 18, 152, 178, 26);
    g.fillStyle(0x3a1147, 1);
    g.fillRoundedRect(56, 28, 128, 150, 18);
    g.fillStyle(0x16121e, 1);
    g.fillRect(58, 180, 124, 52);
    g.fillStyle(0x1d1326, 1);
    g.fillRect(34, 116, 34, 22);
    g.fillRect(172, 116, 34, 22);
    g.fillStyle(0xff5b7a, 1);
    g.fillCircle(120, 38, 14);
    g.fillCircle(120, 206, 18);
    g.fillStyle(0x7651a8, 1);
    g.fillCircle(104, 92, 34);
    g.fillCircle(136, 92, 34);
    g.generateTexture("dora_boss", 240, 232);
    g.destroy();
  }
}

function createFallbackTextures(scene) {
  if (!scene.textures.exists("background")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x85c7ff, 1);
    g.fillRect(0, 0, 256, 144);
    g.fillStyle(0xffdf7b, 1);
    g.fillCircle(208, 32, 18);
    g.fillStyle(0x5364c7, 1);
    g.fillTriangle(0, 118, 38, 72, 76, 118);
    g.fillTriangle(52, 118, 102, 56, 160, 118);
    g.fillTriangle(132, 118, 186, 66, 236, 118);
    g.fillStyle(0x355284, 1);
    g.fillRect(0, 118, 256, 26);
    g.fillStyle(0xffffff, 0.18);
    g.fillRect(0, 0, 256, 6);
    g.generateTexture("background", 256, 144);
    g.destroy();
  }

  if (!scene.textures.exists("ground")) {
    drawPlatformFallback(scene, "ground");
  }

  if (!scene.textures.exists("platform")) {
    drawPlatformFallback(scene, "platform");
  }

  if (!scene.textures.exists("tea")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff, 0.22);
    g.fillRoundedRect(4, 4, 20, 28, 5);
    g.fillStyle(0xb45c2d, 1);
    g.fillRoundedRect(6, 10, 16, 18, 4);
    g.lineStyle(2, 0xffffff, 0.9);
    g.strokeRoundedRect(4, 4, 20, 28, 5);
    g.strokeCircle(26, 16, 4);
    g.generateTexture("tea", 32, 40);
    g.destroy();
  }

  if (!scene.textures.exists("obstacle")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x5d5d5d, 1);
    g.fillRect(0, 18, 48, 36);
    g.fillStyle(0xe96d6d, 1);
    for (let x = 0; x < 48; x += 12) {
      g.fillTriangle(x, 18, x + 6, 0, x + 12, 18);
    }
    g.generateTexture("obstacle", 48, 54);
    g.destroy();
  }

  if (!scene.textures.exists("flag")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xe8e8e8, 1);
    g.fillRect(0, 0, 10, 120);
    g.fillStyle(0xff5e84, 1);
    g.fillTriangle(10, 8, 52, 24, 10, 44);
    g.fillStyle(0xffcf6b, 1);
    g.fillCircle(5, 5, 5);
    g.generateTexture("flag", 56, 120);
    g.destroy();
  }

  if (!scene.textures.exists("player_body")) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff, 1);
    g.fillRect(0, 0, 4, 4);
    g.generateTexture("player_body", 4, 4);
    g.destroy();
  }

  createLolaRunnerTextures(scene);
  createDoraBossTextures(scene);

  const runPoses = ["run0", "run1", "run2", "run3"];
  for (let index = 0; index < RUN_FRAME_TOTAL; index += 1) {
    const key = `player_run_${index}`;
    if (!scene.textures.exists(key)) {
      drawPlayerFallback(scene, key, runPoses[index % runPoses.length]);
    }
  }

  for (let index = 0; index < JUMP_FRAME_TOTAL; index += 1) {
    const key = `player_jump_${index}`;
    if (!scene.textures.exists(key)) {
      drawPlayerFallback(scene, key, "jump");
    }
  }

  [HALHOOLA_RUN_KEYS, AHMAR_ALWARD_RUN_KEYS, SOUAD_RUN_KEYS].forEach((frameSet) => {
    frameSet.forEach(({ key }, index) => {
      if (!scene.textures.exists(key)) {
        drawPlayerFallback(scene, key, runPoses[index % runPoses.length]);
      }
    });
  });

  HALHOOLA_JUMP_KEYS.forEach(({ key }) => {
    if (!scene.textures.exists(key)) {
      drawPlayerFallback(scene, key, "jump");
    }
  });

  AHMAR_ALWARD_JUMP_KEYS.forEach(({ key }) => {
    if (!scene.textures.exists(key)) {
      drawPlayerFallback(scene, key, "jump");
    }
  });

  SOUAD_JUMP_KEYS.forEach(({ key }) => {
    if (!scene.textures.exists(key)) {
      drawPlayerFallback(scene, key, "jump");
    }
  });

  const playerFallbacks = {
    player_idle: "idle",
    player_cry_0: "cry0",
    player_cry_1: "cry1",
  };

  Object.entries(playerFallbacks).forEach(([key, pose]) => {
    if (!scene.textures.exists(key)) {
      drawPlayerFallback(scene, key, pose);
    }
  });
}

function createAnimations(scene) {
  const createLoopAnimation = (animationKey, frameKeys, frameRate = 18) => {
    if (scene.anims.exists(animationKey)) {
      return;
    }

    const frames = frameKeys.filter(({ key }) => scene.textures.exists(key)).map(({ key }) => ({ key }));
    if (frames.length === 0) {
      return;
    }

    scene.anims.create({
      key: animationKey,
      frames,
      frameRate,
      repeat: -1,
    });
  };

  createLoopAnimation("player-run", RUN_FRAME_KEYS, 18);
  createLoopAnimation("halhoola-run", HALHOOLA_RUN_KEYS, 18);
  createLoopAnimation("ahmar-alward-run", AHMAR_ALWARD_RUN_KEYS, 18);
  createLoopAnimation("souad-run", SOUAD_RUN_KEYS, 18);
  if (!scene.anims.exists("halhoola-jump")) {
    const halhoolaJumpFrames = HALHOOLA_JUMP_KEYS.filter(({ key }) =>
      scene.textures.exists(key)
    ).map(({ key }) => ({ key }));

    if (halhoolaJumpFrames.length > 0) {
      scene.anims.create({
        key: "halhoola-jump",
        frames: halhoolaJumpFrames,
        frameRate: 18,
        repeat: 0,
      });
    }
  }

  if (!scene.anims.exists("ahmar-alward-jump")) {
    const ahmarAlwardJumpFrames = AHMAR_ALWARD_JUMP_KEYS.filter(({ key }) =>
      scene.textures.exists(key)
    ).map(({ key }) => ({ key }));

    if (ahmarAlwardJumpFrames.length > 0) {
      scene.anims.create({
        key: "ahmar-alward-jump",
        frames: ahmarAlwardJumpFrames,
        frameRate: 18,
        repeat: 0,
      });
    }
  }

  if (!scene.anims.exists("souad-jump")) {
    const souadJumpFrames = SOUAD_JUMP_KEYS.filter(({ key }) => scene.textures.exists(key)).map(
      ({ key }) => ({ key })
    );

    if (souadJumpFrames.length > 0) {
      scene.anims.create({
        key: "souad-jump",
        frames: souadJumpFrames,
        frameRate: 18,
        repeat: 0,
      });
    }
  }

  if (!scene.anims.exists("player-jump")) {
    const jumpFrames = JUMP_FRAME_KEYS.filter(({ key }) => scene.textures.exists(key)).map(
      ({ key }) => ({ key })
    );

    scene.anims.create({
      key: "player-jump",
      frames: jumpFrames,
      frameRate: 18,
      repeat: 0,
    });
  }

  if (!scene.anims.exists("player-cry")) {
    scene.anims.create({
      key: "player-cry",
      frames: [{ key: "player_cry_0" }, { key: "player_cry_1" }],
      frameRate: 4,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("start-spin")) {
    const startSpinFrames = START_SPIN_KEYS.filter(({ key }) => scene.textures.exists(key)).map(
      ({ key }) => ({ key })
    );

    if (startSpinFrames.length > 0) {
      scene.anims.create({
        key: "start-spin",
        frames: startSpinFrames,
        frameRate: 12,
        repeat: -1,
      });
    }
  }

  if (!scene.anims.exists("lola-run")) {
    const lolaRunFrames = LOLA_RUN_KEYS.filter(({ key }) => scene.textures.exists(key)).map(
      ({ key }) => ({ key })
    );

    if (lolaRunFrames.length > 0) {
      scene.anims.create({
        key: "lola-run",
        frames: lolaRunFrames,
        frameRate: 16,
        repeat: -1,
      });
    }
  }
}

class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload() {
    this.cameras.main.setBackgroundColor("#050913");
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "جارٍ تحميل اوف اح...", {
        fontFamily: "Changa",
        fontSize: "32px",
        color: "#f8f3e8",
      })
      .setOrigin(0.5);

    Object.entries(ASSETS).forEach(([key, path]) => {
      this.load.image(key, path);
    });

    RUN_FRAME_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    HALHOOLA_RUN_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    HALHOOLA_JUMP_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    AHMAR_ALWARD_RUN_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    AHMAR_ALWARD_JUMP_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    SOUAD_RUN_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    SOUAD_JUMP_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    JUMP_FRAME_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    START_SPIN_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });

    LOLA_RUN_KEYS.forEach(({ key, path }) => {
      this.load.image(key, path);
    });
  }

  create() {
    createFallbackTextures(this);
    createAnimations(this);
    const params = new URLSearchParams(window.location.search);
    const jumpScene = params.get("scene");
    const validScenes = ["start", "game", "lola-chase", "dora-boss"];
    if (jumpScene && validScenes.includes(jumpScene)) {
      this.scene.start(jumpScene, { selectedCharacterId: loadSelectedCharacterId() });
    } else {
      this.scene.start("start");
    }
  }
}

class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  create() {
    setMobileUiBodyMode();
    setMobilePanelMode("platformer");
    setMobilePanelVisible(false);
    playSceneMusic(this, "menu");
    this.selectedCharacterId = loadSelectedCharacterId();
    this.selectedCharacterProfile = getCharacterProfile(this.selectedCharacterId);
    this.hasStarted = false;
    this.menuMode = "home";

    this.createMenuBackground();
    this.homeContainer = this.add.container(0, 0);
    this.characterContainer = this.add.container(0, 0);
    this.characterCardRefs = [];
    this.homeInteractiveZones = [];
    this.characterInteractiveZones = [];

    this.createHomeMenu();
    this.createCharacterMenu();
    this.refreshStartSceneUi();
    this.setMenuMode("home");
    this.bindStartSceneKeys();
  }

  createMenuBackground() {
    this.menuBgFar = this.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "background")
      .setOrigin(0)
      .setTint(0x050a1d)
      .setAlpha(0.55)
      .setDepth(-30);
    this.menuBgMid = this.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "background")
      .setOrigin(0)
      .setTint(0x07133a)
      .setAlpha(0.78)
      .setDepth(-20);
    this.menuBgNear = this.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "background")
      .setOrigin(0)
      .setTint(0x0a184d)
      .setAlpha(0.94)
      .setDepth(-10);

    this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x03040a, 0.28)
      .setDepth(-9);

    const vignette = this.add.graphics().setDepth(-8);
    vignette.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.36);
    vignette.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  }

  createTitleBlock(container, x, y, subtitle = null, options = {}) {
    const {
      topFontSize = "58px",
      bottomFontSize = "132px",
      subtitleFontSize = "44px",
      subtitleOffsetY = 170,
    } = options;

    const titleTop = this.add
      .text(x, y, "أوف", {
        fontFamily: "Changa",
        fontSize: topFontSize,
        fontStyle: "bold",
        color: "#f6f0ec",
        stroke: "#1e1524",
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    const titleBottom = this.add
      .text(x, y + 78, "أح", {
        fontFamily: "Changa",
        fontSize: bottomFontSize,
        fontStyle: "bold",
        color: "#ff1792",
        stroke: "#7a093f",
        strokeThickness: 10,
      })
      .setOrigin(0.5);

    container.add([titleTop, titleBottom]);

    if (subtitle) {
      const subtitleText = this.add
        .text(x, y + subtitleOffsetY, subtitle, {
          fontFamily: "Changa",
          fontSize: subtitleFontSize,
          fontStyle: "bold",
          color: "#f6f0ec",
          stroke: "#161018",
          strokeThickness: 7,
        })
        .setOrigin(0.5);
      container.add(subtitleText);
    }
  }

  createMenuButton(container, x, y, width, height, label, options) {
    const {
      fillColor = 0x090914,
      fillAlpha = 0.86,
      strokeColor = 0xf5f1ee,
      strokeAlpha = 0.96,
      labelColor = "#ffffff",
      icon = "▶",
      iconColor = labelColor,
      fontSize = "34px",
      iconSize = "34px",
      onPress,
      interactiveRegistry = null,
    } = options;

    const bg = this.add
      .rectangle(x, y, width, height, fillColor, fillAlpha)
      .setStrokeStyle(4, strokeColor, strokeAlpha);
    const glow = this.add
      .rectangle(x, y, width - 12, height - 12, fillColor, 0.08)
      .setAlpha(0);
    const iconText = this.add
      .text(x - width / 2 + 54, y, icon, {
        fontFamily: "Changa",
        fontSize: iconSize,
        fontStyle: "bold",
        color: iconColor,
      })
      .setOrigin(0.5);
    const labelText = this.add
      .text(x + 20, y + 1, label, {
        fontFamily: "Changa",
        fontSize,
        fontStyle: "bold",
        color: labelColor,
        stroke: "#140617",
        strokeThickness: 6,
      })
      .setOrigin(0.5);
    const zone = this.add
      .zone(x, y, width, height)
      .setInteractive({ useHandCursor: !shouldUseMobileUi() });

    zone.on("pointerover", () => {
      glow.setAlpha(1);
      bg.setScale(1.015, 1.03);
      glow.setScale(1.015, 1.03);
      labelText.setScale(1.015);
      iconText.setScale(1.015);
    });
    zone.on("pointerout", () => {
      glow.setAlpha(0);
      bg.setScale(1);
      glow.setScale(1);
      labelText.setScale(1);
      iconText.setScale(1);
    });
    zone.on("pointerdown", () => {
      if (onPress) {
        onPress();
      }
    });

    if (interactiveRegistry) {
      interactiveRegistry.push(zone);
    }

    container.add([bg, glow, iconText, labelText, zone]);
    return { bg, glow, labelText, iconText, zone };
  }

  createBackButton(container) {
    const bg = this.add
      .rectangle(68, 70, 58, 58, 0x0c0814, 0.9)
      .setStrokeStyle(4, 0xff1792, 0.96);
    const label = this.add
      .text(68, 70, "‹", {
        fontFamily: "Changa",
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ff1792",
      })
      .setOrigin(0.5);
    const zone = this.add
      .zone(68, 70, 58, 58)
      .setInteractive({ useHandCursor: !shouldUseMobileUi() });

    zone.on("pointerdown", () => this.setMenuMode("home"));
    zone.on("pointerover", () => {
      bg.setScale(1.06);
      label.setScale(1.06);
    });
    zone.on("pointerout", () => {
      bg.setScale(1);
      label.setScale(1);
    });

    this.characterInteractiveZones.push(zone);
    container.add([bg, label, zone]);
  }

  createHomeMenu() {
    if (PORTRAIT) {
      this.createHomeMenuPortrait();
    } else {
      this.createHomeMenuLandscape();
    }
  }

  createHomeMenuPortrait() {
    this.createTitleBlock(this.homeContainer, GAME_WIDTH / 2, 30, null, {
      topFontSize: "40px",
      bottomFontSize: "96px",
    });

    const previewShadow = this.add.ellipse(GAME_WIDTH / 2, 365, 130, 28, 0x000000, 0.34);
    this.homePreview = this.add.image(GAME_WIDTH / 2, 260, this.selectedCharacterProfile.previewKey);
    fitToHeight(this.homePreview, 200);

    this.homeCharacterNameText = this.add
      .text(GAME_WIDTH / 2, 374, this.selectedCharacterProfile.character.name, {
        fontFamily: "Changa",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#f3eef1",
        stroke: "#160818",
        strokeThickness: 7,
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [this.homePreview, previewShadow],
      y: "-=7",
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.createMenuButton(this.homeContainer, GAME_WIDTH / 2, 438, 320, 72, "ابدأ اللعبة", {
      fillColor: 0x100313,
      strokeColor: 0xff1792,
      labelColor: "#ff46ae",
      icon: "▶",
      iconColor: "#ff1792",
      fontSize: "26px",
      iconSize: "26px",
      interactiveRegistry: this.homeInteractiveZones,
      onPress: () => this.startSelectedGame("game"),
    });

    this.createMenuButton(this.homeContainer, GAME_WIDTH / 2, 522, 320, 70, "🌐 اللعب الجماعي", {
      fillColor: 0x130925,
      strokeColor: 0x7e39db,
      labelColor: "#b366ff",
      icon: "👥",
      iconColor: "#7e39db",
      fontSize: "24px",
      iconSize: "22px",
      interactiveRegistry: this.homeInteractiveZones,
      onPress: () => this.playOnline(),
    });

    this.createMenuButton(this.homeContainer, GAME_WIDTH / 2, 604, 320, 70, "اختر شخصيتك", {
      fillColor: 0x090914,
      strokeColor: 0xf5f1ee,
      labelColor: "#f5f1ee",
      icon: "◀",
      iconColor: "#f5f1ee",
      fontSize: "24px",
      iconSize: "24px",
      interactiveRegistry: this.homeInteractiveZones,
      onPress: () => this.setMenuMode("characters"),
    });

    this.homeContainer.add([previewShadow, this.homePreview, this.homeCharacterNameText]);
  }

  createHomeMenuLandscape() {
    this.createTitleBlock(this.homeContainer, 550, 82);

    const previewShadow = this.add.ellipse(1040, 645, 190, 42, 0x000000, 0.34);
    this.homePreview = this.add.image(1030, 405, this.selectedCharacterProfile.previewKey);
    fitToHeight(this.homePreview, 520);

    this.homeCharacterNameText = this.add
      .text(1035, 652, this.selectedCharacterProfile.character.name, {
        fontFamily: "Changa",
        fontSize: "30px",
        fontStyle: "bold",
        color: "#f3eef1",
        stroke: "#160818",
        strokeThickness: 7,
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [this.homePreview, previewShadow],
      y: "-=10",
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.createMenuButton(
      this.homeContainer,
      462,
      454,
      478,
      94,
      "ابدأ اللعبة",
      {
        fillColor: 0x100313,
        strokeColor: 0xff1792,
        labelColor: "#ff46ae",
        icon: "▶",
        iconColor: "#ff1792",
        interactiveRegistry: this.homeInteractiveZones,
        onPress: () => this.startSelectedGame("game"),
      }
    );

    this.createMenuButton(
      this.homeContainer,
      462,
      567,
      478,
      86,
      "🌐 اللعب الجماعي",
      {
        fillColor: 0x130925,
        strokeColor: 0x7e39db,
        labelColor: "#b366ff",
        icon: "👥",
        iconColor: "#7e39db",
        fontSize: "32px",
        interactiveRegistry: this.homeInteractiveZones,
        onPress: () => this.playOnline(),
      }
    );

    this.createMenuButton(
      this.homeContainer,
      462,
      668,
      478,
      90,
      "اختر شخصيتك",
      {
        fillColor: 0x090914,
        strokeColor: 0xf5f1ee,
        labelColor: "#f5f1ee",
        icon: "◀",
        iconColor: "#f5f1ee",
        fontSize: "32px",
        interactiveRegistry: this.homeInteractiveZones,
        onPress: () => this.setMenuMode("characters"),
      }
    );

    this.homeContainer.add([previewShadow, this.homePreview, this.homeCharacterNameText]);
  }

  createCharacterMenu() {
    if (PORTRAIT) {
      this.createCharacterMenuPortrait();
    } else {
      this.createCharacterMenuLandscape();
    }
  }

  createCharacterMenuPortrait() {
    this.createTitleBlock(this.characterContainer, GAME_WIDTH / 2, 18, "اختر شخصيتك", {
      topFontSize: "32px",
      bottomFontSize: "72px",
      subtitleFontSize: "24px",
      subtitleOffsetY: 88,
    });
    this.createBackButton(this.characterContainer);

    const col1 = GAME_WIDTH * 0.26;
    const col2 = GAME_WIDTH * 0.74;
    const cardLayout = [
      { id: "ahmar-alward", x: col1, y: 310 },
      { id: "souad", x: col2, y: 310 },
      { id: "ofah", x: col1, y: 570 },
      { id: "halhoola", x: col2, y: 570 },
    ];
    const cardWidth = 160;
    const cardHeight = 220;

    cardLayout.forEach(({ id, x, y }) => {
      const character = getCharacterOptionById(id);
      const profile = getCharacterProfile(character.id);

      const panel = this.add.rectangle(x, y, cardWidth, cardHeight, 0x050814, 0.9).setStrokeStyle(3, 0xf2f0ed, 0.96);
      const inner = this.add.rectangle(x, y, cardWidth - 14, cardHeight - 14, 0x0a1129, 0.24);
      const preview = this.add.image(x, y - 32, profile.previewKey);
      fitToHeight(preview, 160);
      const nameText = this.add.text(x, y + 72, character.name, {
        fontFamily: "Changa", fontSize: "18px", fontStyle: "bold",
        color: "#f6f0ec", stroke: "#130913", strokeThickness: 5,
      }).setOrigin(0.5);

      const cardZone = this.add.zone(x, y, cardWidth, cardHeight).setInteractive({ useHandCursor: !shouldUseMobileUi() });
      cardZone.on("pointerdown", () => this.selectCharacter(character.id));

      this.characterInteractiveZones.push(cardZone);
      this.characterContainer.add([panel, inner, preview, nameText, cardZone]);

      const button = this.createMenuButton(this.characterContainer, x, y + 92, 130, 42, "اختر", {
        fillColor: 0x080d18, strokeColor: 0xf2f0ed, labelColor: "#f5f1ee",
        icon: "▶", iconColor: "#f5f1ee", fontSize: "18px", iconSize: "20px",
        interactiveRegistry: this.characterInteractiveZones,
        onPress: () => this.selectCharacter(character.id),
      });
      this.characterCardRefs.push({ characterId: character.id, panel, inner, preview, nameText, button });
    });

    const footer = this.add.text(GAME_WIDTH / 2, 696, "★ اختر بطلتك وابدأ التحدي! ★", {
      fontFamily: "Changa", fontSize: "18px", fontStyle: "bold",
      color: "#ff1792", stroke: "#130913", strokeThickness: 5,
    }).setOrigin(0.5);
    this.characterContainer.add(footer);
  }

  createCharacterMenuLandscape() {
    this.createTitleBlock(this.characterContainer, GAME_WIDTH / 2, 36, "اختر شخصيتك", {
      topFontSize: "52px",
      bottomFontSize: "118px",
      subtitleFontSize: "36px",
      subtitleOffsetY: 142,
    });
    this.createBackButton(this.characterContainer);

    const cardLayout = [
      { id: "ahmar-alward", x: 182 },
      { id: "souad", x: 456 },
      { id: "ofah", x: 730 },
      { id: "halhoola", x: 1004 },
    ];

    cardLayout.forEach(({ id, x }) => {
      const character = getCharacterOptionById(id);
      const profile = getCharacterProfile(character.id);
      const cardY = 476;
      const cardWidth = 234;
      const cardHeight = 532;

      const panel = this.add
        .rectangle(x, cardY, cardWidth, cardHeight, 0x050814, 0.9)
        .setStrokeStyle(4, 0xf2f0ed, 0.96);
      const inner = this.add
        .rectangle(x, cardY, cardWidth - 18, cardHeight - 18, 0x0a1129, 0.24);
      const preview = this.add.image(x, cardY - 58, profile.previewKey);
      fitToHeight(preview, 302);
      const nameText = this.add
        .text(x, cardY + 166, character.name, {
          fontFamily: "Changa",
          fontSize: "26px",
          fontStyle: "bold",
          color: "#f6f0ec",
          stroke: "#130913",
          strokeThickness: 6,
        })
        .setOrigin(0.5);

      const cardZone = this.add
        .zone(x, cardY, cardWidth, cardHeight)
        .setInteractive({ useHandCursor: !shouldUseMobileUi() });

      cardZone.on("pointerdown", () => this.selectCharacter(character.id));
      cardZone.on("pointerover", () => {
        if (this.selectedCharacterId !== character.id) {
          panel.setScale(1.02);
          inner.setScale(1.02);
          preview.setScale(preview.scale * 1.02);
        }
      });
      cardZone.on("pointerout", () => {
        if (this.selectedCharacterId !== character.id) {
          panel.setScale(1);
          inner.setScale(1);
          fitToHeight(preview, 302);
        }
      });

      this.characterInteractiveZones.push(cardZone);
      this.characterContainer.add([panel, inner, preview, nameText, cardZone]);
      const button = this.createMenuButton(
        this.characterContainer,
        x,
        cardY + 226,
        176,
        54,
        "اختر",
        {
          fillColor: 0x080d18,
          strokeColor: 0xf2f0ed,
          labelColor: "#f5f1ee",
          icon: "▶",
          iconColor: "#f5f1ee",
          fontSize: "24px",
          iconSize: "28px",
          interactiveRegistry: this.characterInteractiveZones,
          onPress: () => this.selectCharacter(character.id),
        }
      );
      this.characterCardRefs.push({
        characterId: character.id,
        panel,
        inner,
        preview,
        nameText,
        button,
      });
    });

    const footer = this.add
      .text(GAME_WIDTH / 2, 702, "★ اختر بطلتك وابدأ التحدي! ★", {
        fontFamily: "Changa",
        fontSize: "28px",
        fontStyle: "bold",
        color: "#ff1792",
        stroke: "#130913",
        strokeThickness: 6,
      })
      .setOrigin(0.5);
    this.characterContainer.add(footer);
  }
  // end createCharacterMenuLandscape

  bindStartSceneKeys() {
    const onStart = () => {
      if (this.menuMode === "home") {
        this.startSelectedGame("game");
      }
    };
    const onToggleCharacters = () => {
      this.setMenuMode(this.menuMode === "home" ? "characters" : "home");
    };
    const onEscape = () => {
      if (this.menuMode === "characters") {
        this.setMenuMode("home");
      }
    };

    this.input.keyboard.on("keydown-SPACE", onStart);
    this.input.keyboard.on("keydown-ENTER", onStart);
    this.input.keyboard.on("keydown-C", onToggleCharacters);
    this.input.keyboard.on("keydown-ESC", onEscape);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.off("keydown-SPACE", onStart);
      this.input.keyboard.off("keydown-ENTER", onStart);
      this.input.keyboard.off("keydown-C", onToggleCharacters);
      this.input.keyboard.off("keydown-ESC", onEscape);
    });
  }

  setMenuMode(mode) {
    this.menuMode = mode;
    const isHome = mode === "home";
    this.homeContainer.setVisible(isHome);
    this.characterContainer.setVisible(!isHome);
    this.homeInteractiveZones.forEach((zone) => {
      zone.input.enabled = isHome;
    });
    this.characterInteractiveZones.forEach((zone) => {
      zone.input.enabled = !isHome;
    });
  }

  selectCharacter(characterId) {
    this.selectedCharacterId = saveSelectedCharacterId(characterId);
    this.refreshStartSceneUi();
    this.setMenuMode("home");
  }

  refreshStartSceneUi() {
    this.selectedCharacterProfile = getCharacterProfile(this.selectedCharacterId);
    this.homePreview.setTexture(this.selectedCharacterProfile.previewKey);
    fitToHeight(this.homePreview, PORTRAIT ? 200 : 520);
    this.homeCharacterNameText.setText(this.selectedCharacterProfile.character.name);

    this.characterCardRefs.forEach(({ characterId, panel, inner, preview, nameText, button }) => {
      const isSelected = characterId === this.selectedCharacterId;
      panel.setFillStyle(isSelected ? 0x12061b : 0x050814, 0.92);
      panel.setStrokeStyle(4, isSelected ? 0xff1792 : 0xf2f0ed, 0.98);
      inner.setFillStyle(isSelected ? 0x190a2a : 0x0a1129, isSelected ? 0.32 : 0.24);
      fitToHeight(preview, PORTRAIT ? 155 : 302);
      preview.setAlpha(isSelected ? 1 : 0.94);
      if (isSelected) {
        preview.setScale(preview.scale * 1.02);
      }
      nameText.setColor(isSelected ? "#ff46ae" : "#f6f0ec");
      button.bg.setFillStyle(isSelected ? 0x180214 : 0x080d18, 0.92);
      button.bg.setStrokeStyle(4, isSelected ? 0xff1792 : 0xf2f0ed, 0.98);
      button.labelText.setText(isSelected ? "تم" : "اختر");
      button.labelText.setColor(isSelected ? "#ff46ae" : "#f5f1ee");
      button.iconText.setColor(isSelected ? "#ff1792" : "#f5f1ee");
    });
  }

  startSelectedGame(sceneKey) {
    if (this.hasStarted) {
      return;
    }

    this.selectedCharacterId = saveSelectedCharacterId(this.selectedCharacterId);
    this.hasStarted = true;
    this.cameras.main.flash(180, 255, 70, 170);
    this.time.delayedCall(120, () => {
      this.scene.start(sceneKey, { selectedCharacterId: this.selectedCharacterId });
    });
  }

  playOnline() {
    if (!window.lobbyBridge) window.lobbyBridge = {};
    window.lobbyBridge.onGameStart = () => this.startSelectedGame("game");
    if (!mp.socket) {
      initLobbyOverlay();
    }
    showLobbyOverlay();
  }

  update() {
    if (this.menuBgFar) {
      this.menuBgFar.tilePositionX += 0.03;
      this.menuBgMid.tilePositionX += 0.08;
      this.menuBgNear.tilePositionX += 0.16;
    }
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create(data = {}) {
    this.hasEnded = false;
    this.collectedTea = 0;
    this.characterProfile = getCharacterProfile(data.selectedCharacterId);
    setMobileUiBodyMode();
    setMobilePanelMode("platformer");
    this.useMobileUi = shouldUseMobileUi();
    this.mobileMoveLeft = false;
    this.mobileMoveRight = false;
    this.mobileJumpQueued = false;
    this.jumpsUsed = 0;

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, 1200);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);

    const _bgW = PORTRAIT ? Math.ceil(GAME_WIDTH / 0.75) : GAME_WIDTH;
    const _bgH = PORTRAIT ? Math.ceil(GAME_HEIGHT / 0.75) : GAME_HEIGHT;

    this.bgFar = this.add
      .tileSprite(0, 0, _bgW, _bgH, "background")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(-30)
      .setAlpha(0.42);

    this.bgMid = this.add
      .tileSprite(0, 0, _bgW, _bgH, "background")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(-20)
      .setAlpha(0.62);

    this.bgNear = this.add
      .tileSprite(0, 0, _bgW, _bgH, "background")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(-10)
      .setAlpha(0.82);

    this.platforms = this.physics.add.staticGroup();
    this.buildPlatforms();

    this.teaGroup = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    this.buildTea();

    this.obstacles = this.physics.add.staticGroup();
    this.buildObstacles();

    this.flag = this.physics.add.staticImage(FLAG_X, FLOOR_Y, "flag").setOrigin(0.5, 1);
    fitToHeight(this.flag, 132);
    this.flag.refreshBody();

    const playerParts = createGameplayCharacter(
      this,
      100,
      FLOOR_Y,
      this.characterProfile,
      8
    );
    this.player = playerParts.player;
    this.playerVisual = playerParts.visual;
    this.player.setBounce(0);
    this.player.setDragX(1400);
    this.player.setMaxVelocity(260, 900);
    this.alignPlayerBodyToFeet();
    this.wasOnGround = true;

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.teaGroup,
      this.collectTea,
      undefined,
      this
    );
    this.physics.add.collider(
      this.player,
      this.obstacles,
      () => this.finishLevel(false),
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.flag,
      () => this.finishLevel(true),
      undefined,
      this
    );

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameraLookAhead = PORTRAIT ? -80 : 0;
    if (PORTRAIT) {
      this.cameras.main.setZoom(0.75);
      this.cameras.main.setFollowOffset(this.cameraLookAhead, 0);
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.input.keyboard.addCapture(["LEFT", "RIGHT", "SPACE"]);
    this.levelStartTime = this.time.now;
    if (this.useMobileUi) {
      this.createMobileControls();
      setMobilePanelVisible(true);
    } else {
      setMobilePanelVisible(false);
      this.createHud();
    }
    this.updateHud();
    bindInGameExitButton(this);

    // Initialize multiplayer if enabled
    this.remotePlayers = new Map();
    this.myNickname = localStorage.getItem("mp-nickname") || "Player";
    if (mp.enabled && mp.socket) {
      const myPlayerId = mp.myId;
      mp.players.forEach((player, id) => {
        if (id !== myPlayerId) {
          const remoteData = {
            id: id,
            x: 100,
            y: FLOOR_Y,
            characterId: player.characterId,
            nickname: player.nickname,
          };
          this.remotePlayers.set(id, createRemotePlayerSprite(this, remoteData));
        }
      });
      attachMpListeners(this, this.remotePlayers, this.myNickname);
      showLeaderboard();
    }

  }

  buildPlatforms() {
    GROUND_SEGMENTS.forEach((segment) => {
      this.createPlatformSegment(segment, "ground");
    });

    FLOATING_PLATFORMS.forEach((segment) => {
      this.createPlatformSegment(segment, "platform");
    });
  }

  createPlatformSegment(segment, textureKey) {
    const platform = this.platforms
      .create(segment.x, segment.y, textureKey)
      .setOrigin(0, 0);

    const targetHeight =
      textureKey === "ground" ? GAME_HEIGHT - segment.y + 24 : segment.height;

    platform.displayWidth = segment.width;
    platform.displayHeight = targetHeight;
    platform.refreshBody();
  }

  alignPlayerBodyToFeet() {
    alignCharacterBodyToFeet(
      this.player,
      this.characterProfile.character.id,
      this.playerVisual
    );
  }

  createMobileControls() {
    const refs = getMobilePanelRefs();
    if (!refs?.panel) {
      return;
    }

    this.mobileControlCleanup = [];

    this.bindMobileHoldControl(
      refs.left,
      () => {
        this.mobileMoveLeft = true;
      },
      () => {
        this.mobileMoveLeft = false;
      }
    );

    this.bindMobileHoldControl(
      refs.right,
      () => {
        this.mobileMoveRight = true;
      },
      () => {
        this.mobileMoveRight = false;
      }
    );

    this.bindMobileTapControl(refs.jump, () => {
      this.mobileJumpQueued = true;
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.detachMobileControls();
      this.resetMobileControls();
      setMobilePanelVisible(false);
    });
  }

  bindMobileHoldControl(element, onPress, onRelease) {
    if (!element) {
      return;
    }

    const press = (event) => {
      event.preventDefault();
      element.classList.add("is-pressed");
      onPress();
    };
    const release = (event) => {
      event.preventDefault();
      element.classList.remove("is-pressed");
      onRelease();
    };

    element.addEventListener("pointerdown", press);
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      element.addEventListener(eventName, release);
    });

    this.mobileControlCleanup.push(() => {
      element.removeEventListener("pointerdown", press);
      ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
        element.removeEventListener(eventName, release);
      });
    });
  }

  bindMobileTapControl(element, onPress) {
    if (!element) {
      return;
    }

    const press = (event) => {
      event.preventDefault();
      element.classList.add("is-pressed");
      onPress();
    };
    const release = (event) => {
      event.preventDefault();
      element.classList.remove("is-pressed");
    };

    element.addEventListener("pointerdown", press);
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      element.addEventListener(eventName, release);
    });

    this.mobileControlCleanup.push(() => {
      element.removeEventListener("pointerdown", press);
      ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
        element.removeEventListener(eventName, release);
      });
    });
  }

  detachMobileControls() {
    if (!this.mobileControlCleanup) {
      return;
    }

    this.mobileControlCleanup.forEach((cleanup) => cleanup());
    this.mobileControlCleanup = [];
  }

  resetMobileControls() {
    this.mobileMoveLeft = false;
    this.mobileMoveRight = false;
    this.mobileJumpQueued = false;

    const refs = getMobilePanelRefs();
    refs?.left?.classList.remove("is-pressed");
    refs?.right?.classList.remove("is-pressed");
    refs?.jump?.classList.remove("is-pressed");
  }

  createHudPanel(x, y, width, height) {
    const panel = this.add
      .rectangle(x, y, width, height, 0x060513, 0.84)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);
    panel.setStrokeStyle(4, 0x7e39db, 0.96);

    const innerGlow = this.add
      .rectangle(x + 8, y + 8, width - 16, height - 16, 0x0d1025, 0.26)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);

    return { panel, innerGlow };
  }

  createHud() {
    const topY = 18;
    const topHeight = 72;
    const stageX = 24;
    const stageWidth = 140;
    const timeX = 180;
    const timeWidth = 156;
    const scoreX = 352;
    const scoreWidth = 186;
    const statusX = 554;
    const statusWidth = 382;
    const missionX = 24;
    const missionY = 104;
    const missionWidth = 320;
    const missionHeight = 112;

    this.createHudPanel(stageX, topY, stageWidth, topHeight);
    this.add
      .text(stageX + stageWidth / 2, topY + 10, "المرحلة", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff2fae",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.stageValueText = this.add
      .text(stageX + stageWidth / 2, topY + 40, LEVEL_LABEL, {
        fontFamily: "Changa",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createHudPanel(timeX, topY, timeWidth, topHeight);
    this.add
      .text(timeX + timeWidth / 2, topY + 10, "الوقت", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff2fae",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.timeValueText = this.add
      .text(timeX + timeWidth / 2, topY + 39, "00:00", {
        fontFamily: "monospace",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createHudPanel(scoreX, topY, scoreWidth, topHeight);
    this.hudTeaIcon = this.add
      .image(scoreX + 30, topY + topHeight / 2, "tea")
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    fitToHeight(this.hudTeaIcon, 28);
    this.scoreValueText = this.add
      .text(scoreX + 108, topY + topHeight / 2, `0 / ${TOTAL_TEA}`, {
        fontFamily: "monospace",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createHudPanel(statusX, topY, statusWidth, topHeight);
    this.hudPortrait = this.add
      .image(statusX + 44, topY + topHeight / 2, "hud_portrait")
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    fitToHeight(this.hudPortrait, 62);
    this.add
      .text(statusX + statusWidth - 24, topY + 12, this.characterProfile.character.name, {
        fontFamily: "Changa",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.add
      .text(statusX + statusWidth - 24, topY + 41, "♥ ♥ ♡", {
        fontFamily: "Arial",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ff2fae",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createHudPanel(missionX, missionY, missionWidth, missionHeight);
    this.add
      .text(missionX + missionWidth - 18, missionY + 10, "المهمة", {
        fontFamily: "Changa",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ff2fae",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.add
      .text(missionX + missionWidth - 18, missionY + 42, `اجمع ${TOTAL_TEA} أكواب`, {
        fontFamily: "Changa",
        fontSize: "18px",
        color: "#ffffff",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.missionBarTrack = this.add
      .rectangle(missionX + 20, missionY + 76, 236, 16, 0x1b0627, 1)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.missionBarTrack.setStrokeStyle(3, 0x7e39db, 0.95);

    this.missionBarFill = this.add
      .rectangle(missionX + 23, missionY + 76, 230, 10, 0xff2fae, 1)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 3);
    this.missionProgressText = this.add
      .text(missionX + missionWidth - 18, missionY + 88, `0 / ${TOTAL_TEA}`, {
        fontFamily: "monospace",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
  }

  updateHud() {
    const elapsedSeconds = Math.floor((this.time.now - this.levelStartTime) / 1000);

    if (this.useMobileUi) {
      updateMobilePanelHud({
        collectedTea: this.collectedTea,
        totalTea: TOTAL_TEA,
        elapsedSeconds,
      });
      return;
    }

    const progressRatio = Phaser.Math.Clamp(this.collectedTea / TOTAL_TEA, 0, 1);

    this.scoreValueText.setText(`${this.collectedTea} / ${TOTAL_TEA}`);
    this.timeValueText.setText(formatClock(elapsedSeconds));
    this.missionProgressText.setText(`${this.collectedTea} / ${TOTAL_TEA}`);
    this.missionBarFill.scaleX = progressRatio;
    this.missionBarFill.visible = progressRatio > 0;
  }

  buildTea() {
    TEA_POSITIONS.forEach((teaPosition, index) => {
      const tea = this.teaGroup.create(teaPosition.x, teaPosition.y, "tea");
      fitToHeight(tea, TEA_HEIGHT);
      tea.body.setSize(tea.displayWidth * 0.8, tea.displayHeight * 0.8, true);

      this.tweens.add({
        targets: tea,
        y: tea.y - 10,
        duration: 700 + index * 25,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    });
  }

  buildObstacles() {
    OBSTACLE_POSITIONS.forEach((obstaclePosition) => {
      const obstacle = this.obstacles
        .create(obstaclePosition.x, obstaclePosition.y, "obstacle")
        .setOrigin(0.5, 1);

      fitToHeight(obstacle, 58);
      obstacle.refreshBody();
    });
  }

  playTeaCollectSound() {
    const audioContext = this.sound?.context;
    if (!audioContext) {
      return;
    }

    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }

    const noteTimings = [0, 0.055];
    const noteFrequencies = [920, 1320];
    const startTime = audioContext.currentTime + 0.01;

    noteFrequencies.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const noteStart = startTime + noteTimings[index];
      const noteEnd = noteStart + 0.12;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.06, noteEnd);

      gainNode.gain.setValueAtTime(0.0001, noteStart);
      gainNode.gain.exponentialRampToValueAtTime(0.045, noteStart + 0.012);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteEnd);
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    });
  }

  collectTea(player, tea) {
    tea.disableBody(true, true);
    this.playTeaCollectSound();
    this.collectedTea += 1;
    this.updateHud();
  }

  finishLevel(didWin) {
    if (this.hasEnded) {
      return;
    }

    this.hasEnded = true;
    this.physics.pause();
    this.cameras.main.stopFollow();
    this.player.setVelocity(0, 0);

    // Send multiplayer notification
    if (mp.enabled && mp.socket) {
      if (didWin) {
        mp.socket.emit("playerFinished", { id: mp.myId });
      } else {
        mp.socket.emit("playerDied", { id: mp.myId });
      }
    }

    if (didWin) {
      setPlayerTextureAtFixedHeight(
        this.playerVisual,
        this.characterProfile.idleKey,
        PLAYER_HEIGHT,
        () => this.alignPlayerBodyToFeet()
      );
      this.cameras.main.flash(350, 255, 245, 190);
    } else {
      playPlayerAnimationAtFixedHeight(
        this.playerVisual,
        this.characterProfile.cryAnimKey,
        PLAYER_HEIGHT,
        () => this.alignPlayerBodyToFeet()
      );
      this.cameras.main.shake(260, 0.012);
      this.cameras.main.flash(250, 255, 80, 80);
    }

    this.time.delayedCall(700, () => {
      if (didWin) {
        this.scene.start("lola-chase", {
          selectedCharacterId: this.characterProfile.character.id,
        });
        return;
      }

      this.scene.start("result", {
        didWin: false,
        collectedTea: this.collectedTea,
        selectedCharacterId: this.characterProfile.character.id,
      });
    });
  }

  update() {
    if (this.hasEnded) {
      return;
    }

    this.bgFar.tilePositionX += BG_FAR_SPEED;
    this.bgMid.tilePositionX += BG_MID_SPEED;
    this.bgNear.tilePositionX += BG_NEAR_SPEED;
    this.updateHud();

    if (PORTRAIT) {
      const movingRight = this.cursors.right.isDown || this.mobileMoveRight;
      const movingLeft  = this.cursors.left.isDown  || this.mobileMoveLeft;
      const targetLook  = movingRight ? -140 : movingLeft ? 30 : -70;
      this.cameraLookAhead = Phaser.Math.Linear(this.cameraLookAhead, targetLook, 0.035);
      this.cameras.main.setFollowOffset(this.cameraLookAhead, 0);
    }

    if (this.player.x < 28) {
      this.player.x = 28;
      this.player.body.velocity.x = 0;
    }

    const isOnGround =
      this.player.body.blocked.down || this.player.body.touching.down;
    const moveLeft = this.cursors.left.isDown || this.mobileMoveLeft;
    const moveRight = this.cursors.right.isDown || this.mobileMoveRight;
    const wantsJump =
      Phaser.Input.Keyboard.JustDown(this.jumpKey) || this.mobileJumpQueued;

    if (isOnGround) {
      this.jumpsUsed = 0;
    }

    if (moveLeft && !moveRight) {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
    } else if (moveRight && !moveLeft) {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (wantsJump && this.jumpsUsed < MAX_JUMPS) {
      this.player.setVelocityY(JUMP_VELOCITY);
      this.jumpsUsed += 1;
    }
    this.mobileJumpQueued = false;

    const isAirborne = !isOnGround || this.player.body.velocity.y < 0;

    if (isAirborne) {
      if (
        this.wasOnGround ||
        this.playerVisual.anims.currentAnim?.key !== this.characterProfile.jumpAnimKey
      ) {
        playPlayerAnimationAtFixedHeight(
          this.playerVisual,
          this.characterProfile.jumpAnimKey,
          PLAYER_HEIGHT,
          () => this.alignPlayerBodyToFeet()
        );
      }
    } else if (Math.abs(this.player.body.velocity.x) > 8) {
      playPlayerAnimationAtFixedHeight(
        this.playerVisual,
        this.characterProfile.runAnimKey,
        PLAYER_HEIGHT,
        () => this.alignPlayerBodyToFeet()
      );
    } else {
      setPlayerTextureAtFixedHeight(
        this.playerVisual,
        this.characterProfile.idleKey,
        PLAYER_HEIGHT,
        () => this.alignPlayerBodyToFeet()
      );
    }

    syncCharacterVisualToBody(this.player, this.playerVisual);
    this.wasOnGround = isOnGround;

    // Update multiplayer
    if (mp.enabled && this.remotePlayers) {
      sendPlayerUpdate(this.player, this.playerVisual);
      updateRemoteSprites(this.remotePlayers);
      updateLeaderboard(mp.myId, this.player.x, this.myNickname, this.remotePlayers);
    }

    if (this.player.y > GAME_HEIGHT + 180) {
      this.finishLevel(false);
    }
  }
}

class LolaChaseScene extends Phaser.Scene {
  constructor() {
    super("lola-chase");
  }

  create(data = {}) {
    this.hasEnded = false;
    this.characterProfile = getCharacterProfile(data.selectedCharacterId);
    playSceneMusic(this, "stage2");
    this.useMobileUi = shouldUseMobileUi();
    this.stageFloorY = 596;
    this.runnerStartX = 220;
    this.runnerEscapeDistance = LOLA_ESCAPE_DISTANCE;
    this.runnerFinishX = this.runnerStartX + this.runnerEscapeDistance * 8;
    this.distanceTravelled = 0;
    this.lolaGap = 360;
    this.nextShakeAt = 0;
    this.nextTerrainX = 0;
    this.runnerWasAirborne = false;
    this.jumpsUsed = 0;
    this.levelStartTime = this.time.now;

    setMobileUiBodyMode();
    if (this.useMobileUi) {
      setMobilePanelMode("runner");
      setMobilePanelVisible(true);
    } else {
      setMobilePanelMode("platformer");
      setMobilePanelVisible(false);
    }
    bindInGameExitButton(this);

    this.physics.world.setBounds(0, 0, 220000, 1400);
    this.cameras.main.setBounds(0, 0, 220000, GAME_HEIGHT);
    this.cameras.main.setBackgroundColor("#050103");

    const _lbgW = PORTRAIT ? Math.ceil(GAME_WIDTH / 0.75) : GAME_WIDTH;
    const _lbgH = PORTRAIT ? Math.ceil(GAME_HEIGHT / 0.75) : GAME_HEIGHT;
    const _lbgCX = _lbgW / 2;
    const _lbgCY = _lbgH / 2;

    const bg = this.add
      .image(_lbgCX, _lbgCY, "lola_background")
      .setScrollFactor(0)
      .setDepth(-50);
    coverImage(bg, _lbgW, _lbgH);
    bg.setAlpha(0.82);

    this.add
      .rectangle(_lbgCX, _lbgCY, _lbgW, _lbgH, 0x030102, 0.5)
      .setScrollFactor(0)
      .setDepth(-45);

    const fogA = this.add
      .ellipse(260, 560, 380, 150, 0x7a0916, 0.18)
      .setScrollFactor(0)
      .setDepth(-30);
    const fogB = this.add
      .ellipse(GAME_WIDTH - 260, 210, 500, 200, 0x5f0813, 0.14)
      .setScrollFactor(0)
      .setDepth(-28);

    this.tweens.add({
      targets: fogA,
      x: fogA.x + 60,
      alpha: 0.24,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
    this.tweens.add({
      targets: fogB,
      x: fogB.x - 70,
      alpha: 0.2,
      duration: 3200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.redGlow = this.add
      .rectangle(_lbgCX, _lbgCY, _lbgW, _lbgH, 0xb10817, 0.08)
      .setScrollFactor(0)
      .setDepth(900);
    this.heartbeatOverlay = this.add
      .rectangle(_lbgCX, _lbgCY, _lbgW, _lbgH, 0xff3648, 0)
      .setScrollFactor(0)
      .setDepth(901);

    this.grounds = this.physics.add.staticGroup();
    this.brokenPlatforms = this.physics.add.staticGroup();
    this.traps = this.physics.add.staticGroup();
    this.debrisGroup = this.physics.add.group();

    this.runnerGroundObjects = [];
    this.runnerPlatformObjects = [];
    this.runnerTrapObjects = [];

    this.buildInitialRunnerTerrain();

    const playerParts = createGameplayCharacter(
      this,
      this.runnerStartX,
      this.stageFloorY,
      this.characterProfile,
      9
    );
    this.player = playerParts.player;
    this.playerVisual = playerParts.visual;
    this.player.setBounce(0);
    this.player.setDragX(0);
    this.player.setMaxVelocity(420, 1200);
    this.player.setCollideWorldBounds(false);
    this.alignRunnerPlayerBodyToFeet();
    this.player.setFlipX(false);

    const lolaTextureKey = this.textures.exists("lola_run_0") ? "lola_run_0" : "lola_shadow";
    this.lola = this.add
      .sprite(this.player.x - this.lolaGap, this.stageFloorY - 92, lolaTextureKey)
      .setDepth(6)
      .setAlpha(0.96);
    fitToHeight(this.lola, lolaTextureKey === "lola_shadow" ? 164 : 174);
    if (this.anims.exists("lola-run")) {
      this.lola.play("lola-run");
    }
    this.lolaAura = this.add
      .ellipse(this.lola.x, this.lola.y + 8, 168, 188, 0xd40d21, 0.2)
      .setDepth(5);

    this.tweens.add({
      targets: this.lolaAura,
      scaleX: 1.08,
      scaleY: 1.06,
      alpha: 0.32,
      duration: 720,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.physics.add.collider(this.player, this.grounds);
    this.physics.add.collider(this.player, this.brokenPlatforms);
    this.physics.add.overlap(this.player, this.traps, () => this.finishRunner("trap"), undefined, this);
    this.physics.add.overlap(this.player, this.debrisGroup, () => this.finishRunner("debris"), undefined, this);
    this.physics.add.collider(this.debrisGroup, this.grounds, (debris) => debris.destroy());
    this.physics.add.collider(this.debrisGroup, this.brokenPlatforms, (debris) => debris.destroy());

    this.escapeGate = this.physics.add.staticImage(
      this.runnerFinishX,
      this.stageFloorY + 8,
      "lola_exit"
    );
    this.escapeGate.setOrigin(0.5, 1);
    fitToHeight(this.escapeGate, 162);
    this.escapeGate.refreshBody();
    this.escapeGate.setDepth(7);
    this.escapeGateGlow = this.add
      .ellipse(this.runnerFinishX, this.stageFloorY - 54, 176, 212, 0xff5549, 0.2)
      .setDepth(6);
    this.tweens.add({
      targets: this.escapeGateGlow,
      scaleX: 1.12,
      scaleY: 1.08,
      alpha: 0.3,
      duration: 880,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
    this.physics.add.overlap(
      this.player,
      this.escapeGate,
      () => this.finishRunnerVictory(),
      undefined,
      this
    );

    this.cameras.main.startFollow(this.player, true, 0.08, 0.06);
    if (PORTRAIT) {
      this.cameras.main.setZoom(0.75);
      this.cameras.main.setFollowOffset(-160, 0);
    }

    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.input.keyboard.addCapture(["SPACE"]);
    this.mobileJumpQueued = false;
    if (this.useMobileUi) {
      this.createRunnerMobileControls();
    } else {
      this.createRunnerHud();
    }
    this.updateRunnerHud();

    this.debrisTimer = this.time.addEvent({
      delay: 1900,
      loop: true,
      callback: this.spawnRunnerDebris,
      callbackScope: this,
    });

    // Initialize multiplayer if enabled
    this.remotePlayers = new Map();
    this.myNickname = localStorage.getItem("mp-nickname") || "Player";
    if (mp.enabled && mp.socket) {
      const myPlayerId = mp.myId;
      mp.players.forEach((player, id) => {
        if (id !== myPlayerId) {
          const remoteData = {
            id: id,
            x: this.runnerStartX,
            y: this.stageFloorY,
            characterId: player.characterId,
            nickname: player.nickname,
          };
          this.remotePlayers.set(id, createRemotePlayerSprite(this, remoteData));
        }
      });
      attachMpListeners(this, this.remotePlayers, this.myNickname);
      showLeaderboard();
    }

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.detachRunnerMobileControls();
      setMobilePanelVisible(false);
      setMobilePanelMode("platformer");
    });
  }

  alignRunnerPlayerBodyToFeet() {
    alignCharacterBodyToFeet(
      this.player,
      this.characterProfile.character.id,
      this.playerVisual
    );
  }

  createRunnerGroundSegment(x, width, height = 176) {
    const ground = this.grounds.create(x, this.stageFloorY, "lola_ground").setOrigin(0, 0);
    ground.displayWidth = width;
    ground.displayHeight = height;
    ground.refreshBody();
    ground.segmentEnd = x + width;
    this.runnerGroundObjects.push(ground);
    return ground;
  }

  createRunnerBrokenPlatform(x, y, width, height = 42) {
    const platform = this.brokenPlatforms.create(x, y, "lola_platform").setOrigin(0, 0);
    platform.displayWidth = width;
    platform.displayHeight = height;
    platform.refreshBody();
    platform.segmentEnd = x + width;
    this.runnerPlatformObjects.push(platform);
    return platform;
  }

  createRunnerTrap(x, y) {
    const trap = this.traps.create(x, y, "obstacle").setOrigin(0.5, 1);
    fitToHeight(trap, 56);
    trap.refreshBody();
    trap.segmentEnd = x + trap.displayWidth / 2;
    this.runnerTrapObjects.push(trap);
    return trap;
  }

  isBlockedByRunnerBar() {
    const body = this.player?.body;
    if (!body || !(body.blocked.right || body.touching.right)) {
      return false;
    }

    const playerRight = body.x + body.width;
    const playerTop = body.y;
    const playerBottom = body.y + body.height;

    return this.runnerPlatformObjects.some((platform) => {
      if (!platform.active) {
        return false;
      }

      const platformLeft = platform.x;
      const platformRight = platform.x + platform.displayWidth;
      const platformTop = platform.y;
      const platformBottom = platform.y + platform.displayHeight;
      const verticalOverlap = playerBottom > platformTop + 8 && playerTop < platformBottom - 8;
      const nearFrontFace = playerRight >= platformLeft - 12 && playerRight <= platformLeft + 28;
      const stillFacingPlatform = body.x < platformRight - 8;

      return verticalOverlap && nearFrontFace && stillFacingPlatform;
    });
  }

  buildInitialRunnerTerrain() {
    this.createRunnerGroundSegment(0, 1120);
    this.nextTerrainX = 1120;

    while (this.nextTerrainX < 4200) {
      this.spawnRunnerSection(0.12);
    }
  }

  spawnRunnerSection(difficulty) {
    const segmentWidth = Phaser.Math.Between(360, 560);
    const segmentX = this.nextTerrainX;
    const segment = this.createRunnerGroundSegment(segmentX, segmentWidth);

    if (Math.random() < 0.34 + difficulty * 0.16) {
      const platformWidth = Phaser.Math.Between(130, 190);
      const platformX = Phaser.Math.Between(segmentX + 70, segment.segmentEnd - platformWidth - 70);
      const platformY = Phaser.Math.Between(430, 492);
      this.createRunnerBrokenPlatform(platformX, platformY, platformWidth);
    }

    if (Math.random() < 0.22 + difficulty * 0.2) {
      const trapX = Phaser.Math.Between(segmentX + 110, segment.segmentEnd - 90);
      this.createRunnerTrap(trapX, this.stageFloorY + 8);
    }

    this.nextTerrainX = segment.segmentEnd;
  }

  createRunnerMobileControls() {
    const refs = getMobilePanelRefs();
    if (!refs) {
      return;
    }

    refs.left?.classList.add("is-hidden");
    refs.right?.classList.add("is-hidden");

    this.runnerMobileCleanup = [];
    const press = (event) => {
      event.preventDefault();
      refs.jump?.classList.add("is-pressed");
      this.mobileJumpQueued = true;
    };
    const release = (event) => {
      event.preventDefault();
      refs.jump?.classList.remove("is-pressed");
    };

    refs.jump?.addEventListener("pointerdown", press);
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      refs.jump?.addEventListener(eventName, release);
    });

    this.runnerMobileCleanup.push(() => {
      refs.jump?.removeEventListener("pointerdown", press);
      ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
        refs.jump?.removeEventListener(eventName, release);
      });
      refs.left?.classList.remove("is-hidden");
      refs.right?.classList.remove("is-hidden");
      refs.jump?.classList.remove("is-pressed");
    });
  }

  detachRunnerMobileControls() {
    if (!this.runnerMobileCleanup) {
      return;
    }

    this.runnerMobileCleanup.forEach((cleanup) => cleanup());
    this.runnerMobileCleanup = [];
  }

  createRunnerHud() {
    const stagePanel = this.add
      .rectangle(24, 18, 140, 72, 0x060513, 0.84)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);
    stagePanel.setStrokeStyle(4, 0x7e39db, 0.96);
    this.add
      .text(94, 28, "المرحلة", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff6078",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
    this.runnerStageText = this.add
      .text(94, 56, LOLA_STAGE_LABEL, {
        fontFamily: "Changa",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);

    const timePanel = this.add
      .rectangle(180, 18, 160, 72, 0x060513, 0.84)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);
    timePanel.setStrokeStyle(4, 0x7e39db, 0.96);
    this.add
      .text(260, 28, "الوقت", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff6078",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
    this.runnerTimeText = this.add
      .text(260, 56, "00:00", {
        fontFamily: "monospace",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);

    const distancePanel = this.add
      .rectangle(356, 18, 196, 72, 0x060513, 0.84)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);
    distancePanel.setStrokeStyle(4, 0x7e39db, 0.96);
    this.add
      .text(454, 28, "المسافة", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff6078",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
    this.runnerDistanceText = this.add
      .text(454, 56, "0م", {
        fontFamily: "Changa",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);

    const dangerPanel = this.add
      .rectangle(572, 18, 248, 72, 0x060513, 0.84)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);
    dangerPanel.setStrokeStyle(4, 0x7e39db, 0.96);
    this.add
      .text(790, 28, "خطر لولا", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff6078",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
    this.runnerDangerTrack = this.add
      .rectangle(600, 65, 180, 16, 0x1b0627, 1)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
    this.runnerDangerTrack.setStrokeStyle(3, 0x7e39db, 0.96);
    this.runnerDangerFill = this.add
      .rectangle(603, 65, 174, 10, 0xff4b58, 1)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.add
      .text(1100, 30, "Lola Chase", {
        fontFamily: "Changa",
        fontSize: "30px",
        fontStyle: "bold",
        color: "#ff7b8b",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
  }

  updateRunnerHud() {
    const elapsedSeconds = Math.floor((this.time.now - this.levelStartTime) / 1000);
    const dangerRatio = Phaser.Math.Clamp(1 - (this.lolaGap - 88) / 312, 0, 1);

    if (this.useMobileUi) {
      updateMobilePanelData({
        stageValue: LOLA_STAGE_LABEL,
        timeValue: formatClock(elapsedSeconds),
        scoreLabel: "المسافة",
        scoreValue: `${this.distanceTravelled}م`,
        healthLabel: "الخطر",
        healthValue: `${Math.round(dangerRatio * 100)}%`,
        healthIsHearts: false,
        missionTitle: "Lola Chase",
        missionLabel: `اصلي للمخرج ${this.runnerEscapeDistance}م`,
        missionCount: `${Math.min(this.distanceTravelled, this.runnerEscapeDistance)} / ${this.runnerEscapeDistance}`,
        progressRatio: Phaser.Math.Clamp(this.distanceTravelled / this.runnerEscapeDistance, 0, 1),
      });
      return;
    }

    this.runnerTimeText.setText(formatClock(elapsedSeconds));
    this.runnerDistanceText.setText(`${this.distanceTravelled}م`);
    this.runnerDangerFill.scaleX = dangerRatio;
    this.runnerDangerFill.visible = dangerRatio > 0;
  }

  spawnRunnerDebris() {
    if (this.hasEnded) {
      return;
    }

    const elapsedSeconds = (this.time.now - this.levelStartTime) / 1000;
    const difficulty = Phaser.Math.Clamp(elapsedSeconds / 50, 0, 1.4);
    const debris = this.debrisGroup.create(
      this.player.x + Phaser.Math.Between(760, 1220),
      Phaser.Math.Between(120, 300),
      "lola_debris"
    );
    fitToHeight(debris, Phaser.Math.Between(36, 52));
    debris.setVelocityX(Phaser.Math.Between(-30, 20));
    debris.setVelocityY(Phaser.Math.Between(80, 160));
    debris.setGravityY(900 + difficulty * 520);
    debris.setAngularVelocity(Phaser.Math.Between(-120, 120));
  }

  cleanupRunnerObjects() {
    const cleanupX = this.cameras.main.scrollX - 320;

    this.runnerGroundObjects = this.runnerGroundObjects.filter((ground) => {
      if (!ground.active || ground.segmentEnd < cleanupX) {
        ground.destroy();
        return false;
      }
      return true;
    });

    this.runnerPlatformObjects = this.runnerPlatformObjects.filter((platform) => {
      if (!platform.active || platform.segmentEnd < cleanupX) {
        platform.destroy();
        return false;
      }
      return true;
    });

    this.runnerTrapObjects = this.runnerTrapObjects.filter((trap) => {
      if (!trap.active || trap.x + trap.displayWidth < cleanupX) {
        trap.destroy();
        return false;
      }
      return true;
    });

    this.debrisGroup.children.each((debris) => {
      if (
        !debris.active ||
        debris.x < cleanupX - 140 ||
        debris.y > this.stageFloorY + 220
      ) {
        debris.destroy();
      }
    });
  }

  finishRunner(reason) {
    if (this.hasEnded) {
      return;
    }

    this.hasEnded = true;
    this.physics.pause();
    this.cameras.main.stopFollow();
    this.player.setVelocity(0, 0);

    // Send multiplayer notification
    if (mp.enabled && mp.socket) {
      mp.socket.emit("playerDied", { id: mp.myId });
    }

    playPlayerAnimationAtFixedHeight(
      this.playerVisual,
      this.characterProfile.cryAnimKey,
      PLAYER_HEIGHT,
      () => this.alignRunnerPlayerBodyToFeet()
    );
    this.redGlow.setAlpha(0.34);
    this.heartbeatOverlay.setAlpha(0.2);
    this.cameras.main.shake(reason === "caught" ? 340 : 220, reason === "caught" ? 0.012 : 0.008);
    this.cameras.main.flash(260, 255, 64, 64);

    this.time.delayedCall(760, () => {
      this.scene.start("result", {
        didWin: false,
        sceneKey: "lola-chase",
        resultTitle: "انتهت المطاردة",
        resultStatLine: `المسافة: ${this.distanceTravelled}م`,
        backgroundKey: "lola_background",
        selectedCharacterId: this.characterProfile.character.id,
      });
    });
  }

  finishRunnerVictory() {
    if (this.hasEnded) {
      return;
    }

    this.hasEnded = true;
    this.physics.pause();
    this.cameras.main.stopFollow();
    this.player.setVelocity(0, 0);

    // Send multiplayer notification
    if (mp.enabled && mp.socket) {
      mp.socket.emit("playerFinished", { id: mp.myId });
    }

    setPlayerTextureAtFixedHeight(
      this.playerVisual,
      this.characterProfile.idleKey,
      PLAYER_HEIGHT,
      () => this.alignRunnerPlayerBodyToFeet()
    );
    this.lola.anims?.pause();
    this.redGlow.setAlpha(0.06);
    this.heartbeatOverlay.setAlpha(0);
    this.lolaAura.setAlpha(0.08);
    this.escapeGateGlow.setAlpha(0.34);
    this.cameras.main.flash(320, 255, 236, 178);
    this.detachRunnerMobileControls();
    setMobilePanelVisible(false);
    setMobilePanelMode("platformer");
    this.debrisTimer?.remove(false);
    this.debrisTimer = null;
    this.time.delayedCall(360, () => {
      this.scene.start("dora-boss", {
        selectedCharacterId: this.characterProfile.character.id,
      });
    });
  }

  update() {
    if (this.hasEnded) {
      return;
    }

    const elapsedSeconds = (this.time.now - this.levelStartTime) / 1000;
    const difficulty = Phaser.Math.Clamp(elapsedSeconds / 45, 0, 1.4);
    const runnerSpeed = 280 + difficulty * 110;
    const lolaCatchRate = 175 + difficulty * 125;
    const lolaRecoverRate = 120;
    const lolaSafeGap = 360;
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.jumpKey) || this.mobileJumpQueued;
    const isOnGround = this.player.body.blocked.down || this.player.body.touching.down;

    if (isOnGround) {
      this.jumpsUsed = 0;
    }

    this.player.setVelocityX(runnerSpeed);
    if (jumpPressed && this.jumpsUsed < MAX_JUMPS) {
      this.player.setVelocityY(JUMP_VELOCITY - 40);
      this.jumpsUsed += 1;
    }
    this.mobileJumpQueued = false;

    this.distanceTravelled = Math.max(0, Math.floor((this.player.x - this.runnerStartX) / 8));

    if (this.runnerWasAirborne && isOnGround) {
      this.lolaGap = Math.min(lolaSafeGap, this.lolaGap + 14);
    }
    this.runnerWasAirborne = !isOnGround || this.player.body.velocity.y < 0;
    const stalledByBar = this.isBlockedByRunnerBar();
    if (stalledByBar) {
      this.lolaGap = Math.max(84, this.lolaGap - (this.game.loop.delta / 1000) * lolaCatchRate);
    } else {
      this.lolaGap = Math.min(
        lolaSafeGap,
        this.lolaGap + (this.game.loop.delta / 1000) * lolaRecoverRate
      );
    }

    this.lola.x = this.player.x - this.lolaGap;
    this.lolaAura.x = this.lola.x;
    this.lolaAura.y = this.lola.y + 6;

    const dangerRatio = Phaser.Math.Clamp(1 - (this.lolaGap - 88) / 312, 0, 1);
    const pulse = (Math.sin(this.time.now * 0.012 + dangerRatio * 3) + 1) * 0.5;
    this.redGlow.setAlpha(0.08 + dangerRatio * 0.26);
    this.heartbeatOverlay.setAlpha(dangerRatio * pulse * 0.09);
    this.lolaAura.setAlpha(0.16 + dangerRatio * 0.34);

    if (dangerRatio > 0.72 && this.time.now > this.nextShakeAt) {
      this.cameras.main.shake(90, 0.0018 + dangerRatio * 0.0025);
      this.nextShakeAt = this.time.now + 420 - dangerRatio * 140;
    }

    if (this.debrisTimer) {
      this.debrisTimer.delay = Math.max(820, 1850 - difficulty * 680);
    }

    while (this.nextTerrainX < this.player.x + 2500) {
      this.spawnRunnerSection(difficulty);
    }

    this.cleanupRunnerObjects();
    this.updateRunnerHud();

    if (this.runnerWasAirborne) {
      if (this.playerVisual.anims.currentAnim?.key !== this.characterProfile.jumpAnimKey) {
        playPlayerAnimationAtFixedHeight(
          this.playerVisual,
          this.characterProfile.jumpAnimKey,
          PLAYER_HEIGHT,
          () => this.alignRunnerPlayerBodyToFeet()
        );
      }
    } else {
      playPlayerAnimationAtFixedHeight(
        this.playerVisual,
        this.characterProfile.runAnimKey,
        PLAYER_HEIGHT,
        () => this.alignRunnerPlayerBodyToFeet()
      );
    }

    syncCharacterVisualToBody(this.player, this.playerVisual);

    // Update multiplayer
    if (mp.enabled && this.remotePlayers) {
      sendPlayerUpdate(this.player, this.playerVisual);
      updateRemoteSprites(this.remotePlayers);
      updateLeaderboard(mp.myId, this.player.x, this.myNickname, this.remotePlayers);
    }

    if (this.player.x >= this.runnerFinishX - 36) {
      this.finishRunnerVictory();
      return;
    }

    if ((stalledByBar && this.lolaGap <= 90) || this.player.y > GAME_HEIGHT + 280) {
      this.finishRunner(stalledByBar && this.lolaGap <= 90 ? "caught" : "fall");
    }
  }
}

class DoraBossScene extends Phaser.Scene {
  constructor() {
    super("dora-boss");
  }

  create(data = {}) {
    this.hasEnded = false;
    this.characterProfile = getCharacterProfile(data.selectedCharacterId);
    playSceneMusic(this, "stage3");
    this.useMobileUi = shouldUseMobileUi();
    this.mobileMoveLeft = false;
    this.mobileMoveRight = false;
    this.mobileJumpQueued = false;
    this.jumpsUsed = 0;
    this.levelStartTime = this.time.now;
    this.playerHp = 5;
    this.maxPlayerHp = 5;
    this.bossHp = DORA_BOSS_HP;
    this.maxBossHp = DORA_BOSS_HP;
    this.bossPhase = 1;
    this.attackPatternIndex = 0;
    this.nextDashStartsLeft = true;
    this.playerInvulnerableUntil = 0;
    this.bossVulnerable = false;
    this.bossHitLocked = false;
    this.currentBossAttack = null;
    this.bossEvents = [];
    this.volleyMarkers = [];
    this.mobileShootQueued = false;
    this.lastPlayerShootTime = 0;
    this.arenaFloorY = 656;
    this.bossHomeX = PORTRAIT ? Math.round(GAME_WIDTH * 0.72) : 980;
    this.bossHomeY = 268;
    this.bossLowY = 375;
    this.bossDashY = 392;

    setMobileUiBodyMode();
    setMobilePanelMode("platformer");
    setMobilePanelVisible(this.useMobileUi);
    bindInGameExitButton(this);

    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT + 220);
    this.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.cameras.main.setBackgroundColor("#050106");

    const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "dora_background").setDepth(-50);
    coverImage(bg, GAME_WIDTH, GAME_HEIGHT);
    bg.setAlpha(0.82);

    this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x06020a, 0.46)
      .setDepth(-49);


    const fogLeft = this.add
      .ellipse(210, 586, 380, 140, 0x77103d, 0.18)
      .setDepth(-20);
    const fogRight = this.add
      .ellipse(GAME_WIDTH - 200, 216, 420, 180, 0x4d0c2a, 0.14)
      .setDepth(-18);

    this.tweens.add({
      targets: fogLeft,
      x: fogLeft.x + 44,
      alpha: 0.24,
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
    this.tweens.add({
      targets: fogRight,
      x: fogRight.x - 60,
      alpha: 0.2,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.redDangerOverlay = this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xb20d2c, 0.06)
      .setDepth(900);
    this.hitFlashOverlay = this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xff7a8f, 0)
      .setDepth(901);

    this.floor = this.physics.add.staticImage(GAME_WIDTH / 2, this.arenaFloorY, "dora_floor");
    this.floor.setOrigin(0.5, 0);
    this.floor.displayWidth = GAME_WIDTH;
    this.floor.displayHeight = 170;
    this.floor.refreshBody();
    this.floor.setPushable(false);
    this.floor.setImmovable(true);
    this.floor.setDepth(20);

    const playerParts = createGameplayCharacter(
      this,
      PORTRAIT ? Math.round(GAME_WIDTH * 0.18) : 220,
      this.arenaFloorY,
      this.characterProfile,
      10
    );
    this.player = playerParts.player;
    this.playerVisual = playerParts.visual;
    this.player.setBounce(0);
    this.player.setDragX(1600);
    this.player.setMaxVelocity(340, 1040);
    this.player.setCollideWorldBounds(true);
    this.alignBossPlayerBodyToFeet();
    this.playerWasOnGround = true;

    this.boss = this.physics.add.sprite(this.bossHomeX, this.bossHomeY, "dora_boss");
    fitToHeight(this.boss, PORTRAIT ? 260 : 388);
    this.boss.setImmovable(true);
    this.boss.body.setAllowGravity(false);
    this.boss.setDepth(8);
    const bossBodyWidth = this.boss.width * 0.46;
    const bossBodyHeight = this.boss.height * 0.54;
    this.boss.body.setSize(bossBodyWidth, bossBodyHeight, false);
    this.boss.body.setOffset((this.boss.width - bossBodyWidth) / 2, this.boss.height * 0.24);

    this.bossShadow = this.add
      .ellipse(this.boss.x, this.arenaFloorY - 6, 284, 48, 0x000000, 0.34)
      .setDepth(4);
    this.bossTellGlow = this.add
      .ellipse(this.boss.x, this.boss.y + 34, 340, 260, 0xff5d88, 0)
      .setDepth(7);
    this.bossWeakPoint = this.physics.add.image(this.boss.x, this.boss.y + 118, "dora_core");
    fitToHeight(this.bossWeakPoint, 56);
    this.bossWeakPoint.setDepth(11);
    this.bossWeakPoint.body.setAllowGravity(false);
    this.bossWeakPoint.setImmovable(true);
    this.bossWeakPoint.body.setCircle(18, 4, 4);
    this.bossWeakPoint.setAlpha(0.35);

    this.bossHead = this.physics.add.image(this.boss.x, this.boss.y - 130, "dora_core");
    fitToHeight(this.bossHead, 48);
    this.bossHead.setDepth(11);
    this.bossHead.body.setAllowGravity(false);
    this.bossHead.setImmovable(true);
    this.bossHead.body.setCircle(16, 8, 8);
    this.bossHead.setAlpha(0);
    this.headHitLockedUntil = 0;

    this.shockwaves = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    this.volleyBolts = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    this.playerBullets = this.physics.add.group({ allowGravity: false });
    this.doraBullets = this.physics.add.group({ allowGravity: false, immovable: true });

    this.floorPlayerCollider = this.physics.add.collider(this.player, this.floor);
    this.floorVolleyCollider = this.physics.add.collider(this.volleyBolts, this.floor, (bolt) => {
      bolt.destroy();
    });
    this.physics.add.overlap(
      this.player,
      this.bossWeakPoint,
      () => this.handleBossWeakPointContact(),
      undefined,
      this
    );
    this.physics.add.overlap(
      this.playerBullets,
      this.bossWeakPoint,
      (bullet) => {
        if (this.bossVulnerable && !this.bossHitLocked) {
          this.spawnBulletImpact(bullet.x, bullet.y, 0xffd080);
          bullet.destroy();
          this.damageBoss();
        }
      },
      undefined,
      this
    );
    this.physics.add.overlap(
      this.playerBullets,
      this.bossHead,
      (bullet) => {
        if (this.hasEnded || this.time.now < this.headHitLockedUntil) {
          return;
        }
        this.spawnBulletImpact(bullet.x, bullet.y, 0xff9040);
        bullet.destroy();
        this.headHitLockedUntil = this.time.now + 1100;
        this.damageBossHead();
      },
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.doraBullets,
      (player, bullet) => {
        const hitX = bullet.x;
        bullet.destroy();
        this.hitPlayer(hitX);
      },
      undefined,
      this
    );

    this.cameras.main.flash(280, 210, 90, 155);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.input.keyboard.addCapture(["LEFT", "RIGHT", "SPACE", "S"]);

    if (this.useMobileUi) {
      this.createBossMobileControls();
    } else {
      this.createBossHud();
    }

    this.phaseBanner = this.add
      .text(GAME_WIDTH / 2, 188, "", {
        fontFamily: "Changa",
        fontSize: "44px",
        fontStyle: "bold",
        color: "#ffd9ef",
        stroke: "#18020f",
        strokeThickness: 8,
      })
      .setOrigin(0.5)
      .setDepth(HUD_DEPTH + 10)
      .setAlpha(0)
      .setScale(0.9);

    this.updateBossHud();
    this.showBossBanner("دورا", "#ff8fcb");
    this.scheduleBossEvent(900, () => {
      this.startNextBossAttack();
      this.scheduleNextDoraFire();
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.clearBossEvents();
      this.detachBossMobileControls();
      setMobilePanelVisible(false);
      setMobilePanelMode("platformer");
    });
  }

  alignBossPlayerBodyToFeet() {
    alignCharacterBodyToFeet(
      this.player,
      this.characterProfile.character.id,
      this.playerVisual
    );
  }

  createBossMobileControls() {
    const refs = getMobilePanelRefs();
    if (!refs?.panel) {
      return;
    }

    this.bossMobileCleanup = [];

    this.bindBossHoldControl(
      refs.left,
      () => {
        this.mobileMoveLeft = true;
      },
      () => {
        this.mobileMoveLeft = false;
      }
    );

    this.bindBossHoldControl(
      refs.right,
      () => {
        this.mobileMoveRight = true;
      },
      () => {
        this.mobileMoveRight = false;
      }
    );

    this.bindBossTapControl(refs.jump, () => {
      this.mobileJumpQueued = true;
    });
    this.bindBossTapControl(refs.shoot, () => {
      this.mobileShootQueued = true;
    });
  }

  bindBossHoldControl(element, onPress, onRelease) {
    if (!element) {
      return;
    }

    const press = (event) => {
      event.preventDefault();
      element.classList.add("is-pressed");
      onPress();
    };
    const release = (event) => {
      event.preventDefault();
      element.classList.remove("is-pressed");
      onRelease();
    };

    element.addEventListener("pointerdown", press);
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      element.addEventListener(eventName, release);
    });

    this.bossMobileCleanup.push(() => {
      element.removeEventListener("pointerdown", press);
      ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
        element.removeEventListener(eventName, release);
      });
    });
  }

  bindBossTapControl(element, onPress) {
    if (!element) {
      return;
    }

    const press = (event) => {
      event.preventDefault();
      element.classList.add("is-pressed");
      onPress();
    };
    const release = (event) => {
      event.preventDefault();
      element.classList.remove("is-pressed");
    };

    element.addEventListener("pointerdown", press);
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      element.addEventListener(eventName, release);
    });

    this.bossMobileCleanup.push(() => {
      element.removeEventListener("pointerdown", press);
      ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
        element.removeEventListener(eventName, release);
      });
    });
  }

  detachBossMobileControls() {
    if (!this.bossMobileCleanup) {
      return;
    }

    this.bossMobileCleanup.forEach((cleanup) => cleanup());
    this.bossMobileCleanup = [];

    const refs = getMobilePanelRefs();
    refs?.left?.classList.remove("is-pressed");
    refs?.right?.classList.remove("is-pressed");
    refs?.jump?.classList.remove("is-pressed");
    refs?.shoot?.classList.remove("is-pressed");
  }

  createBossHudPanel(x, y, width, height) {
    const panel = this.add
      .rectangle(x, y, width, height, 0x060513, 0.86)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);
    panel.setStrokeStyle(4, 0x7e39db, 0.96);

    this.add
      .rectangle(x + 7, y + 7, width - 14, height - 14, 0x14081b, 0.22)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 1);
  }

  createBossHud() {
    this.createBossHudPanel(24, 18, 138, 72);
    this.add
      .text(93, 28, "المرحلة", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff63b2",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.bossStageText = this.add
      .text(93, 56, DORA_STAGE_LABEL, {
        fontFamily: "Changa",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createBossHudPanel(178, 18, 154, 72);
    this.add
      .text(255, 28, "الوقت", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff63b2",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.bossTimeText = this.add
      .text(255, 56, "00:00", {
        fontFamily: "monospace",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createBossHudPanel(348, 18, 248, 72);
    this.add
      .text(574, 28, "الصحة", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff63b2",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.playerHpText = this.add
      .text(574, 54, formatHearts(this.playerHp, this.maxPlayerHp), {
        fontFamily: "Arial",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createBossHudPanel(612, 18, 272, 72);
    this.add
      .text(858, 28, "دورا", {
        fontFamily: "Changa",
        fontSize: "20px",
        fontStyle: "bold",
        color: "#ff798b",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.bossHpTrack = this.add
      .rectangle(638, 64, 168, 16, 0x210716, 1)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.bossHpTrack.setStrokeStyle(3, 0x9d3d66, 0.96);
    this.bossHpFill = this.add
      .rectangle(641, 64, 162, 10, 0xff4d66, 1)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 3);
    this.bossHpText = this.add
      .text(858, 54, `${this.bossHp} / ${this.maxBossHp}`, {
        fontFamily: "monospace",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);

    this.createBossHudPanel(900, 18, 356, 72);
    this.phaseText = this.add
      .text(1230, 28, this.getBossPhaseTitle(), {
        fontFamily: "Changa",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
    this.phaseHintText = this.add
      .text(1230, 54, "اضرب النواة بعد الهجوم", {
        fontFamily: "Changa",
        fontSize: "18px",
        color: "#ffd7ef",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH + 2);
  }

  getBossPhaseTitle() {
    if (this.bossPhase === 1) {
      return "المرحلة 1";
    }
    if (this.bossPhase === 2) {
      return "المرحلة 2";
    }
    return "المرحلة الأخيرة";
  }

  updateBossHud() {
    const elapsedSeconds = Math.floor((this.time.now - this.levelStartTime) / 1000);
    const playerHearts = formatHearts(this.playerHp, this.maxPlayerHp);
    const bossProgress = Phaser.Math.Clamp(this.bossHp / this.maxBossHp, 0, 1);

    if (this.useMobileUi) {
      updateMobilePanelData({
        stageValue: DORA_STAGE_LABEL,
        timeValue: formatClock(elapsedSeconds),
        scoreLabel: "دورا",
        scoreValue: `${this.bossHp} / ${this.maxBossHp}`,
        healthLabel: "الصحة",
        healthValue: playerHearts,
        healthIsHearts: true,
        missionTitle: "الزعيمة الأخيرة",
        missionLabel: `${this.getBossPhaseTitle()} • اضرب بعد التلويح`,
        missionCount: `${this.maxBossHp - this.bossHp} / ${this.maxBossHp}`,
        progressRatio: 1 - bossProgress,
      });
      return;
    }

    this.bossTimeText.setText(formatClock(elapsedSeconds));
    this.playerHpText.setText(playerHearts);
    this.bossHpText.setText(`${this.bossHp} / ${this.maxBossHp}`);
    this.bossHpFill.scaleX = bossProgress;
    this.bossHpFill.visible = bossProgress > 0;
    this.phaseText.setText(this.getBossPhaseTitle());
  }

  showBossBanner(text, color = "#ffd9ef") {
    this.phaseBanner.setText(text);
    this.phaseBanner.setColor(color);
    this.phaseBanner.setAlpha(1);
    this.phaseBanner.setScale(0.86);
    this.tweens.killTweensOf(this.phaseBanner);
    this.tweens.add({
      targets: this.phaseBanner,
      alpha: 0,
      scale: 1.08,
      y: 160,
      duration: 820,
      ease: "Quad.out",
      onComplete: () => {
        this.phaseBanner.y = 188;
      },
    });
  }

  scheduleBossEvent(delay, callback) {
    const event = this.time.delayedCall(delay, () => {
      this.bossEvents = this.bossEvents.filter((scheduledEvent) => scheduledEvent !== event);
      if (!this.hasEnded) {
        callback();
      }
    });
    this.bossEvents.push(event);
    return event;
  }

  clearBossEvents() {
    if (!this.bossEvents) {
      return;
    }

    this.bossEvents.forEach((event) => event.remove(false));
    this.bossEvents = [];
  }

  updateBossPhase() {
    const nextPhase = this.bossHp <= 2 ? 3 : this.bossHp <= 4 ? 2 : 1;
    if (nextPhase === this.bossPhase) {
      return;
    }

    this.bossPhase = nextPhase;
    this.showBossBanner(this.getBossPhaseTitle(), nextPhase === 3 ? "#ff8a8a" : "#ffd2ff");
    this.cameras.main.flash(220, nextPhase === 3 ? 255 : 210, 90, nextPhase === 3 ? 90 : 180);
    this.redDangerOverlay.setAlpha(nextPhase === 3 ? 0.12 : 0.09);
  }

  moveBossTo(x, y, duration, ease = "Sine.inOut", onComplete) {
    this.tweens.killTweensOf(this.boss);
    this.boss.setVelocity(0, 0);
    this.tweens.add({
      targets: this.boss,
      x,
      y,
      duration,
      ease,
      onComplete: () => {
        if (onComplete) {
          onComplete();
        }
      },
    });
  }

  setBossTellState(isActive, tint = 0xff7cab) {
    this.bossTellGlow.setAlpha(isActive ? 0.22 : 0.06);
    this.bossTellGlow.setFillStyle(tint, isActive ? 0.22 : 0.06);
    this.bossWeakPoint.setAlpha(this.bossVulnerable ? 0.98 : isActive ? 0.72 : 0.35);
  }

  getPhaseAttackPattern() {
    if (this.bossPhase === 1) {
      return ["dash", "slam"];
    }
    if (this.bossPhase === 2) {
      return ["dash", "volley", "slam"];
    }
    return ["slam", "dash", "volley", "dash"];
  }

  startNextBossAttack() {
    if (this.hasEnded) {
      return;
    }

    this.clearBossEvents();
    this.bossHitLocked = false;
    this.bossVulnerable = false;
    this.setBossTellState(false);
    const pattern = this.getPhaseAttackPattern();
    const attack = pattern[this.attackPatternIndex % pattern.length];
    this.attackPatternIndex += 1;

    if (attack === "dash") {
      this.startDashAttack();
      return;
    }
    if (attack === "slam") {
      this.startSlamAttack();
      return;
    }
    this.startVolleyAttack();
  }

  startDashAttack() {
    const fromLeft = this.nextDashStartsLeft;
    this.nextDashStartsLeft = !this.nextDashStartsLeft;
    this.currentBossAttack = "dash-tell";
    this.dashDirection = fromLeft ? 1 : -1;
    this.dashBurstsRemaining = this.bossPhase === 3 ? 2 : 1;
    const tellDuration = this.bossPhase === 1 ? 480 : this.bossPhase === 2 ? 360 : 260;
    const tellX = fromLeft ? 140 : GAME_WIDTH - 140;

    this.moveBossTo(tellX, this.bossDashY, tellDuration);
    this.setBossTellState(true, 0xff7c7c);

    this.scheduleBossEvent(tellDuration + 140, () => {
      this.executeDashBurst();
    });
  }

  executeDashBurst() {
    const dashSpeed = this.bossPhase === 1 ? 720 : this.bossPhase === 2 ? 840 : 980;
    this.currentBossAttack = "dash";
    this.setBossTellState(false);
    this.boss.setVelocityX(this.dashDirection * dashSpeed);
  }

  handleDashImpact() {
    this.boss.setVelocity(0, 0);
    this.currentBossAttack = "dash-impact";
    this.cameras.main.shake(130, 0.007);

    this.dashBurstsRemaining -= 1;
    if (this.dashBurstsRemaining > 0) {
      this.dashDirection *= -1;
      this.setBossTellState(true, 0xff9a7c);
      this.scheduleBossEvent(220, () => {
        this.executeDashBurst();
      });
      return;
    }

    this.enterBossVulnerability(
      this.bossPhase === 1 ? 940 : this.bossPhase === 2 ? 700 : 520,
      0
    );
  }

  startSlamAttack() {
    this.currentBossAttack = "slam-tell";
    const tellDuration = this.bossPhase === 1 ? 620 : this.bossPhase === 2 ? 500 : 360;

    this.moveBossTo(GAME_WIDTH / 2, 174, tellDuration);
    this.setBossTellState(true, 0xff5da2);

    this.scheduleBossEvent(tellDuration + 90, () => {
      this.currentBossAttack = "slam";
      this.setBossTellState(false);
      this.moveBossTo(GAME_WIDTH / 2, this.bossLowY, 180, "Quad.in", () => {
        this.spawnShockwavePair(1);
        if (this.bossPhase === 3) {
          this.scheduleBossEvent(170, () => this.spawnShockwavePair(0.88));
        }
        this.cameras.main.shake(160, 0.009);
        this.hitFlashOverlay.setAlpha(0.08);
        this.tweens.add({
          targets: this.hitFlashOverlay,
          alpha: 0,
          duration: 180,
        });
        this.scheduleBossEvent(260, () => {
          this.enterBossVulnerability(
            this.bossPhase === 1 ? 780 : this.bossPhase === 2 ? 620 : 450,
            0
          );
        });
      });
    });
  }

  spawnShockwavePair(scale = 1) {
    [-1, 1].forEach((direction) => {
      const shockwave = this.shockwaves.create(GAME_WIDTH / 2, this.arenaFloorY + 10, "dora_shockwave");
      shockwave.setOrigin(0.5, 1);
      shockwave.setDepth(9);
      shockwave.setVelocityX(direction * (300 + this.bossPhase * 75) * scale);
      shockwave.body.setAllowGravity(false);
      shockwave.setScale(scale);
    });
  }

  startVolleyAttack() {
    this.currentBossAttack = "volley-tell";
    const tellDuration = this.bossPhase === 2 ? 680 : 480;
    const markerCount = this.bossPhase === 3 ? 4 : 3;
    const spacing = PORTRAIT
      ? (this.bossPhase === 3 ? 72 : 88)
      : (this.bossPhase === 3 ? 150 : 180);
    const centerX = Phaser.Math.Clamp(this.player.x, 320, GAME_WIDTH - 320);
    const startX = centerX - ((markerCount - 1) * spacing) / 2;

    this.moveBossTo(GAME_WIDTH / 2, 214, 240);
    this.setBossTellState(true, 0xff7cc8);
    this.clearVolleyMarkers();

    for (let index = 0; index < markerCount; index += 1) {
      const x = Phaser.Math.Clamp(startX + index * spacing, 180, GAME_WIDTH - 180);
      const marker = this.add
        .image(x, this.arenaFloorY - 8, "dora_marker")
        .setOrigin(0.5, 1)
        .setDepth(10)
        .setAlpha(0.72);
      this.tweens.add({
        targets: marker,
        alpha: 0.24,
        duration: 220,
        yoyo: true,
        repeat: -1,
      });
      this.volleyMarkers.push(marker);
    }

    this.scheduleBossEvent(tellDuration, () => {
      const interval = this.bossPhase === 3 ? 130 : 180;
      this.currentBossAttack = "volley";
      this.setBossTellState(false);

      this.volleyMarkers.forEach((marker, index) => {
        this.scheduleBossEvent(index * interval, () => {
          this.spawnVolleyBolt(marker.x);
        });
      });

      this.scheduleBossEvent(this.volleyMarkers.length * interval + 260, () => {
        this.clearVolleyMarkers();
        this.moveBossTo(GAME_WIDTH / 2, this.bossLowY - 12, 120);
        this.enterBossVulnerability(this.bossPhase === 3 ? 420 : 560, 40);
      });
    });
  }

  spawnVolleyBolt(x) {
    const bolt = this.volleyBolts.create(x, 80, "dora_bolt");
    bolt.setDepth(10);
    bolt.body.setAllowGravity(false);
    bolt.setVelocityY(this.bossPhase === 3 ? 940 : 820);
  }

  clearVolleyMarkers() {
    this.volleyMarkers.forEach((marker) => marker.destroy());
    this.volleyMarkers = [];
  }

  enterBossVulnerability(duration, delayBeforeOpen = 0) {
    this.clearBossEvents();
    this.currentBossAttack = "vulnerable";
    this.boss.setVelocity(0, 0);

    this.scheduleBossEvent(delayBeforeOpen, () => {
      this.bossVulnerable = true;
      this.bossHitLocked = false;
      this.setBossTellState(true, 0xffd7f5);
      this.scheduleBossEvent(duration, () => {
        this.closeBossVulnerability();
      });
    });
  }

  closeBossVulnerability() {
    if (this.hasEnded || !this.bossVulnerable) {
      return;
    }

    this.bossVulnerable = false;
    this.bossHitLocked = false;
    this.setBossTellState(false);
    this.moveBossTo(this.bossHomeX, this.bossHomeY, 240);
    this.scheduleBossEvent(320, () => this.startNextBossAttack());
  }

  updateBossWeakPoint() {
    const coreY = this.boss.y + this.boss.displayHeight * 0.31;
    this.bossWeakPoint.setPosition(this.boss.x, coreY);
    const headY = this.boss.y - this.boss.displayHeight * 0.36;
    this.bossHead.setPosition(this.boss.x, headY);
    this.bossShadow.x = this.boss.x;
    this.bossTellGlow.x = this.boss.x;
    this.bossTellGlow.y = this.boss.y + 34;
  }

  firePlayerBullet() {
    const facingRight = !this.playerVisual.flipX;
    const direction = facingRight ? 1 : -1;
    const originX = this.player.x + direction * 34;
    const originY = this.player.y - 58;

    // Muzzle flash — outer ring
    const ring = this.add.ellipse(originX, originY, 44, 44, 0xffffff, 0.95).setDepth(22);
    this.tweens.add({
      targets: ring,
      scaleX: direction * 3.5, scaleY: 0.3,
      alpha: 0,
      duration: 140,
      ease: "Power2",
      onComplete: () => ring.destroy(),
    });
    // Muzzle flash — inner burst
    const burst = this.add.ellipse(originX, originY, 22, 22, 0x7ef7ff, 1).setDepth(23);
    this.tweens.add({
      targets: burst,
      scaleX: direction * 2, scaleY: 0.15,
      alpha: 0,
      duration: 100,
      ease: "Power3",
      onComplete: () => burst.destroy(),
    });
    // Muzzle star streaks (2 diagonal sparks)
    for (const angle of [40, -40]) {
      const rad = Phaser.Math.DegToRad(facingRight ? angle : 180 - angle);
      const streak = this.add.ellipse(originX, originY, 18, 4, 0xffffff, 0.8).setDepth(22);
      streak.setRotation(rad);
      this.tweens.add({
        targets: streak,
        x: originX + Math.cos(rad) * 28,
        y: originY + Math.sin(rad) * 28,
        scaleX: 0.1, alpha: 0,
        duration: 110,
        onComplete: () => streak.destroy(),
      });
    }

    // Camera nudge on fire
    this.cameras.main.shake(55, 0.0028);

    // Bullet — elongated plasma bolt
    const bullet = this.playerBullets.create(originX, originY, "player_bullet");
    bullet.body.setAllowGravity(false);
    bullet.setVelocityX(direction * 860);
    bullet.setDepth(15);
    bullet.setDisplaySize(46, 16);
    bullet.setFlipX(!facingRight);
    bullet.setScale(0.15);
    this.tweens.add({
      targets: bullet,
      scaleX: 46 / 24,
      scaleY: 16 / 24,
      duration: 55,
      ease: "Back.out",
    });
    // Pulsing glow
    this.tweens.add({
      targets: bullet,
      alpha: 0.72,
      duration: 75,
      yoyo: true,
      repeat: -1,
    });

    // Trail — periodic ghost ellipses behind the bullet
    let trailTicks = 0;
    const trailEvent = this.time.addEvent({
      delay: 38,
      callback: () => {
        trailTicks++;
        if (!bullet.active || trailTicks > 50) { trailEvent.remove(); return; }
        const ghost = this.add
          .ellipse(bullet.x - direction * 10, bullet.y, 28, 9, 0x7ef7ff, 0.45)
          .setDepth(14);
        this.tweens.add({
          targets: ghost,
          scaleX: 0.1,
          alpha: 0,
          duration: 110,
          onComplete: () => ghost.destroy(),
        });
      },
    });
  }

  spawnBulletImpact(x, y, color = 0x7ef7ff) {
    // Central flash
    const flash = this.add.circle(x, y, 18, 0xffffff, 1).setDepth(24);
    this.tweens.add({
      targets: flash,
      scaleX: 2.8, scaleY: 2.8,
      alpha: 0,
      duration: 160,
      ease: "Power2",
      onComplete: () => flash.destroy(),
    });
    // Spark streaks in 6 directions
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const dist = Phaser.Math.Between(24, 52);
      const spark = this.add
        .ellipse(x, y, 14, 5, color, 0.9)
        .setDepth(23)
        .setRotation(angle);
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        scaleX: 0.1,
        alpha: 0,
        duration: Phaser.Math.Between(120, 200),
        ease: "Power2",
        onComplete: () => spark.destroy(),
      });
    }
  }

  fireDoraAtPlayer() {
    if (this.hasEnded) {
      return;
    }
    const bulletY = this.arenaFloorY - 72;
    const direction = this.player.x < this.boss.x ? -1 : 1;
    const fromX = this.boss.x + direction * (this.boss.displayWidth * 0.3);
    const bullet = this.doraBullets.create(fromX, bulletY, "dora_bullet");
    bullet.body.setAllowGravity(false);
    bullet.setImmovable(true);
    bullet.setVelocityX(direction * 580);
    bullet.setDepth(13);
    if (direction === 1) {
      bullet.setFlipX(true);
    }
  }

  scheduleNextDoraFire() {
    if (this.hasEnded) {
      return;
    }
    const delay = this.bossPhase === 3 ? 860 : this.bossPhase === 2 ? 1300 : 1900;
    this.time.delayedCall(delay, () => {
      if (!this.hasEnded) {
        this.fireDoraAtPlayer();
        this.scheduleNextDoraFire();
      }
    });
  }

  handleBossBodyContact() {
    if (this.hasEnded || this.bossVulnerable) {
      return;
    }

    this.hitPlayer(this.boss.x);
  }

  handleBossWeakPointContact() {
    if (this.hasEnded) {
      return;
    }

    const playerDescending = this.player.body.velocity.y > 40;
    const playerAbove = this.player.body.bottom <= this.bossWeakPoint.body.y + 26;

    if (this.bossVulnerable && !this.bossHitLocked && playerDescending && playerAbove) {
      this.damageBoss();
    }
  }

  hitPlayer(sourceX) {
    if (this.hasEnded || this.time.now < this.playerInvulnerableUntil) {
      return;
    }

    this.playerHp -= 1;
    this.playerInvulnerableUntil = this.time.now + 950;
    const knockDirection = this.player.x <= sourceX ? -1 : 1;
    this.player.setVelocityX(knockDirection * 260);
    this.player.setVelocityY(-520);
    this.hitFlashOverlay.setAlpha(0.16);
    this.tweens.add({
      targets: this.hitFlashOverlay,
      alpha: 0,
      duration: 240,
    });
    this.tweens.add({
      targets: this.player,
      alpha: 0.26,
      duration: 70,
      yoyo: true,
      repeat: 6,
      onComplete: () => {
        this.player.setAlpha(1);
      },
    });
    this.cameras.main.shake(140, 0.007);
    this.updateBossHud();

    if (this.playerHp <= 0) {
      this.finishBoss(false);
    }
  }

  damageBoss() {
    if (this.bossHitLocked || !this.bossVulnerable || this.hasEnded) {
      return;
    }

    this.clearBossEvents();
    this.bossHitLocked = true;
    this.bossVulnerable = false;
    this.bossHp -= 1;
    this.playerInvulnerableUntil = Math.max(this.playerInvulnerableUntil, this.time.now + 260);
    this.player.setVelocityY(-560);
    this.player.setVelocityX(this.player.x < this.boss.x ? -220 : 220);
    this.boss.setTint(0xffffff);
    this.time.delayedCall(120, () => this.boss.clearTint());
    this.cameras.main.flash(140, 255, 215, 240);
    this.cameras.main.shake(140, 0.007);
    this.updateBossPhase();
    this.updateBossHud();

    if (this.bossHp <= 0) {
      this.finishBoss(true);
      return;
    }

    this.setBossTellState(false);
    this.moveBossTo(this.bossHomeX, this.bossHomeY, 260);
    this.scheduleBossEvent(this.bossPhase === 3 ? 320 : 460, () => this.startNextBossAttack());
  }

  damageBossHead() {
    if (this.hasEnded) {
      return;
    }

    this.bossHp -= 1;
    this.boss.setTint(0xffddaa);
    this.time.delayedCall(100, () => this.boss.clearTint());
    this.cameras.main.shake(100, 0.005);
    this.cameras.main.flash(120, 255, 200, 100);
    this.updateBossPhase();
    this.updateBossHud();

    if (this.bossHp <= 0) {
      this.finishBoss(true);
    }
  }

  finishBoss(didWin) {
    if (this.hasEnded) {
      return;
    }

    this.hasEnded = true;
    this.clearBossEvents();
    this.clearVolleyMarkers();
    this.physics.pause();
    this.detachBossMobileControls();
    this.player.setVelocity(0, 0);
    
    // Ensure floor is kept visible and not destroyed
    if (this.floor) {
      this.floor.setActive(true);
      this.floor.setVisible(true);
      this.floor.setAlpha(1);
    }

    if (didWin) {
      setPlayerTextureAtFixedHeight(
        this.playerVisual,
        this.characterProfile.idleKey,
        PLAYER_HEIGHT,
        () => this.alignBossPlayerBodyToFeet()
      );
      this.boss.setTint(0xffcad7);
      this.tweens.add({
        targets: [this.boss, this.bossWeakPoint, this.bossTellGlow],
        alpha: 0,
        duration: 420,
      });
      this.cameras.main.flash(320, 255, 236, 178);
    } else {
      playPlayerAnimationAtFixedHeight(
        this.playerVisual,
        this.characterProfile.cryAnimKey,
        PLAYER_HEIGHT,
        () => this.alignBossPlayerBodyToFeet()
      );
      this.redDangerOverlay.setAlpha(0.24);
      this.cameras.main.shake(260, 0.012);
      this.cameras.main.flash(240, 255, 80, 96);
    }

    this.time.delayedCall(780, () => {
      this.scene.start("result", {
        didWin,
        sceneKey: "dora-boss",
        resultTitle: didWin ? "هزمت دورا" : "سقطت أمام دورا",
        resultStatLine: `الضربات: ${this.maxBossHp - this.bossHp} / ${this.maxBossHp}`,
        backgroundKey: "dora_background",
        selectedCharacterId: this.characterProfile.character.id,
      });
    });
  }

  update() {
    if (this.hasEnded) {
      return;
    }

    if (this.floor) {
      this.floor.setAlpha(1);
      this.floor.setVisible(true);
    }

    const isOnGround = this.player.body.blocked.down || this.player.body.touching.down;
    const moveLeft = this.cursors.left.isDown || this.mobileMoveLeft;
    const moveRight = this.cursors.right.isDown || this.mobileMoveRight;
    const wantsJump =
      Phaser.Input.Keyboard.JustDown(this.jumpKey) || this.mobileJumpQueued;

    if (isOnGround) {
      this.jumpsUsed = 0;
    }

    if (moveLeft && !moveRight) {
      this.player.setVelocityX(-320);
      this.player.setFlipX(true);
    } else if (moveRight && !moveLeft) {
      this.player.setVelocityX(320);
      this.player.setFlipX(false);
    } else if (this.time.now >= this.playerInvulnerableUntil) {
      this.player.setVelocityX(0);
    }

    if (wantsJump && this.jumpsUsed < MAX_JUMPS) {
      this.player.setVelocityY(JUMP_VELOCITY);
      this.jumpsUsed += 1;
    }
    this.mobileJumpQueued = false;

    const wantsShoot = Phaser.Input.Keyboard.JustDown(this.shootKey) || this.mobileShootQueued;
    this.mobileShootQueued = false;
    if (wantsShoot && this.time.now - this.lastPlayerShootTime > 350) {
      this.lastPlayerShootTime = this.time.now;
      this.firePlayerBullet();
    }

    this.playerBullets.children.each((b) => {
      if (b.active && (b.x < -60 || b.x > GAME_WIDTH + 60)) b.destroy();
    });
    this.doraBullets.children.each((b) => {
      if (b.active && (b.x < -80 || b.x > GAME_WIDTH + 80)) b.destroy();
    });

    const isAirborne = !isOnGround || this.player.body.velocity.y < 0;
    if (isAirborne) {
      if (
        this.playerWasOnGround ||
        this.playerVisual.anims.currentAnim?.key !== this.characterProfile.jumpAnimKey
      ) {
        playPlayerAnimationAtFixedHeight(
          this.playerVisual,
          this.characterProfile.jumpAnimKey,
          PLAYER_HEIGHT,
          () => this.alignBossPlayerBodyToFeet()
        );
      }
    } else if (Math.abs(this.player.body.velocity.x) > 8) {
      playPlayerAnimationAtFixedHeight(
        this.playerVisual,
        this.characterProfile.runAnimKey,
        PLAYER_HEIGHT,
        () => this.alignBossPlayerBodyToFeet()
      );
    } else {
      setPlayerTextureAtFixedHeight(
        this.playerVisual,
        this.characterProfile.idleKey,
        PLAYER_HEIGHT,
        () => this.alignBossPlayerBodyToFeet()
      );
    }
    syncCharacterVisualToBody(this.player, this.playerVisual);
    this.playerWasOnGround = isOnGround;

    this.updateBossWeakPoint();
    this.updateBossHud();

    const damagePulse = (Math.sin(this.time.now * 0.011) + 1) * 0.5;
    const dangerAlpha = this.bossPhase === 3 ? 0.1 : this.bossPhase === 2 ? 0.08 : 0.06;
    this.redDangerOverlay.setAlpha(dangerAlpha + damagePulse * (this.bossPhase === 3 ? 0.05 : 0.025));

    if (this.currentBossAttack === "dash") {
      const hitRightWall = this.dashDirection > 0 && this.boss.x >= GAME_WIDTH - 220;
      const hitLeftWall = this.dashDirection < 0 && this.boss.x <= 220;
      if (hitRightWall || hitLeftWall) {
        this.handleDashImpact();
      }
    }

    this.shockwaves.children.each((shockwave) => {
      if (!shockwave.active || shockwave.x < -100 || shockwave.x > GAME_WIDTH + 100) {
        shockwave.destroy();
      }
    });

    this.volleyBolts.children.each((bolt) => {
      if (!bolt.active || bolt.y > this.arenaFloorY + 70) {
        bolt.destroy();
      }
    });

    if (this.player.y > GAME_HEIGHT + 180) {
      this.finishBoss(false);
    }
  }
}

class ResultScene extends Phaser.Scene {
  constructor() {
    super("result");
  }

  create(data = {}) {
    setMobileUiBodyMode();
    setMobilePanelMode("platformer");
    setMobilePanelVisible(false);
    playSceneMusic(this, "menu");

    const {
      didWin,
      collectedTea = 0,
      sceneKey = "game",
      resultTitle,
      resultStatLine,
      backgroundKey = "background",
      selectedCharacterId,
    } = data;
    this.characterProfile = getCharacterProfile(selectedCharacterId);
    const useMobileUi = shouldUseMobileUi();
    const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, backgroundKey);
    coverImage(bg, GAME_WIDTH, GAME_HEIGHT);
    bg.setTint(didWin ? 0xcfffd9 : 0xffb0b0);

    this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      didWin ? 0x0a2319 : 0x2b0711,
      0.52
    );

    const hero = this.add
      .sprite(GAME_WIDTH / 2, PORTRAIT ? 200 : 250, this.characterProfile.idleKey)
      .setScale(PORTRAIT ? 1.8 : 2.2);

    if (didWin) {
      this.tweens.add({
        targets: hero,
        y: hero.y - 16,
        duration: 600,
        yoyo: true,
        repeat: -1,
      });
    } else {
      hero.play(this.characterProfile.cryAnimKey);
    }

    const runResultAction = (action) => {
      if (this.hasRestarted) {
        return;
      }

      this.hasRestarted = true;
      action();
    };

    const restartGame = () =>
      runResultAction(() =>
        this.scene.start(sceneKey, {
          selectedCharacterId: this.characterProfile.character.id,
        })
      );
    const goHomeMenu = () => runResultAction(() => this.scene.start("start"));
    const focusGameCanvas = () => {
      const canvas = this.game.canvas;
      if (!canvas) {
        return;
      }

      canvas.setAttribute("tabindex", "0");
      canvas.style.outline = "none";
      canvas.focus({ preventScroll: true });
    };
    const handleWindowKeydown = (event) => {
      if (this.hasRestarted) {
        return;
      }

      const targetTag = event.target?.tagName;
      if (targetTag && ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(targetTag)) {
        return;
      }

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        restartGame();
        return;
      }

      if (event.key === "h" || event.key === "H" || event.key === "Escape") {
        event.preventDefault();
        goHomeMenu();
      }
    };

    focusGameCanvas();
    this.time.delayedCall(30, focusGameCanvas);
    this.input.on("pointerdown", focusGameCanvas);
    window.addEventListener("keydown", handleWindowKeydown);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off("pointerdown", focusGameCanvas);
      window.removeEventListener("keydown", handleWindowKeydown);
    });

    const createActionCard = (x, y, title, subtitle, fillColor, strokeColor, onPress) => {
      const card = this.add
        .rectangle(x, y, 256, 92, fillColor, 0.9)
        .setStrokeStyle(5, strokeColor, 0.98)
        .setInteractive({ useHandCursor: !useMobileUi });

      const label = this.add
        .text(x, y - 10, title, {
          fontFamily: "Changa",
          fontSize: "32px",
          fontStyle: "bold",
          color: "#ffffff",
        })
        .setOrigin(0.5);

      const hint = this.add
        .text(x, y + 22, subtitle, {
          fontFamily: "Changa",
          fontSize: "18px",
          color: "#d3d5ff",
        })
        .setOrigin(0.5);

      card.on("pointerdown", onPress);
      card.on("pointerover", () => {
        card.setScale(1.03);
        label.setScale(1.03);
        hint.setScale(1.03);
      });
      card.on("pointerout", () => {
        card.setScale(1);
        label.setScale(1);
        hint.setScale(1);
      });
    };

    this.add
      .text(GAME_WIDTH / 2, PORTRAIT ? 348 : 420, resultTitle ?? (didWin ? "فزت" : "انتهت اللعبة"), {
        fontFamily: "Changa",
        fontSize: PORTRAIT ? "68px" : "82px",
        fontStyle: "bold",
        color: didWin ? "#ebffd8" : "#ffe6e6",
        stroke: "#220b21",
        strokeThickness: 9,
      })
      .setOrigin(0.5);

    this.add
      .text(
        GAME_WIDTH / 2,
        PORTRAIT ? 418 : 490,
        resultStatLine ?? `الأكواب المجمعة: ${collectedTea} / ${TOTAL_TEA}`,
        {
          fontFamily: "Changa",
          fontSize: PORTRAIT ? "24px" : "30px",
          color: "#fff5d4",
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        GAME_WIDTH / 2,
        PORTRAIT ? 466 : 548,
        useMobileUi ? "اختر إعادة أو القائمة الرئيسية" : "R للإعادة • H للقائمة الرئيسية",
        {
          fontFamily: "Changa",
          fontSize: useMobileUi ? "28px" : "30px",
          color: "#d7f6ff",
        }
      )
      .setOrigin(0.5);

    if (PORTRAIT) {
      createActionCard(GAME_WIDTH / 2, 590, "إعادة", "العب من جديد", 0x0a1623, 0x59d1ff, restartGame);
      createActionCard(GAME_WIDTH / 2, 668, "القائمة", "العودة للبداية", 0x180814, 0xff6cb8, goHomeMenu);
    } else {
      createActionCard(GAME_WIDTH / 2 - 170, 628, "إعادة", useMobileUi ? "العب من جديد" : "Replay", 0x0a1623, 0x59d1ff, restartGame);
      createActionCard(GAME_WIDTH / 2 + 170, 628, "القائمة", useMobileUi ? "العودة للبداية" : "Home Menu", 0x180814, 0xff6cb8, goHomeMenu);
    }

    this.input.keyboard.once("keydown-R", restartGame);
    this.input.keyboard.once("keydown-H", goHomeMenu);
    this.input.keyboard.once("keydown-ESC", goHomeMenu);
  }
}

// ─── Multiplayer lobby system ────────────────────────────────────────────────

function connectSocket() {
  if (mp.socket) return mp.socket;
  mp.socket = io(SERVER_URL, { transports: ["polling", "websocket"] });
  return mp.socket;
}

function initLobbyOverlay() {
  const overlay   = document.getElementById("lobby-overlay");
  const screenIntro   = document.getElementById("lobby-screen-intro");
  const screenWaiting = document.getElementById("lobby-screen-waiting");
  const nickInput  = document.getElementById("lobby-nick");
  const codeField  = document.getElementById("lobby-code-field");
  const btnCreate  = document.getElementById("lobby-btn-create");
  const btnJoin    = document.getElementById("lobby-btn-join");
  const btnReady   = document.getElementById("lobby-btn-ready");
  const btnStart   = document.getElementById("lobby-btn-start");
  const btnCopy    = document.getElementById("lobby-copy-code");
  const codeDisplay = document.getElementById("lobby-code-display");
  const playersList = document.getElementById("lobby-players-list");
  const errorEl    = document.getElementById("lobby-error");
  const playersCountEl = document.getElementById("lobby-players-count");

  let myReady = false;
  let myPlayerId = null;
  let isHost = false;
  const MAX_PLAYERS = 10;

  function showError(msg) {
    errorEl.textContent = msg;
    setTimeout(() => { errorEl.textContent = ""; }, 3000);
  }

  function renderPlayers() {
    playersList.innerHTML = "";
    const sorted = Array.from(mp.players.values());
    if (playersCountEl) {
      playersCountEl.textContent = `${sorted.length} / ${MAX_PLAYERS}`;
    }
    sorted.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = "lobby-player-row";
      const crown = i === 0 ? "👑" : `${i + 1}.`;
      const youTag = p.id === myPlayerId ? `<span class="lobby-player-you">(أنت)</span>` : "";
      const myHostTag = p.id === myPlayerId && isHost ? " ⭐HOST" : "";
      const statusClass = p.ready ? "ready" : "waiting";
      const statusText  = p.ready ? "جاهز ✓" : "انتظار...";
      row.innerHTML = `
        <span class="lobby-player-crown">${crown}</span>
        <span class="lobby-player-name">${p.nickname}${myHostTag} ${youTag}</span>
        <span class="lobby-player-status ${statusClass}">${statusText}</span>`;
      playersList.appendChild(row);
    });
  }

  function showWaiting() {
    screenIntro.style.display = "none";
    screenWaiting.style.display = "";
  }

  let socketReady = false;

  function setButtonsLoading(loading) {
    btnCreate.disabled = loading;
    btnJoin.disabled   = loading;
    btnCreate.textContent = loading ? "جاري الاتصال..." : "إنشاء غرفة جديدة";
    btnJoin.textContent   = loading ? "..." : "انضم";
  }

  function setupSocket() {
    if (mp.socket && mp.socket._lobbyReady) return;
    const socket = connectSocket();
    mp.socket._lobbyReady = true;

    socket.on("connect", () => {
      socketReady = true;
      errorEl.textContent = "";
      setButtonsLoading(false);
    });

    socket.on("connect_error", () => {
      socketReady = false;
      setButtonsLoading(false);
      showError("تعذّر الاتصال بالخادم — تحقق من الإنترنت");
    });

    socket.on("lobbyCreated", ({ code, playerId, players }) => {
      if (players.length > MAX_PLAYERS) {
        showError("لا يمكن الانضمام: الغرفة ممتلئة (10 لاعبين كحد أقصى)");
        return;
      }
      myPlayerId = playerId;
      mp.myId = playerId;
      mp.lobbyCode = code;
      isHost = true;
      mp.isHost = true;
      players.forEach(p => mp.players.set(p.id, p));
      codeDisplay.textContent = code;
      btnStart.style.display = "";
      renderPlayers();
      showWaiting();
    });

    socket.on("lobbyJoined", ({ code, playerId, hostId, players }) => {
      if (players.length > MAX_PLAYERS) {
        showError("لا يمكن الانضمام: الغرفة ممتلئة (10 لاعبين كحد أقصى)");
        return;
      }
      myPlayerId = playerId;
      mp.myId = playerId;
      mp.lobbyCode = code;
      isHost = hostId === playerId;
      mp.isHost = isHost;
      players.forEach(p => mp.players.set(p.id, p));
      codeDisplay.textContent = code;
      if (isHost) btnStart.style.display = "";
      renderPlayers();
      showWaiting();
    });

    socket.on("lobbyError", (msg) => showError(msg));

    socket.on("playerJoined", (player) => {
      if (mp.players.size >= MAX_PLAYERS) {
        showError("لا يمكن الانضمام: الغرفة ممتلئة (10 لاعبين كحد أقصى)");
        return;
      }
      mp.players.set(player.id, player);
      renderPlayers();
    });

    socket.on("playerLeft", ({ id }) => {
      mp.players.delete(id);
      renderPlayers();
    });

    socket.on("readyChanged", ({ id, ready }) => {
      const p = mp.players.get(id);
      if (p) p.ready = ready;
      renderPlayers();
    });

    socket.on("hostChanged", ({ id }) => {
      isHost = id === myPlayerId;
      mp.isHost = isHost;
      if (isHost) btnStart.style.display = "";
      renderPlayers();
    });

    socket.on("gameStarted", () => {
      overlay.setAttribute("aria-hidden", "true");
      mp.enabled = true;
      if (window.lobbyBridge && window.lobbyBridge.onGameStart) {
        window.lobbyBridge.onGameStart();
      }
    });
  }

  function getSavedNick() {
    return localStorage.getItem("mp-nickname") || "";
  }
  nickInput.value = getSavedNick();

  btnCreate.addEventListener("click", () => {
    const nick = nickInput.value.trim();
    if (!nick) return showError("أدخل اسمك أولاً");
    if (nick.length > 14) return showError("الاسم طويل جداً (14 حرف كحد أقصى)");
    localStorage.setItem("mp-nickname", nick);
    codeField.value = "";
    setupSocket();
    const characterId = localStorage.getItem("oof-ah-selected-character") || "ofah";
    if (!socketReady) {
      setButtonsLoading(true);
      mp.socket.once("connect", () => {
        setButtonsLoading(false);
        mp.socket.emit("createLobby", { nickname: nick, characterId });
      });
    } else {
      mp.socket.emit("createLobby", { nickname: nick, characterId });
    }
  });

  btnJoin.addEventListener("click", () => {
    const nick = nickInput.value.trim();
    const code = codeField.value.trim().toUpperCase();
    if (!nick) return showError("أدخل اسمك أولاً");
    if (nick.length > 14) return showError("الاسم طويل جداً (14 حرف كحد أقصى)");
    if (code.length < 4) return showError("أدخل كود الغرفة (4 أحرف)");
    localStorage.setItem("mp-nickname", nick);
    setupSocket();
    const characterId = localStorage.getItem("oof-ah-selected-character") || "ofah";
    if (!socketReady) {
      setButtonsLoading(true);
      mp.socket.once("connect", () => {
        setButtonsLoading(false);
        mp.socket.emit("joinLobby", { code, nickname: nick, characterId });
      });
    } else {
      mp.socket.emit("joinLobby", { code, nickname: nick, characterId });
    }
  });

  codeField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnJoin.click();
  });

  btnReady.addEventListener("click", () => {
    myReady = !myReady;
    btnReady.classList.toggle("is-ready", myReady);
    btnReady.textContent = myReady ? "إلغاء الجاهزية" : "جاهز ✓";
    mp.socket && mp.socket.emit("setReady", myReady);
  });

  btnStart.addEventListener("click", () => {
    mp.socket && mp.socket.emit("startGame");
  });

  btnCopy.addEventListener("click", () => {
    navigator.clipboard?.writeText(mp.lobbyCode || "").then(() => {
      btnCopy.textContent = "✓";
      setTimeout(() => { btnCopy.textContent = "📋"; }, 1500);
    });
  });

  // Back button
  const btnBack = document.getElementById("lobby-btn-back");
  btnBack.addEventListener("click", () => {
    hideLobbyOverlay();
    if (mp.socket) {
      mp.socket.disconnect();
      mp.socket = null;
      mp.enabled = false;
      mp.myId = null;
      mp.lobbyCode = null;
      mp.isHost = false;
      mp.players.clear();
    }
    // Reset lobby screens
    screenIntro.style.display = "";
    screenWaiting.style.display = "none";
    myReady = false;
    myPlayerId = null;
    isHost = false;
    nickInput.value = getSavedNick();
  });
}

function showLobbyOverlay() {
  const overlay = document.getElementById("lobby-overlay");
  if (overlay) overlay.setAttribute("aria-hidden", "false");
}

function hideLobbyOverlay() {
  const overlay = document.getElementById("lobby-overlay");
  if (overlay) overlay.setAttribute("aria-hidden", "true");
}

// ─── Remote player helpers (used inside game scenes) ─────────────────────────

function createRemotePlayerSprite(scene, playerData) {
  const profile = getCharacterProfile(playerData.characterId);
  const sprite = scene.add.sprite(playerData.x || 100, playerData.y || 400, profile.idleKey);
  fitToHeight(sprite, PLAYER_HEIGHT);
  sprite.setAlpha(0.82);
  sprite.setDepth(9);

  const bubble = scene.add.rectangle(playerData.x || 100, (playerData.y || 400) - PLAYER_HEIGHT * 0.62, 0, 0, 0x0a0418, 0.72).setDepth(19);
  const nameText = scene.add.text(playerData.x || 100, (playerData.y || 400) - PLAYER_HEIGHT * 0.62, playerData.nickname, {
    fontFamily: "Changa",
    fontSize: PORTRAIT ? "14px" : "18px",
    fontStyle: "bold",
    color: "#ffffff",
    stroke: "#0a0418",
    strokeThickness: 4,
  }).setOrigin(0.5).setDepth(20);

  bubble.width  = nameText.width  + 16;
  bubble.height = nameText.height + 8;
  bubble.setStrokeStyle(1, 0x7e39db, 0.8);

  return {
    sprite,
    nameText,
    bubble,
    targetX: playerData.x || 100,
    targetY: playerData.y || 400,
    animKey: null,
    alive: true,
    characterId: playerData.characterId,
    profile,
  };
}

function updateRemoteSprites(remotePlayers) {
  remotePlayers.forEach((remote) => {
    if (!remote.sprite.active) return;
    remote.sprite.x = Phaser.Math.Linear(remote.sprite.x, remote.targetX, 0.25);
    remote.sprite.y = Phaser.Math.Linear(remote.sprite.y, remote.targetY, 0.25);
    const nameY = remote.sprite.y - PLAYER_HEIGHT * 0.62;
    remote.nameText.setPosition(remote.sprite.x, nameY);
    remote.bubble.setPosition(remote.sprite.x, nameY);
  });
}

function destroyRemotePlayer(remote) {
  remote.sprite?.destroy();
  remote.nameText?.destroy();
  remote.bubble?.destroy();
}

// ─── HTML leaderboard panel ───────────────────────────────────────────────────

let lbPanel = null;

function ensureLeaderboard() {
  if (lbPanel) return lbPanel;
  lbPanel = document.createElement("div");
  lbPanel.className = "mp-leaderboard";
  lbPanel.innerHTML = `<div class="mp-leaderboard-title">🏆 الترتيب</div><div id="mp-lb-rows"></div>`;
  document.body.appendChild(lbPanel);
  return lbPanel;
}

function showLeaderboard() {
  ensureLeaderboard().classList.add("active");
}

function hideLeaderboard() {
  lbPanel?.classList.remove("active");
}

function updateLeaderboard(localId, localX, localNick, remotePlayers) {
  if (!lbPanel) return;
  const rows = [];
  rows.push({ id: localId, nick: localNick, x: localX, alive: true });
  remotePlayers.forEach((remote, id) => {
    rows.push({ id, nick: remote.nameText.text, x: remote.targetX, alive: remote.alive });
  });
  rows.sort((a, b) => b.x - a.x);

  const container = document.getElementById("mp-lb-rows");
  if (!container) return;
  container.innerHTML = rows.map((r, i) => {
    const medal = i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
    const dead  = r.alive ? "" : " 💀";
    const cls   = !r.alive ? "dead" : r.id === localId ? "me" : "";
    return `<div class="mp-leaderboard-row ${cls}">${medal} ${r.nick}${dead}</div>`;
  }).join("");
}

// ─── Attach multiplayer socket listeners to a scene ──────────────────────────

function attachMpListeners(scene, remotePlayers, localNick) {
  if (!mp.socket || !mp.enabled) return;

  mp.socket.on("playerMoved", ({ id, x, y, flipX, animKey }) => {
    const remote = remotePlayers.get(id);
    if (!remote) return;
    remote.targetX = x;
    remote.targetY = y;
    if (remote.sprite.active) {
      remote.sprite.setFlipX(!!flipX);
      if (animKey && remote.sprite.anims.exists(animKey)) {
        remote.sprite.play(animKey, true);
      }
    }
  });

  mp.socket.on("playerDied", ({ id }) => {
    const remote = remotePlayers.get(id);
    if (remote) {
      remote.alive = false;
      remote.sprite.setAlpha(0.3);
      remote.nameText.setAlpha(0.4);
      remote.bubble.setAlpha(0.4);
    }
  });

  mp.socket.on("playerFinished", ({ id }) => {
    const remote = remotePlayers.get(id);
    if (remote) remote.alive = false;
  });

  mp.socket.on("playerLeft", ({ id }) => {
    const remote = remotePlayers.get(id);
    if (remote) {
      destroyRemotePlayer(remote);
      remotePlayers.delete(id);
      mp.players.delete(id);
    }
  });

  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    if (mp.socket) {
      mp.socket.off("playerMoved");
      mp.socket.off("playerDied");
      mp.socket.off("playerFinished");
      mp.socket.off("playerLeft");
    }
    remotePlayers.forEach(destroyRemotePlayer);
    remotePlayers.clear();
    hideLeaderboard();
  });
}

function sendPlayerUpdate(player, visual) {
  if (!mp.enabled || !mp.socket) return;
  const now = Date.now();
  if (now - mp.lastSend < 50) return;
  mp.lastSend = now;
  mp.socket.emit("playerUpdate", {
    x: Math.round(player.x),
    y: Math.round(player.y),
    flipX: visual.flipX,
    animKey: visual.anims.currentAnim?.key || null,
  });
}

// ─── Phaser config ────────────────────────────────────────────────────────────

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#03050c",
  pixelArt: true,
  roundPixels: true,
  scene: [BootScene, StartScene, GameScene, LolaChaseScene, DoraBossScene, ResultScene],
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NO_CENTER,
  },
  loader: {
    retryAttempts: 0,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
