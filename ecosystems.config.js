module.exports = {
  apps: [
    {
      name: 'chuoicuahangvai-admin',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      exp_backoff_restart_delay: 100,
    },
  ],
}
