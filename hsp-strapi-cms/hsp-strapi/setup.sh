#!/usr/bin/env bash
# ============================================================
# Hotel Sujata Palace — Strapi v5 Auto Setup Script
# Usage: bash setup.sh
# ============================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "  ╔══════════════════════════════════════════╗"
echo "  ║   Hotel Sujata Palace — Strapi v5 CMS    ║"
echo "  ║         Auto Setup Script                ║"
echo "  ╚══════════════════════════════════════════╝"
echo -e "${NC}"

# 1. Check Node.js version
echo -e "${YELLOW}► Checking Node.js version...${NC}"
NODE_VER=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VER" ] || [ "$NODE_VER" -lt 18 ]; then
  echo "❌ Node.js 18 or higher is required. Install from https://nodejs.org"
  exit 1
fi
echo -e "${GREEN}✓ Node.js v$(node -v) OK${NC}"

# 2. Create Strapi v5 project
echo ""
echo -e "${YELLOW}► Creating Strapi v5 project: hsp-strapi${NC}"
echo -e "${CYAN}  (This will take 2-3 minutes)${NC}"
npx create-strapi-app@latest hsp-strapi --quickstart --no-run

cd hsp-strapi

# 3. Copy content-type schemas from this package
echo ""
echo -e "${YELLOW}► Installing content-type schemas...${NC}"
SCHEMA_SRC="../src/api"
if [ -d "$SCHEMA_SRC" ]; then
  cp -r "$SCHEMA_SRC"/* src/api/
  echo -e "${GREEN}✓ Schemas copied${NC}"
else
  echo -e "${YELLOW}⚠  Schema source not found. Copy src/api/ manually.${NC}"
fi

# 4. Copy config files
echo ""
echo -e "${YELLOW}► Copying config files...${NC}"
for f in database.js middlewares.js plugins.js server.js; do
  if [ -f "../config/$f" ]; then
    cp "../config/$f" "config/$f"
    echo -e "${GREEN}  ✓ config/$f${NC}"
  fi
done

# 5. Copy .env.example
if [ -f "../.env.example" ]; then
  cp "../.env.example" .env.example
  echo -e "${GREEN}  ✓ .env.example${NC}"
fi

# 6. Generate .env with random keys
echo ""
echo -e "${YELLOW}► Generating .env with random keys...${NC}"
generate_key() {
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
}

cat > .env << EOF
HOST=0.0.0.0
PORT=1337
APP_KEYS=$(generate_key),$(generate_key),$(generate_key),$(generate_key)
API_TOKEN_SALT=$(generate_key)
ADMIN_JWT_SECRET=$(generate_key)
TRANSFER_TOKEN_SALT=$(generate_key)
JWT_SECRET=$(generate_key)

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF

echo -e "${GREEN}✓ .env generated${NC}"

# 7. Done
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗"
echo "║              ✅ Setup Complete!              ║"
echo "╚══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${CYAN}Next steps:${NC}"
echo ""
echo "  1. Start Strapi:"
echo -e "     ${YELLOW}cd hsp-strapi && npm run develop${NC}"
echo ""
echo "  2. Open Admin Panel:"
echo -e "     ${YELLOW}http://localhost:1337/admin${NC}"
echo ""
echo "  3. Create your admin user account"
echo ""
echo "  4. Set permissions (Settings → Roles → Public):"
echo "     • rooms: find, findOne ✓"
echo "     • galleries: find ✓"
echo "     • testimonials: find ✓"
echo "     • amenities: find ✓"
echo "     • careers: find ✓"
echo "     • bookings: create ✓"
echo "     • contact-messages: create ✓"
echo ""
echo "  5. Generate an API token and run the seed script:"
echo -e "     ${YELLOW}STRAPI_API_TOKEN=your_token node ../frontend-integration/seed.js${NC}"
echo ""
echo "  6. Add strapi-api.js to your hotel website and enjoy! 🎉"
echo ""
