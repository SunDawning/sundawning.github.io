const node_options_openssl_legacy_provider = require('@sundawning/node-options-openssl-legacy-provider');
const exec = require('@sundawning/child-process-exec-with-log');
exec(`cross-env ${node_options_openssl_legacy_provider()} umi dev`);
