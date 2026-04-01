module.exports = {
  apps: [
    {
      name: "dolrise-frontend",
      script: "pnpm",
      args: "exec next start -p 7000",
      cwd: "/mnt/data/dolrise/frontend",
      env: {
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1"
      },
      interpreter: "bash",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M"
    }
  ]
};
