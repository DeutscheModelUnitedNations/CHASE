#!/bin/bash

# Define ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Welcome message
echo -e "${GREEN}Welcome to Chase! 🚀${NC}"
echo -e "This script will start the frontend and backend in development mode."
echo ""
echo -e "${YELLOW}Make sure before you start, you have installed all dependencies by running 'bun i' in the root directory.${NC}"
echo ""

echo ""
echo "The following Ports will be used:"
echo "    - Frontend Server: 3000   http://localhost:3000"
echo "    - Backend Server:  3001   http://localhost:3001"
echo "    - Database:        5432   http://localhost:5432"
echo "    - Redis:           6379   http://localhost:6379"
echo "    - SMTP-Mock:       3777   http://localhost:3777"
echo "    - Prisma Studio:   5555   http://localhost:5555"
echo ""
echo "You can access the following URLs:"
echo "    - Backend Documentation: 3001/documentation"

echo ""
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
echo ""
echo ""

# Mode selection
echo -e "${BLUE}First, please select your preferred mode:${NC}"
echo "If you are developing in a dev-container, you can start the frontend and backend in the dev-container mode. This will ensure that the already running database and redis server are not started again."
echo ""

# End of script
echo -e "${GREEN}Services are starting. Please check the output for any errors or warnings.${NC}"

# Prompt for dev-container mode
echo -e "${YELLOW}Do you want to start in dev-container mode? [y/N]${NC}"
read -r use_container

if [ "$use_container" = "y" ]; then
  echo -e "${GREEN}Starting services in dev-container mode...${NC}"
  bun run dev:container
else
  echo -e "${GREEN}Starting services in standard mode...${NC}"
  bun run dev:normal
fi
