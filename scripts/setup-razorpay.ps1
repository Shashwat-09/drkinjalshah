# Razorpay Quick Setup Script
# This script helps you create the .env.local file

Write-Host "🚀 Razorpay Setup for Psychologist Website" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "⚠️  .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "❌ Setup cancelled. Your existing .env.local was not modified." -ForegroundColor Red
        exit
    }
}

# Copy .env.example to .env.local
Copy-Item ".env.example" ".env.local"
Write-Host "✅ Created .env.local file" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Sign up at https://razorpay.com" -ForegroundColor White
Write-Host "2. Go to Settings > API Keys in your Razorpay dashboard" -ForegroundColor White
Write-Host "3. Generate Test Keys (for testing)" -ForegroundColor White
Write-Host "4. Open .env.local and replace XXXXXXX with your actual keys" -ForegroundColor White
Write-Host "5. Restart your dev server: npm run dev" -ForegroundColor White
Write-Host "6. Test at: http://localhost:3000/book-appointment" -ForegroundColor White
Write-Host ""

Write-Host "📖 For detailed instructions, see: razorpay-setup-guide.md" -ForegroundColor Yellow
Write-Host ""

$openFile = Read-Host "Do you want to open .env.local now? (Y/n)"
if ($openFile -ne "n" -and $openFile -ne "N") {
    notepad .env.local
}
