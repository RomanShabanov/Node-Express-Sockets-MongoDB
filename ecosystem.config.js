module.exports = {
  apps: [
    {
      name: "Rest API",
      script: "./server.ts",
      interpreter: "tsc",
      watch: true,
      ignore_watch: ["node_modules"],
      exp_backoff_restart_delay: 100,
      combine_logs: true,
      merge_logs: true,
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      time: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
