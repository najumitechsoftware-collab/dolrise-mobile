module.exports = {
  apps: [
    {
      name: "dolrise-frontend",
      cwd: "/srv/dolrise/frontend",
      script: "node",
      args: "node_modules/next/dist/bin/next start -p 7000",
      exec_mode: "fork",
      instances: 1,
      watch: false,

      autorestart: true,
      max_restarts: 5,
      min_uptime: "20s",
      exp_backoff_restart_delay: 3000,

      env: {
        NODE_ENV: "production",
        PORT: 7000,
      },
    },
  ],
};
