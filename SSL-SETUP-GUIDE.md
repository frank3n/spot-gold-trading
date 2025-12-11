# SSL Setup Guide - DuckDNS + Let's Encrypt

**Domain**: spotgoldtrading.duckdns.org
**SSL Provider**: Let's Encrypt
**Date**: December 10, 2025
**Status**: ✅ Active

---

## Overview

This guide documents the SSL/HTTPS setup for the Spot Gold Trading Platform on VPS using:
- **DuckDNS**: Free dynamic DNS service
- **Let's Encrypt**: Free SSL/TLS certificates
- **Nginx**: Reverse proxy and web server
- **Certbot**: Automated certificate management

---

## Access URLs

### HTTPS (Secure)
- **Primary**: https://spotgoldtrading.duckdns.org
- **All Routes**:
  - Dashboard: https://spotgoldtrading.duckdns.org/
  - Tools: https://spotgoldtrading.duckdns.org/tools
  - Portfolio: https://spotgoldtrading.duckdns.org/portfolio
  - Alerts: https://spotgoldtrading.duckdns.org/alerts
  - Strategies: https://spotgoldtrading.duckdns.org/strategies
  - Settings: https://spotgoldtrading.duckdns.org/settings

### HTTP (Redirects to HTTPS)
- http://spotgoldtrading.duckdns.org (auto-redirects to HTTPS)

---

## DuckDNS Configuration

### Account Details
- **Service**: https://www.duckdns.org
- **Subdomain**: spotgoldtrading
- **Full Domain**: spotgoldtrading.duckdns.org
- **IP Address**: 138.199.218.115
- **Token**: 28d8f826-19fb-4d12-9f11-95dca64e68d4

### Update DNS Record
```bash
curl "https://www.duckdns.org/update?domains=spotgoldtrading&token=28d8f826-19fb-4d12-9f11-95dca64e68d4&ip=138.199.218.115"
```

**Response**: `OK` (successful update)

### Verify DNS
```bash
nslookup spotgoldtrading.duckdns.org
# Should return: 138.199.218.115
```

---

## SSL Certificate Details

### Certificate Information
```
Common Name: spotgoldtrading.duckdns.org
Issuer: Let's Encrypt Authority X3
Valid From: December 10, 2025
Valid Until: March 10, 2026 (90 days)
Certificate Path: /etc/letsencrypt/live/spotgoldtrading.duckdns.org/fullchain.pem
Private Key Path: /etc/letsencrypt/live/spotgoldtrading.duckdns.org/privkey.pem
```

### Certificate Files
```
/etc/letsencrypt/live/spotgoldtrading.duckdns.org/
├── fullchain.pem    # Full certificate chain
├── privkey.pem      # Private key
├── cert.pem         # Certificate only
└── chain.pem        # Intermediate certificates
```

---

## Nginx Configuration

### Configuration File
**Location**: `/etc/nginx/conf.d/gold-trading.conf`

### Current Configuration
```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    server_name spotgoldtrading.duckdns.org;
    return 301 https://$host$request_uri;
}

# HTTPS - Main Server
server {
    listen 443 ssl http2;
    server_name spotgoldtrading.duckdns.org;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/spotgoldtrading.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spotgoldtrading.duckdns.org/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Proxy to Next.js Dev Server
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Nginx Management Commands

**Test configuration**:
```bash
ssh fedora-vps "sudo nginx -t"
```

**Reload configuration**:
```bash
ssh fedora-vps "sudo systemctl reload nginx"
```

**Restart nginx**:
```bash
ssh fedora-vps "sudo systemctl restart nginx"
```

**Check status**:
```bash
ssh fedora-vps "sudo systemctl status nginx"
```

**View nginx logs**:
```bash
# Access logs
ssh fedora-vps "sudo tail -f /var/log/nginx/access.log"

