const axios = require('axios');

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWEuMjJzY3NlMTAxMTEzNUBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAyMjY2MywiaWF0IjoxNzUxMDIxNzYzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZWRhNjMxNjgtMzM4OS00MTVjLTg1MGYtYjEzZGNjZDk4ZDk3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdHlhIiwic3ViIjoiOGE3NjdkZmQtNzM0Zi00MDNiLWFmZTktNTQ0NjQ0ODFmYzc1In0sImVtYWlsIjoiYWRpdHlhLjIyc2NzZTEwMTExMzVAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoiYWRpdHlhIiwicm9sbE5vIjoiMjIxMzEwMTExNTAiLCJhY2Nlc3NDb2RlIjoiTXVhZ3ZxIiwiY2xpZW50SUQiOiI4YTc2N2RmZC03MzRmLTQwM2ItYWZlOS01NDQ2NDQ4MWZjNzUiLCJjbGllbnRTZWNyZXQiOiJEbUFEQXJZd0RiWE1NeHJuIn0.C32ExXhgCLDbfmZZ3Fe_dMvRQ5tdCavYgYi6XHUOL9E';
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWEuMjJzY3NlMTAxMTEzNUBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAyMDQ5NiwiaWF0IjoxNzUxMDE5NTk2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTQ4ODNlYjEtZDhmNy00NmQ0LWJhNmItZDUxYzQxYzg2MzBiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdHlhIiwic3ViIjoiOGE3NjdkZmQtNzM0Zi00MDNiLWFmZTktNTQ0NjQ0ODFmYzc1In0sImVtYWlsIjoiYWRpdHlhLjIyc2NzZTEwMTExMzVAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoiYWRpdHlhIiwicm9sbE5vIjoiMjIxMzEwMTExNTAiLCJhY2Nlc3NDb2RlIjoiTXVhZ3ZxIiwiY2xpZW50SUQiOiI4YTc2N2RmZC03MzRmLTQwM2ItYWZlOS01NDQ2NDQ4MWZjNzUiLCJjbGllbnRTZWNyZXQiOiJEbUFEQXJZd0RiWE1NeHJuIn0.HySW0heeXW4hOqHXvU6wXwIiFGebBk89yPM03WbbcAo'
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWEuMjJzY3NlMTAxMTEzNUBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNzg2MCwiaWF0IjoxNzUxMDE2OTYwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjQ4MWUxOGUtZTA2MC00YzdjLTllZTItN2MxMzVjMmRjOTQwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdHlhIiwic3ViIjoiOGE3NjdkZmQtNzM0Zi00MDNiLWFmZTktNTQ0NjQ0ODFmYzc1In0sImVtYWlsIjoiYWRpdHlhLjIyc2NzZTEwMTExMzVAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoiYWRpdHlhIiwicm9sbE5vIjoiMjIxMzEwMTExNTAiLCJhY2Nlc3NDb2RlIjoiTXVhZ3ZxIiwiY2xpZW50SUQiOiI4YTc2N2RmZC03MzRmLTQwM2ItYWZlOS01NDQ2NDQ4MWZjNzUiLCJjbGllbnRTZWNyZXQiOiJEbUFEQXJZd0RiWE1NeHJuIn0.yg9Ayb2gXcHyd48vmMAtRl0rkIvzijpnzp1E0twkvNw';
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWEuMjJzY3NlMTAxMTEzNUBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNzg2MCwiaWF0IjoxNzUxMDE2OTYwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjQ4MWUxOGUtZTA2MC00YzdjLTllZTItN2MxMzVjMmRjOTQwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdHlhIiwic3ViIjoiOGE3NjdkZmQtNzM0Zi00MDNiLWFmZTktNTQ0NjQ0ODFmYzc1In0sImVtYWlsIjoiYWRpdHlhLjIyc2NzZTEwMTExMzVAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoiYWRpdHlhIiwicm9sbE5vIjoiMjIxMzEwMTExNTAiLCJhY2Nlc3NDb2RlIjoiTXVhZ3ZxIiwiY2xpZW50SUQiOiI4YTc2N2RmZC03MzRmLTQwM2ItYWZlOS01NDQ2NDQ4MWZjNzUiLCJjbGllbnRTZWNyZXQiOiJEbUFEQXJZd0RiWE1NeHJuIn0.yg9Ayb2gXcHyd48vmMAtRl0rkIvzijpnzp1E0twkvNw';

async function logEvent(stack, level, pkg, message) {
  const validStacks = ["backend", "frontend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const backendPackages = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
  const frontendPackages = ["api", "component", "hook", "page", "state", "style"];
  const sharedPackages = ["auth", "config", "middleware", "utils"];

  const allPackages = [...backendPackages, ...frontendPackages, ...sharedPackages];

  if (!validStacks.includes(stack)) throw new Error("Invalid stack");
  if (!validLevels.includes(level)) throw new Error("Invalid level");
  if (!allPackages.includes(pkg)) throw new Error("Invalid package");

  try {
    const res = await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: pkg,
      message
    }, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Log created:", res.data);
    return res.data;
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
}

module.exports = { logEvent };
