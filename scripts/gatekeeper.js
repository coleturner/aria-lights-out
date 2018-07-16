const os = require('os');
const fs = require('fs');
const path = require('path');
const hostname = os.hostname();

function writeHook(hookName, str) {
  const filename = path.join(__dirname, '../.git/hooks/', hookName);
  fs.writeFileSync(filename, str);
  fs.chmodSync(filename, 0o755);
}

if (hostname.startsWith('LM-SJN')) {
  const message = 'Contributions from this machine are prohibited';
  const fatalString = `#!/bin/bash\necho "${message}";\nexit 1;`;
  writeHook('pre-commit', fatalString);
  writeHook('pre-push', fatalString);
  writeHook('pre-receive', fatalString);
  writeHook('push-to-checkout', fatalString);
  writeHook('post-checkout', fatalString);
  writeHook('pre-rebase', fatalString);
  writeHook('update', fatalString);

  console.log(message);
  process.exit(1);
}