# Error logs
ssh fedora-vps "sudo tail -f /var/log/nginx/error.log"
```

---

## Certificate Management

### Auto-Renewal

**Status**: ✅ Enabled

**Renewal Timer**:
```bash
ssh fedora-vps "sudo systemctl status certbot-renew.timer"
```

**Next Renewal**: Automatically runs daily at 4:21 UTC

### Manual Certificate Operations

**Renew certificate manually**:
```bash
ssh fedora-vps "sudo certbot renew"
```

**Test renewal (dry-run)**:
```bash
ssh fedora-vps "sudo certbot renew --dry-run"
```

**View certificate details**:
```bash
ssh fedora-vps "sudo certbot certificates"
```

**Revoke certificate**:
```bash
ssh fedora-vps "sudo certbot revoke --cert-path /etc/letsencrypt/live/spotgoldtrading.duckdns.org/cert.pem"
```

**Delete certificate**:
```bash
ssh fedora-vps "sudo certbot delete --cert-name spotgoldtrading.duckdns.org"
```

---

## Installation Steps (For Reference)

### 1. Install Required Packages
```bash
ssh fedora-vps "sudo dnf install -y nginx certbot python3-certbot-nginx"
```

### 2. Configure DuckDNS
```bash
# Update DNS record
curl "https://www.duckdns.org/update?domains=spotgoldtrading&token=YOUR_TOKEN&ip=138.199.218.115"
```

### 3. Create Initial Nginx Config
```bash
ssh fedora-vps "sudo tee /etc/nginx/conf.d/gold-trading.conf" << 'EOF'
server {
    listen 80;
    server_name spotgoldtrading.duckdns.org;
    location / {
        proxy_pass http://localhost:3000;
        # ... proxy headers ...
    }
}
EOF
```

### 4. Start Nginx
```bash
ssh fedora-vps "sudo systemctl enable nginx && sudo systemctl start nginx"
```

### 5. Obtain SSL Certificate
```bash
ssh fedora-vps "sudo certbot --nginx -d spotgoldtrading.duckdns.org --agree-tos --non-interactive --email admin@spotgoldtrading.duckdns.org --redirect"
```

### 6. Enable Auto-Renewal
```bash
ssh fedora-vps "sudo systemctl enable certbot-renew.timer && sudo systemctl start certbot-renew.timer"
```

---

## Testing & Verification

### Test HTTPS Connection
```bash
curl -I https://spotgoldtrading.duckdns.org
# Should return: HTTP/1.1 200 OK with SSL info
```

### Test HTTP Redirect
```bash
curl -I http://spotgoldtrading.duckdns.org
# Should return: HTTP/1.1 301 Moved Permanently
```

### Test All Routes
```bash
for route in "" "tools" "portfolio" "alerts" "strategies" "settings"; do
  echo -n "Testing /$route: "
  curl -s -o /dev/null -w "HTTP %{http_code}\n" https://spotgoldtrading.duckdns.org/$route
done
```

### Check SSL Certificate Online
- **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=spotgoldtrading.duckdns.org
- **SSL Checker**: https://www.sslchecker.com/sslchecker

### Browser Testing
1. Open https://spotgoldtrading.duckdns.org in browser
2. Click the padlock icon in address bar
3. Verify certificate details
4. Check for mixed content warnings
5. Test all routes and functionality

---

## Troubleshooting

### Certificate Renewal Failed

**Check renewal logs**:
```bash
ssh fedora-vps "sudo cat /var/log/letsencrypt/letsencrypt.log"
```

**Manual renewal**:
```bash
ssh fedora-vps "sudo certbot renew --force-renewal"
```

### Nginx Not Starting

**Check configuration**:
```bash
ssh fedora-vps "sudo nginx -t"
```

**Check error logs**:
```bash
ssh fedora-vps "sudo journalctl -u nginx -n 50"
```

**Check port conflicts**:
```bash
ssh fedora-vps "sudo lsof -i :80"
ssh fedora-vps "sudo lsof -i :443"
```

### DNS Not Resolving

**Update DuckDNS manually**:
```bash
curl "https://www.duckdns.org/update?domains=spotgoldtrading&token=28d8f826-19fb-4d12-9f11-95dca64e68d4&ip=138.199.218.115&verbose=true"
```

**Clear local DNS cache**:
```bash
# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches

