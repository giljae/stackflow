#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

const args = process.argv.slice(2);
const command = args[0];

const defaultHome = path.join(os.homedir(), '.gemini', 'antigravity');
const refsDir = path.join(defaultHome, 'references');

function performSync() {
    const upstreamsDir = path.join(defaultHome, '.stackflow-upstreams');

    console.log('\n🔄 Initiating dynamic sync from upstream true sources...');
    
    if (!fs.existsSync(upstreamsDir)) fs.mkdirSync(upstreamsDir, { recursive: true });
    if (!fs.existsSync(path.join(refsDir, 'gstack'))) fs.mkdirSync(path.join(refsDir, 'gstack'), { recursive: true });
    if (!fs.existsSync(path.join(refsDir, 'superpowers'))) fs.mkdirSync(path.join(refsDir, 'superpowers'), { recursive: true });

    try {
        // Sync Gstack
        const gstackPath = path.join(upstreamsDir, 'gstack');
        if (fs.existsSync(gstackPath)) {
            console.log('Updating garrytan/gstack...');
            execSync('git pull --quiet', { cwd: gstackPath, stdio: 'ignore' });
        } else {
            console.log('Cloning garrytan/gstack...');
            execSync(`git clone --quiet https://github.com/garrytan/gstack.git "${gstackPath}"`, { stdio: 'ignore' });
        }

        // Sync Superpowers
        const superpowersPath = path.join(upstreamsDir, 'superpowers');
        if (fs.existsSync(superpowersPath)) {
            console.log('Updating obra/superpowers...');
            execSync('git pull --quiet', { cwd: superpowersPath, stdio: 'ignore' });
        } else {
            console.log('Cloning obra/superpowers...');
            execSync(`git clone --quiet https://github.com/obra/superpowers.git "${superpowersPath}"`, { stdio: 'ignore' });
        }

        console.log('📦 Aggregating SKILL and Agent definition references...');
        
        // Use bash find/exec to securely copy markdown files across generic OS environments where bash is available (Mac/Linux)
        execSync(`find "${gstackPath}" -type f \\( -name "*.md" -o -name "*.agent.md" \\) -exec cp {} "${path.join(refsDir, 'gstack')}/" \\; 2>/dev/null || true`);
        
        const superFiles = execSync(`find "${superpowersPath}" -type f -name "SKILL.md"`).toString().trim().split('\n');
        for (const file of superFiles) {
            if (file) {
                const skillName = path.basename(path.dirname(file));
                fs.copyFileSync(file, path.join(refsDir, 'superpowers', `${skillName}.md`));
            }
        }

        console.log('✅ Sync complete. Original prompts are cached in ' + refsDir);

    } catch (e) {
        console.error('❌ Failed to sync from Github. Please check your internet connection or git installation.');
        console.error(e.message);
    }
}

if (command === 'install') {
    const skillsDest = path.join(defaultHome, 'skills');
    const workflowsDest = path.join(defaultHome, 'workflows');

    console.log('🚀 Installing Stackflow into local Antigravity environment...');
    
    if (!fs.existsSync(skillsDest)) fs.mkdirSync(skillsDest, { recursive: true });
    if (!fs.existsSync(workflowsDest)) fs.mkdirSync(workflowsDest, { recursive: true });

    const packageRoot = path.join(__dirname, '..');
    
    // 1. Copy Skills
    const skillsSrc = path.join(packageRoot, 'skills');
    if (fs.existsSync(skillsSrc)) {
        console.log(`🔗 Copying skills...`);
        const skills = fs.readdirSync(skillsSrc);
        for (const skill of skills) {
             console.log(`   - Installing @${skill}`);
             copyRecursiveSync(path.join(skillsSrc, skill), path.join(skillsDest, skill));
        }
    }

    // 2. Copy Workflows
    const workflowsSrc = path.join(packageRoot, 'workflows');
    if (fs.existsSync(workflowsSrc)) {
        console.log(`🔗 Copying workflows...`);
        copyRecursiveSync(workflowsSrc, workflowsDest);
    }

    // 3. Optional initial sync or static copy fallbacks
    const refsSrc = path.join(packageRoot, 'references');
    if (fs.existsSync(refsSrc) && !fs.existsSync(refsDir)) {
        // Provide baseline static references just in case sync fails
        copyRecursiveSync(refsSrc, refsDir);
    }

    // Automatically trigger sync for fresh upstream truth
    performSync();

    console.log('\n🎉 Install successfully finished!');
    console.log('You can now use @sf-think, @sf-plan, and other stackflow commands from any project.');

} else if (command === 'sync') {
    performSync();
} else {
    console.log("Welcome to @runchr/stackflow!");
    console.log("Usage:");
    console.log("  stackflow install    - Installs skills into ~/.gemini/antigravity and runs sync.");
    console.log("  stackflow sync       - Forces a dynamic sync pulling latest raw frameworks from Github.");
}
