# سكريبت نشر المشروع على GitHub
# تأكد من تثبيت Git قبل تشغيل هذا السكريبت

Write-Host "🚀 بدء نشر المشروع على GitHub..." -ForegroundColor Green
Write-Host ""

# التحقق من وجود Git
try {
    $gitVersion = git --version
    Write-Host "✅ Git متوفر: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git غير مثبت! يرجى تثبيت Git من: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📝 تهيئة Git repository..." -ForegroundColor Yellow
git init

Write-Host ""
Write-Host "📦 إضافة جميع الملفات..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 عمل commit..." -ForegroundColor Yellow
git commit -m "first commit"

Write-Host ""
Write-Host "🌿 تغيير اسم الفرع إلى main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "🔗 إضافة remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/m75store-blip/mfolo.git

Write-Host ""
Write-Host "⬆️ رفع المشروع إلى GitHub..." -ForegroundColor Yellow
Write-Host "⚠️ سيطلب منك اسم المستخدم وكلمة المرور (استخدم Personal Access Token)" -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "✅ تم النشر بنجاح! 🎉" -ForegroundColor Green
Write-Host "Repository: https://github.com/m75store-blip/mfolo" -ForegroundColor Cyan