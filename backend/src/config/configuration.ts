export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  stage: process.env.STAGE ?? 'local',
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173'
});
