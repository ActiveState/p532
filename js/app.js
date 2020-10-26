// Setup clipboard buttons
import * as Clipboard from './copy.js';
Clipboard.setupButtons(".cli-install .cli-copy-icon");

// Setup platform toggles on CLI instructions
import * as Platforms from './platforms.js';
Platforms.setupToggles();
Platforms.setDefaultPlatform();

// Sets up all the intersectioon observers
import * as Observer from './observer.js';
Observer.create(".cli-section",".cli-section .line", "visible");
Observer.create(".environments-section",".environments-section .camel", "activated");
Observer.create(".history-section",".history-section .item", "visible");
Observer.create(".virtual-env-section",false, false, Observer.setPanelScale);
Observer.create(".dependencies-section",".dependencies-section .package:not(.first)", "resolved");
Observer.create(".bundles-section",".bundles-section .bundle", "selected");
Observer.create(".build-progress-section",".build-progress-section .item", "done", Observer.setBarWidth);