# macOS
sudo dscacheutil -flushcache
```

### Mixed Content Warnings

**Issue**: Page loads over HTTPS but includes HTTP resources

**Solution**: Update Next.js to use HTTPS for all assets
```javascript
// next.config.js
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://spotgoldtrading.duckdns.org' : '',
}
```

---

## Security Best Practices

### SSL/TLS Configuration

**Current Setup** (Good):
- TLS 1.2 and 1.3 enabled
- Strong cipher suites
- HTTPS redirect enabled

**Recommended Improvements**:
1. Add HSTS header
2. Enable OCSP stapling
3. Add security headers

**Enhanced nginx config**:
```nginx
# Add to server block
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/letsencrypt/live/spotgoldtrading.duckdns.org/chain.pem;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
```

### DuckDNS Token Security

⚠️ **IMPORTANT**: Keep your DuckDNS token secure!

**Current token**: 28d8f826-19fb-4d12-9f11-95dca64e68d4

**Security measures**:
- Don't commit token to public repositories
- Use environment variables for scripts
- Regenerate if compromised (from DuckDNS dashboard)

---

## Monitoring & Maintenance

### SSL Certificate Expiry Monitoring

**Check certificate expiry**:
```bash
ssh fedora-vps "sudo certbot certificates" | grep "Expiry Date"
```

**Automated monitoring** (optional):
```bash
# Add to crontab
0 0 * * * certbot certificates | grep -A 2 spotgoldtrading | mail -s "SSL Cert Status" admin@example.com
```

### Renewal Schedule

**Auto-renewal runs**: Twice daily (at 4:21 UTC and 16:21 UTC)
**Renewal window**: 30 days before expiry
**Certificate lifetime**: 90 days

### Logs to Monitor

1. **Nginx access logs**: `/var/log/nginx/access.log`
2. **Nginx error logs**: `/var/log/nginx/error.log`
3. **Certbot logs**: `/var/log/letsencrypt/letsencrypt.log`
4. **System logs**: `journalctl -u nginx -u certbot-renew.timer`

---

## Backup & Recovery

### Backup Certificate Files

```bash
# Backup certificates
ssh fedora-vps "sudo tar -czf ~/letsencrypt-backup-$(date +%Y%m%d).tar.gz /etc/letsencrypt"

# Download backup
scp fedora-vps:~/letsencrypt-backup-*.tar.gz ./backups/
```

### Restore Certificate

```bash
# Upload backup
scp backups/letsencrypt-backup-*.tar.gz fedora-vps:~/

# Restore
ssh fedora-vps "sudo tar -xzf ~/letsencrypt-backup-*.tar.gz -C /"

# Reload nginx
ssh fedora-vps "sudo systemctl reload nginx"
```

---

## Migration to New Domain

### Steps to Move to Custom Domain

1. **Purchase domain** (e.g., goldtrading.com)

2. **Update DNS records**:
   ```
   A Record: @ → 138.199.218.115
   A Record: www → 138.199.218.115
   ```

3. **Update nginx config**:
   ```bash
   ssh fedora-vps "sudo sed -i 's/spotgoldtrading.duckdns.org/goldtrading.com/g' /etc/nginx/conf.d/gold-trading.conf"
   ```

4. **Get new certificate**:
   ```bash
   ssh fedora-vps "sudo certbot --nginx -d goldtrading.com -d www.goldtrading.com"
   ```

5. **Remove old certificate** (optional):
   ```bash
   ssh fedora-vps "sudo certbot delete --cert-name spotgoldtrading.duckdns.org"
   ```

---

## Quick Reference Commands

```bash
# Check SSL certificate expiry
ssh fedora-vps "sudo certbot certificates"

# Renew certificates manually
ssh fedora-vps "sudo certbot renew"

# Test renewal
ssh fedora-vps "sudo certbot renew --dry-run"

# Reload nginx
ssh fedora-vps "sudo systemctl reload nginx"

# View nginx logs
ssh fedora-vps "sudo tail -f /var/log/nginx/access.log"

# Test HTTPS
curl -I https://spotgoldtrading.duckdns.org

# Update DuckDNS IP
curl "https://www.duckdns.org/update?domains=spotgoldtrading&token=28d8f826-19fb-4d12-9f11-95dca64e68d4&ip=138.199.218.115"

# Check auto-renewal timer
ssh fedora-vps "sudo systemctl status certbot-renew.timer"
```

---

## Resources

- **DuckDNS**: https://www.duckdns.org
- **Let's Encrypt**: https://letsencrypt.org
- **Certbot**: https://certbot.eff.org
- **Nginx Documentation**: https://nginx.org/en/docs/
- **SSL Labs**: https://www.ssllabs.com/ssltest/

---

**Setup Date**: December 10, 2025
**Last Updated**: December 10, 2025
**Maintained By**: VPS Admin
**Status**: ✅ Production Ready
