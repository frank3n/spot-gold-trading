# VPS Dev Server Setup - Spot Gold Trading Platform

**Date**: December 10, 2025
**VPS IP**: 138.199.218.115
**Status**: ✅ Running

---

## Access URLs

- **HTTP**: http://138.199.218.115:3000
- **IPv6**: http://[2a01:4f8:1c1a:2e06::1]:3000

### Available Routes
- Dashboard: http://138.199.218.115:3000/
- Tools: http://138.199.218.115:3000/tools
- Portfolio: http://138.199.218.115:3000/portfolio
- Alerts: http://138.199.218.115:3000/alerts
- Strategies: http://138.199.218.115:3000/strategies
- Settings: http://138.199.218.115:3000/settings

---

## Server Information

**Location**: `~/spot-gold-trading/app` on VPS
**Screen Session**: `gold-trading`
**Log File**: `~/dev-server.log`
**Node Version**: v22.21.1
**npm Version**: 11.7.0
**Next.js**: 16.0.8 (Turbopack)

---

## Management Commands

### View Server Status
```bash
ssh fedora-vps "screen -ls | grep gold-trading"
```

### View Live Logs
```bash
ssh fedora-vps "tail -f ~/dev-server.log"
```

### Attach to Screen Session
```bash
ssh -t fedora-vps "screen -r gold-trading"
# Press Ctrl+A then D to detach
```

### Stop Dev Server
```bash
ssh fedora-vps "screen -S gold-trading -X quit"
```

### Start Dev Server
```bash
ssh fedora-vps "screen -dmS gold-trading bash -c 'cd ~/spot-gold-trading/app && npm run dev 2>&1 | tee ~/dev-server.log'"
```

### Restart Dev Server
```bash
# Stop
ssh fedora-vps "screen -S gold-trading -X quit"
# Wait a moment
sleep 3
# Start
ssh fedora-vps "screen -dmS gold-trading bash -c 'cd ~/spot-gold-trading/app && npm run dev 2>&1 | tee ~/dev-server.log'"
```

### Update Code from GitHub
```bash
# Pull latest changes
ssh fedora-vps "cd ~/spot-gold-trading && git pull"
# Restart server to apply changes
ssh fedora-vps "screen -S gold-trading -X quit && sleep 3 && screen -dmS gold-trading bash -c 'cd ~/spot-gold-trading/app && npm run dev 2>&1 | tee ~/dev-server.log'"
```

---

## Network Configuration

**Firewall**: Not running (no restrictions)
**Port**: 3000 (open)
**Binding**: 0.0.0.0 (accepts external connections)

---

## Testing the Server

### Test from Command Line
```bash
# Test homepage
curl http://138.199.218.115:3000/

# Test specific route
curl http://138.199.218.115:3000/tools

# Check HTTP status
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://138.199.218.115:3000/
```

### Test from Browser
Simply open any of the access URLs above in your web browser.

---

## Troubleshooting

### Server Not Responding
1. Check if screen session is running:
   ```bash
   ssh fedora-vps "screen -ls"
   ```

2. Check logs for errors:
   ```bash
   ssh fedora-vps "tail -50 ~/dev-server.log"
   ```

3. Restart the server (see Restart command above)

### Port Already in Use
```bash
# Find process using port 3000
ssh fedora-vps "lsof -i :3000"

# Kill the process
ssh fedora-vps "kill -9 <PID>"
```

### Dependencies Out of Date
```bash
# Update dependencies
ssh fedora-vps "cd ~/spot-gold-trading/app && npm install"

# Rebuild
ssh fedora-vps "cd ~/spot-gold-trading/app && npm run build"
```

---

## Screen Session Quick Reference

| Command | Description |
|---------|-------------|
| `screen -ls` | List all screen sessions |
| `screen -r gold-trading` | Attach to session |
| `Ctrl+A then D` | Detach from session |
| `screen -S gold-trading -X quit` | Kill session |
| `screen -dmS gold-trading <command>` | Create detached session |

---

## Development Workflow

### Making Changes Locally
1. Make changes on your local machine
2. Test locally with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

### Deploying to VPS
1. Pull changes on VPS:
   ```bash
   ssh fedora-vps "cd ~/spot-gold-trading && git pull"
   ```

2. Restart dev server:
   ```bash
   ssh fedora-vps "screen -S gold-trading -X quit && sleep 3 && screen -dmS gold-trading bash -c 'cd ~/spot-gold-trading/app && npm run dev 2>&1 | tee ~/dev-server.log'"
   ```

3. Test the changes:
   ```bash
   curl http://138.199.218.115:3000/
   ```

---

## Server Logs

### View Last 50 Lines
```bash
ssh fedora-vps "tail -50 ~/dev-server.log"
```

### View Live Logs (Follow Mode)
```bash
ssh fedora-vps "tail -f ~/dev-server.log"
# Press Ctrl+C to stop
```

### Search Logs for Errors
```bash
ssh fedora-vps "grep -i error ~/dev-server.log"
```

### Clear Old Logs
```bash
ssh fedora-vps "> ~/dev-server.log"
```

---

## Security Notes

⚠️ **Development Server Only**
- This is a development server, NOT for production use
- No HTTPS (unencrypted traffic)
- No authentication
- Debug mode enabled
- Verbose error messages

For production deployment:
- Use `npm run build` and `npm run start`
- Set up HTTPS with Let's Encrypt
- Use environment variables for secrets
- Enable proper authentication
- Consider using PM2 or systemd for process management

---

## Quick Status Check

Run this one-liner to check if everything is working:
```bash
ssh fedora-vps "screen -ls | grep gold-trading && curl -s -o /dev/null -w 'Server Status: HTTP %{http_code}\n' http://localhost:3000/"
```

Expected output:
```
248741.gold-trading	(Detached)
Server Status: HTTP 200
```

---

## Monitoring

### Check Server Uptime
```bash
ssh fedora-vps "uptime"
```

### Check Memory Usage
```bash
ssh fedora-vps "free -h"
```

### Check Node Process
```bash
ssh fedora-vps "ps aux | grep node"
```

### Check Network Connections
```bash
ssh fedora-vps "netstat -tlnp | grep 3000"
```

---

**Setup Date**: December 10, 2025
**Last Updated**: December 10, 2025
**Status**: ✅ Active and accessible
