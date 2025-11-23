// Legacy scenario data for backward compatibility with ScenarioPlayer
export const scenarios = {
  beginner: [
    {
      id: '404-error',
      title: 'The 404 Error',
      duration: '15 min',
      teaches: ['HTTP', 'Logs', 'Routing'],
      description: 'Your first production bug. Learn to read logs and understand HTTP status codes.',
      completed: false,
      locked: false
    },
    {
      id: 'slow-api',
      title: 'The Slow API',
      duration: '20 min',
      teaches: ['Performance', 'Database', 'N+1 Queries'],
      description: 'Your homepage takes 8 seconds to load. Find and fix the N+1 query problem.',
      completed: false,
      locked: false
    },
    {
      id: 'memory-leak',
      title: 'The Memory Leak',
      duration: '18 min',
      teaches: ['Memory', 'Event Listeners', 'Cleanup'],
      description: 'Your server crashes every few hours. Track down the memory leak.',
      completed: false,
      locked: false
    },
    {
      id: 'cors-error',
      title: 'The CORS Error',
      duration: '17 min',
      teaches: ['CORS', 'HTTP Headers', 'Browser Security'],
      description: 'Your API works in Postman but not in the browser. Why?',
      completed: false,
      locked: false
    },
    {
      id: 'env-variable',
      title: 'The Missing Environment Variable',
      duration: '16 min',
      teaches: ['Config', 'Environment', 'Debugging'],
      description: 'Your app works locally but crashes in production. What is wrong?',
      completed: false,
      locked: false
    }
  ],
  intermediate: [
    {
      id: 'connection-pool',
      title: 'Database Connection Exhaustion',
      duration: '25 min',
      teaches: ['Database', 'Connection Pooling', 'Resource Management'],
      description: 'Your API starts failing after 100 requests. What happened to your database connections?',
      completed: false,
      locked: false
    },
    {
      id: 'cache-stampede',
      title: 'The Cache Stampede',
      duration: '22 min',
      teaches: ['Caching', 'Race Conditions', 'Load Management'],
      description: 'Your cache expires and your database dies. Learn about cache stampedes.',
      completed: false,
      locked: false
    },
    {
      id: 'failed-deployment',
      title: 'The Failed Deployment',
      duration: '24 min',
      teaches: ['CI/CD', 'Rollback', 'Deployment Safety'],
      description: 'Your deployment breaks production. Learn to rollback and add safety checks.',
      completed: false,
      locked: false
    },
    {
      id: 'queue-backup',
      title: 'Message Queue Backup',
      duration: '26 min',
      teaches: ['Message Queues', 'Backpressure', 'Monitoring'],
      description: 'Your background jobs are piling up. Debug the queue backup.',
      completed: false,
      locked: false
    },
    {
      id: 'rate-limit-cascade',
      title: 'Rate Limit Cascade',
      duration: '23 min',
      teaches: ['Rate Limiting', 'Circuit Breakers', 'Graceful Degradation'],
      description: 'One slow API brings down your entire service. Prevent cascade failures.',
      completed: false,
      locked: false
    }
  ],
  advanced: [
    {
      id: 'reddit-k8s',
      title: 'Reddit Kubernetes Meltdown',
      duration: '32 min',
      teaches: ['Kubernetes', 'Resource Limits', 'Cluster Management'],
      description: 'Recreate Reddit 2018 Kubernetes incident. Learn about pod resource limits.',
      completed: false,
      locked: false
    },
    {
      id: 'gitlab-db-delete',
      title: 'GitLab Database Deletion',
      duration: '35 min',
      teaches: ['Backups', 'Disaster Recovery', 'Database Management'],
      description: 'Recreate GitLab 2017 database deletion. Learn about backup strategies.',
      completed: false,
      locked: false
    },
    {
      id: 'discord-redis',
      title: 'Discord Redis Failure',
      duration: '30 min',
      teaches: ['Redis', 'Failover', 'High Availability'],
      description: 'Recreate Discord 2022 Redis incident. Learn about Redis clustering.',
      completed: false,
      locked: false
    },
    {
      id: 'aws-s3-cascade',
      title: 'AWS S3 Cascade Failure',
      duration: '34 min',
      teaches: ['S3', 'Dependency Management', 'Resilience'],
      description: 'Recreate AWS 2017 S3 outage. Learn about cascading failures.',
      completed: false,
      locked: false
    },
    {
      id: 'cloudflare-bgp',
      title: 'Cloudflare BGP Hijack',
      duration: '29 min',
      teaches: ['BGP', 'Network Security', 'Route Management'],
      description: 'Recreate Cloudflare 2019 BGP incident. Learn about route leaks.',
      completed: false,
      locked: false
    }
  ]
};
