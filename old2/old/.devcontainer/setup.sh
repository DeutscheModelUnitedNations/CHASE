echo "Setting Up Devcontainer"
echo "======================="

echo ""
echo "Installing Starship"
echo "-------------------"

mkdir -p ~/.config/fish
touch ~/.config/fish/config.fish
echo "starship init fish | source" > ~/.config/fish/config.fish
echo 'echo "starship init fish | source" > ~/.config/fish/config.fish'


echo ""
echo "Setting up Prisma Database"
echo "--------------------------"

sleep 1
cd /workspaces/munify/chase/backend
bun i
bunx prisma migrate reset --force
bunx prisma migrate dev -n initial_dev_migration
