// Setup clipboard buttons
import * as Clipboard from './copy.js';
Clipboard.setupButtons(".cli-install .cli-copy-icon");

// Setup platform toggles on CLI instructions
import * as Platforms from './platforms.js';
Platforms.setupToggles();
Platforms.setDefaultPlatform();

// Sets up all the intersectioon observers
import * as Observer from './observer.js';
Observer.simple(".bundles-section");
Observer.simple(".history-section");
Observer.simple(".environments-section");
Observer.simple(".virtual-env-section");
Observer.simple(".build-progress-section");
Observer.simple(".license-section");
Observer.simple(".cli-section");
Observer.simple(".dependencies-section");
