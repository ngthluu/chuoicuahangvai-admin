module.exports = {
  apps: [
    {
      name: 'chuoicuahangvai-admin',
      script: 'serve',
      args: 'build 8888 --spa',
      exp_backoff_restart_delay: 100,
    },
  ],
}
