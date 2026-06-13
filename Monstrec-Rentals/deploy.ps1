# PowerShell Deployment Helper Script
# For Windows users - helps check and prepare deployment

param(
    [switch]$Setup = $false,
    [switch]$Check = $false,
    [switch]$Clean = $false
)

$ErrorActionPreference = "Stop"

function Write-Status {
    param([string]$Message, [string]$Status = "INFO")
    $Color = switch($Status) {
        "OK" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR" { "Red" }
        default { "White" }
    }
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [$Status] $Message" -ForegroundColor $Color
}

function Check-Deployment {
    Write-Status "Starting deployment checks..." "INFO"
    Write-Host ""
    
    # Check Git
    Write-Host "=== Checking Git ==="
    if ((Test-Path ".git")) {
        Write-Status "Git repository found" "OK"
    } else {
        Write-Status "Git repository not found - Run: git init" "ERROR"
        return $false
    }
    
    # Check Backend
    Write-Host ""
    Write-Host "=== Checking Backend ==="
    
    if (Test-Path "backend\node_modules") {
        Write-Status "backend\node_modules exists" "OK"
    } else {
        Write-Status "backend\node_modules not found - Run: cd backend && npm install" "WARNING"
    }
    
    if (Test-Path "backend\.env") {
        Write-Status "backend\.env exists" "OK"
    } else {
        Write-Status "backend\.env not found - Copy from backend\.env.example" "WARNING"
    }
    
    if (Test-Path "backend\vercel.json") {
        Write-Status "backend\vercel.json exists" "OK"
    } else {
        Write-Status "backend\vercel.json not found" "ERROR"
        return $false
    }
    
    # Check Frontend
    Write-Host ""
    Write-Host "=== Checking Frontend ==="
    
    if (Test-Path "frontend\node_modules") {
        Write-Status "frontend\node_modules exists" "OK"
    } else {
        Write-Status "frontend\node_modules not found - Run: cd frontend && npm install" "WARNING"
    }
    
    if (Test-Path "frontend\.env.local") {
        Write-Status "frontend\.env.local exists" "OK"
    } else {
        Write-Status "frontend\.env.local not found - Copy from frontend\.env.example" "WARNING"
    }
    
    if (Test-Path "frontend\vite.config.js") {
        Write-Status "frontend\vite.config.js exists" "OK"
    } else {
        Write-Status "frontend\vite.config.js not found" "ERROR"
        return $false
    }
    
    # Check Root
    Write-Host ""
    Write-Host "=== Checking Root ==="
    
    if (Test-Path "vercel.json") {
        Write-Status "Root vercel.json exists" "OK"
    } else {
        Write-Status "Root vercel.json not found" "ERROR"
        return $false
    }
    
    if (Test-Path ".env.example") {
        Write-Status ".env.example exists" "OK"
    } else {
        Write-Status ".env.example not found" "WARNING"
    }
    
    Write-Host ""
    Write-Status "All critical checks passed!" "OK"
    return $true
}

function Setup-Deployment {
    Write-Status "Starting deployment setup..." "INFO"
    Write-Host ""
    
    # Install dependencies
    Write-Host "=== Installing Dependencies ==="
    
    Write-Status "Installing backend dependencies..." "INFO"
    & cmd /c "cd backend && npm install"
    if ($?) {
        Write-Status "Backend dependencies installed" "OK"
    } else {
        Write-Status "Failed to install backend dependencies" "ERROR"
        return $false
    }
    
    Write-Status "Installing frontend dependencies..." "INFO"
    & cmd /c "cd frontend && npm install"
    if ($?) {
        Write-Status "Frontend dependencies installed" "OK"
    } else {
        Write-Status "Failed to install frontend dependencies" "ERROR"
        return $false
    }
    
    # Setup env files
    Write-Host ""
    Write-Host "=== Setting Up Environment Files ==="
    
    if (-not (Test-Path "backend\.env")) {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Status "Created backend\.env from .env.example" "OK"
        Write-Status "IMPORTANT: Edit backend\.env with your configuration" "WARNING"
    }
    
    if (-not (Test-Path "frontend\.env.local")) {
        Copy-Item "frontend\.env.example" "frontend\.env.local"
        Write-Status "Created frontend\.env.local from .env.example" "OK"
    }
    
    Write-Host ""
    Write-Status "Setup complete!" "OK"
    Write-Status "Next: Edit backend\.env with your credentials" "INFO"
    return $true
}

function Clean-Installation {
    Write-Status "Cleaning installation..." "INFO"
    
    Write-Status "Removing backend\node_modules..." "INFO"
    if (Test-Path "backend\node_modules") {
        Remove-Item "backend\node_modules" -Recurse -Force
        Write-Status "Removed backend\node_modules" "OK"
    }
    
    Write-Status "Removing frontend\node_modules..." "INFO"
    if (Test-Path "frontend\node_modules") {
        Remove-Item "frontend\node_modules" -Recurse -Force
        Write-Status "Removed frontend\node_modules" "OK"
    }
    
    Write-Status "Removing frontend\dist..." "INFO"
    if (Test-Path "frontend\dist") {
        Remove-Item "frontend\dist" -Recurse -Force
        Write-Status "Removed frontend\dist" "OK"
    }
    
    Write-Status "Clean complete! Run with -Setup to reinstall" "OK"
}

# Main script logic
if ($Check) {
    Check-Deployment
} elseif ($Setup) {
    Check-Deployment
    if ($?) {
        Setup-Deployment
    }
} elseif ($Clean) {
    Clean-Installation
} else {
    Write-Host @"

Monstrec Rentals - Deployment Helper Script

Usage:
  .\deploy.ps1 -Check    # Check deployment readiness
  .\deploy.ps1 -Setup    # Setup and install dependencies
  .\deploy.ps1 -Clean    # Clean node_modules and dist

Examples:
  .\deploy.ps1 -Check    # Check if ready to deploy
  .\deploy.ps1 -Setup    # First time setup
  .\deploy.ps1 -Clean    # Clean up before fresh install

For detailed instructions, see DEPLOY_NOW.md

"@
}
